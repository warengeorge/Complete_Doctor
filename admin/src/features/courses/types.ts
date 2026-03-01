export type CourseStep = {
  id: number;
  label: string;
};

export type CourseCreateForm = {
  courseName: string;
  category: string;
  price: string;
  description: string;
  learningOutcomes: string[];
  tagInput: string;
  tags: string[];
  coverImageName: string | null;
};
