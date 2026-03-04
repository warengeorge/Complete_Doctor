"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  CircleHelp,
  FastForward,
  GripVertical,
  ListChecks,
  MoreHorizontal,
  MoreVertical,
  Plus,
  Shuffle,
  Upload,
  CopyCheck,
} from "lucide-react";

import { Switch } from "@/components/ui/switch";
import type { CourseQuestion } from "../../types";

type QuestionBankState = "empty" | "setup" | "builder";
type QuestionType = "Multiple choice";

type QuestionOption = {
  id: string;
  label: string;
  text: string;
};

type QuestionDraft = {
  id: string;
  type: QuestionType;
  prompt: string;
  options: QuestionOption[];
};

type QuestionBankSettings = {
  title: string;
  description: string;
  durationHours: string;
  durationMinutes: string;
  shuffleQuestions: boolean;
  skipQuestions: boolean;
  passMark: boolean;
};

const DESCRIPTION_LIMIT = 400;
const LAST_UPDATED_FALLBACK = "March 12, 2025";

const emptySettings: QuestionBankSettings = {
  title: "",
  description: "",
  durationHours: "",
  durationMinutes: "",
  shuffleQuestions: false,
  skipQuestions: false,
  passMark: false,
};

function createOptionsFromPrompt(prompt: string): QuestionOption[] {
  const labels = ["A", "B", "C", "D"];
  return labels.map((label, index) => ({
    id: `option-${prompt.length}-${index + 1}`,
    label,
    text: "",
  }));
}

function createQuestionDraft(id: string, prompt = ""): QuestionDraft {
  return {
    id,
    type: "Multiple choice",
    prompt,
    options: createOptionsFromPrompt(prompt || id),
  };
}

function toQuestionDraft(
  question: CourseQuestion,
  index: number,
): QuestionDraft {
  return createQuestionDraft(
    question.id || `question-${index + 1}`,
    question.question,
  );
}

function getPreviewText(prompt: string): string {
  if (!prompt.trim()) {
    return "Type your question";
  }

  const trimmed = prompt.trim();
  if (trimmed.length <= 62) {
    return trimmed;
  }

  return `${trimmed.slice(0, 59)}...`;
}

