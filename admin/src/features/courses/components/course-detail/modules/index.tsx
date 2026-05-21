"use client";

import { useEffect, useMemo, useState } from "react";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { useCourseModuleDetailQuery } from "@/features/courses/services/useCourseModuleDetailQuery";
import { useCourseModulesQuery } from "@/features/courses/services/useCourseModulesQuery";
import {
  CourseDetailModuleViews,
  type ModuleView,
} from "../course-detail-module-views";
import { lessons } from "./data";
import { ModuleDetailSection } from "./module-detail-section";
import { ModuleListSection } from "./module-list-section";
import {
  Badge,
  Breadcrumb,
  Card,
  Chip,
  DangerZone,
  EditLessonFormSection,
  EditLessonSide,
  FormLayout,
  IconButton,
  KeyValues,
  LessonFormSection,
  ModuleFormSection,
  PageHeader,
  StatCard,
  SubmoduleFormSection,
  TableCard,
  VisibilityApiSide,
} from "./shared";
import { SubmoduleListSection } from "./submodule-list-section";
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
  lessonTone,
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

  const selectedModuleTitle = selectedModuleDetail?.title ?? selectedModule?.title ?? "Module";
  const selectedModuleIdentifier = selectedModuleDetail?.id ?? selectedModule?.id ?? "—";
  const selectedModuleWeekLabel =
    getWeekLabel(selectedModuleDetail?.weekNumber) !== "—"
      ? getWeekLabel(selectedModuleDetail?.weekNumber)
      : selectedModule?.week ?? "—";
  const selectedModuleSubmoduleCount = Array.isArray(selectedModuleDetail?.subModules)
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
        <ModuleListSection
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
        <FormLayout
          title="New module"
          subtitle={courseName}
          breadcrumbs={["Courses", courseName, "Modules", "New"]}
          onCancel={() => goTo("Module list")}
          onSubmit={() => {
            notify("Module created");
            goTo("Module detail");
          }}
          submitLabel="Create module"
          main={<ModuleFormSection />}
          side={
            <VisibilityApiSide
              showApiPreview={false}
              showCoverImageUpload
              variant="module"
            />
          }
        />
      )}

      {activeView === "Module detail" && (
        <ModuleDetailSection
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
        <FormLayout
          title="Edit module"
          subtitle={`${selectedModuleTitle} · ${selectedModuleIdentifier}`}
          breadcrumbs={["Modules", selectedModuleWeekLabel, "Edit"]}
          onCancel={() => goTo("Module detail")}
          onSubmit={() => {
            notify("Module saved");
            goTo("Module detail");
          }}
          submitLabel="Save changes"
          main={<ModuleFormSection />}
          side={
            <div className="space-y-3">
              <VisibilityApiSide showApiPreview={false} variant="module" />
              <DangerZone
                body="Deleting this module will also remove submodules, lessons, and learner progress records."
                label="Delete module"
                onDelete={() => openDelete("module")}
              />
            </div>
          }
        />
      )}

      {hasSubmodules && activeView === "SubModule list" && (
        <SubmoduleListSection
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
        <FormLayout
          title="New submodule"
          subtitle={selectedModuleTitle}
          breadcrumbs={["Modules", selectedModuleWeekLabel, "SubModules", "New"]}
          onCancel={() => goTo("SubModule list")}
          onSubmit={() => {
            notify("Submodule created");
            goTo("Lesson list");
          }}
          submitLabel="Create submodule"
          main={<SubmoduleFormSection />}
          side={
            <VisibilityApiSide
              showApiPreview={false}
              showCoverImageUpload
              variant="submodule"
            />
          }
        />
      )}

      {hasSubmodules && activeView === "Edit submodule" && (
        <FormLayout
          title="Edit submodule"
          subtitle="Neuroanatomy & functional systems · sub-001"
          breadcrumbs={[selectedModuleWeekLabel, "SubModules", "Edit"]}
          onCancel={() => goTo("SubModule list")}
          onSubmit={() => {
            notify("Submodule saved");
            goTo("SubModule list");
          }}
          submitLabel="Save changes"
          main={<SubmoduleFormSection />}
          side={
            <div className="space-y-3">
              <VisibilityApiSide showApiPreview={false} variant="submodule" />
              <DangerZone
                body="Deleting this submodule will also remove lessons and learner progress records."
                label="Delete submodule"
                onDelete={() => openDelete("submodule")}
              />
            </div>
          }
        />
      )}

      {activeView === "Lesson list" && (
        <div className="space-y-4">
          <Breadcrumb
            items={
              hasSubmodules
                ? [
                    "Modules",
                    selectedModuleWeekLabel,
                    "SubModules",
                    "Neuroanatomy",
                    "Lessons",
                  ]
                : hasModules
                  ? ["Modules", selectedModuleWeekLabel, "Lessons"]
                  : ["Courses", courseName, "Lessons"]
            }
          />
          <PageHeader
            title="Lessons"
            subtitle={
              hasSubmodules
                ? `Neuroanatomy & functional systems · ${selectedModuleWeekLabel} · ${courseName}`
                : hasModules
                  ? `${selectedModuleTitle} · ${courseName}`
                  : courseName
            }
            meta={
              hasSubmodules
                ? ["sub-001", "Live track", "3 lessons"]
                : hasModules
                  ? [selectedModuleIdentifier, `${selectedModuleLessonCount} lessons`]
                  : ["3 lessons"]
            }
            actions={
              <>
                {hasSubmodules ? (
                  <button
                    type="button"
                    onClick={() => goTo("SubModule list")}
                    className="rounded-lg border border-[#E5E5E8] px-4 py-2 text-[13px] font-semibold text-[#6B6B6B] hover:bg-[#F5F5F7]"
                  >
                    SubModules
                  </button>
                ) : hasModules ? (
                  <button
                    type="button"
                    onClick={() => goTo("Module detail")}
                    className="rounded-lg border border-[#E5E5E8] px-4 py-2 text-[13px] font-semibold text-[#6B6B6B] hover:bg-[#F5F5F7]"
                  >
                    Module detail
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => goTo("Curriculum tree")}
                  className="rounded-lg border border-[#E5E5E8] px-4 py-2 text-[13px] font-semibold text-[#6B6B6B] hover:bg-[#F5F5F7]"
                >
                  Curriculum tree
                </button>
                <button
                  type="button"
                  onClick={() => goTo("Create lesson")}
                  className="rounded-lg bg-[#007AFF] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#006DE0]"
                >
                  New lesson
                </button>
              </>
            }
          />

          <TableCard
            search={searchLessons}
            onSearch={setSearchLessons}
            placeholder="Search lessons..."
            countLabel={`${filteredLessons.length} lessons`}
            filters={
              <div className="flex gap-1">
                {["All", "LIVE", "QUIZ", "RESOURCE"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() =>
                      setLessonFilter(type as LessonRow["type"] | "All")
                    }
                    className={`rounded-md border px-2.5 py-1 text-[11px] font-semibold ${
                      lessonFilter === type
                        ? "border-[#007AFF] bg-[#EAF3FF] text-[#007AFF]"
                        : "border-[#E5E5E8] text-[#6B6B6B] hover:bg-[#F5F5F7]"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            }
          >
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#F5F5F7] text-left text-[11px] uppercase tracking-wide text-[#6B6B6B]">
                  <th className="px-3 py-2" />
                  <th className="px-3 py-2">Lesson</th>
                  <th className="px-3 py-2">Type</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Required</th>
                  <th className="px-3 py-2">Duration</th>
                  <th className="px-3 py-2">Scheduled</th>
                  <th className="px-3 py-2">Prerequisites</th>
                  <th className="px-3 py-2" />
                </tr>
              </thead>
              <tbody>
                {filteredLessons.map((row) => (
                  <tr
                    key={row.id}
                    className="cursor-pointer border-t border-[#E5E5E8] text-[13px] hover:bg-[#F5F5F7]"
                    onClick={() => goTo("Lesson detail")}
                  >
                    <td className="px-3 py-2 text-[#6B6B6B]">
                      <GripVertical className="h-4 w-4" />
                    </td>
                    <td className="px-3 py-2">
                      <p className="font-semibold">{row.title}</p>
                      <p className="text-[11px] text-[#6B6B6B]">{row.id}</p>
                    </td>
                    <td className="px-3 py-2">
                      <Chip tone={lessonTone(row.type)}>{row.type}</Chip>
                    </td>
                    <td className="px-3 py-2">
                      <Badge tone="published">{row.status}</Badge>
                    </td>
                    <td className="px-3 py-2">
                      <Badge tone={row.required ? "required" : "optional"}>
                        {row.required ? "Required" : "Optional"}
                      </Badge>
                    </td>
                    <td className="px-3 py-2">{row.duration}</td>
                    <td className="px-3 py-2">{row.scheduled}</td>
                    <td className="px-3 py-2">
                      {row.prerequisites.length ? (
                        <span className="rounded bg-[#F5F5F7] px-2 py-1 font-mono text-[10px]">
                          {row.prerequisites.join(", ")}
                        </span>
                      ) : (
                        <span className="text-[#6B6B6B]">-</span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex justify-end gap-1">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            goTo("Edit lesson");
                          }}
                          label="Edit lesson"
                          icon={<Pencil className="h-3.5 w-3.5" />}
                        />
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            openDelete("lesson");
                          }}
                          label="Delete lesson"
                          icon={<Trash2 className="h-3.5 w-3.5" />}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableCard>
        </div>
      )}

      {activeView === "Create lesson" && (
        <FormLayout
          title="New lesson"
          subtitle={
            hasSubmodules
              ? "Neuroanatomy & functional systems · sub-001"
              : hasModules
                ? `${selectedModuleTitle} · ${selectedModuleIdentifier}`
                : courseName
          }
          breadcrumbs={
            hasSubmodules
              ? ["SubModules", "Lessons", "New"]
              : hasModules
                ? ["Modules", "Lessons", "New"]
                : ["Courses", "Lessons", "New"]
          }
          onCancel={() => goTo("Lesson list")}
          onSubmit={() => {
            notify("Lesson created");
            goTo("Lesson detail");
          }}
          submitLabel="Create lesson"
          main={<LessonFormSection />}
          side={
            <VisibilityApiSide
              variant="lesson"
              endpoint={
                hasSubmodules
                  ? "POST /api/courses/{id}/modules/{id}/submodules/{id}/lessons"
                  : hasModules
                    ? "POST /api/courses/{id}/modules/{id}/lessons"
                    : "POST /api/courses/{id}/lessons"
              }
            />
          }
        />
      )}

      {activeView === "Lesson detail" && (
        <div className="space-y-4">
          <Breadcrumb
            items={
              hasSubmodules
                ? [
                    "Modules",
                    selectedModuleWeekLabel,
                    "SubModules",
                    "Lessons",
                    "les-002",
                  ]
                : hasModules
                  ? ["Modules", selectedModuleWeekLabel, "Lessons", "les-002"]
                  : ["Courses", "Lessons", "les-002"]
            }
          />

          <PageHeader
            title="Live session: cortical anatomy"
            subtitle={
              hasSubmodules
                ? `les-002 · sub-001 · ${selectedModuleIdentifier} · ${courseName}`
                : hasModules
                  ? `les-002 · ${selectedModuleIdentifier} · ${courseName}`
                  : `les-002 · ${courseName}`
            }
            actions={
              <>
                <button
                  type="button"
                  onClick={() => openDelete("lesson")}
                  className="rounded-lg border border-[#E5E5E8] px-4 py-2 text-[13px] font-semibold text-[#D92D20] hover:bg-[#FEECEC]"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => goTo("Edit lesson")}
                  className="rounded-lg border border-[#007AFF] px-4 py-2 text-[13px] font-semibold text-[#007AFF] hover:bg-[#EAF3FF]"
                >
                  Edit lesson
                </button>
                <button
                  type="button"
                  onClick={() => goTo("Lesson list")}
                  className="rounded-lg border border-[#E5E5E8] px-4 py-2 text-[13px] font-semibold text-[#6B6B6B] hover:bg-[#F5F5F7]"
                >
                  Lessons
                </button>
              </>
            }
          />

          <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              <Card
                title="Content"
                action={
                  <button
                    type="button"
                    onClick={() => goTo("Edit lesson")}
                    className="rounded-md border border-[#007AFF] px-3 py-1 text-[12px] font-semibold text-[#007AFF] hover:bg-[#EAF3FF]"
                  >
                    Edit
                  </button>
                }
              >
                <div className="space-y-4 text-[13px]">
                  <div>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#6B6B6B]">
                      Meeting URL
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2 rounded border border-[#E5E5E8] bg-[#F5F5F7] px-3 py-2">
                      <span className="text-[#007AFF]">
                        https://zoom.us/j/completedoctor-week1-live
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => notify("Meeting URL copied")}
                          className="rounded-md border border-[#E5E5E8] px-2 py-1 text-[12px] font-medium text-[#6B6B6B] hover:bg-white"
                        >
                          Copy
                        </button>
                        <button
                          type="button"
                          onClick={() => notify("Open link action coming soon")}
                          className="rounded-md border border-[#E5E5E8] px-2 py-1 text-[12px] font-medium text-[#007AFF] hover:bg-white"
                        >
                          Open
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#6B6B6B]">
                      Description
                    </p>
                    <p className="text-[14px] text-[#121212]">
                      Interactive live session covering cortical anatomy and
                      functional mapping.
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[#6B6B6B]">
                      Attachments (1)
                    </p>
                    <div className="flex flex-wrap items-center gap-2 rounded-md border border-[#E5E5E8] bg-[#F5F5F7] px-3 py-2">
                      <span className="text-[16px] text-[#6B6B6B]">📄</span>
                      <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-[#121212]">
                        Week 1 live session slides.pdf
                      </span>
                      <span className="text-[12px] text-[#6B6B6B]">1.8 MB</span>
                      <button
                        type="button"
                        onClick={() => notify("Download action coming soon")}
                        className="rounded-md border border-[#E5E5E8] px-2 py-1 text-[12px] font-medium text-[#6B6B6B] hover:bg-white"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Prerequisites & gates">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[#6B6B6B]">
                      Unlocked by completing
                    </p>
                    <span className="inline-flex rounded bg-[#FFF3EE] px-2 py-1 font-mono text-[11px] text-[#C2410C]">
                      les-001 · Pre-session quiz
                    </span>
                  </div>
                  <div>
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[#6B6B6B]">
                      Completing this unlocks
                    </p>
                    <span className="inline-flex rounded bg-[#F5F5F7] px-2 py-1 font-mono text-[11px] text-[#6B6B6B]">
                      les-003 · Post-session slides
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <Card
                title="Details"
                action={
                  <button
                    type="button"
                    onClick={() => goTo("Edit lesson")}
                    className="rounded-md border border-[#007AFF] px-3 py-1 text-[12px] font-semibold text-[#007AFF] hover:bg-[#EAF3FF]"
                  >
                    Edit
                  </button>
                }
              >
                <KeyValues
                  rows={[
                    ["ID", "les-002"],
                    ["Type", "LIVE"],
                    ["Published", "Yes"],
                    ["Required", "Yes"],
                    ["Duration", "90 minutes"],
                    ["Scheduled", "28 Jul 2025 · 19:00"],
                    ["Ends", "28 Jul 2025 · 20:30"],
                    ["Display order", "20"],
                    ...(hasSubmodules ? ([["SubModule", "sub-001"]] as [string, string][]) : []),
                    ...(hasModules
                      ? ([["Module", selectedModuleIdentifier]] as [string, string][])
                      : []),
                    ["Created", "1 Jan 2025"],
                  ]}
                />
              </Card>

              <Card title="Learner progress">
                <KeyValues
                  rows={[
                    ["Completed", "0"],
                    ["In progress", "0"],
                    ["Not started", "0"],
                  ]}
                />
              </Card>
            </div>
          </div>
        </div>
      )}

      {activeView === "Edit lesson" && (
        <FormLayout
          title="Edit lesson"
          subtitle="Live session: cortical anatomy · les-002"
          breadcrumbs={["Lessons", "les-002", "Edit"]}
          onCancel={() => goTo("Lesson detail")}
          onSubmit={() => {
            notify("Lesson saved");
            goTo("Lesson detail");
          }}
          submitLabel="Save changes"
          main={<EditLessonFormSection />}
          side={<EditLessonSide onDelete={() => openDelete("lesson")} />}
        />
      )}

      {activeView === "Curriculum tree" && (
        <div className="space-y-4">
          <Breadcrumb items={["Courses", courseName, "Curriculum tree"]} />

          <PageHeader
            title="Curriculum tree"
            subtitle={
              hasSubmodules
                ? `${courseName} - full module/submodule/lesson structure`
                : hasModules
                  ? `${courseName} - module/lesson structure`
                  : `${courseName} - lesson structure`
            }
            meta={
              hasModules
                ? [
                    `${courseDepth} depth`,
                    "COHORT",
                    `${moduleRows.length} modules`,
                    `${stats.totalLessons} lessons`,
                  ]
                : [`${courseDepth} depth`, "COHORT", `${lessons.length} lessons`]
            }
            actions={
              <>
                {hasModules ? (
                  <>
                    <button
                      type="button"
                      onClick={() => goTo("Module list")}
                      className="rounded-lg border border-[#E5E5E8] px-4 py-2 text-[13px] font-semibold text-[#6B6B6B] hover:bg-[#F5F5F7]"
                    >
                      Module list
                    </button>
                    <button
                      type="button"
                      onClick={() => goTo("Create module")}
                      className="rounded-lg bg-[#007AFF] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#006DE0]"
                    >
                      New module
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => goTo("Lesson list")}
                      className="rounded-lg border border-[#E5E5E8] px-4 py-2 text-[13px] font-semibold text-[#6B6B6B] hover:bg-[#F5F5F7]"
                    >
                      Lesson list
                    </button>
                    <button
                      type="button"
                      onClick={() => goTo("Create lesson")}
                      className="rounded-lg bg-[#007AFF] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#006DE0]"
                    >
                      New lesson
                    </button>
                  </>
                )}
              </>
            }
          />

          <div className="space-y-2">
            {hasModules
              ? moduleRows.map((module, index) => (
                  <div
                    key={module.id}
                    className="rounded-lg border border-[#E5E5E8] bg-white px-4 py-3"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <GripVertical className="h-4 w-4 text-[#6B6B6B]" />
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#F5F5F7] text-[10px] font-semibold text-[#6B6B6B]">
                        {index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-semibold text-[#121212]">
                          {module.title}
                        </p>
                        <p className="text-[11px] text-[#6B6B6B]">{module.id}</p>
                      </div>
                      <Badge tone="published">{module.status}</Badge>
                      <Badge tone={module.required ? "required" : "optional"}>
                        {module.required ? "Required" : "Optional"}
                      </Badge>
                      <span className="text-[11px] text-[#6B6B6B]">
                        {hasSubmodules
                          ? `${module.subModules} submodules · ${module.lessons} lessons`
                          : `${module.lessons} lessons`}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedModuleId(module.id);
                          goTo("Edit module");
                        }}
                        className="rounded-md border border-[#007AFF] px-2 py-1 text-[11px] font-semibold text-[#007AFF] hover:bg-[#EAF3FF]"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))
              : lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className="rounded-lg border border-[#E5E5E8] bg-white px-4 py-3"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <GripVertical className="h-4 w-4 text-[#6B6B6B]" />
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#F5F5F7] text-[10px] font-semibold text-[#6B6B6B]">
                        {index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-semibold text-[#121212]">
                          {lesson.title}
                        </p>
                        <p className="text-[11px] text-[#6B6B6B]">{lesson.id}</p>
                      </div>
                      <Chip tone={lessonTone(lesson.type)}>{lesson.type}</Chip>
                      <Badge tone="published">{lesson.status}</Badge>
                      <span className="text-[11px] text-[#6B6B6B]">
                        {lesson.duration}
                      </span>
                      <button
                        type="button"
                        onClick={() => goTo("Edit lesson")}
                        className="rounded-md border border-[#007AFF] px-2 py-1 text-[11px] font-semibold text-[#007AFF] hover:bg-[#EAF3FF]"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      )}

      {activeView === "Delete confirm" && (
        <div className="rounded-xl border border-[#E5E5E8] bg-white p-6">
          <h3 className="text-[18px] font-semibold text-[#121212]">
            {deleteConfig.title}
          </h3>
          <p className="mt-2 text-[13px] text-[#6B6B6B]">{deleteConfig.body}</p>
          <p className="mt-3 rounded-md bg-[#FEECEC] px-3 py-2 text-[12px] text-[#D92D20]">
            {deleteConfig.warning}
          </p>
          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setActiveView(resolveView(lastView))}
              className="rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px] font-semibold text-[#6B6B6B]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                notify(deleteConfig.success, "danger");
                goTo(deleteConfig.next);
              }}
              className="rounded-md bg-[#D92D20] px-3 py-2 text-[13px] font-semibold text-white"
            >
              {deleteConfig.cta}
            </button>
          </div>
        </div>
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
