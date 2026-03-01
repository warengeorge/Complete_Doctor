"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { courseSteps, descriptionMaxLength } from "./constants";
import { CourseContentForm } from "./components/course-content-form";
import { CourseContentSidebar } from "./components/course-content-sidebar";
import { CourseOverviewForm } from "./components/course-overview-form";
import { CourseScheduleForm } from "./components/course-schedule-form";
import { CourseScheduleSidebar } from "./components/course-schedule-sidebar";
import { CourseSidebarPanel } from "./components/course-sidebar-panel";
import { CreateCourseHeader } from "./components/create-course-header";
import { CreateCourseStepper } from "./components/create-course-stepper";
import type {
  CourseContentAsset,
  CourseCreateForm,
  CourseModule,
  CourseScheduleEntry,
} from "./types";

type EditableField = "courseName" | "category" | "price" | "description" | "tagInput";

function createModule(id: string): CourseModule {
  return {
    id,
    title: "",
    description: "",
    subModules: [""],
  };
}

function createSchedule(id: string): CourseScheduleEntry {
  return {
    id,
    moduleId: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    location: "",
  };
}

const initialForm: CourseCreateForm = {
  courseName: "",
  category: "",
  price: "",
  description: "",
  learningOutcomes: [""],
  modules: [createModule("module-1")],
  lectureNotes: null,
  lectureVideos: null,
  studyMaterials: null,
  schedules: [createSchedule("schedule-1")],
  tagInput: "",
  tags: [],
  coverImage: null,
};

