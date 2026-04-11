"use client";

import { Button } from "@/components/ui/button";

type CreateCourseHeaderProps = {
  onSaveDraft: () => void;
  onPublish: () => void;
  canPublish: boolean;
  isSubmitting?: "draft" | "publish" | null;
};

export function CreateCourseHeader({
  onSaveDraft,
  onPublish,
  canPublish,
  isSubmitting = null,
}: CreateCourseHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-[18px] font-semibold text-[#121212]">
          Create a course
        </h1>
        <p className="text-sm text-[#606060]">
          Create and customize a new course
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={onSaveDraft}
          disabled={isSubmitting !== null}
          className="h-10 min-w-34 border-[#E0E0E2] bg-[#F3F3F5] px-6 text-sm font-medium text-[#313131] hover:bg-[#ECECEF]"
        >
          {isSubmitting === "draft" ? "Saving..." : "Save as draft"}
        </Button>
        <Button
          type="button"
          onClick={onPublish}
          disabled={!canPublish || isSubmitting !== null}
          className="h-10 min-w-34 bg-[#007AFF] px-6 text-sm font-medium text-white hover:bg-[#006DE0]"
        >
          {isSubmitting === "publish" ? "Publishing..." : "Publish course"}
        </Button>
      </div>
    </div>
  );
}
