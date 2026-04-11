import { bffClient, getApiErrorMessage } from "@/lib/api-client";
import type { CourseCreateForm, CourseListItem, CourseStatus } from "../types";

export type CoursesListParams = {
  page?: number;
  pageSize?: number;
  fetchAll?: boolean;
};

export type CourseDetail = CoursesApiItem & {
  description?: string | null;
  shortDescription?: string | null;
  aboutCourse?: string | null;
  syllabusLink?: string | null;
  priceNote?: string | null;
  basePrice?: string | number | null;
  currency?: string | null;
  isActive?: boolean | null;
  depth?: string | null;
  enrollmentType?: string | null;
  enrolmentType?: string | null;
  repeatAccess?: string | null;
  requiresAccount?: boolean | null;
  durationWeeks?: number | string | null;
  sessionFrequency?: string | null;
  highlights?: string[] | null;
  objectives?: string[] | null;
  prerequisites?: string[] | null;
  targetAudience?: string[] | null;
  audience?: string[] | null;
  tags?: string[] | null;
  completionRequireAllModules?: boolean | null;
  completionRequiredModuleIds?: string[] | null;
  completionRequiredPassMark?: string | null;
  earlyBirdPrice?: string | number | null;
  earlyBirdAvailableUntil?: string | null;
  instructors?: Array<{ name?: string | null } | string> | null;
};

type CoursesApiCategory = {
  id?: string;
  name?: string | null;
  categoryName?: string | null;
  categoryId?: string | null;
  category?: {
    id?: string;
    name?: string | null;
    slug?: string | null;
  } | null;
};

type CoursesApiItem = {
  id: string;
  title: string;
  slug?: string | null;
  courseStatus?: string | null;
  status?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  primaryDate?: string | null;
  category?: string | { name?: string | null } | null;
  categoryName?: string | null;
  categories?: CoursesApiCategory[] | null;
  coverImageUrl?: string | null;
  image?: string | null;
  enrolledStudents?: number | null;
  enrollmentCount?: number | null;
  enrolmentCount?: number | null;
  studentsCount?: number | null;
};

type CoursesListPayload = {
  data: CoursesApiItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
};

export type CoursesListResponse = {
  success: boolean;
  message: string;
  data?: CoursesListPayload;
};

export type CourseDetailResponse =
  | {
      success: boolean;
      message: string;
      data?: CourseDetail | { data?: CourseDetail };
    }
  | CourseDetail;

export type CoursesListResult = {
  items: CourseListItem[];
  meta: CoursesListPayload["meta"];
};

export type CreateCourseInput = {
  form: CourseCreateForm;
  coverImageFile: File | null;
  coverImageUrl?: string | null;
  categoryId?: string | null;
  status: "DRAFT" | "PUBLISHED";
};

export type CreateCourseResponse =
  | {
      success: boolean;
      message: string;
      data?: unknown;
    }
  | {
      error: string;
    };

export type UpdateCourseInput = {
  courseId: string;
  form: CourseCreateForm;
  categoryId?: string | null;
  status?: "DRAFT" | "PUBLISHED";
  dirtyFields?: Partial<Record<keyof CourseCreateForm, unknown>>;
};

export type UpdateCourseResponse =
  | {
      success: boolean;
      message: string;
      data?: unknown;
    }
  | {
      error: string;
    };

const DEFAULT_PAGE_SIZE = 50;
const DEFAULT_COURSE_IMAGE = "/images/event-image1.svg";

export async function getCoursesRequest(
  params: CoursesListParams = {},
): Promise<CoursesListResult> {
  const pageSize = params.pageSize ?? DEFAULT_PAGE_SIZE;
  const fetchAll = params.fetchAll ?? false;
  const initialPage = fetchAll ? 1 : params.page ?? 1;

  try {
    const firstPayload = await fetchCoursesPage(initialPage, pageSize);
    let items = [...firstPayload.data];
    const meta = firstPayload.meta;

    if (fetchAll && meta.pages > initialPage) {
      for (let page = initialPage + 1; page <= meta.pages; page += 1) {
        const nextPayload = await fetchCoursesPage(page, pageSize);
        items = items.concat(nextPayload.data);
      }
    }

    return {
      items: items.map(mapCourseToListItem),
      meta,
    };
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Unable to fetch courses."));
  }
}

