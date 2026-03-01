export type CourseStep = {
  id: number;
  label: string;
};

export type CourseCoverImage = {
  name: string;
  sizeKb: number;
  previewUrl: string;
};

export type CourseCreateForm = {
  courseName: string;
  category: string;
  price: string;
  description: string;
  learningOutcomes: string[];
  tagInput: string;
  tags: string[];
  coverImage: CourseCoverImage | null;
};
