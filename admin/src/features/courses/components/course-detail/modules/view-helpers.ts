import type { ModuleSubmoduleRow } from "./types";

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

export function getSubmoduleTrackTone(track: string) {
  const normalized = track.trim().toLowerCase();
  if (normalized.includes("live")) return "purple" as const;
  if (normalized.includes("read")) return "teal" as const;
  return "gray" as const;
}

export function mapSubmoduleRow(value: unknown, index: number): ModuleSubmoduleRow {
  const item =
    value && typeof value === "object" ? (value as Record<string, unknown>) : {};

  const id = typeof item.id === "string" && item.id.trim() ? item.id : `sub-${index + 1}`;
  const title =
    typeof item.title === "string" && item.title.trim()
      ? item.title
      : `Submodule ${index + 1}`;
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
  const order = typeof item.displayOrder === "number" ? item.displayOrder : index;
  const prerequisites = Array.isArray(item.prerequisites)
    ? item.prerequisites.filter(
        (entry): entry is string => typeof entry === "string" && entry.trim().length > 0,
      )
    : [];

  return {
    id,
    title,
    track,
    status,
    required,
    lessons,
    order,
    prerequisites,
  };
}
