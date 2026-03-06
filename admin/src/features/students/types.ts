export type StudentAvatar =
  | {
      type: "initials";
      initials: string;
    }
  | {
      type: "illustration";
    };

export type StudentListItem = {
  id: string;
  name: string;
  email: string;
  enrolledCourses: number;
  dateRegistered: string;
  avatar: StudentAvatar;
};
