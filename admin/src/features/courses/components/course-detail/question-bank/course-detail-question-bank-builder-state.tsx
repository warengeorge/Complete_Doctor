import {
  CircleHelp,
  CopyCheck,
  GripVertical,
  MoreHorizontal,
  MoreVertical,
  Plus,
  Upload,
} from "lucide-react";

import { getPreviewText } from "./utils";
import type { QuestionDraft, QuestionType } from "./types";

type CourseDetailQuestionBankBuilderStateProps = {
  questions: QuestionDraft[];
  activeQuestion: QuestionDraft | null;
  activeQuestionIndex: number;
  onSelectQuestion: (questionId: string) => void;
  onAddQuestion: () => void;
  onUpdateQuestion: (questionId: string, update: Partial<QuestionDraft>) => void;
  onUpdateOption: (questionId: string, optionId: string, value: string) => void;
  onRemoveOption: (questionId: string, optionId: string) => void;
  onAddOption: (questionId: string) => void;
};

export function CourseDetailQuestionBankBuilderState({
  questions,
  activeQuestion,
  activeQuestionIndex,
  onSelectQuestion,
  onAddQuestion,
  onUpdateQuestion,
  onUpdateOption,
  onRemoveOption,
  onAddOption,
}: CourseDetailQuestionBankBuilderStateProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="min-h-[72vh] rounded-lg border border-[#ECECEC] bg-white">
        <div className="flex items-center justify-between border-b border-[#ECECEC] px-5 py-4">
          <h2 className="text-[15px] font-semibold text-[#151515]">
            Questions ({questions.length})
          </h2>
          <button
            type="button"
            onClick={onAddQuestion}
            className="inline-flex h-[31.57px] w-[31.57px] items-center justify-center rounded-md border border-[#ECECEC] text-[#313131] transition-colors hover:bg-[#ECECEF]"
            aria-label="Add question"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3 bg-[#FAFAFACC] p-4">
          {questions.map((question, index) => {
            const isActive = activeQuestion?.id === question.id;

            return (
              <button
                key={question.id}
                type="button"
                onClick={() => onSelectQuestion(question.id)}
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
          <h2 className="text-[15px] font-semibold text-[#151515]">Question Bank</h2>
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

                  <div className="flex h-10 items-center justify-center gap-2 rounded-xl border border-[#ECECEC] bg-white px-3 text-[11px] text-[#313131]">
                    <CopyCheck className="h-4 w-4" />
                    <select
                      value={activeQuestion.type}
                      onChange={(event) =>
                        onUpdateQuestion(activeQuestion.id, {
                          type: event.target.value as QuestionType,
                        })
                      }
                      className="font-medium outline-none"
                    >
                      <option value="Multiple choice">Multiple choice</option>
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
                    className="block text-[14px] font-semibold text-[#313131]"
                  >
                    Question
                  </label>
                  <input
                    id="question-prompt"
                    value={activeQuestion.prompt}
                    onChange={(event) =>
                      onUpdateQuestion(activeQuestion.id, {
                        prompt: event.target.value,
                      })
                    }
                    className="h-12 w-full rounded-xl border border-[#ECECEC] bg-[#FAFAFACC] px-4 text-[14px] text-[#313131] outline-none focus:border-[#007AFF]"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-[14px] font-semibold text-[#2C2C2F]">
                    Media <span className="font-normal text-[#66666A]">(optional)</span>
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
                  <h4 className="text-[14px] font-semibold text-[#2C2C2F]">Options</h4>

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
                          onUpdateOption(activeQuestion.id, option.id, event.target.value)
                        }
                        placeholder="Type answer here"
                        className="h-10 flex-1 bg-transparent text-[14px] text-[#313131] outline-none placeholder:text-[#A0A0A5]"
                      />
                      <button
                        type="button"
                        onClick={() => onRemoveOption(activeQuestion.id, option.id)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#E3E3E7] text-[20px] text-[#2D2D30] transition-colors hover:bg-[#D7D7DB]"
                        aria-label="Remove option"
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => onAddOption(activeQuestion.id)}
                    className="flex h-12 w-full items-center gap-3 rounded-xl border border-[#ECECEC] bg-[#FAFAFACC] px-4 text-[13px] font-semibold text-[#313131] transition-colors hover:bg-[#F0F0F3]"
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
  );
}
