import type { CourseQuestion } from "../../../types";
import { LAST_UPDATED_FALLBACK } from "./constants";
import type { QuestionDraft, QuestionOption, QuestionType } from "./types";

export function createQuestionId(prefix = "question"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createOptionsByType(type: QuestionType, seed: string): QuestionOption[] {
  if (type === "Yes/No") {
    return [
      { id: `option-${seed}-1`, label: "A", text: "Yes" },
      { id: `option-${seed}-2`, label: "B", text: "No" },
    ];
  }

  return createOptionsFromSeed(seed);
}

export function createOptionsFromSeed(seed: string): QuestionOption[] {
  const labels = ["A", "B", "C", "D"];
  return labels.map((label, index) => ({
    id: `option-${seed.length}-${index + 1}`,
    label,
    text: "",
  }));
}

export function createQuestionDraft(
  id: string,
  prompt = "",
  type: QuestionType = "Multiple choice",
): QuestionDraft {
  return {
    id,
    type,
    prompt,
    options: createOptionsByType(type, prompt || id),
  };
}

export function toQuestionDraft(question: CourseQuestion, index: number): QuestionDraft {
  return createQuestionDraft(question.id || `question-${index + 1}`, question.question);
}

export function getPreviewText(prompt: string): string {
  if (!prompt.trim()) {
    return "Type your question";
  }

  const trimmed = prompt.trim();
  if (trimmed.length <= 62) {
    return trimmed;
  }

  return `${trimmed.slice(0, 59)}...`;
}

export function getLastUpdatedLabel(questions: CourseQuestion[]): string {
  if (questions.length === 0) {
    return LAST_UPDATED_FALLBACK;
  }

  const latest = questions
    .map((item) => new Date(item.createdAt))
    .filter((date) => !Number.isNaN(date.getTime()))
    .sort((a, b) => b.getTime() - a.getTime())[0];

  if (!latest) {
    return LAST_UPDATED_FALLBACK;
  }

  return latest.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