export function CourseCreateView() {
  const [activeStep, setActiveStep] = useState(1);
  const [form, setForm] = useState<CourseCreateForm>(initialForm);
  const moduleCounterRef = useRef(1);
  const scheduleCounterRef = useRef(1);
  const coverImageUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (coverImageUrlRef.current) {
        URL.revokeObjectURL(coverImageUrlRef.current);
      }
    };
  }, []);

  const canPublish = useMemo(
    () => Boolean(form.courseName.trim() && form.category.trim()),
    [form.category, form.courseName],
  );

  const updateField = (name: EditableField, value: string) => {
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

  const handleRemoveLearningOutcome = (index: number) => {
    setForm((prev) => {
      if (prev.learningOutcomes.length <= 1) return prev;
      return {
        ...prev,
        learningOutcomes: prev.learningOutcomes.filter((_, i) => i !== index),
      };
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

  const handleCoverImageSelect = (file: File | null) => {
    if (coverImageUrlRef.current) {
      URL.revokeObjectURL(coverImageUrlRef.current);
      coverImageUrlRef.current = null;
    }

    if (!file) {
      setForm((prev) => ({
        ...prev,
        coverImage: null,
      }));
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    coverImageUrlRef.current = previewUrl;

    setForm((prev) => ({
      ...prev,
      coverImage: {
        name: file.name,
        sizeKb: Math.max(1, Math.round(file.size / 1024)),
        previewUrl,
      },
    }));
  };

  const handleAddModule = () => {
    moduleCounterRef.current += 1;
    setForm((prev) => ({
      ...prev,
      modules: [...prev.modules, createModule(`module-${moduleCounterRef.current}`)],
    }));
  };

  const handleRemoveModule = (moduleId: string) => {
    setForm((prev) => {
      if (prev.modules.length <= 1) return prev;
      return {
        ...prev,
        modules: prev.modules.filter((module) => module.id !== moduleId),
      };
    });
  };

  const handleModuleFieldChange = (
    moduleId: string,
    field: "title" | "description",
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === moduleId ? { ...module, [field]: value } : module,
      ),
    }));
  };

  const handleSubModuleChange = (
    moduleId: string,
    subModuleIndex: number,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      modules: prev.modules.map((module) => {
        if (module.id !== moduleId) return module;
        const updatedSubModules = [...module.subModules];
        updatedSubModules[subModuleIndex] = value;
        return { ...module, subModules: updatedSubModules };
      }),
    }));
  };

  const handleAddSubModule = (moduleId: string) => {
    setForm((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === moduleId
          ? { ...module, subModules: [...module.subModules, ""] }
          : module,
      ),
    }));
  };

  const handleRemoveSubModule = (moduleId: string, subModuleIndex: number) => {
    setForm((prev) => ({
      ...prev,
      modules: prev.modules.map((module) => {
        if (module.id !== moduleId) return module;
        if (module.subModules.length <= 1) return module;
        return {
          ...module,
          subModules: module.subModules.filter((_, index) => index !== subModuleIndex),
        };
      }),
    }));
  };

  const handleAssetSelect = (
    key: "lectureNotes" | "lectureVideos" | "studyMaterials",
    file: File | null,
  ) => {
    const asset: CourseContentAsset | null = file
      ? { name: file.name, sizeKb: Math.max(1, Math.round(file.size / 1024)) }
      : null;

    setForm((prev) => ({
      ...prev,
      [key]: asset,
    }));
  };

  const handleAddSchedule = () => {
    scheduleCounterRef.current += 1;
    setForm((prev) => ({
      ...prev,
      schedules: [
        ...prev.schedules,
        createSchedule(`schedule-${scheduleCounterRef.current}`),
      ],
    }));
  };

  const handleRemoveSchedule = (scheduleId: string) => {
    setForm((prev) => {
      if (prev.schedules.length <= 1) return prev;
      return {
        ...prev,
        schedules: prev.schedules.filter((schedule) => schedule.id !== scheduleId),
      };
    });
  };

  const handleScheduleFieldChange = (
    scheduleId: string,
    field: keyof Omit<CourseScheduleEntry, "id">,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      schedules: prev.schedules.map((schedule) =>
        schedule.id === scheduleId ? { ...schedule, [field]: value } : schedule,
      ),
    }));
  };

  const handleSaveSchedule = (scheduleId: string) => {
    const selected = form.schedules.find((schedule) => schedule.id === scheduleId);
    console.log("Save schedule", selected);
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

  const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, 3));
  const handlePrevious = () => setActiveStep((prev) => Math.max(prev - 1, 1));

  return (
    <section className="w-full space-y-6 ">
      <CreateCourseHeader
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
      />
      <CreateCourseStepper steps={courseSteps} activeStep={activeStep} />

      <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        {activeStep === 1 ? (
          <>
            <div className="min-w-0">
              <CourseOverviewForm
                form={form}
                onChange={updateField}
                onLearningOutcomeChange={handleLearningOutcomeChange}
                onAddLearningOutcome={handleAddLearningOutcome}
                onRemoveLearningOutcome={handleRemoveLearningOutcome}
              />
            </div>

            <div className="min-w-0">
              <CourseSidebarPanel
                coverImage={form.coverImage}
                tagInput={form.tagInput}
                tags={form.tags}
                onTagInputChange={(value) => updateField("tagInput", value)}
                onAddTag={handleAddTag}
                onRemoveTag={handleRemoveTag}
                onCoverImageSelect={handleCoverImageSelect}
                onNext={handleNext}
              />
            </div>
          </>
        ) : activeStep === 2 ? (
          <>
            <div className="min-w-0">
              <CourseContentForm
                modules={form.modules}
                onAddModule={handleAddModule}
                onAddAnotherModule={handleAddModule}
                onRemoveModule={handleRemoveModule}
                onModuleFieldChange={handleModuleFieldChange}
                onSubModuleChange={handleSubModuleChange}
                onAddSubModule={handleAddSubModule}
                onRemoveSubModule={handleRemoveSubModule}
              />
            </div>
            <div className="min-w-0">
              <CourseContentSidebar
                lectureNotes={form.lectureNotes}
                lectureVideos={form.lectureVideos}
                studyMaterials={form.studyMaterials}
                onLectureNotesSelect={(file) =>
                  handleAssetSelect("lectureNotes", file)
                }
                onLectureVideosSelect={(file) =>
                  handleAssetSelect("lectureVideos", file)
                }
                onStudyMaterialsSelect={(file) =>
                  handleAssetSelect("studyMaterials", file)
                }
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
            </div>
          </>
        ) : (
          <>
            <div className="min-w-0">
              <CourseScheduleForm
                modules={form.modules}
                schedules={form.schedules}
                onAddSchedule={handleAddSchedule}
                onAddAnotherSchedule={handleAddSchedule}
                onRemoveSchedule={handleRemoveSchedule}
                onScheduleFieldChange={handleScheduleFieldChange}
                onSaveSchedule={handleSaveSchedule}
              />
            </div>
            <div className="min-w-0">
              <CourseScheduleSidebar
                schedules={form.schedules}
                onPrevious={handlePrevious}
                onFinish={handlePublish}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
