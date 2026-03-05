import type { StudentListItem } from "../types";

const studentsSeed: Omit<StudentListItem, "id">[] = [
  {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@email.com",
    enrolledCourses: 5,
    dateRegistered: "20 Mar 2025",
    avatar: { type: "initials", initials: "SJ" },
  },
  {
    name: "Sarah Thompson",
    email: "sarah.johnson@email.com",
    enrolledCourses: 2,
    dateRegistered: "20 Mar 2025",
    avatar: { type: "illustration" },
  },
  {
    name: "John Michaels",
    email: "sarah.johnson@email.com",
    enrolledCourses: 4,
    dateRegistered: "20 Mar 2025",
    avatar: { type: "initials", initials: "JM" },
  },
  {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@email.com",
    enrolledCourses: 8,
    dateRegistered: "20 Mar 2025",
    avatar: { type: "illustration" },
  },
  {
    name: "Emily Carter",
    email: "sarah.johnson@email.com",
    enrolledCourses: 1,
    dateRegistered: "20 Mar 2025",
    avatar: { type: "initials", initials: "EC" },
  },
  {
    name: "Yusuf Kamal",
    email: "sarah.johnson@email.com",
    enrolledCourses: 2,
    dateRegistered: "20 Mar 2025",
    avatar: { type: "illustration" },
  },
  {
    name: "James Allen",
    email: "sarah.johnson@email.com",
    enrolledCourses: 3,
    dateRegistered: "20 Mar 2025",
    avatar: { type: "illustration" },
  },
  {
    name: "Aisha Bello",
    email: "sarah.johnson@email.com",
    enrolledCourses: 4,
    dateRegistered: "20 Mar 2025",
    avatar: { type: "initials", initials: "AB" },
  },
  {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@email.com",
    enrolledCourses: 8,
    dateRegistered: "20 Mar 2025",
    avatar: { type: "initials", initials: "SJ" },
  },
  {
    name: "Zainab Mohammed",
    email: "sarah.johnson@email.com",
    enrolledCourses: 1,
    dateRegistered: "20 Mar 2025",
    avatar: { type: "initials", initials: "ZM" },
  },
];

const totalStudents = 150;

export const studentsListData: StudentListItem[] = Array.from(
  { length: totalStudents },
  (_, index) => {
    const seed = studentsSeed[index % studentsSeed.length];

    return {
      ...seed,
      id: `student-${index + 1}`,
      avatar:
        seed.avatar.type === "initials"
          ? { type: "initials", initials: seed.avatar.initials }
          : { type: "illustration" },
    };
  },
);
