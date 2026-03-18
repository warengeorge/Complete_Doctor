import type { CourseCreateForm } from "../types";

export type CourseDraft = {
  id: string;
  form: Partial<CourseCreateForm>;
};

export const courseDraftsData: CourseDraft[] = [
  {
    id: "course-11",
    form: {
      title: "PLAB 2 Clinical Skills Sprint",
      slug: "plab-2-clinical-skills-sprint",
      category: "PLAB",
      instructor: "Dr Complete Doctor",
      shortDescription:
        "An intensive, hands-on preparation sprint for PLAB 2 clinical skills.",
      tagInput: "",
      tags: ["PLAB 2", "Clinical skills", "OSCE"],
      depth: "FULL",
      enrolmentType: "COHORT",
      repeatAccess: "COURSE_DURATION",
      durationWeeks: "6",
      sessionFrequency: "Weekly",
      requiresAccount: true,
      isActive: false,
      description:
        "Practice stations, examiner-style feedback, and guided checklists to build confidence for PLAB 2.",
      about:
        "Built for doctors who want structured, step-by-step rehearsal with expert guidance.",
      highlights: ["6 live OSCE-style practice sessions", "Feedback checklists"],
      objectives: [
        "Demonstrate safe and structured patient interactions",
        "Master common PLAB 2 station formats",
      ],
      audience: ["PLAB 2 candidates", "International medical graduates"],
      prerequisites: ["Completed PLAB 1"],
      currency: "GBP",
      priceNote: "",
      earlyBirdEnabled: false,
      syllabusLink: "",
      certificateEnabled: false,
      certificateRequireAll: false,
      certificatePassMark: "",
      certificateModuleIds: "",
    },
  },
  {
    id: "course-12",
    form: {
      title: "Clinical Skills Foundations",
      slug: "clinical-skills-foundations",
      category: "Clinical Skills",
      instructor: "Dr Complete Doctor",
      shortDescription:
        "Build confidence in core clinical skills with structured practice and feedback.",
      tags: ["Clinical skills", "Foundations"],
      depth: "MODULES_ONLY",
      enrolmentType: "OPEN",
      repeatAccess: "UNLIMITED",
      durationWeeks: "4",
      sessionFrequency: "Bi-weekly",
      requiresAccount: true,
      isActive: false,
      description:
        "Cover history taking, focused examinations, and clinical reasoning with guided practice.",
      about:
        "A foundation programme for early-stage clinicians who want a clear, supportive path.",
      highlights: ["Focused exam walkthroughs", "Guided practice templates"],
      objectives: [
        "Conduct structured histories",
        "Perform focused examinations confidently",
      ],
      audience: ["Early-stage clinicians", "Clinical skills refreshers"],
      prerequisites: ["Basic clinical exposure"],
      currency: "GBP",
      priceNote: "",
      earlyBirdEnabled: false,
      syllabusLink: "",
      certificateEnabled: false,
      certificateRequireAll: false,
      certificatePassMark: "",
      certificateModuleIds: "",
    },
  },
];
