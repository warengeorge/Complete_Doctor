"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

import { courseInstructors, courseSteps, shortDescriptionMaxLength } from "./constants";
import { coursesListData } from "./data/courses-list";
import { courseDraftsData } from "./data/course-drafts";
import { CourseCompletionForm } from "./components/course-completion-form";
import { CourseContentForm } from "./components/course-content-form";
import { CourseOverviewForm } from "./components/course-overview-form";
import { CoursePricingForm } from "./components/course-pricing-form";
import { CourseReviewPanel } from "./components/course-review-panel";
import { CourseStructureForm } from "./components/course-structure-form";
import { CreateCourseStepper } from "./components/create-course-stepper";
import type { CourseCreateForm } from "./types";
import { CreateCourseHeader } from "./components/create-course-header";
import { useCategoriesQuery } from "../categories/services/useCategoriesQuery";

type BasicEditableField =
  | "category"
  | "instructor"
  | "shortDescription"
  | "tagInput";
type ArrayField = "highlights" | "objectives" | "audience" | "prerequisites";

const initialForm: CourseCreateForm = {
  title: "",
  slug: "",
  category: "",
  instructor: "",
  shortDescription: "",
  tagInput: "",
  tags: [],
  depth: "FULL",
  enrolmentType: "COHORT",
  repeatAccess: "COURSE_DURATION",
  durationWeeks: "",
  sessionFrequency: "",
  requiresAccount: true,
  isActive: true,
  description: "",
  about: "",
  highlights: [""],
  objectives: [""],
  audience: [""],
  prerequisites: [""],
  price: "",
  currency: "GBP",
  priceNote: "",
  earlyBirdEnabled: false,
  earlyBirdPrice: "",
  earlyBirdUntil: "",
  syllabusLink: "",
  certificateEnabled: false,
  certificateRequireAll: false,
  certificatePassMark: "",
  certificateModuleIds: "",
};

type CourseCreateViewProps = {
  draftId?: string;
};

