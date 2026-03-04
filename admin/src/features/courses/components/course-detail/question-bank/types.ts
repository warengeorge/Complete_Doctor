import type { CourseQuestion } from "../../../types";

export type QuestionBankState = "empty" | "setup" | "builder";
export type QuestionType = "Multiple choice" | "Yes/No";
export type PassMarkUnit = "%" | "Points";

export type QuestionOption = {
  id: string;
  label: string;
  text: string;
};

export type QuestionMedia = {
  file: File;
  name: string;
  mimeType: string;
  size: number;
};

export type QuestionDraft = {
  id: string;
  type: QuestionType;
  prompt: string;
  options: QuestionOption[];
  media: QuestionMedia | null;
};

export type QuestionBankSettings = {
  title: string;
  description: string;
  durationHours: string;
  durationMinutes: string;
  shuffleQuestions: boolean;
  skipQuestions: boolean;
  passMark: boolean;
  passMarkValue: string;
  passMarkUnit: PassMarkUnit;
};

export type CourseDetailQuestionBankProps = {
  questions: CourseQuestion[];
};
