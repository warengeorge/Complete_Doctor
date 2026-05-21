"use client";

import { useEffect, useMemo, useState } from "react";

import { useCourseModuleDetailQuery } from "@/features/courses/services/useCourseModuleDetailQuery";
import { useCourseModulesQuery } from "@/features/courses/services/useCourseModulesQuery";

import {
  CourseDetailModuleViews,
  type ModuleView,
} from "../course-detail-module-views";
import { lessons } from "./data";
import {
  CreateLessonTab,
  CreateModuleTab,
  CreateSubmoduleTab,
  CurriculumTreeTab,
  DeleteConfirmTab,
  EditLessonTab,
  EditModuleTab,
  EditSubmoduleTab,
  LessonDetailTab,
  LessonListTab,
  ModuleDetailTab,
  ModuleListTab,
  SubmoduleListTab,
} from "./tabs";
import type {
  CourseDepth,
  DeleteKind,
  LessonRow,
  ModuleRow,
  ModuleSubmoduleRow,
  ToastTone,
} from "./types";
import {
  getAvailableModuleViews,
  getDefaultViewForDepth,
  getDeleteConfig,
  normalizeCourseDepth,
} from "./utils";
import {
  countLessonsFromSubModules,
  countSubmoduleLessons,
  formatDisplayDate,
  getWeekLabel,
  mapSubmoduleRow,
} from "./view-helpers";

type CourseDetailModulesProps = {
  courseId?: string | null;
  depth?: string | null;
  courseTitle?: string | null;
};

