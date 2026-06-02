import { moduleViews, type ModuleView } from "../course-detail-module-views";
import type { CourseDepth, DeleteConfig, DeleteKind, LessonRow } from "./types";

export function getDeleteConfig(kind: DeleteKind): DeleteConfig {
  if (kind === "module") {
    return {
      title: "Delete this module?",
      body: "You are about to permanently delete Week 1 - Neuroscience foundations (mod-001).",
      warning:
        "This also deletes related submodules, lessons, and learner progress records.",
      cta: "Delete module",
      success: "Module deleted",
      next: "Module list",
    };
  }

  if (kind === "submodule") {
    return {
      title: "Delete this submodule?",
      body: "You are about to permanently delete Neuroanatomy & functional systems (sub-001).",
      warning: "This also deletes all lessons in this submodule.",
      cta: "Delete submodule",
      success: "Submodule deleted",
      next: "SubModule list",
    };
  }

  return {
    title: "Delete this lesson?",
    body: "You are about to permanently delete Live session: cortical anatomy (les-002).",
    warning: "This also deletes learner progress records for this lesson.",
    cta: "Delete lesson",
    success: "Lesson deleted",
    next: "Lesson list",
  };
}

export function lessonTone(type: LessonRow["type"]) {
  if (type === "LIVE") return "purple" as const;
  if (type === "QUIZ") return "coral" as const;
  if (type === "READING") return "teal" as const;
  if (type === "VIDEO") return "amber" as const;
  return "gray" as const;
}

export function normalizeCourseDepth(depth?: string | null): CourseDepth {
  if (depth === "FLAT") return "FLAT";
  if (depth === "MODULES_ONLY") return "MODULES_ONLY";
  return "FULL";
}

export function getAvailableModuleViews(depth: CourseDepth): ModuleView[] {
  if (depth === "FLAT") {
    return [
      "Lesson list",
      "Create lesson",
      "Lesson detail",
      "Edit lesson",
      "Curriculum tree",
      "Delete confirm",
    ];
  }

  if (depth === "MODULES_ONLY") {
    return moduleViews.filter(
      (view) =>
        view !== "SubModule list" &&
        view !== "Create submodule" &&
        view !== "Edit submodule",
    );
  }

  return [...moduleViews];
}

export function getDefaultViewForDepth(depth: CourseDepth): ModuleView {
  if (depth === "FLAT") {
    return "Lesson list";
  }

  return "Module list";
}
