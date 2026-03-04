"use client";

import { useEffect, useMemo, useState } from "react";

import { emptySettings } from "./constants";
import { CourseDetailQuestionBankBuilderState } from "./course-detail-question-bank-builder-state";
import { CourseDetailQuestionBankEmptyState } from "./course-detail-question-bank-empty-state";
import { CourseDetailQuestionBankPublishedState } from "./course-detail-question-bank-published-state";
import { CourseDetailQuestionBankSetupState } from "./course-detail-question-bank-setup-state";
import type {
  CourseDetailQuestionBankProps,
  QuestionBankSettings,
  QuestionBankState,
  QuestionDraft,
  QuestionType,
} from "./types";
import {
  createOptionsByType,
  createQuestionId,
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
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(
    mappedQuestions[0]?.id ?? null,
  );

  useEffect(() => {
    setDraftQuestions(mappedQuestions);
    setActiveQuestionId(mappedQuestions[0]?.id ?? null);
    setExpandedQuestionId(mappedQuestions[0]?.id ?? null);
    setView(mappedQuestions.length > 0 ? "builder" : "empty");
  }, [mappedQuestions]);

  const addNewQuestion = () => {
    setDraftQuestions((prev) => {
      const nextQuestion = createQuestionDraft(createQuestionId("question"));
      setActiveQuestionId(nextQuestion.id);
      setExpandedQuestionId(nextQuestion.id);
      return [...prev, nextQuestion];
    });
  };

  const handleSaveAndContinue = () => {
    setDraftQuestions((prev) => {
      const nextQuestion = createQuestionDraft(createQuestionId("question"));
      setActiveQuestionId(nextQuestion.id);
      setExpandedQuestionId(nextQuestion.id);
      return [...prev, nextQuestion];
    });
  };

  const handleContinueFromSetup = () => {
    if (draftQuestions.length === 0) {
      const starter = createQuestionDraft(
        createQuestionId("question"),
        "A 45-year-old male with no history of cardiovascular disease presents with chest discomfort...",
      );
      setDraftQuestions([starter]);
      setActiveQuestionId(starter.id);
      setExpandedQuestionId(starter.id);
    }

    setView("builder");
  };

  const handlePublish = () => {
    setView("published");
  };

  const handleEditPublished = () => {
    const fallback = draftQuestions[0];
    if (fallback) {
      setActiveQuestionId(fallback.id);
      setExpandedQuestionId(fallback.id);
    }
    setView("builder");
  };

  const handleChangeQuestionType = (questionId: string, type: QuestionType) => {
    setDraftQuestions((prev) =>
      prev.map((question) => {
        if (question.id !== questionId || question.type === type) {
          return question;
        }

        return {
          ...question,
          type,
          options: createOptionsByType(type, question.id),
        };
      }),
    );
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

  const updateQuestionMedia = (questionId: string, file: File | null) => {
    setDraftQuestions((prev) =>
      prev.map((question) => {
        if (question.id !== questionId) {
          return question;
        }

        if (!file) {
          return {
            ...question,
            media: null,
          };
        }

        return {
          ...question,
          media: {
            file,
            name: file.name,
            mimeType: file.type,
            size: file.size,
          },
        };
      }),
    );
  };

  const duplicateQuestion = (questionId: string) => {
    setDraftQuestions((prev) => {
      const sourceIndex = prev.findIndex((question) => question.id === questionId);
      if (sourceIndex === -1) return prev;

      const sourceQuestion = prev[sourceIndex];
      const duplicatedId = createQuestionId("question");
      const duplicated: QuestionDraft = {
        ...sourceQuestion,
        id: duplicatedId,
        options: sourceQuestion.options.map((option, index) => ({
          ...option,
          id: `${duplicatedId}-option-${index + 1}`,
        })),
        media: sourceQuestion.media ? { ...sourceQuestion.media } : null,
      };

      const updated = [...prev];
      updated.splice(sourceIndex + 1, 0, duplicated);
      setActiveQuestionId(duplicatedId);
      setExpandedQuestionId(duplicatedId);
      return updated;
    });
  };

  const deleteQuestion = (questionId: string) => {
    setDraftQuestions((prev) => {
      if (prev.length <= 1) {
        const replacement = createQuestionDraft(createQuestionId("question"));
        setActiveQuestionId(replacement.id);
        setExpandedQuestionId(replacement.id);
        return [replacement];
      }

      const sourceIndex = prev.findIndex((question) => question.id === questionId);
      if (sourceIndex === -1) return prev;

      const updated = prev.filter((question) => question.id !== questionId);
      const fallbackIndex = Math.max(0, sourceIndex - 1);
      const fallback = updated[fallbackIndex] ?? updated[0];
      setActiveQuestionId(fallback.id);
      setExpandedQuestionId(fallback.id);
      return updated;
    });
  };

  const toggleQuestionExpansion = (questionId: string) => {
    setExpandedQuestionId((prev) => (prev === questionId ? null : questionId));
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
          activeQuestionId={activeQuestionId}
          expandedQuestionId={expandedQuestionId}
          onSelectQuestion={(questionId) => {
            setActiveQuestionId(questionId);
            setExpandedQuestionId(questionId);
          }}
          onToggleExpand={toggleQuestionExpansion}
          onAddQuestion={addNewQuestion}
          onSaveAndContinue={handleSaveAndContinue}
          onPublish={handlePublish}
          onDuplicateQuestion={duplicateQuestion}
          onDeleteQuestion={deleteQuestion}
          onChangeQuestionType={handleChangeQuestionType}
          onUpdateQuestion={updateQuestion}
          onUpdateOption={updateOption}
          onRemoveOption={removeOption}
          onAddOption={addOption}
          onChangeMedia={updateQuestionMedia}
        />
      ) : null}

      {view === "published" ? (
        <CourseDetailQuestionBankPublishedState
          settings={settings}
          questions={draftQuestions}
          onEdit={handleEditPublished}
        />
      ) : null}
    </div>
  );
}
