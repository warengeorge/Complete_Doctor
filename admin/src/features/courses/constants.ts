import type { CourseStep } from "./types";

export const courseSteps: CourseStep[] = [
  {
    id: 1,
    label: "Basics",
    description: "Title, slug and categorisation",
  },
  {
    id: 2,
    label: "Structure",
    description: "Curriculum depth, enrolment type and access rules",
  },
  {
    id: 3,
    label: "Content",
    description: "Description, highlights, objectives and audience",
  },
  {
    id: 4,
    label: "Pricing",
    description: "Base price, currency and early-bird offer",
  },
  {
    id: 5,
    label: "Completion",
    description: "Certificate criteria and syllabus link",
  },
  {
    id: 6,
    label: "Review",
    description: "Review all details before saving or publishing",
  },
];

export const courseCategories = [
  "MRCGP AKT",
  "MSRA",
  "PLAB",
  "SCA",
  "Clinical Skills",
];

export const courseInstructors = ["Dr Complete Doctor"];

export const shortDescriptionMaxLength = 300;
