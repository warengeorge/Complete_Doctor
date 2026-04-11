"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

import {
  courseInstructors,
  courseSteps,
  shortDescriptionMaxLength,
} from "./constants";
import { coursesListData } from "./data/courses-list";
import { courseDraftsData } from "./data/course-drafts";
import { CourseCompletionForm } from "./components/course-completion-form";
import { CourseContentForm } from "./components/course-content-form";
import { CourseOverviewForm } from "./components/course-overview-form";
import { CoursePricingForm } from "./components/course-pricing-form";
import { CourseReviewPanel } from "./components/course-review-panel";
import { CourseSidebarPanel } from "./components/course-sidebar-panel";
import { CourseStructureForm } from "./components/course-structure-form";
import { CreateCourseStepper } from "./components/create-course-stepper";
import type { CourseCreateForm } from "./types";
import { CreateCourseHeader } from "./components/create-course-header";
import { useCategoriesQuery } from "../categories/services/useCategoriesQuery";
import {
  createCourseRequest,
  type CourseDetail,
  updateCourseRequest,
} from "./services/courses-api";
import { useCourseByIdQuery } from "./services/useCourseByIdQuery";
import {
  COURSE_DETAIL_QUERY_KEY,
  COURSES_LIST_QUERY_KEY,
} from "./services/courses-query-keys";
import { toast } from "sonner";

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
  coverImage: null,
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

const ALLOWED_DEPTH = ["FULL", "MODULES_ONLY", "FLAT"] as const;
const ALLOWED_ENROLMENT = ["COHORT", "OPEN", "SELF_PACED"] as const;
const ALLOWED_REPEAT_ACCESS = [
  "COURSE_DURATION",
  "UNLIMITED",
  "ONCE",
  "EXPIRES_AFTER_30_DAYS",
] as const;
const ALLOWED_CURRENCY = ["GBP", "USD", "EUR", "NGN"] as const;

