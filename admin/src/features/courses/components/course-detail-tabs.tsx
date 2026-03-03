"use client";

import { cn } from "@/lib/utils";

const tabItems = [
  "Overview",
  "Students",
  "Events & Schedule",
  "Resources",
  "Question Bank",
  "Announcements",
  "Reviews",
] as const;

type TabLabel = (typeof tabItems)[number];

export function CourseDetailTabs({
  value,
  onValueChange,
}: {
  value: TabLabel;
  onValueChange: (v: string) => void;
}) {
  return (
    <div className="w-full border-b border-[#E5E5E8]">
      <div className="flex flex-wrap gap-0 -mb-px overflow-x-auto scrollbar-hide">
        {tabItems.map((label) => (
          <button
            key={label}
            onClick={() => onValueChange(label)}
            className={cn(
              "px-4 py-2 text-[14px] font-medium border-b-2 transition-colors whitespace-nowrap",
              value === label
                ? "border-[#007AFF] text-[#121212]"
                : "border-transparent text-[#6B6B6B] hover:text-[#313131]",
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
