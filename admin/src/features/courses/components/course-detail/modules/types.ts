import type { ModuleView } from "../course-detail-module-views";

export type DeleteKind = "module" | "submodule" | "lesson";
export type ToastTone = "ok" | "danger";
export type CourseDepth = "FULL" | "MODULES_ONLY" | "FLAT";

export type SubmoduleRow = {
  id: string;
  title: string;
  track: "Live track" | "Reading track";
  status: "Published" | "Draft";
  required: boolean;
  lessons: number;
  order: number;
  prerequisites: string[];
};

export type LessonRow = {
  id: string;
  title: string;
  type: "LIVE" | "VIDEO" | "QUIZ" | "READING" | "RESOURCE";
  status: "Published" | "Draft";
  required: boolean;
  duration: string;
  scheduled: string;
  prerequisites: string[];
};

export type DeleteConfig = {
  title: string;
  body: string;
  warning: string;
  cta: string;
  success: string;
  next: ModuleView;
};

export type ModuleRow = {
  id: string;
  title: string;
  description: string;
  week: string;
  weekNumber: number | null;
  status: "Published" | "Draft";
  required: boolean;
  subModules: number;
  lessons: number;
  prerequisites: string[];
  displayOrder: number;
  duration: number | null;
  createdAt: string;
};

export type ModuleSubmoduleRow = {
  id: string;
  title: string;
  track: string;
  status: "Published" | "Draft";
  required: boolean;
  lessons: number;
  order: number;
  prerequisites: string[];
};
