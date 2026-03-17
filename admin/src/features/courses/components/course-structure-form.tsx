"use client";

import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import type { CourseCreateForm } from "../types";

type CourseStructureFormProps = {
  form: CourseCreateForm;
  onFieldChange: <K extends keyof CourseCreateForm>(
    field: K,
    value: CourseCreateForm[K],
  ) => void;
};

const cardBaseClass =
  "flex h-full flex-col gap-1 rounded-xl border border-[#E6E6E8] bg-[#FFFFFF] px-4 py-3 text-left transition hover:border-[#CFCFD4]";

export function CourseStructureForm({
  form,
  onFieldChange,
}: CourseStructureFormProps) {
  const depthOptions = [
    {
      value: "FULL",
      title: "Full",
      description: "Module → SubModule → Lesson",
    },
    {
      value: "MODULES_ONLY",
      title: "Modules only",
      description: "Module → Lesson",
    },
    {
      value: "FLAT",
      title: "Flat",
      description: "Lesson-only — webinars, masterclasses",
    },
  ] as const;

  const enrolmentOptions = [
    {
      value: "COHORT",
      title: "Cohort",
      description: "Fixed start date & seat cap",
    },
    {
      value: "OPEN",
      title: "Open",
      description: "Instant, no fixed dates",
    },
    {
      value: "SELF_PACED",
      title: "Self-paced",
      description: "Learner progresses freely",
    },
  ] as const;

  const accessOptions = [
    { value: "COURSE_DURATION", label: "For course duration" },
    { value: "UNLIMITED", label: "Unlimited" },
    { value: "ONCE", label: "Once only" },
    { value: "EXPIRES_AFTER_30_DAYS", label: "30-day access" },
  ] as const;

  return (
    <section className="overflow-hidden rounded-xl border border-[#E5E5E8] bg-white">
      <header className="border-b border-[#E5E5E8] px-5 py-4">
        <h2 className="text-[16px] font-semibold text-[#151515]">Structure</h2>
        <p className="text-sm text-[#6A6A6D]">
          Configure curriculum depth, access rules, and enrolment style.
        </p>
      </header>

      <div className="space-y-6 px-5 py-5">
        <div className="space-y-3">
          <label className="text-[14px] font-semibold text-[#313131]">
            Curriculum depth
          </label>
          <div className="grid gap-3 md:grid-cols-3">
            {depthOptions.map((option) => {
              const selected = form.depth === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onFieldChange("depth", option.value)}
                  className={cn(
                    cardBaseClass,
                    selected && "border-[#007AFF] bg-[#F0F6FF]",
                  )}
                >
                  <span className="text-[14px] font-semibold text-[#1A1A1A]">
                    {option.title}
                  </span>
                  <span className="text-[12px] text-[#7A7A7D]">
                    {option.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <hr className="border-[#E6E6E8]" />

        <div className="space-y-3">
          <label className="text-[14px] font-semibold text-[#313131]">
            Enrolment type
          </label>
          <div className="grid gap-3 md:grid-cols-3">
            {enrolmentOptions.map((option) => {
              const selected = form.enrolmentType === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onFieldChange("enrolmentType", option.value)}
                  className={cn(
                    cardBaseClass,
                    selected && "border-[#007AFF] bg-[#F0F6FF]",
                  )}
                >
                  <span className="text-[14px] font-semibold text-[#1A1A1A]">
                    {option.title}
                  </span>
                  <span className="text-[12px] text-[#7A7A7D]">
                    {option.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <hr className="border-[#E6E6E8]" />

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-[14px] font-semibold text-[#313131]">
              Repeat access
            </label>
            <select
              value={form.repeatAccess}
              onChange={(event) =>
                onFieldChange(
                  "repeatAccess",
                  event.target.value as CourseCreateForm["repeatAccess"],
                )
              }
              className="h-12 w-full rounded-xl border border-[#E6E6E8] bg-[#FAFAFACC] px-3 text-sm text-[#2D2F33] outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]"
            >
              {accessOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[14px] font-semibold text-[#313131]">
              Duration (weeks)
            </label>
            <input
              type="number"
              min={1}
              max={52}
              value={form.durationWeeks}
              onChange={(event) =>
                onFieldChange("durationWeeks", event.target.value)
              }
              placeholder="e.g. 6"
              className="h-12 w-full rounded-xl border border-[#E6E6E8] bg-[#FAFAFACC] px-3 text-sm text-[#2D2F33] outline-none placeholder:text-[#B1B1B3] focus-visible:ring-2 focus-visible:ring-[#007AFF]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[14px] font-semibold text-[#313131]">
            Session frequency
          </label>
          <input
            type="text"
            value={form.sessionFrequency}
            onChange={(event) =>
              onFieldChange("sessionFrequency", event.target.value)
            }
            placeholder="e.g. Twice weekly live sessions, twice weekly reading journey"
            className="h-12 w-full rounded-xl border border-[#E6E6E8] bg-[#FAFAFACC] px-3 text-sm text-[#2D2F33] outline-none placeholder:text-[#B1B1B3] focus-visible:ring-2 focus-visible:ring-[#007AFF]"
          />
        </div>

        <hr className="border-[#E6E6E8]" />

        <div className="space-y-3">
          <ToggleRow
            title="Requires account"
            description="Guests can enrol without signing up when off."
            checked={form.requiresAccount}
            onChange={(value) => onFieldChange("requiresAccount", value)}
          />
          <ToggleRow
            title="Course is active"
            description="Enrolled learners can access lessons when on."
            checked={form.isActive}
            onChange={(value) => onFieldChange("isActive", value)}
          />
        </div>
      </div>
    </section>
  );
}

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-[#E6E6E8] bg-[#F8F8FA] px-4 py-3">
      <div>
        <p className="text-[14px] font-semibold text-[#1E1E20]">{title}</p>
        <p className="text-[12px] text-[#7A7A7D]">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
