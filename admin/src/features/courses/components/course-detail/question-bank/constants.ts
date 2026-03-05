import type { QuestionBankSettings } from "./types";

export const DESCRIPTION_LIMIT = 400;
export const LAST_UPDATED_FALLBACK = "March 12, 2025";

export const emptySettings: QuestionBankSettings = {
  title: "",
  description: "",
  durationHours: "",
  durationMinutes: "",
  shuffleQuestions: false,
  skipQuestions: false,
  passMark: false,
  passMarkValue: "",
  passMarkUnit: "%",
};
