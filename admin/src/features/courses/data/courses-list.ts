import type { CourseListItem } from "../types";

const templates: Omit<CourseListItem, "id">[] = [
  {
    title: "MRCGP AKT Full Prep Course",
    category: "MRCGP AKT",
    status: "Published",
    enrolledStudents: 1500,
    createdAt: "20 Mar 2025",
    image: "/images/event-image1.svg",
  },
  {
    title: "MSRA Success Masterclass",
    category: "MSRA",
    status: "Published",
    enrolledStudents: 60,
    createdAt: "20 Mar 2025",
    image: "/images/event-image2.svg",
  },
  {
    title: "UKMLA PLAB 1 Intensive Review",
    category: "UKMLA / PLAB 1",
    status: "Published",
    enrolledStudents: 1000,
    createdAt: "20 Mar 2025",
    image: "/images/event-image1.svg",
  },
  {
    title: "UKMLA PLAB 2 Clinical Skills & Scenarios",
    category: "UKMLA / PLAB 2",
    status: "Published",
    enrolledStudents: 300,
    createdAt: "20 Mar 2025",
    image: "/images/event-image2.svg",
  },
  {
    title: "SCA Workshop",
    category: "SCA",
    status: "Published",
    enrolledStudents: 230,
    createdAt: "20 Mar 2025",
    image: "/images/event-image1.svg",
  },
  {
    title: "Medical Ethics & Communication Skills",
    category: "MRCGP AKT",
    status: "Archived",
    enrolledStudents: 145,
    createdAt: "20 Mar 2025",
    image: "/images/event-image2.svg",
  },
  {
    title: "MRCGP AKT Full Prep Course",
    category: "MRCGP AKT",
    status: "Published",
    enrolledStudents: 2450,
    createdAt: "20 Mar 2025",
    image: "/images/event-image1.svg",
  },
  {
    title: "Clinical Cases & Applied Knowledge Crash Course",
    category: "MRCGP / MSRA",
    status: "Archived",
    enrolledStudents: 269,
    createdAt: "20 Mar 2025",
    image: "/images/event-image2.svg",
  },
  {
    title: "Past AKT & MSRA Questions Review",
    category: "MRCGP AKT",
    status: "Archived",
    enrolledStudents: 1090,
    createdAt: "20 Mar 2025",
    image: "/images/event-image1.svg",
  },
  {
    title: "MRCGP AKT Full Prep Course",
    category: "MRCGP AKT",
    status: "Archived",
    enrolledStudents: 1234,
    createdAt: "20 Mar 2025",
    image: "/images/event-image2.svg",
  },
  {
    title: "PLAB 2 Clinical Skills Sprint",
    category: "PLAB",
    status: "Draft",
    enrolledStudents: 0,
    createdAt: "20 Mar 2025",
    image: "/images/event-image1.svg",
  },
  {
    title: "Clinical Skills Foundations",
    category: "Clinical Skills",
    status: "Draft",
    enrolledStudents: 0,
    createdAt: "20 Mar 2025",
    image: "/images/event-image2.svg",
  },
];

export const coursesListData: CourseListItem[] = Array.from(
  { length: 150 },
  (_, index) => {
    const template = templates[index % templates.length];
    const round = Math.floor(index / templates.length);
    const title =
      round === 0 ? template.title : `${template.title} ${round + 1}`;

    return {
      id: `course-${index + 1}`,
      ...template,
      title,
    };
  },
);
