import {
  ChevronDown,
  ChevronUp,
  CircleHelp,
  Copy,
  CopyCheck,
  GripVertical,
  MoreVertical,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getPreviewText } from "./utils";
import type { QuestionDraft, QuestionType } from "./types";

type CourseDetailQuestionBankBuilderStateProps = {
  questions: QuestionDraft[];
  activeQuestionId: string | null;
  expandedQuestionId: string | null;
  onSelectQuestion: (questionId: string) => void;
  onToggleExpand: (questionId: string) => void;
  onAddQuestion: () => void;
  onSaveAndContinue: () => void;
  onDuplicateQuestion: (questionId: string) => void;
  onDeleteQuestion: (questionId: string) => void;
  onChangeQuestionType: (questionId: string, type: QuestionType) => void;
  onUpdateQuestion: (questionId: string, update: Partial<QuestionDraft>) => void;
  onUpdateOption: (questionId: string, optionId: string, value: string) => void;
  onRemoveOption: (questionId: string, optionId: string) => void;
  onAddOption: (questionId: string) => void;
  onChangeMedia: (questionId: string, file: File | null) => void;
};

export function CourseDetailQuestionBankBuilderState({
  questions,
  activeQuestionId,
  expandedQuestionId,
  onSelectQuestion,
  onToggleExpand,
  onAddQuestion,
  onSaveAndContinue,
  onDuplicateQuestion,
  onDeleteQuestion,
  onChangeQuestionType,
  onUpdateQuestion,
  onUpdateOption,
  onRemoveOption,
  onAddOption,
  onChangeMedia,
}: CourseDetailQuestionBankBuilderStateProps) {
  const expandedQuestion =
    questions.find((question) => question.id === expandedQuestionId) ?? null;

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
            const isActive = activeQuestionId === question.id;

            return (
              <div
                key={question.id}
                onClick={() => onSelectQuestion(question.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelectQuestion(question.id);
                  }
                }}
                role="button"
                tabIndex={0}
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
                    {question.type}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        onClick={(event) => event.stopPropagation()}
                        className="rounded-md p-1 text-[#313131] hover:bg-[#E3E4E7]"
                        aria-label="Question menu"
                      >
                        <MoreVertical className="h-4 w-4 text-[#313131]" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[165px] border-[#007AFF]">
                      <DropdownMenuItem
                        onSelect={() => onDuplicateQuestion(question.id)}
                        className="text-[14px]"
                      >
                        <Copy className="h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => onDeleteQuestion(question.id)}
                        className="text-[14px] text-[#FF1515] focus:text-[#FF1515]"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete question
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
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
          <div className="overflow-hidden rounded-xl border border-[#ECECEC]">
            {questions.map((question, index) => {
              const isExpanded = expandedQuestionId === question.id;
              const isLast = index === questions.length - 1;

              return (
                <div key={question.id}>
                  <div
                    className={`flex flex-wrap items-center justify-between gap-3 px-4 py-3 ${
                      isExpanded ? "bg-[#007AFF05]" : "bg-[#FAFAFACC]"
                    } ${!isLast || isExpanded ? "border-b border-[#ECECEC]" : ""}`}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <GripVertical className="h-4 w-4 text-[#84848A]" />
                      <h3 className="text-[15px] font-semibold text-[#151515]">
                        Question {index + 1}
                      </h3>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#ECECEC] bg-white px-3 text-[11px] text-[#313131]"
                          >
                            <CopyCheck className="h-4 w-4" />
                            <span className="font-medium">{question.type}</span>
                            <ChevronDown className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-[160px]">
                          <DropdownMenuItem
                            onSelect={() => onChangeQuestionType(question.id, "Multiple choice")}
                            className="text-[14px]"
                          >
                            <CopyCheck className="h-4 w-4" />
                            Multiple choice
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => onChangeQuestionType(question.id, "Yes/No")}
                            className="text-[14px]"
                          >
                            <CircleHelp className="h-4 w-4" />
                            Yes/No
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onToggleExpand(question.id)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#ECECEC] bg-white text-[#313131]"
                        aria-label={isExpanded ? "Collapse question" : "Expand question"}
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className="rounded-md p-2 text-[#313131] hover:bg-[#E3E4E7]"
                            aria-label="Question menu"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[165px] border-[#007AFF]">
                          <DropdownMenuItem
                            onSelect={() => onDuplicateQuestion(question.id)}
                            className="text-[14px]"
                          >
                            <Copy className="h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => onDeleteQuestion(question.id)}
                            className="text-[14px] text-[#FF1515] focus:text-[#FF1515]"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete question
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {isExpanded ? (
                    <div className="space-y-6 p-4 sm:p-5">
                      <div className="space-y-2">
                        <label
                          htmlFor={`question-prompt-${question.id}`}
                          className="block text-[14px] font-semibold text-[#313131]"
                        >
                          Question
                        </label>
                        <input
                          id={`question-prompt-${question.id}`}
                          value={question.prompt}
                          onChange={(event) =>
                            onUpdateQuestion(question.id, {
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
                        <label
                          htmlFor={`media-upload-${question.id}`}
                          className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#ECECEC] bg-[#FAFAFACC] text-[14px] text-[#2F2F33] transition-colors hover:bg-[#F1F1F3]"
                        >
                          <Upload className="h-4 w-4" />
                          Upload an image or video
                        </label>
                        <input
                          id={`media-upload-${question.id}`}
                          type="file"
                          accept="image/*,video/*"
                          className="hidden"
                          onChange={(event) => {
                            const file = event.target.files?.[0] ?? null;
                            onChangeMedia(question.id, file);
                            event.currentTarget.value = "";
                          }}
                        />
                        {question.media ? (
                          <div className="flex items-center justify-between rounded-xl border border-[#ECECEC] bg-white px-3 py-2">
                            <p className="truncate text-[12px] text-[#313131]">
                              {question.media.name}
                            </p>
                            <button
                              type="button"
                              onClick={() => onChangeMedia(question.id, null)}
                              className="text-[12px] font-semibold text-[#FF1515]"
                            >
                              Remove
                            </button>
                          </div>
                        ) : null}
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[14px] font-semibold text-[#2C2C2F]">Options</h4>

                        {question.options.map((option) => (
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
                                onUpdateOption(question.id, option.id, event.target.value)
                              }
                              placeholder="Type answer here"
                              className="h-10 flex-1 bg-transparent text-[14px] text-[#313131] outline-none placeholder:text-[#A0A0A5]"
                            />
                            {question.type === "Multiple choice" ? (
                              <button
                                type="button"
                                onClick={() => onRemoveOption(question.id, option.id)}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#E3E3E7] text-[20px] text-[#2D2D30] transition-colors hover:bg-[#D7D7DB]"
                                aria-label="Remove option"
                              >
                                ×
                              </button>
                            ) : null}
                          </div>
                        ))}

                        {question.type === "Multiple choice" ? (
                          <button
                            type="button"
                            onClick={() => onAddOption(question.id)}
                            className="flex h-12 w-full items-center gap-3 rounded-xl border border-[#ECECEC] bg-[#FAFAFACC] px-4 text-[13px] font-semibold text-[#313131] transition-colors hover:bg-[#F0F0F3]"
                          >
                            <Plus className="h-4 w-4" />
                            Add another option
                          </button>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}

            {expandedQuestion ? null : (
              <div className="border-t border-[#ECECEC] px-4 py-14 text-center text-[14px] text-[#6A6A6E]">
                Select a question to edit.
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={onSaveAndContinue}
              className="rounded-sm border border-[#1E1E21] bg-transparent px-6 py-2 text-[14px] font-semibold text-[#1E1E21] transition-colors hover:bg-[#EFEFF2]"
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
