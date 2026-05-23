import { bffClient, getApiErrorMessage } from "@/lib/api-client";

export type CourseModuleMedia = {
  id: string;
  moduleId: string;
  mediaFileId: string;
  purpose: string;
  displayOrder: number;
};

export type CourseModuleItem = {
  id: string;
  courseId: string;
  title: string;
  description: string | null;
  displayOrder: number;
  weekNumber: number | null;
  duration: number | null;
  isPublished: boolean;
  isRequired: boolean;
  createdAt: string;
  updatedAt: string;
  media: CourseModuleMedia[];
  subModules: unknown[];
};

export type CourseModuleDetailItem = CourseModuleItem & {
  assessments?: unknown[];
  lessons?: unknown[];
};

export type CourseLessonItem = {
  id: string;
  courseId: string;
  courseModuleId: string;
  subModuleId: string | null;
  title: string;
  type: string;
  description: string | null;
  content: string | null;
  displayOrder: number;
  isPublished: boolean;
  isRequired: boolean;
  isPrerequisiteFor?: Array<
    | string
    | {
        prerequisiteId?: string;
        dependentId?: string;
      }
  >;
  durationMinutes: number | null;
  scheduledAt: string | null;
  endsAt: string | null;
  location: string | null;
  createdAt: string;
  updatedAt: string;
  media?: unknown[];
};

export type CourseLessonDetailItem = CourseLessonItem & {
  courseModule?: {
    id?: string;
    title?: string;
    courseId?: string;
  } | null;
};

type CourseModulesPayload =
  | CourseModuleItem[]
  | {
      data?: CourseModuleItem[] | null;
    }
  | null
  | undefined;

type CourseModulesEnvelope = {
  success?: boolean;
  message?: string;
  data?: CourseModulesPayload;
};

type CourseModulesResponse = CourseModulesEnvelope | CourseModulesPayload;

type CourseModuleDetailPayload =
  | CourseModuleDetailItem
  | {
      data?: CourseModuleDetailItem | null;
    }
  | null
  | undefined;

type CourseModuleDetailEnvelope = {
  success?: boolean;
  message?: string;
  data?: CourseModuleDetailPayload;
};

type CourseModuleDetailResponse =
  | CourseModuleDetailEnvelope
  | CourseModuleDetailPayload;

type CourseLessonsPayload =
  | CourseLessonItem[]
  | {
      data?: CourseLessonItem[] | null;
    }
  | null
  | undefined;

type CourseLessonsEnvelope = {
  success?: boolean;
  message?: string;
  data?: CourseLessonsPayload;
};

type CourseLessonsResponse = CourseLessonsEnvelope | CourseLessonsPayload;

type CourseLessonDetailPayload =
  | CourseLessonDetailItem
  | {
      data?: CourseLessonDetailItem | null;
    }
  | null
  | undefined;

type CourseLessonDetailEnvelope = {
  success?: boolean;
  message?: string;
  data?: CourseLessonDetailPayload;
};

type CourseLessonDetailResponse =
  | CourseLessonDetailEnvelope
  | CourseLessonDetailPayload;

function isCourseModuleItem(value: unknown): value is CourseModuleItem {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "string" &&
    "courseId" in value &&
    typeof value.courseId === "string" &&
    "title" in value &&
    typeof value.title === "string"
  );
}

function extractModuleArray(payload: CourseModulesPayload): CourseModuleItem[] {
  if (Array.isArray(payload)) {
    return payload.filter(isCourseModuleItem);
  }

  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    Array.isArray(payload.data)
  ) {
    return payload.data.filter(isCourseModuleItem);
  }

  return [];
}

function isCourseLessonItem(value: unknown): value is CourseLessonItem {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "string" &&
    "title" in value &&
    typeof value.title === "string"
  );
}

function isCourseLessonDetailItem(value: unknown): value is CourseLessonDetailItem {
  return isCourseLessonItem(value);
}

function extractLessonArray(payload: CourseLessonsPayload): CourseLessonItem[] {
  if (Array.isArray(payload)) {
    return payload.filter(isCourseLessonItem);
  }

  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    Array.isArray(payload.data)
  ) {
    return payload.data.filter(isCourseLessonItem);
  }

  return [];
}

