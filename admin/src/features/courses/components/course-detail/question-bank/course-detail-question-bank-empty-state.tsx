type CourseDetailQuestionBankEmptyStateProps = {
  lastUpdatedLabel: string;
  onAddQuestion: () => void;
};

export function CourseDetailQuestionBankEmptyState({
  lastUpdatedLabel,
  onAddQuestion,
}: CourseDetailQuestionBankEmptyStateProps) {
  return (
    <>
      <div className="min-h-[72vh] rounded-lg border border-[#E5E5E8]">
        <div className="border-b border-[#ECECEC] bg-white px-5 py-4 sm:px-6">
          <h2 className="text-[15px] font-semibold text-[#151515]">Question Bank</h2>
        </div>

        <div className="flex min-h-[58vh] flex-col items-center justify-center gap-3 bg-white px-6 text-center">
          <h3 className="text-[15px] font-semibold text-[#151515]">No question bank yet</h3>
          <p className="text-[13px] font-medium text-[#737373]">
            No questions have been added to this course yet
          </p>
          <button
            type="button"
            onClick={onAddQuestion}
            className="mt-3 rounded-md bg-[#007AFF] px-6 py-3 text-[12px] font-semibold text-white transition-colors hover:bg-[#006DE0]"
          >
            Add a question
          </button>
        </div>
      </div>

      <p className="text-right text-[12px] text-[#646464]">Last updated: {lastUpdatedLabel}</p>
    </>
  );
}
