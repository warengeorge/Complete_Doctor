import {
  CircleHelp,
  Clock3,
  CopyCheck,
  ListOrdered,
  MoreHorizontal,
  Plus,
} from "lucide-react";

import type { QuestionDraft, QuestionBankSettings } from "./types";

type CourseDetailQuestionBankPublishedStateProps = {
  settings: QuestionBankSettings;
  questions: QuestionDraft[];
  onEdit: () => void;
};

function formatDuration(hours: string, minutes: string): string {
  const hrs = Number(hours || 0);
  const mins = Number(minutes || 0);

  if (!hrs && !mins) {
    return "0hr 0min";
  }

  return `${hrs}hr ${mins}min`;
}

function formatPassingScore(settings: QuestionBankSettings): string {
  if (!settings.passMark) {
    return "Not set";
  }

  const value = settings.passMarkValue.trim() || "0";
  return settings.passMarkUnit === "%" ? `${value}%` : `${value} points`;
}

function getAboutText(description: string): string[] {
  if (description.trim()) {
    return [description.trim()];
  }

  return [
    "This test is designed to evaluate your understanding of core course concepts through multiple question formats and practical scenarios.",
    "Questions are structured to test recall, clinical reasoning, and decision-making aligned with real learning outcomes.",
    "Use this assessment to measure progress and identify areas requiring further study.",
  ];
}

export function CourseDetailQuestionBankPublishedState({
  settings,
  questions,
  onEdit,
}: CourseDetailQuestionBankPublishedStateProps) {
  const durationLabel = formatDuration(settings.durationHours, settings.durationMinutes);
  const passingScore = formatPassingScore(settings);
  const aboutParagraphs = getAboutText(settings.description);

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="rounded-lg border border-[#ECECEC] bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ECECEC] px-5 py-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-4 text-[#151515]">
            <h2 className="text-[15px] font-semibold">{settings.title || "Question Bank"}</h2>
            <div className="h-6 w-px bg-[#ECECEC]" />
            <div className="inline-flex items-center gap-2 text-[13px] text-[#646464]">
              <Clock3 className="h-4 w-4" />
              {durationLabel}
            </div>
            <div className="inline-flex items-center gap-2 text-[13px] text-[#646464]">
              <ListOrdered className="h-4 w-4" />
              {questions.length} questions
            </div>
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="rounded-sm bg-[#007AFF] px-6 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#006DE0]"
          >
            Edit
          </button>
        </div>

        <div className="space-y-8 px-5 py-6 sm:px-6">
          <section>
            <h3 className="text-[15px] font-semibold text-[#0C1424]">About the test</h3>
            <div className="mt-4 space-y-4 text-[13px] leading-7 text-[#646464]">
              {aboutParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="border-t border-[#ECECEC] pt-8">
            <h3 className="text-[15px] font-semibold text-[#0C1424]">Test Details</h3>
            <ul className="mt-4 list-disc space-y-3 pl-6 text-[13px] text-[#646464]">
              <li>
                <span className="font-medium text-[#101010]">Duration:</span> {durationLabel}
              </li>
              <li>
                <span className="font-medium text-[#101010]">Number of Questions:</span>{" "}
                {questions.length}
              </li>
              <li>
                <span className="font-medium text-[#101010]">Allowed Attempts:</span> 3 per day
              </li>
              <li>
                <span className="font-medium text-[#101010]">Passing Score:</span> {passingScore}
              </li>
            </ul>
          </section>

          <section className="border-t border-[#ECECEC] pt-8">
            <h3 className="text-[15px] font-semibold text-[#0C1424]">Guidelines &amp; Rules</h3>
            <ul className="mt-4 list-disc space-y-3 pl-6 text-[13px] text-[#646464]">
              <li>Once you start, the timer cannot be paused.</li>
              <li>Your best score will be saved if you take the test multiple times.</li>
              <li>You must complete all questions before submitting.</li>
            </ul>
          </section>
        </div>
      </div>

      <aside className="rounded-lg border border-[#ECECEC] bg-white">
        <div className="flex items-center justify-between border-b border-[#ECECEC] px-5 py-4">
          <h2 className="text-[15px] font-semibold text-[#151515]">
            Questions ({questions.length})
          </h2>
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex h-[31.57px] w-[31.57px] items-center justify-center rounded-md border border-[#ECECEC] text-[#313131] transition-colors hover:bg-[#ECECEF]"
            aria-label="Edit question bank"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3 bg-[#FAFAFACC] p-4">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="w-full rounded-xl border border-[#E2E2E5] bg-[#F8F8F8] px-3 py-3"
            >
              <p className="text-[9px] font-medium uppercase tracking-wide text-[#737373]">
                Question {index + 1}
              </p>
              <p className="mt-2 line-clamp-2 text-[14px] font-semibold text-[#313131]">
                {question.prompt || `Question ${index + 1}`}
              </p>
              <div className="mt-4 flex items-center justify-between text-[11.38px] text-[#313131]">
                <span className="inline-flex items-center gap-2">
                  {question.type === "Multiple choice" ? (
                    <CopyCheck className="h-4 w-4" />
                  ) : (
                    <CircleHelp className="h-4 w-4" />
                  )}
                  {question.type}
                </span>
                <MoreHorizontal className="h-4 w-4 text-[#313131]" />
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