export async function getCourseByIdRequest(
  courseId: string,
): Promise<CourseDetail> {
  try {
    const { data } = await bffClient.get<CourseDetailResponse>(
      `/courses/${courseId}`,
    );

    const payload = isCourseDetail(data) ? data : data.data;

    if (isWrappedFailure(data)) {
      throw new Error(data.message || "Unable to fetch course.");
    }

    const course = extractCourseDetail(payload);

    if (!course) {
      throw new Error("Course data is missing.");
    }

    return course;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Unable to fetch course."));
  }
}

export async function createCourseRequest(
  input: CreateCourseInput,
): Promise<CreateCourseResponse> {
  try {
    const body = await buildCreateCourseFormData(input);
    const { data } = await bffClient.post<CreateCourseResponse>(
      "/courses/create",
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    if ("success" in data && data.success === false) {
      throw new Error(data.message || "Unable to create course.");
    }

    if ("error" in data && data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Unable to create course."));
  }
}

export async function updateCourseRequest(
  input: UpdateCourseInput,
): Promise<UpdateCourseResponse> {
  try {
    const payload = buildUpdateCoursePayload(input);
    const { data } = await bffClient.patch<UpdateCourseResponse>(
      `/courses/${input.courseId}`,
      payload,
    );

    if ("success" in data && data.success === false) {
      throw new Error(data.message || "Unable to update course.");
    }

    if ("error" in data && data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Unable to update course."));
  }
}

function extractCourseDetail(payload: unknown): CourseDetail | null {
  if (!payload || typeof payload !== "object") return null;

  if (isCourseDetail(payload)) {
    return payload;
  }

  if ("data" in payload) {
    return extractCourseDetail((payload as { data?: unknown }).data ?? null);
  }

  return null;
}

function isCourseDetail(value: unknown): value is CourseDetail {
  if (!value || typeof value !== "object") return false;
  const candidate = value as { id?: unknown; title?: unknown };
  return typeof candidate.id === "string" && typeof candidate.title === "string";
}

function isWrappedFailure(
  payload: unknown,
): payload is { success: false; message?: string } {
  if (!payload || typeof payload !== "object") return false;
  const candidate = payload as { success?: unknown };
  return candidate.success === false;
}

async function fetchCoursesPage(page: number, pageSize: number) {
  const { data } = await bffClient.get<CoursesListResponse>("/courses", {
    params: {
      page,
      pageSize,
    },
  });

  if (!data.success) {
    throw new Error(data.message || "Unable to fetch courses.");
  }

  return (
    data.data ?? {
      data: [],
      meta: {
        total: 0,
        page,
        limit: pageSize,
        pages: 1,
      },
    }
  );
}

function mapCourseToListItem(course: CoursesApiItem): CourseListItem {
  return {
    id: course.id,
    title: course.title,
    category: resolveCategory(course),
    status: resolveStatus(course),
    enrolledStudents: resolveEnrolledCount(course),
    createdAt: formatCourseDate(
      course.createdAt ?? course.primaryDate ?? course.updatedAt ?? null,
    ),
    image: resolveCoverImage(course),
  };
}

function resolveStatus(course: CoursesApiItem): CourseStatus {
  const raw = course.courseStatus ?? course.status ?? "";
  const normalized = raw.toString().trim().toUpperCase();

  switch (normalized) {
    case "PUBLISHED":
      return "Published";
    case "ARCHIVED":
      return "Archived";
    case "DRAFT":
      return "Draft";
    default:
      return "Draft";
  }
}

function resolveCategory(course: CoursesApiItem) {
  if (typeof course.category === "string" && course.category.trim()) {
    return course.category;
  }

  if (
    course.category &&
    typeof course.category === "object" &&
    course.category.name
  ) {
    return course.category.name;
  }

  if (course.categoryName) {
    return course.categoryName;
  }

  const categories = Array.isArray(course.categories) ? course.categories : [];
  for (const category of categories) {
    if (category?.name) return category.name;
    if (category?.categoryName) return category.categoryName;
    if (category?.category?.name) return category.category.name;
  }

  return "Uncategorized";
}

function resolveCoverImage(course: CoursesApiItem) {
  return course.coverImageUrl || course.image || DEFAULT_COURSE_IMAGE;
}

function resolveEnrolledCount(course: CoursesApiItem) {
  const value =
    course.enrolledStudents ??
    course.enrollmentCount ??
    course.enrolmentCount ??
    course.studentsCount ??
    0;

  return Number.isFinite(value) ? Number(value) : 0;
}

function formatCourseDate(value: string | null) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

async function buildCreateCourseFormData(input: CreateCourseInput) {
  const { form, coverImageFile, coverImageUrl, categoryId, status } = input;
  const body = new FormData();

  body.append("title", form.title.trim());
  body.append("slug", form.slug.trim());
  body.append("shortDescription", form.shortDescription.trim());
  body.append("description", form.description.trim());
  body.append("aboutCourse", form.about.trim());
  body.append("syllabusLink", form.syllabusLink.trim());
  body.append("priceNote", form.priceNote.trim());
  body.append("basePrice", form.price);
  body.append("currency", form.currency);
  body.append("courseStatus", status);
  body.append("isActive", String(form.isActive));
  body.append("depth", form.depth);
  body.append("enrollmentType", form.enrolmentType);
  body.append("repeatAccess", form.repeatAccess);
  body.append("requiresAccount", String(form.requiresAccount));
  body.append("durationWeeks", form.durationWeeks);
  body.append("sessionFrequency", form.sessionFrequency);
  body.append(
    "completionRequireAllModules",
    String(form.certificateRequireAll),
  );

  if (form.certificatePassMark.trim()) {
    body.append("completionRequiredPassMark", form.certificatePassMark.trim());
  }

  const moduleIds = form.certificateModuleIds
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  moduleIds.forEach((value) => body.append("completionRequiredModuleIds", value));

  if (form.earlyBirdEnabled && form.earlyBirdPrice.trim()) {
    body.append("earlyBirdPrice", form.earlyBirdPrice.trim());
  }
  if (form.earlyBirdEnabled && form.earlyBirdUntil.trim()) {
    body.append("earlyBirdAvailableUntil", form.earlyBirdUntil.trim());
  }

  const tags = normalizeStringArray(form.tags);
  tags.forEach((value) => body.append("tags", value));

  const highlights = normalizeStringArray(form.highlights);
  highlights.forEach((value) => body.append("highlights", value));

  const objectives = normalizeStringArray(form.objectives);
  objectives.forEach((value) => body.append("objectives", value));

  const prerequisites = normalizeStringArray(form.prerequisites);
  prerequisites.forEach((value) => body.append("prerequisites", value));

  const audience = normalizeStringArray(form.audience);
  audience.forEach((value) => body.append("targetAudience", value));

  if (form.instructor.trim()) {
    body.append("instructors", form.instructor.trim());
  }

  if (categoryId) {
    body.append("categories", categoryId);
  }

  const resolvedCoverFile =
    coverImageFile ?? (await fetchCoverImageFile(coverImageUrl));

  if (!resolvedCoverFile) {
    throw new Error("Cover image is required.");
  }

  body.append("coverImage", resolvedCoverFile);

  return body;
}

function normalizeStringArray(value: string[]) {
  return value.map((item) => item.trim()).filter(Boolean);
}

function buildUpdateCoursePayload(input: UpdateCourseInput) {
  const { form, categoryId, status, dirtyFields } = input;
  const payload: Record<string, unknown> = {};

  const isDirty = (key: keyof CourseCreateForm) => Boolean(dirtyFields?.[key]);
  const addString = (key: keyof CourseCreateForm, apiKey: string) => {
    if (!isDirty(key)) return;
    const value = form[key];
    if (typeof value !== "string") return;
    const trimmed = value.trim();
    if (trimmed) {
      payload[apiKey] = trimmed;
    }
  };

  const addNumber = (key: keyof CourseCreateForm, apiKey: string) => {
    if (!isDirty(key)) return;
    const raw = form[key];
    const num = Number(raw);
    if (Number.isFinite(num)) {
      payload[apiKey] = num;
    }
  };

  const addArray = (key: keyof CourseCreateForm, apiKey: string) => {
    if (!isDirty(key)) return;
    const raw = form[key];
    if (!Array.isArray(raw)) return;
    const normalized = normalizeStringArray(raw);
    if (normalized.length > 0) {
      payload[apiKey] = normalized;
    }
  };

  addString("title", "title");
  addString("slug", "slug");
  addString("shortDescription", "shortDescription");
  addString("description", "description");
  addString("about", "aboutCourse");
  addString("syllabusLink", "syllabusLink");
  addString("priceNote", "priceNote");
  addNumber("price", "basePrice");

  if (isDirty("currency")) {
    payload.currency = form.currency;
  }

  if (status) {
    payload.courseStatus = status;
  } else if (isDirty("isActive")) {
    payload.courseStatus = undefined;
  }

  if (isDirty("isActive")) {
    payload.isActive = form.isActive;
  }

  if (isDirty("depth")) payload.depth = form.depth;
  if (isDirty("enrolmentType")) payload.enrollmentType = form.enrolmentType;
  if (isDirty("repeatAccess")) payload.repeatAccess = form.repeatAccess;
  if (isDirty("requiresAccount")) payload.requiresAccount = form.requiresAccount;
  addNumber("durationWeeks", "durationWeeks");
  addString("sessionFrequency", "sessionFrequency");

  if (isDirty("certificateRequireAll")) {
    payload.completionRequireAllModules = form.certificateRequireAll;
  }

  if (isDirty("certificatePassMark")) {
    const pass = Number(form.certificatePassMark);
    if (Number.isFinite(pass)) {
      payload.completionRequiredPassMark = pass;
    }
  }

  if (isDirty("certificateModuleIds")) {
    const moduleIds = form.certificateModuleIds
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    if (moduleIds.length > 0) {
      payload.completionRequiredModuleIds = moduleIds;
    }
  }

  if (isDirty("earlyBirdEnabled") || isDirty("earlyBirdPrice")) {
    if (form.earlyBirdEnabled && form.earlyBirdPrice) {
      const early = Number(form.earlyBirdPrice);
      if (Number.isFinite(early)) {
        payload.earlyBirdPrice = early;
      }
    }
  }

  if (isDirty("earlyBirdEnabled") || isDirty("earlyBirdUntil")) {
    if (form.earlyBirdEnabled && form.earlyBirdUntil) {
      payload.earlyBirdAvailableUntil = form.earlyBirdUntil;
    }
  }

  addArray("highlights", "highlights");
  addArray("objectives", "objectives");
  addArray("prerequisites", "prerequisites");
  addArray("audience", "targetAudience");
  addArray("tags", "tags");

  if (isDirty("instructor") && form.instructor.trim()) {
    payload.instructors = [form.instructor.trim()];
  }

  if (isDirty("category") && categoryId) {
    payload.categories = [categoryId];
  }

  return payload;
}

async function fetchCoverImageFile(url?: string | null) {
  if (!url) return null;

  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const blob = await response.blob();
    const name = getFileNameFromUrl(url) ?? "cover-image";
    return new File([blob], name, { type: blob.type || "image/jpeg" });
  } catch {
    return null;
  }
}

function getFileNameFromUrl(value: string) {
  try {
    const parsed = new URL(value);
    const parts = parsed.pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] ?? null;
  } catch {
    const parts = value.split("/").filter(Boolean);
    return parts[parts.length - 1] ?? null;
  }
}
