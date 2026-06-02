import type { LessonRow, ModuleSubmoduleRow } from "./types";
import type { CourseLessonItem } from "@/features/courses/services/course-modules-api";

export function formatDisplayDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDisplayDateTime(value: string | null | undefined) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function countSubmoduleLessons(value: unknown): number {
  if (
    value &&
    typeof value === "object" &&
    "lessons" in value &&
    Array.isArray((value as { lessons?: unknown }).lessons)
  ) {
    return (value as { lessons: unknown[] }).lessons.length;
  }

  return 0;
}

export function getWeekLabel(weekNumber: number | null | undefined) {
  return typeof weekNumber === "number" ? `Week ${weekNumber}` : "—";
}

export function countLessonsFromSubModules(subModules: unknown[] | undefined) {
  if (!Array.isArray(subModules)) {
    return 0;
  }

  return subModules.reduce<number>(
    (sum, item) => sum + countSubmoduleLessons(item),
    0,
  );
}

export function countLessonsFromModule(value: unknown): number {
  if (!value || typeof value !== "object") {
    return 0;
  }

  const item = value as { lessons?: unknown[]; subModules?: unknown[] };
  if (Array.isArray(item.lessons)) {
    return item.lessons.length;
  }

  return countLessonsFromSubModules(item.subModules);
}

export function getSubmoduleTrackTone(track: string) {
  const normalized = track.trim().toLowerCase();
  if (normalized.includes("live")) return "purple" as const;
  if (normalized.includes("read")) return "teal" as const;
  return "gray" as const;
}

function normalizeLessonType(value: string | null | undefined): LessonRow["type"] {
  const normalized = value?.toUpperCase();
  if (
    normalized === "LIVE" ||
    normalized === "VIDEO" ||
    normalized === "QUIZ" ||
    normalized === "READING" ||
    normalized === "RESOURCE"
  ) {
    return normalized;
  }
  return "RESOURCE";
}

export function formatLessonDuration(durationMinutes: number | null | undefined) {
  if (typeof durationMinutes === "number" && durationMinutes > 0) {
    return `${durationMinutes} min`;
  }
  return "—";
}

export function formatLessonSchedule(isoDate: string | null | undefined) {
  return formatDisplayDateTime(isoDate);
}

function mapLessonPrerequisites(
  value: CourseLessonItem["isPrerequisiteFor"] | undefined,
) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => {
      if (typeof entry === "string") return entry.trim();
      if (!entry || typeof entry !== "object") return "";

      const asObject = entry as {
        prerequisiteId?: string;
        dependentId?: string;
      };

      if (typeof asObject.prerequisiteId === "string") {
        return asObject.prerequisiteId.trim();
      }

      if (typeof asObject.dependentId === "string") {
        return asObject.dependentId.trim();
      }

      return "";
    })
    .filter((entry) => entry.length > 0);
}

export function mapLessonRow(value: CourseLessonItem): LessonRow {
  return {
    id: value.id,
    subModuleId: value.subModuleId,
    title: value.title || "Untitled lesson",
    type: normalizeLessonType(value.type),
    status: value.isPublished ? "Published" : "Draft",
    required: value.isRequired,
    duration: formatLessonDuration(value.durationMinutes),
    scheduled: formatLessonSchedule(value.scheduledAt),
    prerequisites: mapLessonPrerequisites(value.isPrerequisiteFor),
  };
}

export function isCourseLessonItemLike(value: unknown): value is CourseLessonItem {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "string" &&
    "title" in value &&
    typeof value.title === "string"
  );
}

export function mapSubmoduleRow(value: unknown, index: number): ModuleSubmoduleRow {
  const item =
    value && typeof value === "object" ? (value as Record<string, unknown>) : {};

  const id = typeof item.id === "string" && item.id.trim() ? item.id : `sub-${index + 1}`;
  const title =
    typeof item.title === "string" && item.title.trim()
      ? item.title
      : `Submodule ${index + 1}`;
  const description =
    typeof item.description === "string" && item.description.trim()
      ? item.description
      : "No description provided.";
  const track =
    typeof item.track === "string" && item.track.trim()
      ? item.track
      : "General track";
  const statusValue =
    typeof item.status === "string"
      ? item.status.toUpperCase()
      : undefined;
  const status =
    item.isPublished === true || statusValue === "PUBLISHED"
      ? ("Published" as const)
      : ("Draft" as const);
  const required = item.isRequired === true;
  const lessons = Array.isArray(item.lessons)
    ? item.lessons.length
    : typeof item.lessonsCount === "number"
      ? item.lessonsCount
      : 0;
  const duration =
    typeof item.duration === "number" && Number.isFinite(item.duration)
      ? item.duration
      : null;
  const order = typeof item.displayOrder === "number" ? item.displayOrder : index;
  const prerequisites = Array.isArray(item.prerequisites)
    ? item.prerequisites.filter(
        (entry): entry is string => typeof entry === "string" && entry.trim().length > 0,
      )
    : [];

  return {
    id,
    title,
    description,
    track,
    status,
    required,
    lessons,
    duration,
    order,
    prerequisites,
  };
}
