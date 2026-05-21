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
