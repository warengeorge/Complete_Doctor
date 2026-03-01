"use client";

import { useId, useRef } from "react";
import { Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type CourseSidebarPanelProps = {
  coverImageName: string | null;
  tagInput: string;
  tags: string[];
  onTagInputChange: (value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  onCoverImageSelect: (file: File | null) => void;
  onNext: () => void;
};

const inputClassName =
  "h-11 rounded-xl border border-[#E6E6E8] bg-[#FCFCFD] text-[14px] text-[#2D2F33] placeholder:text-[#B5B5B5] focus-visible:ring-[#007AFF]";

export function CourseSidebarPanel({
  coverImageName,
  tagInput,
  tags,
  onTagInputChange,
  onAddTag,
  onRemoveTag,
  onCoverImageSelect,
  onNext,
}: CourseSidebarPanelProps) {
  const fileInputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <aside className="space-y-4">
      <section className="overflow-hidden rounded-xl border border-[#E5E5E8] bg-white">
        <header className="border-b border-[#E5E5E8] px-5 py-4">
          <h3 className="text-[15px] font-semibold text-[#151515]">
            Cover image
          </h3>
        </header>

        <div className="space-y-3 px-5 py-4 ">
          <label
            htmlFor={fileInputId}
            className="flex min-h-40 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#DFDFE3] bg-[#FAFAFACC] text-[#313131]"
          >
            <Upload className="h-4 w-4" />
            <span className="text-[14px] font-semibold">
              Upload a cover image
            </span>
          </label>

          <input
            ref={fileInputRef}
            id={fileInputId}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) =>
              onCoverImageSelect(event.target.files?.[0] ?? null)
            }
          />

          <p className="text-right text-[12px] text-[#737373]">
            Size limit: 3MB
          </p>
          {coverImageName ? (
            <p className="truncate text-sm text-[#4D4D50]">{coverImageName}</p>
          ) : null}
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-[#E5E5E8] bg-white">
        <header className="border-b border-[#E5E5E8] px-5 py-4">
          <h3 className="text-[15px] font-semibold text-[#151515]">Tags</h3>
        </header>

        <div className="space-y-3 px-5 py-4">
          <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
            <Input
              value={tagInput}
              onChange={(event) => onTagInputChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  onAddTag();
                }
              }}
              placeholder="Add tag"
              className={inputClassName}
            />
            <Button
              type="button"
              variant="outline"
              onClick={onAddTag}
              className="h-11 border-[#E1E1E4] bg-[#F3F3F5] px-6 text-[14px] font-semibold text-[#313131] hover:bg-[#ECECEF]"
            >
              Add tag
            </Button>
          </div>
          <p className="text-[12px] text-[#737373]">Separate tags with commas</p>

          {tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full border border-[#E2E2E5] bg-[#F7F7F9] px-3 py-1 text-sm text-[#414144]"
                >
                  {tag}
                  <button
                    type="button"
                    aria-label={`Remove ${tag}`}
                    onClick={() => onRemoveTag(tag)}
                    className="text-[#7B7B7D]"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <div className="flex justify-end">
        <Button
          type="button"
          onClick={onNext}
          className={cn(
            "h-11 min-w-34 bg-[#007AFF] px-7 text-[14px] font-semibold text-white hover:bg-[#006DE0]",
          )}
        >
          Next
        </Button>
      </div>
    </aside>
  );
}
