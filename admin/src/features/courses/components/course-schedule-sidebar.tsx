"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { CourseScheduleEntry } from "../types";

type CourseScheduleSidebarProps = {
  schedules: CourseScheduleEntry[];
  onPrevious: () => void;
  onFinish: () => void;
};

const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function CourseScheduleSidebar({
  schedules,
  onPrevious,
  onFinish,
}: CourseScheduleSidebarProps) {
  const scheduledDays = getScheduledDays(schedules);
  const activeDays = scheduledDays.length > 0 ? scheduledDays : [6, 8, 11, 14, 19];
  const calendarCells = [...Array.from({ length: 31 }, (_, i) => i + 1), 1, 2, 3, 4];

  return (
    <aside className="space-y-3">
      <section className="overflow-hidden rounded-xl border border-[#E5E5E8] bg-white">
        <header className="flex items-center justify-between px-5 py-4">
          <h3 className="text-[16px] font-semibold text-[#1A1A1A]">March 2025</h3>
          <div className="flex items-center gap-2 text-[#6F6F72]">
            <button
              type="button"
              aria-label="Previous month"
              className="rounded p-1 hover:bg-[#F4F4F6]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next month"
              className="rounded p-1 hover:bg-[#F4F4F6]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="space-y-3 px-5 pb-5">
          <div className="grid grid-cols-7 gap-y-2 text-center text-[11px] font-semibold text-[#1F1F1F]">
            {weekDays.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-2 text-center text-[16px] text-[#1F1F1F]">
            {calendarCells.map((day, index) => {
              const isOverflow = index >= 31;
              const isActive = !isOverflow && activeDays.includes(day);

              return (
                <span
                  key={`${day}-${index}`}
                  className={`mx-auto inline-flex h-8 w-8 items-center justify-center rounded-full ${
                    isActive
                      ? "bg-[#007AFF] text-white"
                      : isOverflow
                        ? "text-[#A7A7AA]"
                        : "text-[#1F1F1F]"
                  }`}
                >
                  {day}
                </span>
              );
            })}
          </div>

          <p className="text-[12px] text-[#5F5F62]">*Calendar view with scheduled dates</p>
        </div>
      </section>

      <div className="grid gap-2 sm:grid-cols-2">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="h-11 border-[#E0E0E2] bg-[#F3F3F5] text-[14px] font-semibold text-[#313131] hover:bg-[#ECECEF]"
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={onFinish}
          className="h-11 bg-[#007AFF] text-[14px] font-semibold text-white hover:bg-[#006DE0]"
        >
          Finish
        </Button>
      </div>
    </aside>
  );
}

function getScheduledDays(schedules: CourseScheduleEntry[]): number[] {
  const days = schedules
    .map((schedule) => {
      if (!schedule.startDate) return null;
      const parsed = new Date(schedule.startDate);
      if (Number.isNaN(parsed.getTime())) return null;
      if (parsed.getFullYear() !== 2025 || parsed.getMonth() !== 2) return null;
      return parsed.getDate();
    })
    .filter((day): day is number => day !== null);

  return Array.from(new Set(days)).sort((a, b) => a - b);
}