export function CourseCreateView({ draftId }: CourseCreateViewProps) {
  const draftSeed = useMemo(() => buildDraftSeed(draftId), [draftId]);
  const [activeStep, setActiveStep] = useState(1);
  const [form, setForm] = useState<CourseCreateForm>(draftSeed.form);
  const [slugManual, setSlugManual] = useState(draftSeed.slugManual);
  const categoriesQuery = useCategoriesQuery({ page: 1, pageSize: 100 });

  const categoryOptions = useMemo(
    () =>
      (categoriesQuery.data?.items ?? []).map((category) => ({
        id: category.id,
        name: category.name,
      })),
    [categoriesQuery.data?.items],
  );

  useEffect(() => {
    setForm(draftSeed.form);
    setSlugManual(draftSeed.slugManual);
  }, [draftSeed]);

  const canPublish = useMemo(
    () => Boolean(form.title.trim() && form.category.trim()),
    [form.category, form.title],
  );

  const updateBasicField = (name: BasicEditableField, value: string) => {
    setForm((prev) => {
      if (name === "shortDescription") {
        return {
          ...prev,
          shortDescription: value.slice(0, shortDescriptionMaxLength),
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const updateField = <K extends keyof CourseCreateForm>(
    name: K,
    value: CourseCreateForm[K],
  ) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTitleChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: slugManual ? prev.slug : slugify(value),
    }));
  };

  const handleSlugChange = (value: string) => {
    setSlugManual(true);
    setForm((prev) => ({ ...prev, slug: slugify(value) }));
  };

  const handleArrayChange = (
    field: ArrayField,
    index: number,
    value: string,
  ) => {
    setForm((prev) => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const handleAddTag = () => {
    const entries = form.tagInput
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (entries.length === 0) return;

    setForm((prev) => {
      const nextTags = Array.from(new Set([...prev.tags, ...entries]));
      return { ...prev, tags: nextTags, tagInput: "" };
    });
  };

  const handleRemoveTag = (tag: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((item) => item !== tag),
    }));
  };

  const handleAddArrayItem = (field: ArrayField) => {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const handleRemoveArrayItem = (field: ArrayField, index: number) => {
    setForm((prev) => {
      if (prev[field].length <= 1) return prev;
      return { ...prev, [field]: prev[field].filter((_, i) => i !== index) };
    });
  };

  const handleSaveDraft = () => {
    // Placeholder for API integration.
    console.log("Save draft", form);
  };

  const handlePublish = () => {
    if (!canPublish) return;
    // Placeholder for API integration.
    console.log("Publish course", form);
  };

  const totalSteps = courseSteps.length;

  const handleNext = () =>
    setActiveStep((prev) => Math.min(prev + 1, totalSteps));
  const handlePrevious = () => setActiveStep((prev) => Math.max(prev - 1, 1));

  return (
    <section className="min-h-screen bg-[#F8F8FA]">
      <CreateCourseHeader
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        canPublish={canPublish}
      />
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-6 py-6">
        <header className="rounded-xl border border-[#E5E5E8] bg-white px-6 py-4">
          <CreateCourseStepper steps={courseSteps} activeStep={activeStep} />
        </header>

        <div className="flex-1">
          {activeStep === 1 ? (
            <CourseOverviewForm
              form={form}
              categories={categoryOptions}
              categoriesLoading={categoriesQuery.isLoading}
              categoriesError={
                categoriesQuery.isError
                  ? categoriesQuery.error instanceof Error
                    ? categoriesQuery.error.message
                    : "Unable to load categories."
                  : null
              }
              instructors={courseInstructors}
              onTitleChange={handleTitleChange}
              onSlugChange={handleSlugChange}
              onFieldChange={updateBasicField}
              onAddTag={handleAddTag}
              onRemoveTag={handleRemoveTag}
            />
          ) : activeStep === 2 ? (
            <CourseStructureForm form={form} onFieldChange={updateField} />
          ) : activeStep === 3 ? (
            <CourseContentForm
              form={form}
              onFieldChange={updateField}
              onArrayChange={handleArrayChange}
              onArrayAdd={handleAddArrayItem}
              onArrayRemove={handleRemoveArrayItem}
            />
          ) : activeStep === 4 ? (
            <CoursePricingForm form={form} onFieldChange={updateField} />
          ) : activeStep === 5 ? (
            <CourseCompletionForm form={form} onFieldChange={updateField} />
          ) : (
            <CourseReviewPanel form={form} />
          )}
        </div>

        <div className="sticky bottom-0 border-t border-[#E5E5E8] bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={activeStep === 1}
              className="h-10 border-[#E0E0E2] bg-[#F3F3F5] px-6 text-sm font-medium text-[#313131] hover:bg-[#ECECEF]"
            >
              Back
            </Button>
            {activeStep < totalSteps ? (
              <Button
                type="button"
                onClick={handleNext}
                className="h-10 bg-[#007AFF] px-6 text-sm font-medium text-white hover:bg-[#006DE0]"
              >
                Continue
              </Button>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSaveDraft}
                  className="h-10 min-w-34 border-[#E0E0E2] bg-[#F3F3F5] px-6 text-sm font-medium text-[#313131] hover:bg-[#ECECEF]"
                >
                  Save as draft
                </Button>
                <Button
                  type="button"
                  onClick={handlePublish}
                  disabled={!canPublish}
                  className="h-10 min-w-34 bg-[#007AFF] px-6 text-sm font-medium text-white hover:bg-[#006DE0]"
                >
                  Publish course
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildDraftSeed(draftId?: string) {
  if (!draftId) {
    return { form: initialForm, slugManual: false };
  }

  const draftEntry = courseDraftsData.find((draft) => draft.id === draftId);
  const listEntry = coursesListData.find((course) => course.id === draftId);

  const fallback: Partial<CourseCreateForm> = {};

  if (listEntry) {
    fallback.title = listEntry.title;
    fallback.category = listEntry.category;
    fallback.slug = slugify(listEntry.title);
  }

  if (draftEntry?.form) {
    Object.assign(fallback, draftEntry.form);
  }

  const merged: CourseCreateForm = {
    ...initialForm,
    ...fallback,
  };

  return {
    form: {
      ...merged,
      highlights: ensureAtLeastOne(merged.highlights),
      objectives: ensureAtLeastOne(merged.objectives),
      audience: ensureAtLeastOne(merged.audience),
      prerequisites: ensureAtLeastOne(merged.prerequisites),
    },
    slugManual: Boolean(draftEntry?.form.slug),
  };
}

function ensureAtLeastOne(items: string[]) {
  return items.length === 0 ? [""] : items;
}
