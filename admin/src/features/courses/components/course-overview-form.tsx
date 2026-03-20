"use client";

import { Plus, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { shortDescriptionMaxLength } from "../constants";
import type { CourseCreateForm } from "../types";

type BasicEditableField = "category" | "instructor" | "shortDescription" | "tagInput";

type CourseOverviewFormProps = {
  form: CourseCreateForm;
  categories: Array<{ id: string; name: string }>;
  categoriesLoading?: boolean;
  categoriesError?: string | null;
  instructors: string[];
  onTitleChange: (value: string) => void;
  onSlugChange: (value: string) => void;
  onFieldChange: (name: BasicEditableField, value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
};

const inputClassName =
  "h-12 rounded-xl border border-[#E6E6E8] bg-[#FAFAFACC] text-sm text-[#2D2F33] placeholder:text-[#B1B1B3] focus-visible:ring-[#007AFF]";

export function CourseOverviewForm({
  form,
  categories,
  categoriesLoading,
  categoriesError,
  instructors,
  onTitleChange,
  onSlugChange,
  onFieldChange,
  onAddTag,
  onRemoveTag,
}: CourseOverviewFormProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#E5E5E8] bg-white">
      <header className="border-b border-[#E5E5E8] px-5 py-4">
        <h2 className="text-[16px] font-semibold text-[#151515]">Basics</h2>
      </header>

      <div className="space-y-6 px-5 py-5">
        <div className="space-y-2">
          <label className="text-[14px] font-semibold text-[#313131]">
            Course title
          </label>
          <Input
            value={form.title}
            onChange={(event) => onTitleChange(event.target.value)}
            placeholder="e.g. MRCPsych Paper A live course"
            className={inputClassName}
          />
          <p className="text-[12px] text-[#7A7A7D]">Required</p>
        </div>

        <div className="space-y-2">
          <label className="text-[14px] font-semibold text-[#313131]">
            URL slug
          </label>
          <Input
            value={form.slug}
            onChange={(event) => onSlugChange(event.target.value)}
            placeholder="auto-generated from title"
            className={inputClassName}
          />
          {form.slug ? (
            <p className="text-[12px] text-[#7A7A7D]">
              completedoctor.com/courses/
              <span className="font-semibold text-[#007AFF]">{form.slug}</span>
            </p>
          ) : null}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-[14px] font-semibold text-[#313131]">
              Category
            </label>
            <select
              value={form.category}
              onChange={(event) => onFieldChange("category", event.target.value)}
              className={cn(
                inputClassName,
                "w-full px-3 outline-none",
                !form.category && "text-[#B1B1B3]",
              )}
              disabled={categoriesLoading}
            >
              <option value="">
                {categoriesLoading
                  ? "Loading categories..."
                  : categoriesError
                    ? "Unable to load categories"
                    : "Select course category"}
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {categoriesError ? (
              <p className="text-xs text-[#B42318]">{categoriesError}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-[14px] font-semibold text-[#313131]">
              Lead instructor
            </label>
            <select
              value={form.instructor}
              onChange={(event) => onFieldChange("instructor", event.target.value)}
              className={cn(
                inputClassName,
                "w-full px-3 outline-none",
                !form.instructor && "text-[#B1B1B3]",
              )}
            >
              <option value="">Select instructor</option>
              {instructors.map((instructor) => (
                <option key={instructor} value={instructor}>
                  {instructor}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[14px] font-semibold text-[#313131]">
            Short description
          </label>
          <textarea
            value={form.shortDescription}
            onChange={(event) => onFieldChange("shortDescription", event.target.value)}
            placeholder="A concise summary shown on course cards."
            maxLength={shortDescriptionMaxLength}
            className="min-h-24 w-full rounded-xl border border-[#E6E6E8] bg-[#FAFAFACC] px-4 py-3 text-sm text-[#2D2F33] outline-none placeholder:text-[#B1B1B3] focus-visible:ring-2 focus-visible:ring-[#007AFF]"
          />
          <p className="text-right text-[12px] text-[#7A7A7D]">
            {form.shortDescription.length} / {shortDescriptionMaxLength}
          </p>
        </div>

        <div className="space-y-3">
          <label className="text-[14px] font-semibold text-[#313131]">Tags</label>
          <div className="flex flex-wrap gap-2">
            {form.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-lg border border-[#E6E6E8] bg-[#F3F3F5] px-3 py-1 text-[12px] font-medium text-[#3A3A3D]"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => onRemoveTag(tag)}
                  className="text-[#9A9A9D] hover:text-[#B42318]"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <Input
              value={form.tagInput}
              onChange={(event) => onFieldChange("tagInput", event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  onAddTag();
                }
              }}
              placeholder="e.g. MRCPsych, Paper A, Live course"
              className={cn(inputClassName, "flex-1")}
            />
            <button
              type="button"
              onClick={onAddTag}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#D5D5D9] bg-[#F3F3F5] px-4 text-[14px] font-semibold text-[#2F2F31] hover:bg-[#ECECEF]"
            >
              <Plus className="h-4 w-4" />
              Add tag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