function extractLessonDetail(
  payload: CourseLessonDetailPayload,
): CourseLessonDetailItem | null {
  if (isCourseLessonDetailItem(payload)) {
    return payload;
  }

  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    isCourseLessonDetailItem(payload.data)
  ) {
    return payload.data;
  }

  return null;
}

function extractModuleDetail(
  payload: CourseModuleDetailPayload,
): CourseModuleDetailItem | null {
  if (isCourseModuleItem(payload)) {
    return payload as CourseModuleDetailItem;
  }

  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    isCourseModuleItem(payload.data)
  ) {
    return payload.data as CourseModuleDetailItem;
  }

  return null;
}

function isModulesEnvelope(value: unknown): value is CourseModulesEnvelope {
  return (
    typeof value === "object" &&
    value !== null &&
    ("success" in value || "message" in value || "data" in value)
  );
}

export async function getCourseModulesRequest(
  courseId: string,
): Promise<CourseModuleItem[]> {
  try {
    const { data } = await bffClient.get<CourseModulesResponse>(
      `/courses/${courseId}/modules`,
    );

    if (isModulesEnvelope(data) && data.success === false) {
      throw new Error(
        typeof data.message === "string"
          ? data.message
          : "Unable to fetch modules.",
      );
    }

    if (isModulesEnvelope(data)) {
      return extractModuleArray(data.data);
    }

    return extractModuleArray(data);
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Unable to fetch modules."));
  }
}

export async function getCourseModuleByIdRequest(
  courseId: string,
  moduleId: string,
): Promise<CourseModuleDetailItem> {
  try {
    const { data } = await bffClient.get<CourseModuleDetailResponse>(
      `/courses/${courseId}/modules/${moduleId}`,
    );

    if (isModulesEnvelope(data) && data.success === false) {
      throw new Error(
        typeof data.message === "string"
          ? data.message
          : "Unable to fetch module details.",
      );
    }

    const moduleDetail = isModulesEnvelope(data)
      ? extractModuleDetail(data.data as CourseModuleDetailPayload)
      : extractModuleDetail(data as CourseModuleDetailPayload);

    if (!moduleDetail) {
      throw new Error("Module details are missing.");
    }

    return moduleDetail;
  } catch (error) {
    throw new Error(
      getApiErrorMessage(error, "Unable to fetch module details."),
    );
  }
}

export async function getCourseModuleLessonsRequest(
  courseId: string,
  moduleId: string,
): Promise<CourseLessonItem[]> {
  try {
    const { data } = await bffClient.get<CourseLessonsResponse>(
      `/courses/${courseId}/modules/${moduleId}/lessons`,
    );

    if (isModulesEnvelope(data) && data.success === false) {
      throw new Error(
        typeof data.message === "string"
          ? data.message
          : "Unable to fetch lessons.",
      );
    }

    if (isModulesEnvelope(data)) {
      return extractLessonArray(data.data as CourseLessonsPayload);
    }

    return extractLessonArray(data as CourseLessonsPayload);
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Unable to fetch lessons."));
  }
}

export async function getCourseLessonByIdRequest(
  lessonId: string,
): Promise<CourseLessonDetailItem> {
  try {
    const { data } = await bffClient.get<CourseLessonDetailResponse>(
      `/lessons/${lessonId}`,
    );

    if (isModulesEnvelope(data) && data.success === false) {
      throw new Error(
        typeof data.message === "string"
          ? data.message
          : "Unable to fetch lesson details.",
      );
    }

    const lessonDetail = isModulesEnvelope(data)
      ? extractLessonDetail(data.data as CourseLessonDetailPayload)
      : extractLessonDetail(data as CourseLessonDetailPayload);

    if (!lessonDetail) {
      throw new Error("Lesson details are missing.");
    }

    return lessonDetail;
  } catch (error) {
    throw new Error(
      getApiErrorMessage(error, "Unable to fetch lesson details."),
    );
  }
}