export function CourseCreateView({ draftId }: CourseCreateViewProps) {
  const draftSeed = useMemo(() => buildDraftSeed(draftId), [draftId]);
  const router = useRouter();
  const queryClient = useQueryClient();

  const [activeStep, setActiveStep] = useState(1);
  const formMethods = useForm<CourseCreateForm>({
    defaultValues: draftSeed.form,
  });
  const { setValue, getValues, reset, watch, formState } = formMethods;
  const form = watch();
  const [slugManual, setSlugManual] = useState(draftSeed.slugManual);
  const [hasHydratedDraft, setHasHydratedDraft] = useState(false);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<"draft" | "publish" | null>(
    null,
  );
  const coverImageUrlRef = useRef<string | null>(null);
  const categoriesQuery = useCategoriesQuery({ page: 1, pageSize: 100 });
  const courseDetailQuery = useCourseByIdQuery(draftId);

  const categoryOptions = useMemo(
    () =>
      (categoriesQuery.data?.items ?? []).map((category) => ({
        id: category.id,
        name: category.name,
      })),
    [categoriesQuery.data?.items],
  );

  useEffect(() => {
    if (coverImageUrlRef.current?.startsWith("blob:")) {
      URL.revokeObjectURL(coverImageUrlRef.current);
      coverImageUrlRef.current = null;
    }
    reset(draftSeed.form);
    setSlugManual(draftSeed.slugManual);
    setHasHydratedDraft(false);
    setCoverImageFile(null);
  }, [draftSeed, reset]);

  useEffect(() => {
    return () => {
      if (coverImageUrlRef.current?.startsWith("blob:")) {
        URL.revokeObjectURL(coverImageUrlRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!draftId || !courseDetailQuery.data || hasHydratedDraft) return;

    const mapped = mapCourseDetailToForm(
      courseDetailQuery.data,
      categoryOptions,
    );

    coverImageUrlRef.current = null;
    reset(normalizeDraftForm(mapped));
    setSlugManual(Boolean(mapped.slug));
    setHasHydratedDraft(true);
  }, [courseDetailQuery.data, categoryOptions, draftId, hasHydratedDraft, reset]);

  useEffect(() => {
    if (!draftId || !courseDetailQuery.data) return;
    if (form.category || categoryOptions.length === 0) return;

    const resolvedCategory = resolveCategoryName(
      courseDetailQuery.data,
      categoryOptions,
    );

    if (resolvedCategory) {
      setValue("category", resolvedCategory, {
        shouldDirty: true,
        shouldValidate: false,
      });
    }
  }, [
    categoryOptions,
    courseDetailQuery.data,
    draftId,
    form.category,
    setValue,
  ]);

  const canPublish = useMemo(
    () => Boolean(form.title.trim() && form.category.trim()),
    [form.category, form.title],
  );

  const updateBasicField = (name: BasicEditableField, value: string) => {
    if (name === "shortDescription") {
      setValue(name, value.slice(0, shortDescriptionMaxLength), {
        shouldDirty: true,
        shouldValidate: false,
      });
      return;
    }
    setValue(name, value, { shouldDirty: true, shouldValidate: false });
  };

  const updateField = (name: keyof CourseCreateForm, value: unknown) => {
    setValue(name, value as never, {
      shouldDirty: true,
      shouldValidate: false,
    });
  };

  const handleTitleChange = (value: string) => {
    setValue("title", value, { shouldDirty: true, shouldValidate: false });
    setValue("slug", slugManual ? getValues("slug") : slugify(value), {
      shouldDirty: true,
      shouldValidate: false,
    });
  };

  const handleSlugChange = (value: string) => {
    setSlugManual(true);
    setValue("slug", slugify(value), {
      shouldDirty: true,
      shouldValidate: false,
    });
  };

  const handleArrayChange = (
    field: ArrayField,
    index: number,
    value: string,
  ) => {
    const current = getValues(field);
    const updated = [...current];
    updated[index] = value;
    setValue(field, updated as CourseCreateForm[typeof field], {
      shouldDirty: true,
      shouldValidate: false,
    });
  };

  const handleAddTag = () => {
    const entries = getValues("tagInput")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (entries.length === 0) return;

    const nextTags = Array.from(
      new Set([...(getValues("tags") ?? []), ...entries]),
    );
    setValue("tags", nextTags as CourseCreateForm["tags"], {
      shouldDirty: true,
      shouldValidate: false,
    });
    setValue("tagInput", "", { shouldDirty: true, shouldValidate: false });
  };

  const handleRemoveTag = (tag: string) => {
    const nextTags = (getValues("tags") ?? []).filter((item) => item !== tag);
    setValue("tags", nextTags as CourseCreateForm["tags"], {
      shouldDirty: true,
      shouldValidate: false,
    });
  };

  const handleAddArrayItem = (field: ArrayField) => {
    const current = getValues(field) ?? [];
    setValue(field, [...current, ""] as CourseCreateForm[typeof field], {
      shouldDirty: true,
      shouldValidate: false,
    });
  };

  const handleRemoveArrayItem = (field: ArrayField, index: number) => {
    const current = getValues(field) ?? [];
    if (current.length <= 1) return;
    const next = current.filter((_, i) => i !== index);
    setValue(field, next as CourseCreateForm[typeof field], {
      shouldDirty: true,
      shouldValidate: false,
    });
  };

  const handleCoverImageSelect = (file: File | null) => {
    if (coverImageUrlRef.current?.startsWith("blob:")) {
      URL.revokeObjectURL(coverImageUrlRef.current);
      coverImageUrlRef.current = null;
    }

    if (!file) {
      updateField("coverImage", null);
      setCoverImageFile(null);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    coverImageUrlRef.current = previewUrl;
    setCoverImageFile(file);
    updateField("coverImage", {
      name: file.name,
      sizeKb: Math.max(1, Math.round(file.size / 1024)),
      previewUrl,
    });
  };

  const handleSaveDraft = async () => {
    const validationErrors = validateCourseForm(
      form,
      categoryOptions,
      coverImageFile,
    );
    if (validationErrors.length > 0) {
      toast.error(validationErrors.join(" • "));
      return;
    }

    if (!coverImageFile && !form.coverImage?.previewUrl) {
      toast.error("Cover image is required.");
      return;
    }

    const categoryId = getCategoryId(form.category, categoryOptions);
    if (form.category.trim() && !categoryId) {
      toast.error("Please select a valid category.");
      return;
    }

    setIsSubmitting("draft");
    try {
      if (draftId) {
        await updateCourseRequest({
          courseId: draftId,
          form,
          categoryId,
          status: "DRAFT",
          dirtyFields: formState.dirtyFields,
        });
        toast.success("Draft updated successfully.");
        queryClient.invalidateQueries({ queryKey: COURSE_DETAIL_QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: COURSES_LIST_QUERY_KEY });
        router.push("/courses");
      } else {
        await createCourseRequest({
          form,
          coverImageFile,
          coverImageUrl: form.coverImage?.previewUrl ?? null,
          categoryId,
          status: "DRAFT",
        });
        toast.success("Draft saved successfully.");
        queryClient.invalidateQueries({ queryKey: COURSES_LIST_QUERY_KEY });
        router.push("/courses");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to save draft.";
      toast.error(message);
    } finally {
      setIsSubmitting(null);
    }
  };

  const handlePublish = async () => {
    if (!canPublish) {
      toast.error("Please fill in the required fields before publishing.");
      return;
    }

    const validationErrors = validateCourseForm(
      form,
      categoryOptions,
      coverImageFile,
    );
    if (validationErrors.length > 0) {
      toast.error(validationErrors.join(" • "));
      return;
    }

    if (!coverImageFile && !form.coverImage?.previewUrl) {
      toast.error("Cover image is required.");
      return;
    }

    const categoryId = getCategoryId(form.category, categoryOptions);
    if (!categoryId) {
      toast.error("Please select a valid category.");
      return;
    }

    setIsSubmitting("publish");
    try {
      if (draftId) {
        await updateCourseRequest({
          courseId: draftId,
          form,
          categoryId,
          status: "PUBLISHED",
          dirtyFields: formState.dirtyFields,
        });
        toast.success("Course updated successfully.");
        queryClient.invalidateQueries({ queryKey: COURSE_DETAIL_QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: COURSES_LIST_QUERY_KEY });
        router.push("/courses");
      } else {
        await createCourseRequest({
          form,
          coverImageFile,
          coverImageUrl: form.coverImage?.previewUrl ?? null,
          categoryId,
          status: "PUBLISHED",
        });
        toast.success("Course published successfully.");
        queryClient.invalidateQueries({ queryKey: COURSES_LIST_QUERY_KEY });
        router.push("/courses");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to publish course.";
      toast.error(message);
    } finally {
      setIsSubmitting(null);
    }
  };

  const totalSteps = courseSteps.length;

  const handleNext = () =>
    setActiveStep((prev) => {
      const errors = validateStepForm(
        form,
        prev,
        categoryOptions,
        coverImageFile,
      );
      if (errors.length > 0) {
        toast.error(errors.join(" • "));
        return prev;
      }
      return Math.min(prev + 1, totalSteps);
    });
  const handlePrevious = () => setActiveStep((prev) => Math.max(prev - 1, 1));

  return (
    <section className="min-h-screen bg-[#F8F8FA]">
      <CreateCourseHeader
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        canPublish={canPublish}
        isSubmitting={isSubmitting}
      />
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-6 py-6">
        <header className="rounded-xl border border-[#E5E5E8] bg-white px-6 py-4">
          <CreateCourseStepper steps={courseSteps} activeStep={activeStep} />
        </header>

        <div className="flex-1">
          {activeStep === 1 ? (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
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
              />
              <CourseSidebarPanel
                coverImage={form.coverImage}
                tagInput={form.tagInput}
                tags={form.tags}
                onTagInputChange={(value) =>
                  updateBasicField("tagInput", value)
                }
                onAddTag={handleAddTag}
                onRemoveTag={handleRemoveTag}
                onCoverImageSelect={handleCoverImageSelect}
              />
            </div>
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
                disabled={isSubmitting !== null}
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
                  disabled={isSubmitting !== null}
                  className="h-10 min-w-34 border-[#E0E0E2] bg-[#F3F3F5] px-6 text-sm font-medium text-[#313131] hover:bg-[#ECECEF]"
                >
                  {isSubmitting === "draft" ? "Saving..." : "Save as draft"}
                </Button>
                <Button
                  type="button"
                  onClick={handlePublish}
                  disabled={!canPublish || isSubmitting !== null}
                  className="h-10 min-w-34 bg-[#007AFF] px-6 text-sm font-medium text-white hover:bg-[#006DE0]"
                >
                  {isSubmitting === "publish"
                    ? "Publishing..."
                    : "Publish course"}
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

function getCategoryId(
  name: string,
  categories: Array<{ id: string; name: string }>,
) {
  const normalized = name.trim().toLowerCase();
  const match = categories.find(
    (category) => category.name.trim().toLowerCase() === normalized,
  );
  return match?.id ?? null;
}

function validateCourseForm(
  form: CourseCreateForm,
  categories: Array<{ id: string; name: string }>,
  coverImageFile: File | null,
) {
  const steps = [1, 2, 3, 4];

  for (const step of steps) {
    const errors = validateStepForm(form, step, categories, coverImageFile);
    if (errors.length > 0) {
      return errors;
    }
  }

  return [];
}

function validateStepForm(
  form: CourseCreateForm,
  step: number,
  categories: Array<{ id: string; name: string }>,
  coverImageFile: File | null,
) {
  const errors: string[] = [];

  if (step === 1) {
    if (!form.title.trim()) {
      errors.push("Title is required");
    }

    if (!form.category.trim()) {
      errors.push("Category is required");
    } else if (!getCategoryId(form.category, categories)) {
      errors.push("Please select a valid category");
    }

    if (!coverImageFile && !form.coverImage?.previewUrl) {
      errors.push("Cover image is required");
    }
  }

  if (step === 2) {
    if (!form.durationWeeks.trim()) {
      errors.push('"durationWeeks" must be a number');
    } else if (!Number.isFinite(Number(form.durationWeeks))) {
      errors.push('"durationWeeks" must be a number');
    }
  }

  if (step === 3) {
    if (!form.description.trim()) {
      errors.push("Description cannot be empty");
    }
  }

  if (step === 4) {
    if (!form.price.trim() || !Number.isFinite(Number(form.price))) {
      errors.push("Price must be a number");
    }
  }

  return errors;
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

function normalizeDraftForm(overrides: Partial<CourseCreateForm>) {
  const merged: CourseCreateForm = {
    ...initialForm,
    ...overrides,
  };

  return {
    ...merged,
    highlights: ensureAtLeastOne(merged.highlights),
    objectives: ensureAtLeastOne(merged.objectives),
    audience: ensureAtLeastOne(merged.audience),
    prerequisites: ensureAtLeastOne(merged.prerequisites),
  };
}

function mapCourseDetailToForm(
  course: CourseDetail,
  categories: Array<{ id: string; name: string }>,
): Partial<CourseCreateForm> {
  const earlyBirdPrice = normalizeScalar(course.earlyBirdPrice);
  const earlyBirdUntil = course.earlyBirdAvailableUntil ?? "";
  const certificateModuleIds = Array.isArray(course.completionRequiredModuleIds)
    ? course.completionRequiredModuleIds.join(",")
    : "";
  const certificatePassMark = course.completionRequiredPassMark ?? "";

  return {
    title: course.title ?? "",
    slug: course.slug ?? "",
    category: resolveCategoryName(course, categories),
    instructor: resolveInstructorName(course),
    shortDescription: course.shortDescription ?? "",
    tagInput: "",
    tags: normalizeStringArray(course.tags),
    coverImage: buildCoverImage(course.coverImageUrl ?? course.image ?? null),
    depth: pickEnum(course.depth, ALLOWED_DEPTH, "FULL"),
    enrolmentType: pickEnum(
      course.enrollmentType ?? course.enrolmentType,
      ALLOWED_ENROLMENT,
      "COHORT",
    ),
    repeatAccess: pickEnum(
      course.repeatAccess,
      ALLOWED_REPEAT_ACCESS,
      "COURSE_DURATION",
    ),
    durationWeeks:
      course.durationWeeks !== null && course.durationWeeks !== undefined
        ? String(course.durationWeeks)
        : "",
    sessionFrequency: course.sessionFrequency ?? "",
    requiresAccount: course.requiresAccount ?? true,
    isActive: course.isActive ?? true,
    description: course.description ?? "",
    about: course.aboutCourse ?? "",
    highlights: normalizeStringArray(course.highlights),
    objectives: normalizeStringArray(course.objectives),
    audience: normalizeStringArray(course.targetAudience ?? course.audience),
    prerequisites: normalizeStringArray(course.prerequisites),
    price: normalizeScalar(course.basePrice),
    currency: pickEnum(course.currency, ALLOWED_CURRENCY, "GBP"),
    priceNote: course.priceNote ?? "",
    earlyBirdEnabled: Boolean(earlyBirdPrice || earlyBirdUntil),
    earlyBirdPrice,
    earlyBirdUntil,
    syllabusLink: course.syllabusLink ?? "",
    certificateEnabled: Boolean(
      course.completionRequireAllModules ||
      certificatePassMark ||
      certificateModuleIds,
    ),
    certificateRequireAll: Boolean(course.completionRequireAllModules),
    certificatePassMark,
    certificateModuleIds,
  };
}

function resolveCategoryName(
  course: CourseDetail,
  categories: Array<{ id: string; name: string }>,
) {
  if (typeof course.category === "string" && course.category.trim()) {
    return course.category;
  }

  if (
    course.category &&
    typeof course.category === "object" &&
    course.category.name
  ) {
    return course.category.name;
  }

  if (course.categoryName) {
    return course.categoryName;
  }

  const categoryIds = Array.isArray(course.categories)
    ? course.categories
        .map((category) => category?.categoryId)
        .filter((id): id is string => Boolean(id))
    : [];

  for (const categoryId of categoryIds) {
    const match = categories.find((category) => category.id === categoryId);
    if (match) return match.name;
  }

  return "";
}

function resolveInstructorName(course: CourseDetail) {
  const instructors = Array.isArray(course.instructors)
    ? course.instructors
    : [];

  for (const instructor of instructors) {
    if (typeof instructor === "string" && instructor.trim()) {
      return instructor;
    }
    if (
      instructor &&
      typeof instructor === "object" &&
      typeof instructor.name === "string" &&
      instructor.name.trim()
    ) {
      return instructor.name;
    }
  }

  return "";
}

function buildCoverImage(url: string | null) {
  if (!url) return null;
  const name = getFileNameFromUrl(url) ?? "Cover image";
  return {
    name,
    sizeKb: 0,
    previewUrl: url,
  };
}

function getFileNameFromUrl(value: string) {
  try {
    const url = new URL(value);
    const parts = url.pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] ?? null;
  } catch {
    const parts = value.split("/").filter(Boolean);
    return parts[parts.length - 1] ?? null;
  }
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

function normalizeScalar(value: unknown) {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" && Number.isFinite(value)) {
    return value.toString();
  }
  return "";
}

function pickEnum<T extends string>(
  value: unknown,
  allowed: readonly T[],
  fallback: T,
): T {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim().toUpperCase();
  const matched = allowed.find((option) => option === normalized);
  return matched ?? fallback;
}
