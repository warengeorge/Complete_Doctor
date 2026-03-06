export type ResourceTabKey =
  | "lectureNotes"
  | "lectureVideos"
  | "studyMaterials";

export type ResourceTabItem = {
  id: ResourceTabKey;
  label: string;
  emptyTitle: string;
  emptyDescription: string;
  actionLabel: string;
};

export type CourseResourceItem = {
  id: string;
  title: string;
  description?: string;
};

export type LectureNotesSection = {
  id: string;
  title: string;
  items: CourseResourceItem[];
};

export type LectureVideoItem = {
  id: string;
  title: string;
  thumbnail: string;
};

export const resourceTabItems: ResourceTabItem[] = [
  {
    id: "lectureNotes",
    label: "Lecture notes",
    emptyTitle: "No lecture notes",
    emptyDescription: "You haven't uploaded any lecture notes for this course",
    actionLabel: "Add a note",
  },
  {
    id: "lectureVideos",
    label: "Lecture videos",
    emptyTitle: "No lecture videos",
    emptyDescription: "You haven't uploaded any lecture videos for this course",
    actionLabel: "Add a video",
  },
  {
    id: "studyMaterials",
    label: "Study materials",
    emptyTitle: "No study materials",
    emptyDescription:
      "You haven't uploaded any study materials for this course",
    actionLabel: "Add material",
  },
];

export const resourceModuleOptions = [
  "Introduction to AKT: Exam Strategies & Key Topics",
  "Diagnostic Approach to Common Symptoms",
  "Cardiovascular System: Conditions & Management",
  "General",
];

export const initialLectureNotesSections: LectureNotesSection[] = [
  {
    id: "intro-akt",
    title: "Introduction to AKT: Exam Strategies & Key Topics",
    items: [
      {
        id: "key-subject-areas",
        title: "Key Subject Areas in AKT",
        description: "Core topics covered in the exam",
      },
      {
        id: "essential-guidelines",
        title: "Essential Medical Guidelines to Know",
        description: "Key guidelines and how they are tested",
      },
    ],
  },
  {
    id: "diagnostic-approach",
    title: "Diagnostic Approach to Common Symptoms",
    items: [],
  },
  {
    id: "cardio-management",
    title: "Cardiovascular System: Conditions & Management",
    items: [],
  },
];

export const initialLectureVideos: LectureVideoItem[] = [
  {
    id: "akt-format",
    title: "Breaking Down the AKT: Exam Format & Structure",
    thumbnail: "/images/event-image1.svg",
  },
  {
    id: "question-types",
    title: "Mastering AKT Question Types: Strategies & Techniques",
    thumbnail: "/images/event-image2.svg",
  },
  {
    id: "high-yield-topics",
    title: "High-Yield Topics in the AKT: What You Must Know",
    thumbnail: "/images/event-image1.svg",
  },
];

export const initialStudyMaterials: CourseResourceItem[] = [
  {
    id: "clinical-exam-guide",
    title: "Clinical Examination Guide: Signs, Symptoms & Diagnosis",
  },
  {
    id: "pharmacology-essentials",
    title: "Pharmacology Essentials for Medical Exam",
  },
  {
    id: "cardiology-case-studies",
    title: "Cardiology Case Studies: Diagnosis & Management",
  },
  {
    id: "ecg-interpretation",
    title: "Mastering ECG Interpretation",
  },
];

export function getInitialExpandedLectureNoteSections() {
  return initialLectureNotesSections.reduce(
    (accumulator, section, index) => {
      accumulator[section.id] = index === 0;
      return accumulator;
    },
    {} as Record<string, boolean>,
  );
}
