"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type ResourceTabKey = "lectureNotes" | "lectureVideos" | "studyMaterials";

type ResourceTabItem = {
  id: ResourceTabKey;
  label: string;
  emptyTitle: string;
  emptyDescription: string;
  actionLabel: string;
};

const resourceTabItems: ResourceTabItem[] = [
  {
    id: "lectureNotes",
    label: "Lecture notes",
    emptyTitle: "No lecture notes",
    emptyDescription: "You haven't uploaded any lecture notes for this course",
    actionLabel: "Add a note",
  },
  {
    id: "lectureVideos",
    label: "Lecture videos",
    emptyTitle: "No lecture videos",
    emptyDescription: "You haven't uploaded any lecture videos for this course",
    actionLabel: "Add a video",
  },
  {
    id: "studyMaterials",
    label: "Study materials",
    emptyTitle: "No study materials",
    emptyDescription:
      "You haven't uploaded any study materials for this course",
    actionLabel: "Add material",
  },
];

export function CourseDetailResources({
  lastUpdated = "March 12, 2025",
}: {
  lastUpdated?: string;
}) {
  const [activeResourceTab, setActiveResourceTab] =
    useState<ResourceTabKey>("lectureNotes");

  const activeResourceContent = useMemo(
    () =>
      resourceTabItems.find((item) => item.id === activeResourceTab) ??
      resourceTabItems[0],
    [activeResourceTab],
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[160px_minmax(0,1fr)]">
        <aside className="h-fit overflow-hidden rounded-lg border border-[#E5E5E8] bg-white p-2 shadow-sm">
          <div className="flex flex-col gap-1">
            {resourceTabItems.map((item) => {
              const isActive = item.id === activeResourceTab;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveResourceTab(item.id)}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-left text-[15px] font-medium transition-colors",
                    isActive
                      ? "bg-[#007AFF] text-white"
                      : "text-[#5E5E5E] hover:bg-[#F3F3F5] hover:text-[#1F1F1F]",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </aside>

        <section className="overflow-hidden rounded-lg border border-[#ECECEC] bg-white">
          <header className="border-b border-[#E5E5E8] px-5 py-3.5">
            <h2 className="text-[16px] font-semibold text-[#1F1F1F]">
              {activeResourceContent.label}
            </h2>
          </header>

          <div className="flex min-h-[250px] flex-col items-center justify-center px-4 py-10 text-center">
            <h3 className="text-[22px] font-semibold text-[#333333] sm:text-[30px]">
              {activeResourceContent.emptyTitle}
            </h3>
            <p className="mt-1 max-w-[560px] text-[14px] text-[#676767]">
              {activeResourceContent.emptyDescription}
            </p>
            <button
              type="button"
              className="mt-4 rounded-[2px] bg-[#007AFF] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#006DE0]"
            >
              {activeResourceContent.actionLabel}
            </button>
          </div>
        </section>
      </div>

      <p className="text-right text-[14px] text-[#8A8A8A]">
        <span className="font-semibold text-[#5E5E5E]">Last updated:</span>{" "}
        {lastUpdated}
      </p>
    </div>
  );
}
