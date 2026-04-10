import { bffClient, getApiErrorMessage } from "@/lib/api-client";
import type { CourseListItem, CourseStatus } from "../types";

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