function getLastUpdatedLabel(questions: CourseQuestion[]): string {
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

export type CourseDetailQuestionBankProps = {
  questions: CourseQuestion[];
};

export function CourseDetailQuestionBank({
  questions,
}: CourseDetailQuestionBankProps) {
  const mappedQuestions = useMemo(
    () => questions.map((item, index) => toQuestionDraft(item, index)),
    [questions],
  );

  const [view, setView] = useState<QuestionBankState>(
    mappedQuestions.length > 0 ? "builder" : "empty",
  );
  const [settings, setSettings] = useState<QuestionBankSettings>(emptySettings);
  const [draftQuestions, setDraftQuestions] =
    useState<QuestionDraft[]>(mappedQuestions);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(
    mappedQuestions[0]?.id ?? null,
  );

  useEffect(() => {
    setDraftQuestions(mappedQuestions);
    setActiveQuestionId(mappedQuestions[0]?.id ?? null);
    setView(mappedQuestions.length > 0 ? "builder" : "empty");
  }, [mappedQuestions]);

  const activeQuestion =
    draftQuestions.find((question) => question.id === activeQuestionId) ??
    draftQuestions[0] ??
    null;

  const activeQuestionIndex = activeQuestion
    ? draftQuestions.findIndex((item) => item.id === activeQuestion.id)
    : -1;

  const addNewQuestion = () => {
    setDraftQuestions((prev) => {
      const nextQuestion = createQuestionDraft(`question-${prev.length + 1}`);
      setActiveQuestionId(nextQuestion.id);
      return [...prev, nextQuestion];
    });
  };

  const handleContinueFromSetup = () => {
    if (draftQuestions.length === 0) {
      const starter = createQuestionDraft(
        "question-1",
        "A 45-year-old male with no history of cardiovascular disease presents with chest discomfort...",
      );
      setDraftQuestions([starter]);
      setActiveQuestionId(starter.id);
    }

    setView("builder");
  };

  const updateQuestion = (
    questionId: string,
    update: Partial<QuestionDraft>,
  ) => {
    setDraftQuestions((prev) =>
      prev.map((question) =>
        question.id === questionId ? { ...question, ...update } : question,
      ),
    );
  };

  const updateOption = (
    questionId: string,
    optionId: string,
    value: string,
  ) => {
    setDraftQuestions((prev) =>
      prev.map((question) => {
        if (question.id !== questionId) {
          return question;
        }

        return {
          ...question,
          options: question.options.map((option) =>
            option.id === optionId ? { ...option, text: value } : option,
          ),
        };
      }),
    );
  };

  const removeOption = (questionId: string, optionId: string) => {
    setDraftQuestions((prev) =>
      prev.map((question) => {
        if (question.id !== questionId || question.options.length <= 2) {
          return question;
        }

        const filtered = question.options.filter(
          (option) => option.id !== optionId,
        );
        const relabeled = filtered.map((option, index) => ({
          ...option,
          label: String.fromCharCode(65 + index),
        }));

        return {
          ...question,
          options: relabeled,
        };
      }),
    );
  };

  const addOption = (questionId: string) => {
    setDraftQuestions((prev) =>
      prev.map((question) => {
        if (question.id !== questionId) {
          return question;
        }

        const nextIndex = question.options.length;
        return {
          ...question,
          options: [
            ...question.options,
            {
              id: `${question.id}-option-${nextIndex + 1}`,
              label: String.fromCharCode(65 + nextIndex),
              text: "",
            },
          ],
        };
      }),
    );
  };

  const lastUpdatedLabel = useMemo(
    () => getLastUpdatedLabel(questions),
    [questions],
  );

  return (
    <div className="space-y-4 rounded-x p-2 sm:p-4">
      {view === "empty" ? (
        <>
          <div className="min-h-[72vh] rounded-lg border border-[#E5E5E8]">
            <div className="border-b border-[#ECECEC] px-5 py-4 sm:px-6 bg-white">
              <h2 className="text-[15px] font-semibold text-[#151515]">
                Question Bank
              </h2>
            </div>

            <div className="flex min-h-[58vh] flex-col items-center justify-center gap-3 px-6 text-center bg-white">
              <h3 className="text-[15px] font-semibold text-[#151515]">
                No question bank yet
              </h3>
              <p className="text-[13px] text-[#737373] font-medium">
                No questions have been added to this course yet
              </p>
              <button
                type="button"
                onClick={() => setView("setup")}
                className="mt-3 rounded-md bg-[#007AFF] px-6 py-3 text-[12px] font-semibold text-white transition-colors hover:bg-[#006DE0]"
              >
                Add a question
              </button>
            </div>
          </div>

          <p className="text-right text-[12px] text-[#646464]">
            Last updated: {lastUpdatedLabel}
          </p>
        </>
      ) : null}

      {view === "setup" ? (
        <>
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
            <div className="rounded-lg border border-[#ECECEC] bg-white">
              <div className="border-b border-[#ECECEC] px-5 py-4 sm:px-6">
                <h2 className="text-[15px] font-semibold text-[#151515]">
                  Overview
                </h2>
              </div>

              <div className="space-y-7 px-5 py-6 sm:px-6">
                <div className="space-y-3">
                  <label
                    htmlFor="question-bank-title"
                    className="block text-[14px] font-semibold text-[#313131]"
                  >
                    Title
                  </label>
                  <input
                    id="question-bank-title"
                    value={settings.title}
                    onChange={(event) =>
                      setSettings((prev) => ({
                        ...prev,
                        title: event.target.value,
                      }))
                    }
                    placeholder="Add a name/title"
                    className="h-12 w-full rounded-xl border border-[#ECECEC] bg-[#FAFAFACC] px-4 text-[13px] text-[#B5B5B5] outline-none placeholder:text-[#9D9DA2] focus:border-[#007AFF]"
                  />
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="question-bank-description"
                    className="block text-[14px] font-semibold text-[#313131]"
                  >
                    Description
                  </label>
                  <textarea
                    id="question-bank-description"
                    value={settings.description}
                    maxLength={DESCRIPTION_LIMIT}
                    onChange={(event) =>
                      setSettings((prev) => ({
                        ...prev,
                        description: event.target.value,
                      }))
                    }
                    placeholder="Describe the test"
                    className="min-h-80 w-full rounded-xl border border-[#ECECEC] bg-[#FAFAFACC] px-4 py-3 text-[13px] text-[#B5B5B5] outline-none placeholder:text-[#9D9DA2] focus:border-[#007AFF]"
                  />
                  <p className="text-right text-[11px] text-[#737373]">
                    Maximum character limit: {DESCRIPTION_LIMIT}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-[#ECECEC] bg-white">
              <div className="border-b border-[#ECECEC] px-5 py-4 sm:px-6">
                <h2 className="text-[15px] font-semibold text-[#151515]">
                  Settings
                </h2>
              </div>

              <div className="space-y-6 px-5 py-6 sm:px-6">
                <div className="space-y-3">
                  <h3 className="text-[13px] font-semibold text-[#151515]">
                    Duration
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <input
                        type="number"
                        value={settings.durationHours}
                        onChange={(event) =>
                          setSettings((prev) => ({
                            ...prev,
                            durationHours: event.target.value,
                          }))
                        }
                        className="h-12 w-full rounded-xl border border-[#DCDCE0] bg-[#FAFAFACC] px-4 pr-12 text-[14px] text-[#1C1C1E] outline-none focus:border-[#007AFF]"
                      />
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[14px] text-[#6A6A6E]">
                        hrs
                      </span>
                    </div>

                    <div className="relative">
                      <input
                        type="number"
                        value={settings.durationMinutes}
                        onChange={(event) =>
                          setSettings((prev) => ({
                            ...prev,
                            durationMinutes: event.target.value,
                          }))
                        }
                        className="h-12 w-full rounded-xl border border-[#ECECEC] bg-[#FAFAFACC] px-4 pr-12 text-[14px] text-[#1C1C1E] outline-none focus:border-[#007AFF]"
                      />
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[14px] text-[#6A6A6E]">
                        min
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 border-t border-[#ECECEC] pt-5">
                  <div className="flex items-center justify-between rounded-xl border border-[#ECECEC] bg-[#FAFAFACC] px-4 py-4">
                    <div className="flex items-center gap-3">
                      <Shuffle className="h-5 w-5 text-[#2E2E30]" />
                      <div>
                        <p className="text-[14px] font-semibold text-[#0C0C0C]">
                          Shuffle questions
                        </p>
                        <p className="text-[12px] text-[#646464]">
                          Mix up the question order each time the quiz is taken.
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.shuffleQuestions}
                      onCheckedChange={(checked) =>
                        setSettings((prev) => ({
                          ...prev,
                          shuffleQuestions: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-[#ECECEC] bg-[#FAFAFACC] px-4 py-4">
                    <div className="flex items-center gap-3">
                      <FastForward className="h-5 w-5 text-[#2E2E30]" />
                      <div>
                        <p className="text-[14px] font-semibold text-[#0C0C0C]">
                          Skip questions
                        </p>
                        <p className="text-[12px] text-[#646464]">
                          Let users skip questions and come back to them later.
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.skipQuestions}
                      onCheckedChange={(checked) =>
                        setSettings((prev) => ({
                          ...prev,
                          skipQuestions: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-[#ECECEC] bg-[#FAFAFACC] px-4 py-4">
                    <div className="flex items-center gap-3">
                      <BadgeCheck className="h-5 w-5 text-[#2E2E30]" />
                      <div>
                        <p className="text-[14px] font-semibold text-[#0C0C0C]">
                          Pass mark
                        </p>
                        <p className="text-[12px] text-[#646464]">
                          Set the score students need to pass this quiz.
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.passMark}
                      onCheckedChange={(checked) =>
                        setSettings((prev) => ({ ...prev, passMark: checked }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleContinueFromSetup}
              className="rounded-md bg-[#007AFF] px-6 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#006DE0]"
            >
              Save &amp; continue
            </button>
          </div>
        </>
      ) : null}

      {view === "builder" ? (
        <div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="min-h-[72vh] rounded-lg border border-[#ECECEC] bg-white">
            <div className="flex items-center justify-between border-b border-[#ECECEC] px-5 py-4">
              <h2 className="text-[15px] font-semibold text-[#151515]">
                Questions ({draftQuestions.length})
              </h2>
              <button
                type="button"
                onClick={addNewQuestion}
                className="inline-flex h-[31.57px] w-[31.57px] items-center justify-center rounded-md border border-[#ECECEC] text-[#313131] transition-colors hover:bg-[#ECECEF]"
                aria-label="Add question"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 p-4 bg-[FAFAFACC]">
              {draftQuestions.map((question, index) => {
                const isActive = activeQuestion?.id === question.id;

                return (
                  <button
                    key={question.id}
                    type="button"
                    onClick={() => setActiveQuestionId(question.id)}
                    className={`w-full rounded-xl border px-3 py-3 text-left transition-colors ${
                      isActive
                        ? "border-[#D3D3D7] bg-[#F3F3F4]"
                        : "border-[#E2E2E5] bg-[#F8F8F8] hover:bg-[#F1F1F3]"
                    }`}
                  >
                    <p className="text-[9px] font-medium uppercase tracking-wide text-[#737373]">
                      Question {index + 1}
                    </p>
                    <p className="mt-2 line-clamp-2 text-[14px] font-semibold text-[#313131]">
                      {getPreviewText(question.prompt)}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-[11.38px] text-[#313131]">
                      <span className="inline-flex items-center gap-2">
                        <CopyCheck className="h-4 w-4" />
                        Multiple choice
                      </span>
                      <MoreHorizontal className="h-4 w-4 text-[#313131]" />
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="rounded-lg border border-[#ECECEC] bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ECECEC] px-5 py-4 sm:px-6">
              <h2 className="text-[15px] font-semibold text-[#151515]">
                Question Bank
              </h2>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-[#ECECEC] px-4 py-2 text-[13px] font-semibold text-[#151515] transition-colors hover:bg-[#F0F0F2]"
              >
                <CircleHelp className="h-4 w-4" />
                Import questions
              </button>
            </div>

            <div className="p-4 sm:p-5">
              {activeQuestion ? (
                <div className="rounded-xl border border-[#ECECEC]">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ECECEC] bg-[#007AFF05] px-4 py-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-[15px] font-semibold text-[#151515]">
                        Question {activeQuestionIndex + 1}
                      </h3>

                      <div className="flex items-center justify-center gap-2 border border-[#ECECEC] bg-white px-3 text-[11px] text-[#313131] h-10 rounded-xl">
                        <CopyCheck className="h-4 w-4" />
                        <select
                          value={activeQuestion.type}
                          onChange={(event) =>
                            updateQuestion(activeQuestion.id, {
                              type: event.target.value as QuestionType,
                            })
                          }
                          className="font-medium outline-none"
                        >
                          <option value="Multiple choice">
                            Multiple choice
                          </option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="rounded-md p-2 text-[#313131] hover:bg-[#E3E4E7]"
                      aria-label="Question menu"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="space-y-6 p-4 sm:p-5">
                    <div className="space-y-2">
                      <label
                        htmlFor="question-prompt"
                        className="block text-[14px] font-semibold text-[##313131]"
                      >
                        Question
                      </label>
                      <input
                        id="question-prompt"
                        value={activeQuestion.prompt}
                        onChange={(event) =>
                          updateQuestion(activeQuestion.id, {
                            prompt: event.target.value,
                          })
                        }
                        className="h-12 w-full rounded-xl border border-[#ECECEC] bg-[#FAFAFACC] px-4 text-[14px] text-[#313131] outline-none focus:border-[#007AFF]"
                      />
                    </div>

                    <div className="space-y-2">
                      <p className="text-[14px] font-semibold text-[#2C2C2F]">
                        Media{" "}
                        <span className="font-normal text-[#66666A]">
                          (optional)
                        </span>
                      </p>
                      <button
                        type="button"
                        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#ECECEC] bg-[#FAFAFACC] text-[14px] text-[#2F2F33] transition-colors hover:bg-[#F1F1F3]"
                      >
                        <Upload className="h-4 w-4" />
                        Upload an image or video
                      </button>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-[14px] font-semibold text-[#2C2C2F]">
                        Options
                      </h4>

                      {activeQuestion.options.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center gap-3 rounded-xl border border-[#ECECEC] bg-[#FAFAFACC] px-3 py-2"
                        >
                          <GripVertical className="h-4 w-4 shrink-0 text-[#84848A]" />
                          <span className="w-4 text-[18px] font-semibold text-[#0056D6]">
                            {option.label}
                          </span>
                          <input
                            value={option.text}
                            onChange={(event) =>
                              updateOption(
                                activeQuestion.id,
                                option.id,
                                event.target.value,
                              )
                            }
                            placeholder="Type answer here"
                            className="h-10 flex-1 bg-transparent text-[14px] text-[#313131] outline-none placeholder:text-[#A0A0A5]"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              removeOption(activeQuestion.id, option.id)
                            }
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#E3E3E7] text-[20px] text-[#2D2D30] transition-colors hover:bg-[#D7D7DB]"
                            aria-label="Remove option"
                          >
                            ×
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => addOption(activeQuestion.id)}
                        className="flex h-12 w-full items-center gap-3 rounded-xl border border-[#ECECEC] bg-[#] px-4 text-[13px] font-semibold text-[#313131] transition-colors hover:bg-[#F0F0F3]"
                      >
                        <Plus className="h-4 w-4" />
                        Add another option
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-[#ECECEC] px-4 py-14 text-center text-[14px] text-[#6A6A6E]">
                  No question selected.
                </div>
              )}

              <div className="mt-5 flex flex-wrap justify-end gap-3">
                <button
                  type="button"
                  className="rounded-sm border border-[#ECECEC] bg-transparent px-6 py-2 text-[14px] font-semibold text-[#1E1E21] transition-colors hover:bg-[#EFEFF2]"
                >
                  Save &amp; continue
                </button>
                <button
                  type="button"
                  className="rounded-sm bg-[#007AFF] px-6 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-[#006DE0]"
                >
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
