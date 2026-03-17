export type CourseStep = {
  id: number;
  label: string;
  description?: string;
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

export type EnrolledStudent = {
  id: string;
  name: string;
  email: string;
  enrolledDate: string;
  avatar?: string;
  initials: string;
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
  title: string;
  slug: string;
  category: string;
  instructor: string;
  shortDescription: string;
  tagInput: string;
  tags: string[];
  depth: "FULL" | "MODULES_ONLY" | "FLAT";
  enrolmentType: "COHORT" | "OPEN" | "SELF_PACED";
  repeatAccess:
    | "COURSE_DURATION"
    | "UNLIMITED"
    | "ONCE"
    | "EXPIRES_AFTER_30_DAYS";
  durationWeeks: string;
  sessionFrequency: string;
  requiresAccount: boolean;
  isActive: boolean;
  description: string;
  about: string;
  highlights: string[];
  objectives: string[];
  audience: string[];
  prerequisites: string[];
  price: string;
  currency: "GBP" | "USD" | "EUR" | "NGN";
  priceNote: string;
  earlyBirdEnabled: boolean;
  earlyBirdPrice: string;
  earlyBirdUntil: string;
  syllabusLink: string;
  certificateEnabled: boolean;
  certificateRequireAll: boolean;
  certificatePassMark: string;
  certificateModuleIds: string;
};

export type CourseEvent = {
  id: string;
  image: string;
  title: string;
  date: string;
  time: string;
  status: string;
  venue: string;
  link?: string;
};

export type CourseQuestion = {
  id: string;
  question: string;
  createdAt: string;
};
