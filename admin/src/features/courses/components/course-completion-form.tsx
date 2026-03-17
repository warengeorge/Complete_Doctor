"use client";

import { Switch } from "@/components/ui/switch";

import type { CourseCreateForm } from "../types";

type CourseCompletionFormProps = {
  form: CourseCreateForm;
  onFieldChange: <K extends keyof CourseCreateForm>(
    field: K,
    value: CourseCreateForm[K],
  ) => void;
};

const inputClassName =
  "h-12 w-full rounded-xl border border-[#E6E6E8] bg-[#FAFAFACC] px-3 text-sm text-[#2D2F33] outline-none placeholder:text-[#B1B1B3] focus-visible:ring-2 focus-visible:ring-[#007AFF]";

export function CourseCompletionForm({
  form,
  onFieldChange,
}: CourseCompletionFormProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#E5E5E8] bg-white">
      <header className="border-b border-[#E5E5E8] px-5 py-4">
        <h2 className="text-[16px] font-semibold text-[#151515]">Completion</h2>
        <p className="text-sm text-[#6A6A6D]">
          Configure completion requirements and certificate rules.
        </p>
      </header>

      <div className="space-y-6 px-5 py-5">
        <div className="space-y-2">
          <label className="text-[14px] font-semibold text-[#313131]">
            Official syllabus link
          </label>
          <input
            type="url"
            value={form.syllabusLink}
            onChange={(event) => onFieldChange("syllabusLink", event.target.value)}
            placeholder="https://www.rcpsych.ac.uk/training/exams/..."
            className={inputClassName}
          />
          <p className="text-[12px] text-[#7A7A7D]">
            Link to an external syllabus document (optional).
          </p>
        </div>

        <hr className="border-[#E6E6E8]" />

        <div className="flex items-center justify-between gap-4 rounded-xl border border-[#E6E6E8] bg-[#F8F8FA] px-4 py-3">
          <div>
            <p className="text-[14px] font-semibold text-[#1E1E20]">
              Enable completion certificate
            </p>
            <p className="text-[12px] text-[#7A7A7D]">
              Learners earn a certificate when they complete required modules.
            </p>
          </div>
          <Switch
            checked={form.certificateEnabled}
            onCheckedChange={(value) => onFieldChange("certificateEnabled", value)}
          />
        </div>

        {form.certificateEnabled ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 rounded-xl border border-[#E6E6E8] bg-[#F8F8FA] px-4 py-3">
              <div>
                <p className="text-[14px] font-semibold text-[#1E1E20]">
                  Require all modules
                </p>
                <p className="text-[12px] text-[#7A7A7D]">
                  Every module must be completed to earn a certificate.
                </p>
              </div>
              <Switch
                checked={form.certificateRequireAll}
                onCheckedChange={(value) =>
                  onFieldChange("certificateRequireAll", value)
                }
              />
            </div>

            <div className="grid gap-5 md:grid-cols-[140px_1fr] md:items-end">
              <div className="space-y-2">
                <label className="text-[14px] font-semibold text-[#313131]">
                  Pass mark
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={form.certificatePassMark}
                  onChange={(event) =>
                    onFieldChange("certificatePassMark", event.target.value)
                  }
                  placeholder="70"
                  className={inputClassName}
                />
              </div>
              <p className="text-[12px] text-[#7A7A7D]">
                % minimum score on mock exam to unlock certificate (optional).
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-[14px] font-semibold text-[#313131]">
                Required module IDs
              </label>
              <textarea
                value={form.certificateModuleIds}
                onChange={(event) =>
                  onFieldChange("certificateModuleIds", event.target.value)
                }
                placeholder="mod-001&#10;mod-002&#10;mod-003"
                className="min-h-28 w-full rounded-xl border border-[#E6E6E8] bg-[#FAFAFACC] px-4 py-3 text-sm text-[#2D2F33] outline-none placeholder:text-[#B1B1B3] focus-visible:ring-2 focus-visible:ring-[#007AFF]"
              />
              <p className="text-[12px] text-[#7A7A7D]">
                One per line — leave blank to use all modules.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
