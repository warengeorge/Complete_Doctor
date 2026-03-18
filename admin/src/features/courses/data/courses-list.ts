import type { CourseListItem } from "../types";

const templates: Omit<CourseListItem, "id">[] = [
  {
    title: "MRCGP AKT Full Prep Course",
    category: "MRCGP AKT",
    status: "Ongoing",
    enrolledStudents: 1500,
    createdAt: "20 Mar 2025",
    image: "/images/event-image1.svg",
  },
  {
    title: "MSRA Success Masterclass",
    category: "MSRA",
    status: "Upcoming",
    enrolledStudents: 60,
    createdAt: "20 Mar 2025",
    image: "/images/event-image2.svg",
  },
  {
    title: "UKMLA PLAB 1 Intensive Review",
    category: "UKMLA / PLAB 1",
    status: "Ongoing",
    enrolledStudents: 1000,
    createdAt: "20 Mar 2025",
    image: "/images/event-image1.svg",
  },
  {
    title: "UKMLA PLAB 2 Clinical Skills & Scenarios",
    category: "UKMLA / PLAB 2",
    status: "Upcoming",
    enrolledStudents: 300,
    createdAt: "20 Mar 2025",
    image: "/images/event-image2.svg",
  },
  {
    title: "SCA Workshop",
    category: "SCA",
    status: "Ongoing",
    enrolledStudents: 230,
    createdAt: "20 Mar 2025",
    image: "/images/event-image1.svg",
  },
  {
    title: "Medical Ethics & Communication Skills",
    category: "MRCGP AKT",
    status: "Ended",
    enrolledStudents: 145,
    createdAt: "20 Mar 2025",
    image: "/images/event-image2.svg",
  },
  {
    title: "MRCGP AKT Full Prep Course",
    category: "MRCGP AKT",
    status: "Upcoming",
    enrolledStudents: 2450,
    createdAt: "20 Mar 2025",
    image: "/images/event-image1.svg",
  },
  {
    title: "Clinical Cases & Applied Knowledge Crash Course",
    category: "MRCGP / MSRA",
    status: "Ended",
    enrolledStudents: 269,
    createdAt: "20 Mar 2025",
    image: "/images/event-image2.svg",
  },
  {
    title: "Past AKT & MSRA Questions Review",
    category: "MRCGP AKT",
    status: "Ended",
    enrolledStudents: 1090,
    createdAt: "20 Mar 2025",
    image: "/images/event-image1.svg",
  },
  {
    title: "MRCGP AKT Full Prep Course",
    category: "MRCGP AKT",
    status: "Ended",
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
