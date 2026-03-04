"use client";

import { useEffect, useMemo, useState } from "react";

import { emptySettings } from "./constants";
import { CourseDetailQuestionBankBuilderState } from "./course-detail-question-bank-builder-state";
import { CourseDetailQuestionBankEmptyState } from "./course-detail-question-bank-empty-state";
import { CourseDetailQuestionBankSetupState } from "./course-detail-question-bank-setup-state";
import type {
  CourseDetailQuestionBankProps,
  QuestionBankSettings,
  QuestionBankState,
  QuestionDraft,
} from "./types";
import {
  createQuestionDraft,
  getLastUpdatedLabel,
  toQuestionDraft,
} from "./utils";

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
  const [draftQuestions, setDraftQuestions] = useState<QuestionDraft[]>(mappedQuestions);
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

  const updateQuestion = (questionId: string, update: Partial<QuestionDraft>) => {
    setDraftQuestions((prev) =>
      prev.map((question) =>
        question.id === questionId ? { ...question, ...update } : question,
      ),
    );
  };

  const updateOption = (questionId: string, optionId: string, value: string) => {
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

        const filtered = question.options.filter((option) => option.id !== optionId);
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

  const handleSettingChange = (
    key: keyof QuestionBankSettings,
    value: string | boolean,
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const lastUpdatedLabel = useMemo(() => getLastUpdatedLabel(questions), [questions]);

  return (
    <div className="space-y-4 rounded-xl p-2 sm:p-4">
      {view === "empty" ? (
        <CourseDetailQuestionBankEmptyState
          lastUpdatedLabel={lastUpdatedLabel}
          onAddQuestion={() => setView("setup")}
        />
      ) : null}

      {view === "setup" ? (
        <CourseDetailQuestionBankSetupState
          settings={settings}
          onSettingChange={handleSettingChange}
          onContinue={handleContinueFromSetup}
        />
      ) : null}

      {view === "builder" ? (
        <CourseDetailQuestionBankBuilderState
          questions={draftQuestions}
          activeQuestion={activeQuestion}
          activeQuestionIndex={activeQuestionIndex}
          onSelectQuestion={setActiveQuestionId}
          onAddQuestion={addNewQuestion}
          onUpdateQuestion={updateQuestion}
          onUpdateOption={updateOption}
          onRemoveOption={removeOption}
          onAddOption={addOption}
        />
      ) : null}
    </div>
  );
}
