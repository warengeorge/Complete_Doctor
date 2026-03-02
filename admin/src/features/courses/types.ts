export type CourseStep = {
  id: number;
  label: string;
};

export type CourseStatus = "Ongoing" | "Upcoming" | "Ended";

export type CourseListItem = {
  id: string;
  title: string;
  category: string;
  status: CourseStatus;
  enrolledStudents: number;
  createdAt: string;
  image: string;
};

export type CourseCoverImage = {
  name: string;
  sizeKb: number;
  previewUrl: string;
};

export type CourseModule = {
  id: string;
  title: string;
  description: string;
  subModules: string[];
};

export type CourseContentAsset = {
  name: string;
  sizeKb: number;
};

export type CourseScheduleEntry = {
  id: string;
  moduleId: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
};

export type CourseCreateForm = {
  courseName: string;
  category: string;
  price: string;
  description: string;
  learningOutcomes: string[];
  modules: CourseModule[];
  lectureNotes: CourseContentAsset | null;
  lectureVideos: CourseContentAsset | null;
  studyMaterials: CourseContentAsset | null;
  schedules: CourseScheduleEntry[];
  tagInput: string;
  tags: string[];
  coverImage: CourseCoverImage | null;
};
