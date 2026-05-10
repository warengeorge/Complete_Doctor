"use client";

import { useEffect, useMemo, useState } from "react";
import { GripVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { courseModulesData } from "@/features/courses/data/course-modules";
import {
  CourseDetailModuleViews,
  type ModuleView,
} from "../course-detail-module-views";
import { lessons, submodules } from "./data";
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
  InfoMessage,
  InfoPanel,
  KeyValues,
  LessonFormSection,
  ModuleFormSection,
  PageHeader,
  StatCard,
  SubmoduleFormSection,
  TableCard,
  VisibilityApiSide,
} from "./shared";
import type { CourseDepth, DeleteKind, LessonRow, ToastTone } from "./types";
import {
  getAvailableModuleViews,
  getDefaultViewForDepth,
  getDeleteConfig,
  lessonTone,
  normalizeCourseDepth,
} from "./utils";

type CourseDetailModulesProps = {
  depth?: string | null;
  courseTitle?: string | null;
};

export function CourseDetailModules({
  depth,
  courseTitle,
}: CourseDetailModulesProps) {
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
  const [toast, setToast] = useState<{
    message: string;
    tone: ToastTone;
  } | null>(null);

  const stats = useMemo(() => {
    const totalModules = courseModulesData.length;
    const requiredModules = courseModulesData.filter((m) => m.required).length;
    const publishedModules = courseModulesData.filter(
      (m) => m.status === "Published",
    ).length;
    const totalLessons = courseModulesData.reduce(
      (sum, row) => sum + row.lessons,
      0,
    );

    return {
      totalModules,
      requiredModules,
      publishedModules,
      totalLessons,
    };
  }, []);

  const filteredModules = useMemo(() => {
    const term = searchModules.trim().toLowerCase();
    if (!term) return courseModulesData;

    return courseModulesData.filter((row) => {
      const hay = [row.id, row.title, row.week, ...row.prerequisites]
        .join(" ")
        .toLowerCase();
      return hay.includes(term);
    });
  }, [searchModules]);

  const filteredSubmodules = useMemo(() => {
    const term = searchSubmodules.trim().toLowerCase();
    if (!term) return submodules;

    return submodules.filter((row) => {
      const hay = [row.id, row.title, row.track, ...row.prerequisites]
        .join(" ")
        .toLowerCase();
      return hay.includes(term);
    });
  }, [searchSubmodules]);

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

  return (
    <div className="space-y-4">
      <CourseDetailModuleViews
        activeView={activeView}
        onViewChange={goTo}
        isModule
        data={availableViews}
      />

      {activeView === "Module list" && (
        <div className="space-y-4">
          <Breadcrumb items={["Courses", courseName, "Modules"]} />

          <PageHeader
            title="Modules"
            subtitle={`Manage weekly modules for ${courseName}`}
            meta={[`${courseDepth} depth`, "COHORT", "6 weeks", "2 cohorts"]}
            actions={
              <>
                <button
                  type="button"
                  onClick={() => goTo("Curriculum tree")}
                  className="rounded-lg border border-[#E5E5E8] bg-white px-4 py-2 text-[13px] font-semibold text-[#6B6B6B] hover:bg-[#F5F5F7]"
                >
                  Curriculum tree
                </button>
                <button
                  type="button"
                  onClick={() => goTo("Create module")}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#007AFF] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#006DE0]"
                >
                  <Plus className="h-4 w-4" />
                  New module
                </button>
              </>
            }
          />

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total modules"
              value={stats.totalModules}
              color="#007AFF"
            />
            <StatCard
              label="Required modules"
              value={stats.requiredModules}
              color="#534AB7"
            />
            <StatCard
              label="Published"
              value={stats.publishedModules}
              color="#007AFF"
            />
            <StatCard
              label="Total lessons"
              value={stats.totalLessons}
              color="#6B6B6B"
            />
          </div>

          <TableCard
            search={searchModules}
            onSearch={setSearchModules}
            placeholder="Search modules..."
            countLabel={`${filteredModules.length} modules`}
            trailing={
              <button
                type="button"
                onClick={() => notify("Reorder mode coming soon")}
                className="rounded-md border border-[#E5E5E8] px-3 py-1.5 text-[12px] font-medium text-[#6B6B6B] hover:bg-[#F5F5F7]"
              >
                Reorder
              </button>
            }
          >
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#F5F5F7] text-left text-[11px] uppercase tracking-wide text-[#6B6B6B]">
                  <th className="px-3 py-2" />
                  <th className="px-3 py-2">Module</th>
                  <th className="px-3 py-2">Week</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Required</th>
                  {hasSubmodules ? (
                    <th className="px-3 py-2">SubModules</th>
                  ) : null}
                  <th className="px-3 py-2">Lessons</th>
                  <th className="px-3 py-2">Prerequisites</th>
                  <th className="px-3 py-2" />
                </tr>
              </thead>
              <tbody>
                {filteredModules.map((module) => (
                  <tr
                    key={module.id}
                    className="cursor-pointer border-t border-[#E5E5E8] text-[13px] hover:bg-[#F5F5F7]"
                    onClick={() => goTo("Module detail")}
                  >
                    <td className="px-3 py-2 text-[#6B6B6B]">
                      <GripVertical className="h-4 w-4" />
                    </td>
                    <td className="px-3 py-2">
                      <p className="font-semibold text-[#121212]">
                        {module.title}
                      </p>
                      <p className="text-[11px] text-[#6B6B6B]">{module.id}</p>
                    </td>
                    <td className="px-3 py-2 text-[#6B6B6B]">{module.week}</td>
                    <td className="px-3 py-2">
                      <Badge tone="published">{module.status}</Badge>
                    </td>
                    <td className="px-3 py-2">
                      <Badge tone={module.required ? "required" : "optional"}>
                        {module.required ? "Required" : "Optional"}
                      </Badge>
                    </td>
                    {hasSubmodules ? (
                      <td className="px-3 py-2">{module.subModules}</td>
                    ) : null}
                    <td className="px-3 py-2">{module.lessons}</td>
                    <td className="px-3 py-2">
                      {module.prerequisites.length ? (
                        <span className="rounded bg-[#F5F5F7] px-2 py-1 font-mono text-[10px] text-[#6B6B6B]">
                          {module.prerequisites.join(", ")}
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
                            goTo("Edit module");
                          }}
                          label="Edit module"
                          icon={<Pencil className="h-3.5 w-3.5" />}
                        />
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            openDelete("module");
                          }}
                          label="Delete module"
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
        <div className="space-y-4">
          <Breadcrumb
            items={["Courses", courseName, "Modules", "Week 1"]}
          />

          <PageHeader
            title="Week 1 - Neuroscience foundations"
            subtitle={`mod-001 · ${courseName} · Week 1`}
            actions={
              <>
                <button
                  type="button"
                  onClick={() => openDelete("module")}
                  className="rounded-lg border border-[#E5E5E8] px-4 py-2 text-[13px] font-semibold text-[#D92D20] hover:bg-[#FEECEC]"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => goTo("Edit module")}
                  className="rounded-lg border border-[#007AFF] px-4 py-2 text-[13px] font-semibold text-[#007AFF] hover:bg-[#EAF3FF]"
                >
                  Edit module
                </button>
                <button
                  type="button"
                  onClick={() => goTo(hasSubmodules ? "SubModule list" : "Lesson list")}
                  className="rounded-lg bg-[#007AFF] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#006DE0]"
                >
                  {hasSubmodules ? "View submodules" : "View lessons"}
                </button>
              </>
            }
          />

          <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
            <Card title={hasSubmodules ? "SubModules" : "Lessons"}>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-wide text-[#6B6B6B]">
                    <th className="border-b border-[#E5E5E8] px-2 py-2">
                      {hasSubmodules ? "SubModule" : "Lesson"}
                    </th>
                    {hasSubmodules ? (
                      <th className="border-b border-[#E5E5E8] px-2 py-2">Track</th>
                    ) : (
                      <th className="border-b border-[#E5E5E8] px-2 py-2">Type</th>
                    )}
                    <th className="border-b border-[#E5E5E8] px-2 py-2">
                      Status
                    </th>
                    <th className="border-b border-[#E5E5E8] px-2 py-2">
                      {hasSubmodules ? "Lessons" : "Duration"}
                    </th>
                    <th className="border-b border-[#E5E5E8] px-2 py-2" />
                  </tr>
                </thead>
                <tbody>
                  {hasSubmodules
                    ? submodules.map((row) => (
                        <tr
                          key={row.id}
                          onClick={() => goTo("Lesson list")}
                          className="cursor-pointer border-b border-[#E5E5E8] text-[13px] hover:bg-[#F5F5F7]"
                        >
                          <td className="px-2 py-2">
                            <p className="font-semibold">{row.title}</p>
                            <p className="text-[11px] text-[#6B6B6B]">{row.id}</p>
                          </td>
                          <td className="px-2 py-2">
                            <Chip
                              tone={row.track === "Live track" ? "purple" : "teal"}
                            >
                              {row.track}
                            </Chip>
                          </td>
                          <td className="px-2 py-2">
                            <Badge tone="published">{row.status}</Badge>
                          </td>
                          <td className="px-2 py-2">{row.lessons}</td>
                          <td className="px-2 py-2">
                            <div className="flex justify-end gap-1">
                              <IconButton
                                onClick={(e) => {
                                  e.stopPropagation();
                                  goTo("Edit submodule");
                                }}
                                label="Edit submodule"
                                icon={<Pencil className="h-3.5 w-3.5" />}
                              />
                              <IconButton
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openDelete("submodule");
                                }}
                                label="Delete submodule"
                                icon={<Trash2 className="h-3.5 w-3.5" />}
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    : filteredLessons.map((row) => (
                        <tr
                          key={row.id}
                          onClick={() => goTo("Lesson detail")}
                          className="cursor-pointer border-b border-[#E5E5E8] text-[13px] hover:bg-[#F5F5F7]"
                        >
                          <td className="px-2 py-2">
                            <p className="font-semibold">{row.title}</p>
                            <p className="text-[11px] text-[#6B6B6B]">{row.id}</p>
                          </td>
                          <td className="px-2 py-2">
                            <Chip tone={lessonTone(row.type)}>{row.type}</Chip>
                          </td>
                          <td className="px-2 py-2">
                            <Badge tone="published">{row.status}</Badge>
                          </td>
                          <td className="px-2 py-2">{row.duration}</td>
                          <td className="px-2 py-2">
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
            </Card>

            <div className="space-y-3">
              <Card title="Details">
                <KeyValues
                  rows={[
                    ["ID", "mod-001"],
                    ["Course", courseName],
                    ["Week", "1"],
                    ["Display order", "10"],
                    ["Duration", "240 mins"],
                    ...(hasSubmodules ? ([["SubModules", "2"]] as [string, string][]) : []),
                    ["Lessons", "5"],
                    ["Published", "Yes"],
                    ["Required", "Yes"],
                  ]}
                />
              </Card>
              <Card title="Description">
                <p className="text-[13px] leading-relaxed text-[#6B6B6B]">
                  Core neuroanatomy, neurophysiology, and neurotransmitter
                  systems underpinning psychiatric understanding.
                </p>
              </Card>
            </div>
          </div>
        </div>
      )}

      {activeView === "Edit module" && (
        <FormLayout
          title="Edit module"
          subtitle="Week 1 - Neuroscience foundations · mod-001"
          breadcrumbs={["Modules", "Week 1", "Edit"]}
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

      {hasSubmodules && activeView === "SubModules" && (
        <InfoPanel
          title="SubModules"
          description="SubModules are grouped topics within a module and can represent live track or reading track content."
          actionLabel="Open submodule list"
          onAction={() => goTo("SubModule list")}
        />
      )}

      {hasSubmodules && activeView === "SubModule list" && (
        <div className="space-y-4">
          <Breadcrumb items={["Modules", "Week 1", "SubModules"]} />
          <PageHeader
            title="SubModules"
            subtitle={`Week 1 - Neuroscience foundations · ${courseName}`}
            meta={["mod-001", "Week 1", "2 submodules", "5 lessons total"]}
            actions={
              <>
                <button
                  type="button"
                  onClick={() => goTo("Module detail")}
                  className="rounded-lg border border-[#E5E5E8] px-4 py-2 text-[13px] font-semibold text-[#6B6B6B] hover:bg-[#F5F5F7]"
                >
                  Module detail
                </button>
                <button
                  type="button"
                  onClick={() => goTo("Create submodule")}
                  className="rounded-lg bg-[#007AFF] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#006DE0]"
                >
                  New submodule
                </button>
              </>
            }
          />

          {/* <ContextBanner
            name="Week 1 - Neuroscience foundations"
            actionLabel="Module detail"
            onAction={() => goTo("Module detail")}
          /> */}

          <InfoMessage>
            SubModules are topic clusters within a module. Full-depth courses
            usually include a live track and a reading track.
          </InfoMessage>

          <TableCard
            search={searchSubmodules}
            onSearch={setSearchSubmodules}
            placeholder="Search submodules..."
            countLabel={`${filteredSubmodules.length} submodules`}
          >
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#F5F5F7] text-left text-[11px] uppercase tracking-wide text-[#6B6B6B]">
                  <th className="px-3 py-2" />
                  <th className="px-3 py-2">SubModule</th>
                  <th className="px-3 py-2">Track</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Required</th>
                  <th className="px-3 py-2">Lessons</th>
                  <th className="px-3 py-2">Order</th>
                  <th className="px-3 py-2">Prerequisites</th>
                  <th className="px-3 py-2" />
                </tr>
              </thead>
              <tbody>
                {filteredSubmodules.map((row) => (
                  <tr
                    key={row.id}
                    className="cursor-pointer border-t border-[#E5E5E8] text-[13px] hover:bg-[#F5F5F7]"
                    onClick={() => goTo("Lesson list")}
                  >
                    <td className="px-3 py-2 text-[#6B6B6B]">
                      <GripVertical className="h-4 w-4" />
                    </td>
                    <td className="px-3 py-2">
                      <p className="font-semibold">{row.title}</p>
                      <p className="text-[11px] text-[#6B6B6B]">{row.id}</p>
                    </td>
                    <td className="px-3 py-2">
                      <Chip
                        tone={row.track === "Live track" ? "purple" : "teal"}
                      >
                        {row.track}
                      </Chip>
                    </td>
                    <td className="px-3 py-2">
                      <Badge tone="published">{row.status}</Badge>
                    </td>
                    <td className="px-3 py-2">
                      <Badge tone={row.required ? "required" : "optional"}>
                        {row.required ? "Required" : "Optional"}
                      </Badge>
                    </td>
                    <td className="px-3 py-2">{row.lessons}</td>
                    <td className="px-3 py-2">{row.order}</td>
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
                            goTo("Edit submodule");
                          }}
                          label="Edit submodule"
                          icon={<Pencil className="h-3.5 w-3.5" />}
                        />
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            openDelete("submodule");
                          }}
                          label="Delete submodule"
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

      {hasSubmodules && activeView === "Create submodule" && (
        <FormLayout
          title="New submodule"
          subtitle="Week 1 - Neuroscience foundations"
          breadcrumbs={["Modules", "Week 1", "SubModules", "New"]}
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
          breadcrumbs={["Week 1", "SubModules", "Edit"]}
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
                ? ["Modules", "Week 1", "SubModules", "Neuroanatomy", "Lessons"]
                : hasModules
                  ? ["Modules", "Week 1", "Lessons"]
                  : ["Courses", courseName, "Lessons"]
            }
          />
          <PageHeader
            title="Lessons"
            subtitle={
              hasSubmodules
                ? `Neuroanatomy & functional systems · Week 1 · ${courseName}`
                : hasModules
                  ? `Week 1 - Neuroscience foundations · ${courseName}`
                  : courseName
            }
            meta={
              hasSubmodules
                ? ["sub-001", "Live track", "3 lessons"]
                : hasModules
                  ? ["mod-001", "3 lessons"]
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
                ? "Week 1 - Neuroscience foundations · mod-001"
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
                ? ["Modules", "Week 1", "SubModules", "Lessons", "les-002"]
                : hasModules
                  ? ["Modules", "Week 1", "Lessons", "les-002"]
                  : ["Courses", "Lessons", "les-002"]
            }
          />

          <PageHeader
            title="Live session: cortical anatomy"
            subtitle={
              hasSubmodules
                ? `les-002 · sub-001 · mod-001 · ${courseName}`
                : hasModules
                  ? `les-002 · mod-001 · ${courseName}`
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
                    ...(hasModules ? ([["Module", "mod-001"]] as [string, string][]) : []),
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
                    `${courseModulesData.length} modules`,
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
              ? courseModulesData.map((module, index) => (
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
                      <Badge tone="published">Published</Badge>
                      <Badge tone="required">Required</Badge>
                      <span className="text-[11px] text-[#6B6B6B]">
                        {hasSubmodules
                          ? `${module.subModules} submodules · ${module.lessons} lessons`
                          : `${module.lessons} lessons`}
                      </span>
                      <button
                        type="button"
                        onClick={() => goTo("Edit module")}
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
