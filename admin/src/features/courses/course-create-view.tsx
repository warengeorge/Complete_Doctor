"use client";

import { useMemo, useState } from "react";

import { courseSteps, descriptionMaxLength } from "./constants";
import { CourseOverviewForm } from "./components/course-overview-form";
import { CourseSidebarPanel } from "./components/course-sidebar-panel";
import { CreateCourseHeader } from "./components/create-course-header";
import { CreateCourseStepper } from "./components/create-course-stepper";
import type { CourseCreateForm } from "./types";

const initialForm: CourseCreateForm = {
  courseName: "",
  category: "",
  price: "",
  description: "",
  learningOutcomes: [""],
  tagInput: "",
  tags: [],
  coverImageName: null,
};

export function CourseCreateView() {
  const [form, setForm] = useState<CourseCreateForm>(initialForm);

  const canPublish = useMemo(() => {
    return Boolean(form.courseName.trim() && form.category.trim());
  }, [form.category, form.courseName]);

  const updateField = (name: keyof CourseCreateForm, value: string) => {
    setForm((prev) => {
      if (name === "description") {
        return { ...prev, description: value.slice(0, descriptionMaxLength) };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleLearningOutcomeChange = (index: number, value: string) => {
    setForm((prev) => {
      const updated = [...prev.learningOutcomes];
      updated[index] = value;
      return { ...prev, learningOutcomes: updated };
    });
  };

  const handleAddLearningOutcome = () => {
    setForm((prev) => ({
      ...prev,
      learningOutcomes: [...prev.learningOutcomes, ""],
    }));
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

  const handleCoverImageSelect = (file: File | null) => {
    setForm((prev) => ({
      ...prev,
      coverImageName: file?.name ?? null,
    }));
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

  const handleNext = () => {
    // Placeholder for moving to "Course Content" step.
    console.log("Go to next step", form);
  };

  return (
    <section className="w-full space-y-6 ">
      <CreateCourseHeader
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
      />
      <CreateCourseStepper steps={courseSteps} activeStep={1} />

      <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <div className="min-w-0">
          <CourseOverviewForm
            form={form}
            onChange={updateField}
            onLearningOutcomeChange={handleLearningOutcomeChange}
            onAddLearningOutcome={handleAddLearningOutcome}
          />
        </div>

        <div className="min-w-0">
          <CourseSidebarPanel
            coverImageName={form.coverImageName}
            tagInput={form.tagInput}
            tags={form.tags}
            onTagInputChange={(value) => updateField("tagInput", value)}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
            onCoverImageSelect={handleCoverImageSelect}
            onNext={handleNext}
          />
        </div>
      </div>
    </section>
  );
}
