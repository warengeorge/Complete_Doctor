"use client";

import { Plus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { courseCategories, descriptionMaxLength } from "../constants";
import type { CourseCreateForm } from "../types";

type CourseOverviewFormProps = {
  form: CourseCreateForm;
  onChange: (name: keyof CourseCreateForm, value: string) => void;
  onLearningOutcomeChange: (index: number, value: string) => void;
  onAddLearningOutcome: () => void;
};

const inputClassName =
  "h-12 rounded-xl border border-[#E6E6E8] bg-[#FAFAFACC] text-sm text-[#2D2F33] placeholder:text-[#B1B1B3] focus-visible:ring-[#007AFF]";

export function CourseOverviewForm({
  form,
  onChange,
  onLearningOutcomeChange,
  onAddLearningOutcome,
}: CourseOverviewFormProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#E5E5E8] bg-white">
      <header className="border-b border-[#E5E5E8] px-5 py-4">
        <h2 className="text-[16px] font-semibold text-[#151515]">
          Course Overview
        </h2>
      </header>

      <div className="space-y-6 px-5 py-5">
        <div className="space-y-2">
          <label className="text-[14px] font-semibold text-[#313131]">
            Course name
          </label>
          <Input
            value={form.courseName}
            onChange={(event) => onChange("courseName", event.target.value)}
            placeholder="Add a course name/title"
            className={inputClassName}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-[14px] font-semibold text-[#313131]">
              Category
            </label>
            <select
              value={form.category}
              onChange={(event) => onChange("category", event.target.value)}
              className={cn(
                inputClassName,
                "w-full px-3 outline-none",
                !form.category && "text-[#B1B1B3]",
              )}
            >
              <option value="">Select course category</option>
              {courseCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[14px] font-semibold text-[#313131]">
              Pricing (optional)
            </label>
            <Input
              value={form.price}
              onChange={(event) => onChange("price", event.target.value)}
              placeholder="Add a price"
              className={inputClassName}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[14px] font-semibold text-[#313131]">
            Full Course Description
          </label>
          <textarea
            value={form.description}
            onChange={(event) => onChange("description", event.target.value)}
            placeholder="Describe the course"
            maxLength={descriptionMaxLength}
            className={cn(
              "min-h-40 w-full rounded-xl border border-[#E6E6E8] bg-[#FAFAFACC] px-4 py-3 text-sm text-[#2D2F33] outline-none placeholder:text-[#B1B1B3] focus-visible:ring-2 focus-visible:ring-[#007AFF]",
            )}
          />
          <p className="text-right text-[12px] text-[#ECECEC]">
            Maximum character limit: {descriptionMaxLength}
          </p>
        </div>

        <div className="space-y-3">
          <label className="text-[14px] font-semibold text-[#313131]">
            What students will learn
          </label>
          <div className="space-y-3">
            {form.learningOutcomes.map((value, index) => (
              <Input
                key={`${index}-${value.length}`}
                value={value}
                onChange={(event) =>
                  onLearningOutcomeChange(index, event.target.value)
                }
                placeholder="Default text"
                className={inputClassName}
              />
            ))}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onAddLearningOutcome}
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#2F2F31]"
            >
              <Plus className="h-4 w-4" />
              Add another
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
