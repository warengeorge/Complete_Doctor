import type { LessonRow, SubmoduleRow } from "./types";

export const submodules: SubmoduleRow[] = [
  {
    id: "sub-001",
    title: "Neuroanatomy & functional systems",
    track: "Live track",
    status: "Published",
    required: true,
    lessons: 3,
    order: 10,
    prerequisites: [],
  },
  {
    id: "sub-002",
    title: "Neurophysiology & neurotransmitters",
    track: "Reading track",
    status: "Published",
    required: false,
    lessons: 2,
    order: 20,
    prerequisites: ["sub-001"],
  },
];

export const lessons: LessonRow[] = [
  {
    id: "les-001",
    subModuleId: null,
    title: "Pre-session quiz: cortical anatomy",
    type: "QUIZ",
    status: "Published",
    required: true,
    duration: "15 min",
    scheduled: "-",
    prerequisites: [],
  },
  {
    id: "les-002",
    subModuleId: null,
    title: "Live session: cortical anatomy",
    type: "LIVE",
    status: "Published",
    required: true,
    duration: "90 min",
    scheduled: "28 Jul, 19:00",
    prerequisites: ["les-001"],
  },
  {
    id: "les-003",
    subModuleId: null,
    title: "Post-session slides & notes",
    type: "RESOURCE",
    status: "Published",
    required: false,
    duration: "-",
    scheduled: "-",
    prerequisites: ["les-002"],
  },
];
