"use client";

import { CalendarDays, Clock3, MoveRight, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import type { CourseModule, CourseScheduleEntry } from "../types";

type CourseScheduleFormProps = {
  modules: CourseModule[];
  schedules: CourseScheduleEntry[];
  onAddSchedule: () => void;
  onAddAnotherSchedule: () => void;
  onRemoveSchedule: (scheduleId: string) => void;
  onScheduleFieldChange: (
    scheduleId: string,
    field: keyof Omit<CourseScheduleEntry, "id">,
    value: string,
  ) => void;
  onSaveSchedule: (scheduleId: string) => void;
};

const inputClassName =
  "h-12 rounded-xl border border-[#E6E6E8] bg-[#FAFAFACC] text-sm text-[#2D2F33] placeholder:text-[#B1B1B3] focus-visible:ring-[#007AFF]";

export function CourseScheduleForm({
  modules,
  schedules,
  onAddSchedule,
  onAddAnotherSchedule,
  onRemoveSchedule,
  onScheduleFieldChange,
  onSaveSchedule,
}: CourseScheduleFormProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#E5E5E8] bg-white">
      <header className="flex items-center justify-between border-b border-[#E5E5E8] px-5 py-4">
        <h2 className="text-[16px] font-semibold text-[#151515]">Course Schedule</h2>
        <button
          type="button"
          onClick={onAddSchedule}
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#E1E1E4] bg-[#F3F3F5] px-4 text-[14px] font-semibold text-[#313131] hover:bg-[#ECECEF]"
        >
          <Plus className="h-4 w-4" />
          Add schedule
        </button>
      </header>

      <div className="space-y-3 p-5">
        {schedules.map((schedule, scheduleIndex) => (
          <div
            key={schedule.id}
            className="overflow-hidden rounded-xl border border-[#E5E5E8] bg-white"
          >
            <header className="flex items-center justify-between border-b border-[#E5E5E8] px-5 py-4">
              <h3 className="text-[15px] font-semibold text-[#1A1A1A]">
                Lesson {scheduleIndex + 1}
              </h3>
              {schedules.length > 1 ? (
                <button
                  type="button"
                  onClick={() => onRemoveSchedule(schedule.id)}
                  className="text-[13px] font-semibold text-[#B42318] hover:text-[#912018]"
                >
                  Remove lesson
                </button>
              ) : null}
            </header>

            <div className="space-y-6 p-5">
              <div className="space-y-2">
                <label className="text-[14px] font-semibold text-[#313131]">Module</label>
                <select
                  value={schedule.moduleId}
                  onChange={(event) =>
                    onScheduleFieldChange(schedule.id, "moduleId", event.target.value)
                  }
                  className={cn(
                    inputClassName,
                    "w-full px-3 outline-none",
                    !schedule.moduleId && "text-[#B1B1B3]",
                  )}
                >
                  <option value="">Select a module</option>
                  {modules.map((module, index) => (
                    <option key={module.id} value={module.id}>
                      {module.title.trim() || `Module ${index + 1}`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[14px] font-semibold text-[#313131]">Date</label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                  <FieldWithIcon icon={CalendarDays}>
                    <Input
                      type="date"
                      value={schedule.startDate}
                      onChange={(event) =>
                        onScheduleFieldChange(
                          schedule.id,
                          "startDate",
                          event.target.value,
                        )
                      }
                      className={inputClassName}
                    />
                  </FieldWithIcon>
                  <MoveRight className="mx-auto h-4 w-4 text-[#767676]" />
                  <FieldWithIcon icon={CalendarDays}>
                    <Input
                      type="date"
                      value={schedule.endDate}
                      onChange={(event) =>
                        onScheduleFieldChange(schedule.id, "endDate", event.target.value)
                      }
                      className={inputClassName}
                    />
                  </FieldWithIcon>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[14px] font-semibold text-[#313131]">Time</label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                  <FieldWithIcon icon={Clock3}>
                    <Input
                      type="time"
                      value={schedule.startTime}
                      onChange={(event) =>
                        onScheduleFieldChange(
                          schedule.id,
                          "startTime",
                          event.target.value,
                        )
                      }
                      className={inputClassName}
                    />
                  </FieldWithIcon>
                  <MoveRight className="mx-auto h-4 w-4 text-[#767676]" />
                  <FieldWithIcon icon={Clock3}>
                    <Input
                      type="time"
                      value={schedule.endTime}
                      onChange={(event) =>
                        onScheduleFieldChange(schedule.id, "endTime", event.target.value)
                      }
                      className={inputClassName}
                    />
                  </FieldWithIcon>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[14px] font-semibold text-[#313131]">Location</label>
                <Input
                  value={schedule.location}
                  onChange={(event) =>
                    onScheduleFieldChange(schedule.id, "location", event.target.value)
                  }
                  placeholder="https://"
                  className={inputClassName}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={() => onSaveSchedule(schedule.id)}
                  className="h-10 min-w-34 bg-[#007AFF] px-6 text-[14px] font-semibold text-white hover:bg-[#006DE0]"
                >
                  Save schedule
                </Button>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={onAddAnotherSchedule}
          className="inline-flex w-full items-center gap-2 rounded-xl border border-[#E5E5E8] bg-[#FDFDFD] px-5 py-4 text-[14px] font-semibold text-[#313131] hover:bg-[#F7F7F9]"
        >
          <Plus className="h-4 w-4" />
          Add another schedule
        </button>
      </div>
    </section>
  );
}

function FieldWithIcon({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {children}
      <Icon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9A9A9D]" />
    </div>
  );
}
