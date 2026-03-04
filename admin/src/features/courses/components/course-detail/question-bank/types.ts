import type { CourseQuestion } from "../../../types";

export type QuestionBankState = "empty" | "setup" | "builder";
export type QuestionType = "Multiple choice";

export type QuestionOption = {
  id: string;
  label: string;
  text: string;
};

export type QuestionDraft = {
  id: string;
  type: QuestionType;
  prompt: string;
  options: QuestionOption[];
};

export type QuestionBankSettings = {
  title: string;
  description: string;
  durationHours: string;
  durationMinutes: string;
  shuffleQuestions: boolean;
  skipQuestions: boolean;
  passMark: boolean;
};

export type CourseDetailQuestionBankProps = {
  questions: CourseQuestion[];
};