export function CourseDetailModules({
  courseId,
  depth,
  courseTitle,
}: CourseDetailModulesProps) {
  const modulesQuery = useCourseModulesQuery(courseId ?? undefined);
  const courseDepth = useMemo<CourseDepth>(
    () => normalizeCourseDepth(depth),
    [depth],
  );
  const courseName = useMemo(() => {
    const value = courseTitle?.trim();
    return value && value.length > 0 ? value : "Course";
  }, [courseTitle]);
  const availableViews = useMemo(
    () => getAvailableModuleViews(courseDepth),
    [courseDepth],
  );
  const defaultView = useMemo(
    () => getDefaultViewForDepth(courseDepth),
    [courseDepth],
  );
  const hasModules = courseDepth !== "FLAT";
  const hasSubmodules = courseDepth === "FULL";

  const [activeView, setActiveView] = useState<ModuleView>(defaultView);
  const [searchModules, setSearchModules] = useState("");
  const [searchSubmodules, setSearchSubmodules] = useState("");
  const [searchLessons, setSearchLessons] = useState("");
  const [lessonFilter, setLessonFilter] = useState<LessonRow["type"] | "All">(
    "All",
  );
  const [deleteKind, setDeleteKind] = useState<DeleteKind>("lesson");
  const [lastView, setLastView] = useState<ModuleView>(defaultView);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    tone: ToastTone;
  } | null>(null);

  const moduleRows = useMemo<ModuleRow[]>(() => {
    const apiRows = modulesQuery.data ?? [];

    return apiRows.map((module) => {
      const submoduleCount = Array.isArray(module.subModules)
        ? module.subModules.length
        : 0;
      const lessonCount = Array.isArray(module.subModules)
        ? module.subModules.reduce<number>(
            (sum, item) => sum + countSubmoduleLessons(item),
            0,
          )
        : 0;

      return {
        id: module.id,
        title: module.title,
        description: module.description?.trim() || "No description provided.",
        week:
          typeof module.weekNumber === "number"
            ? `Week ${module.weekNumber}`
            : "—",
        weekNumber: module.weekNumber,
        status: module.isPublished ? "Published" : "Draft",
        required: module.isRequired,
        subModules: submoduleCount,
        lessons: lessonCount,
        prerequisites: [],
        displayOrder: module.displayOrder,
        duration: module.duration,
        createdAt: module.createdAt,
      };
    });
  }, [modulesQuery.data]);

  const selectedModule = useMemo(() => {
    if (moduleRows.length === 0) {
      return null;
    }

    if (!selectedModuleId) {
      return moduleRows[0];
    }

    return moduleRows.find((row) => row.id === selectedModuleId) ?? moduleRows[0];
  }, [moduleRows, selectedModuleId]);

  const moduleDetailQuery = useCourseModuleDetailQuery(
    courseId ?? undefined,
    selectedModule?.id,
  );
  const selectedModuleDetail = moduleDetailQuery.data;

  const selectedModuleTitle =
    selectedModuleDetail?.title ?? selectedModule?.title ?? "Module";
  const selectedModuleIdentifier =
    selectedModuleDetail?.id ?? selectedModule?.id ?? "—";
  const selectedModuleWeekLabel =
    getWeekLabel(selectedModuleDetail?.weekNumber) !== "—"
      ? getWeekLabel(selectedModuleDetail?.weekNumber)
      : selectedModule?.week ?? "—";
  const selectedModuleSubmoduleCount = Array.isArray(
    selectedModuleDetail?.subModules,
  )
    ? selectedModuleDetail.subModules.length
    : selectedModule?.subModules ?? 0;
  const selectedModuleLessonCount = Array.isArray(selectedModuleDetail?.subModules)
    ? countLessonsFromSubModules(selectedModuleDetail.subModules)
    : selectedModule?.lessons ?? 0;
  const selectedModuleDescription =
    selectedModuleDetail?.description?.trim() ||
    selectedModule?.description ||
    "No description provided.";
  const selectedModuleDuration =
    selectedModuleDetail?.duration ?? selectedModule?.duration ?? null;
  const selectedModuleDisplayOrder =
    selectedModuleDetail?.displayOrder ?? selectedModule?.displayOrder ?? 0;
  const selectedModuleCreatedAt =
    selectedModuleDetail?.createdAt ?? selectedModule?.createdAt ?? "";
  const selectedModuleIsPublished =
    selectedModuleDetail?.isPublished ?? selectedModule?.status === "Published";
  const selectedModuleIsRequired =
    selectedModuleDetail?.isRequired ?? selectedModule?.required ?? false;
  const selectedModuleMediaCount = Array.isArray(selectedModuleDetail?.media)
    ? selectedModuleDetail.media.length
    : 0;
  const selectedModuleAssessmentCount = Array.isArray(
    selectedModuleDetail?.assessments,
  )
    ? selectedModuleDetail.assessments.length
    : 0;

  const moduleSubmodules = useMemo<ModuleSubmoduleRow[]>(() => {
    if (!Array.isArray(selectedModuleDetail?.subModules)) {
      return [];
    }

    return selectedModuleDetail.subModules.map((item, index) =>
      mapSubmoduleRow(item, index),
    );
  }, [selectedModuleDetail?.subModules]);

  const stats = useMemo(() => {
    const totalModules = moduleRows.length;
    const requiredModules = moduleRows.filter((m) => m.required).length;
    const publishedModules = moduleRows.filter(
      (m) => m.status === "Published",
    ).length;
    const totalLessons = moduleRows.reduce((sum, row) => sum + row.lessons, 0);

    return {
      totalModules,
      requiredModules,
      publishedModules,
      totalLessons,
    };
  }, [moduleRows]);

  const filteredModules = useMemo(() => {
    const term = searchModules.trim().toLowerCase();
    if (!term) return moduleRows;

    return moduleRows.filter((row) => {
      const hay = [row.id, row.title, row.week, ...row.prerequisites]
        .join(" ")
        .toLowerCase();
      return hay.includes(term);
    });
  }, [moduleRows, searchModules]);

  const filteredSubmodules = useMemo(() => {
    const term = searchSubmodules.trim().toLowerCase();
    if (!term) return moduleSubmodules;

    return moduleSubmodules.filter((row) => {
      const hay = [row.id, row.title, row.track, ...row.prerequisites]
        .join(" ")
        .toLowerCase();
      return hay.includes(term);
    });
  }, [moduleSubmodules, searchSubmodules]);

  const filteredLessons = useMemo(() => {
    const term = searchLessons.trim().toLowerCase();

    return lessons.filter((row) => {
      const matchesType = lessonFilter === "All" || row.type === lessonFilter;
      const hay = [row.id, row.title, row.type, ...row.prerequisites]
        .join(" ")
        .toLowerCase();
      const matchesSearch = !term || hay.includes(term);
      return matchesType && matchesSearch;
    });
  }, [lessonFilter, searchLessons]);

  function resolveView(view: ModuleView): ModuleView {
    if (availableViews.includes(view)) {
      return view;
    }

    return defaultView;
  }

  function goTo(view: ModuleView) {
    const nextView = resolveView(view);

    if (view !== "Delete confirm") {
      setLastView(nextView);
    }

    setActiveView(nextView);
  }

  function openDelete(kind: DeleteKind) {
    setDeleteKind(kind);
    setLastView(activeView);
    setActiveView("Delete confirm");
  }

  function notify(message: string, tone: ToastTone = "ok") {
    setToast({ message, tone });
    setTimeout(() => setToast(null), 2200);
  }

  const deleteConfig = getDeleteConfig(deleteKind);

  useEffect(() => {
    if (!availableViews.includes(activeView)) {
      setActiveView(defaultView);
    }

    if (!availableViews.includes(lastView)) {
      setLastView(defaultView);
    }
  }, [activeView, availableViews, defaultView, lastView]);

  useEffect(() => {
    if (!selectedModule && selectedModuleId) {
      setSelectedModuleId(null);
      return;
    }

    if (selectedModule && selectedModule.id !== selectedModuleId) {
      setSelectedModuleId(selectedModule.id);
    }
  }, [selectedModule, selectedModuleId]);

  return (
    <div className="space-y-4">
      <CourseDetailModuleViews
        activeView={activeView}
        onViewChange={goTo}
        isModule
        data={availableViews}
      />

      {activeView === "Module list" && (
        <ModuleListTab
          courseName={courseName}
          courseDepth={courseDepth}
          hasSubmodules={hasSubmodules}
          stats={stats}
          searchModules={searchModules}
          onSearchModules={setSearchModules}
          filteredModules={filteredModules}
          isLoading={modulesQuery.isLoading}
          isError={modulesQuery.isError}
          onOpenCurriculumTree={() => goTo("Curriculum tree")}
          onOpenCreateModule={() => goTo("Create module")}
          onOpenModuleDetail={(moduleId) => {
            setSelectedModuleId(moduleId);
            goTo("Module detail");
          }}
          onOpenEditModule={(moduleId) => {
            setSelectedModuleId(moduleId);
            goTo("Edit module");
          }}
          onOpenDeleteModule={(moduleId) => {
            setSelectedModuleId(moduleId);
            openDelete("module");
          }}
          onNotifyReorder={() => notify("Reorder mode coming soon")}
        />
      )}

      {activeView === "Create module" && (
        <CreateModuleTab
          courseName={courseName}
          onCancel={() => goTo("Module list")}
          onSubmit={() => {
            notify("Module created");
            goTo("Module detail");
          }}
        />
      )}

      {activeView === "Module detail" && (
        <ModuleDetailTab
          courseName={courseName}
          hasSubmodules={hasSubmodules}
          selectedModuleTitle={selectedModuleTitle}
          selectedModuleIdentifier={selectedModuleIdentifier}
          selectedModuleWeekLabel={selectedModuleWeekLabel}
          selectedModuleSubmoduleCount={selectedModuleSubmoduleCount}
          selectedModuleLessonCount={selectedModuleLessonCount}
          selectedModuleDisplayOrder={selectedModuleDisplayOrder}
          selectedModuleDuration={selectedModuleDuration}
          selectedModuleIsPublished={selectedModuleIsPublished}
          selectedModuleIsRequired={selectedModuleIsRequired}
          selectedModuleMediaCount={selectedModuleMediaCount}
          selectedModuleAssessmentCount={selectedModuleAssessmentCount}
          selectedModuleCreatedAt={selectedModuleCreatedAt}
          selectedModuleDescription={selectedModuleDescription}
          selectedModuleAvailable={Boolean(selectedModule)}
          detailLoading={moduleDetailQuery.isLoading}
          detailError={moduleDetailQuery.isError}
          moduleSubmodules={moduleSubmodules}
          filteredLessons={filteredLessons}
          onOpenDeleteModule={() => openDelete("module")}
          onOpenEditModule={() => goTo("Edit module")}
          onOpenNext={() => goTo(hasSubmodules ? "SubModule list" : "Lesson list")}
          onOpenLessonDetail={() => goTo("Lesson detail")}
          onOpenEditLesson={() => goTo("Edit lesson")}
          onOpenDeleteLesson={() => openDelete("lesson")}
          onOpenEditSubmodule={() => goTo("Edit submodule")}
          onOpenDeleteSubmodule={() => openDelete("submodule")}
          onGoTo={goTo}
          formatDisplayDate={formatDisplayDate}
        />
      )}

      {activeView === "Edit module" && (
        <EditModuleTab
          selectedModuleTitle={selectedModuleTitle}
          selectedModuleIdentifier={selectedModuleIdentifier}
          selectedModuleWeekLabel={selectedModuleWeekLabel}
          onCancel={() => goTo("Module detail")}
          onSubmit={() => {
            notify("Module saved");
            goTo("Module detail");
          }}
          onDeleteModule={() => openDelete("module")}
        />
      )}

      {hasSubmodules && activeView === "SubModule list" && (
        <SubmoduleListTab
          courseName={courseName}
          selectedModuleTitle={selectedModuleTitle}
          selectedModuleIdentifier={selectedModuleIdentifier}
          selectedModuleWeekLabel={selectedModuleWeekLabel}
          selectedModuleSubmoduleCount={selectedModuleSubmoduleCount}
          selectedModuleLessonCount={selectedModuleLessonCount}
          searchSubmodules={searchSubmodules}
          onSearchSubmodules={setSearchSubmodules}
          filteredSubmodules={filteredSubmodules}
          onOpenModuleDetail={() => goTo("Module detail")}
          onOpenCreateSubmodule={() => goTo("Create submodule")}
          onOpenLessonList={() => goTo("Lesson list")}
          onOpenEditSubmodule={() => goTo("Edit submodule")}
          onOpenDeleteSubmodule={() => openDelete("submodule")}
        />
      )}

      {hasSubmodules && activeView === "Create submodule" && (
        <CreateSubmoduleTab
          selectedModuleTitle={selectedModuleTitle}
          selectedModuleWeekLabel={selectedModuleWeekLabel}
          onCancel={() => goTo("SubModule list")}
          onSubmit={() => {
            notify("Submodule created");
            goTo("Lesson list");
          }}
        />
      )}

      {hasSubmodules && activeView === "Edit submodule" && (
        <EditSubmoduleTab
          selectedModuleWeekLabel={selectedModuleWeekLabel}
          onCancel={() => goTo("SubModule list")}
          onSubmit={() => {
            notify("Submodule saved");
            goTo("SubModule list");
          }}
          onDeleteSubmodule={() => openDelete("submodule")}
        />
      )}

      {activeView === "Lesson list" && (
        <LessonListTab
          hasSubmodules={hasSubmodules}
          hasModules={hasModules}
          courseName={courseName}
          selectedModuleWeekLabel={selectedModuleWeekLabel}
          selectedModuleTitle={selectedModuleTitle}
          selectedModuleIdentifier={selectedModuleIdentifier}
          selectedModuleLessonCount={selectedModuleLessonCount}
          searchLessons={searchLessons}
          onSearchLessons={setSearchLessons}
          lessonFilter={lessonFilter}
          onLessonFilterChange={setLessonFilter}
          filteredLessons={filteredLessons}
          onGoTo={goTo}
          onOpenDeleteLesson={() => openDelete("lesson")}
        />
      )}

      {activeView === "Create lesson" && (
        <CreateLessonTab
          hasSubmodules={hasSubmodules}
          hasModules={hasModules}
          courseName={courseName}
          selectedModuleTitle={selectedModuleTitle}
          selectedModuleIdentifier={selectedModuleIdentifier}
          onCancel={() => goTo("Lesson list")}
          onSubmit={() => {
            notify("Lesson created");
            goTo("Lesson detail");
          }}
        />
      )}

      {activeView === "Lesson detail" && (
        <LessonDetailTab
          hasSubmodules={hasSubmodules}
          hasModules={hasModules}
          selectedModuleWeekLabel={selectedModuleWeekLabel}
          selectedModuleIdentifier={selectedModuleIdentifier}
          courseName={courseName}
          onOpenDeleteLesson={() => openDelete("lesson")}
          onGoTo={goTo}
          onNotify={notify}
        />
      )}

      {activeView === "Edit lesson" && (
        <EditLessonTab
          onCancel={() => goTo("Lesson detail")}
          onSubmit={() => {
            notify("Lesson saved");
            goTo("Lesson detail");
          }}
          onDeleteLesson={() => openDelete("lesson")}
        />
      )}

      {activeView === "Curriculum tree" && (
        <CurriculumTreeTab
          courseName={courseName}
          courseDepth={courseDepth}
          hasModules={hasModules}
          hasSubmodules={hasSubmodules}
          moduleRows={moduleRows}
          totalLessons={stats.totalLessons}
          onGoTo={goTo}
          onOpenEditModule={(moduleId) => {
            setSelectedModuleId(moduleId);
            goTo("Edit module");
          }}
        />
      )}

      {activeView === "Delete confirm" && (
        <DeleteConfirmTab
          deleteConfig={deleteConfig}
          onCancel={() => setActiveView(resolveView(lastView))}
          onConfirm={() => {
            notify(deleteConfig.success, "danger");
            goTo(deleteConfig.next);
          }}
        />
      )}

      {toast ? (
        <div
          className={`fixed bottom-5 right-5 z-40 rounded-lg px-4 py-2 text-[12px] font-semibold text-white shadow-lg ${
            toast.tone === "danger" ? "bg-[#D92D20]" : "bg-[#007AFF]"
          }`}
        >
          {toast.message}
        </div>
      ) : null}
    </div>
  );
}
