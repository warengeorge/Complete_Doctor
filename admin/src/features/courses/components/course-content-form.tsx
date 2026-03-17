"use client";

import { Plus, X } from "lucide-react";

import type { CourseCreateForm } from "../types";

type ArrayField = "highlights" | "objectives" | "audience" | "prerequisites";

type CourseContentFormProps = {
  form: CourseCreateForm;
  onFieldChange: <K extends keyof CourseCreateForm>(
    field: K,
    value: CourseCreateForm[K],
  ) => void;
  onArrayChange: (field: ArrayField, index: number, value: string) => void;
  onArrayAdd: (field: ArrayField) => void;
  onArrayRemove: (field: ArrayField, index: number) => void;
};

export function CourseContentForm({
  form,
  onFieldChange,
  onArrayChange,
  onArrayAdd,
  onArrayRemove,
}: CourseContentFormProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#E5E5E8] bg-white">
      <header className="border-b border-[#E5E5E8] px-5 py-4">
        <h2 className="text-[16px] font-semibold text-[#151515]">Content</h2>
        <p className="text-sm text-[#6A6A6D]">
          Describe the course and outline key highlights for learners.
        </p>
      </header>

      <div className="space-y-6 px-5 py-5">
        <div className="space-y-2">
          <label className="text-[14px] font-semibold text-[#313131]">
            Full description
          </label>
          <textarea
            value={form.description}
            onChange={(event) => onFieldChange("description", event.target.value)}
            placeholder="Full course description shown on the detail page."
            className="min-h-28 w-full rounded-xl border border-[#E6E6E8] bg-[#FAFAFACC] px-4 py-3 text-sm text-[#2D2F33] outline-none placeholder:text-[#B1B1B3] focus-visible:ring-2 focus-visible:ring-[#007AFF]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[14px] font-semibold text-[#313131]">
            About this course
          </label>
          <textarea
            value={form.about}
            onChange={(event) => onFieldChange("about", event.target.value)}
            placeholder="A short paragraph describing the teaching approach or who this is for."
            className="min-h-20 w-full rounded-xl border border-[#E6E6E8] bg-[#FAFAFACC] px-4 py-3 text-sm text-[#2D2F33] outline-none placeholder:text-[#B1B1B3] focus-visible:ring-2 focus-visible:ring-[#007AFF]"
          />
        </div>

        <hr className="border-[#E6E6E8]" />

        <ArraySection
          title="What's included (highlights)"
          subtitle="Concrete inclusions shown on the course card. Max 6 bullet points."
          items={form.highlights}
          onAdd={() => onArrayAdd("highlights")}
          onChange={(index, value) => onArrayChange("highlights", index, value)}
          onRemove={(index) => onArrayRemove("highlights", index)}
        />

        <hr className="border-[#E6E6E8]" />

        <ArraySection
          title="Learning objectives"
          subtitle="Aspirational outcomes shown on the course detail page."
          items={form.objectives}
          onAdd={() => onArrayAdd("objectives")}
          onChange={(index, value) => onArrayChange("objectives", index, value)}
          onRemove={(index) => onArrayRemove("objectives", index)}
        />

        <hr className="border-[#E6E6E8]" />

        <ArraySection
          title="Target audience"
          items={form.audience}
          onAdd={() => onArrayAdd("audience")}
          onChange={(index, value) => onArrayChange("audience", index, value)}
          onRemove={(index) => onArrayRemove("audience", index)}
        />

        <hr className="border-[#E6E6E8]" />

        <ArraySection
          title="Prerequisites"
          subtitle="Leave empty if there are none."
          items={form.prerequisites}
          onAdd={() => onArrayAdd("prerequisites")}
          onChange={(index, value) => onArrayChange("prerequisites", index, value)}
          onRemove={(index) => onArrayRemove("prerequisites", index)}
        />
      </div>
    </section>
  );
}

function ArraySection({
  title,
  subtitle,
  items,
  onAdd,
  onChange,
  onRemove,
}: {
  title: string;
  subtitle?: string;
  items: string[];
  onAdd: () => void;
  onChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-[14px] font-semibold text-[#313131]">{title}</p>
        {subtitle ? <p className="text-[12px] text-[#7A7A7D]">{subtitle}</p> : null}
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={`${title}-${index}`} className="flex items-start gap-2">
            <span className="mt-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#E9F1FF] text-[11px] font-semibold text-[#007AFF]">
              {index + 1}
            </span>
            <textarea
              value={item}
              onChange={(event) => onChange(index, event.target.value)}
              className="min-h-16 flex-1 rounded-xl border border-[#E6E6E8] bg-[#FAFAFACC] px-4 py-2 text-sm text-[#2D2F33] outline-none placeholder:text-[#B1B1B3] focus-visible:ring-2 focus-visible:ring-[#007AFF]"
            />
            {items.length > 1 ? (
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="mt-2 inline-flex items-center gap-1 rounded-lg border border-[#E1E1E4] px-3 py-1 text-[12px] font-semibold text-[#B42318] hover:border-[#D5A3A0]"
              >
                <X className="h-3 w-3" />
                Remove
              </button>
            ) : null}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="inline-flex items-center gap-2 rounded-lg border border-[#E1E1E4] bg-[#F3F3F5] px-3 py-2 text-[13px] font-semibold text-[#2F2F31] hover:bg-[#ECECEF]"
      >
        <Plus className="h-4 w-4" />
        Add item
      </button>
    </div>
  );
}
