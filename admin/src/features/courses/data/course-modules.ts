export type CourseModuleStatus = "Published" | "Draft";

export type CourseModuleRow = {
  id: string;
  title: string;
  week: string;
  status: CourseModuleStatus;
  required: boolean;
  subModules: number;
  lessons: number;
  prerequisites: string[];
};

export const courseModulesData: CourseModuleRow[] = [
  {
    id: "mod-001",
    title: "Week 1 - Neuroscience foundations",
    week: "Wk 1",
    status: "Published",
    required: true,
    subModules: 2,
    lessons: 5,
    prerequisites: [],
  },
  {
    id: "mod-002",
    title: "Week 2 - Psychology and development",
    week: "Wk 2",
    status: "Published",
    required: true,
    subModules: 2,
    lessons: 5,
    prerequisites: ["mod-001"],
  },
  {
    id: "mod-003",
    title: "Week 3 - Psychopharmacology",
    week: "Wk 3",
    status: "Published",
    required: true,
    subModules: 2,
    lessons: 5,
    prerequisites: ["mod-002"],
  },
  {
    id: "mod-004",
    title: "Week 4 - Classification and diagnosis",
    week: "Wk 4",
    status: "Published",
    required: true,
    subModules: 2,
    lessons: 5,
    prerequisites: ["mod-003"],
  },
  {
    id: "mod-005",
    title: "Week 5 - Research and statistics",
    week: "Wk 5",
    status: "Published",
    required: true,
    subModules: 2,
    lessons: 5,
    prerequisites: ["mod-004"],
  },
  {
    id: "mod-006",
    title: "Week 6 - Revision and mock exams",
    week: "Wk 6",
    status: "Published",
    required: true,
    subModules: 1,
    lessons: 4,
    prerequisites: ["mod-005"],
  },
];
