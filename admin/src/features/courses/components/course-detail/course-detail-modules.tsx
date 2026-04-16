"use client";

import { useMemo, useState } from "react";
import { GripVertical, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { courseModulesData } from "@/features/courses/data/course-modules";
import {
  CourseDetailModuleViews,
  moduleViews,
  type ModuleView,
} from "./course-detail-module-views";

type DeleteKind = "module" | "submodule" | "lesson";
type ToastTone = "ok" | "danger";

type SubmoduleRow = {
  id: string;
  title: string;
  track: "Live track" | "Reading track";
  status: "Published" | "Draft";
  required: boolean;
  lessons: number;
  order: number;
  prerequisites: string[];
};

type LessonRow = {
  id: string;
  title: string;
  type: "LIVE" | "VIDEO" | "QUIZ" | "READING" | "RESOURCE";
  status: "Published" | "Draft";
  required: boolean;
  duration: string;
  scheduled: string;
  prerequisites: string[];
};

const submodules: SubmoduleRow[] = [
  {
    id: "sub-001",
    title: "Neuroanatomy & functional systems",
    track: "Live track",
    status: "Published",
    required: true,
    lessons: 3,
    order: 10,
    prerequisites: [],
  },
  {
    id: "sub-002",
    title: "Neurophysiology & neurotransmitters",
    track: "Reading track",
    status: "Published",
    required: false,
    lessons: 2,
    order: 20,
    prerequisites: ["sub-001"],
  },
];

const lessons: LessonRow[] = [
  {
    id: "les-001",
    title: "Pre-session quiz: cortical anatomy",
    type: "QUIZ",
    status: "Published",
    required: true,
    duration: "15 min",
    scheduled: "-",
    prerequisites: [],
  },
  {
    id: "les-002",
    title: "Live session: cortical anatomy",
    type: "LIVE",
    status: "Published",
    required: true,
    duration: "90 min",
    scheduled: "28 Jul, 19:00",
    prerequisites: ["les-001"],
  },
  {
    id: "les-003",
    title: "Post-session slides & notes",
    type: "RESOURCE",
    status: "Published",
    required: false,
    duration: "-",
    scheduled: "-",
    prerequisites: ["les-002"],
  },
];

export function CourseDetailModules() {
  const [activeView, setActiveView] = useState<ModuleView>("Module list");
  const [searchModules, setSearchModules] = useState("");
  const [searchSubmodules, setSearchSubmodules] = useState("");
  const [searchLessons, setSearchLessons] = useState("");
  const [lessonFilter, setLessonFilter] = useState<LessonRow["type"] | "All">(
    "All",
  );
  const [deleteKind, setDeleteKind] = useState<DeleteKind>("lesson");
  const [lastView, setLastView] = useState<ModuleView>("Module list");
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

  function goTo(view: ModuleView) {
    if (view !== "Delete confirm") {
      setLastView(view);
    }
    setActiveView(view);
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

  return (
    <div className="space-y-4">
      <CourseDetailModuleViews
        activeView={activeView}
        onViewChange={setActiveView}
        isModule
        data={moduleViews}
      />

      {activeView === "Module list" && (
        <div className="space-y-4">
          <Breadcrumb items={["Courses", "MRCPsych Paper A", "Modules"]} />

          <PageHeader
            title="Modules"
            subtitle="Manage weekly modules for MRCPsych Paper A live course"
            meta={["FULL depth", "COHORT", "6 weeks", "2 cohorts"]}
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
                  <th className="px-3 py-2">SubModules</th>
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
                    <td className="px-3 py-2">{module.subModules}</td>
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
          subtitle="MRCPsych Paper A live course"
          breadcrumbs={["Courses", "MRCPsych Paper A", "Modules", "New"]}
          onCancel={() => goTo("Module list")}
          onSubmit={() => {
            notify("Module created");
            goTo("Module detail");
          }}
          submitLabel="Create module"
          main={<ModuleFormSection />}
          side={
            <VisibilityApiSide endpoint="POST /api/courses/{courseId}/modules" />
          }
        />
      )}

      {activeView === "Module detail" && (
        <div className="space-y-4">
          <Breadcrumb
            items={["Courses", "MRCPsych Paper A", "Modules", "Week 1"]}
          />

          <PageHeader
            title="Week 1 - Neuroscience foundations"
            subtitle="mod-001 · MRCPsych Paper A · Week 1"
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
                  onClick={() => goTo("SubModule list")}
                  className="rounded-lg bg-[#007AFF] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#006DE0]"
                >
                  View submodules
                </button>
              </>
            }
          />

          <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
            <Card title="SubModules">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-wide text-[#6B6B6B]">
                    <th className="border-b border-[#E5E5E8] px-2 py-2">
                      SubModule
                    </th>
                    <th className="border-b border-[#E5E5E8] px-2 py-2">
                      Track
                    </th>
                    <th className="border-b border-[#E5E5E8] px-2 py-2">
                      Status
                    </th>
                    <th className="border-b border-[#E5E5E8] px-2 py-2">
                      Lessons
                    </th>
                    <th className="border-b border-[#E5E5E8] px-2 py-2" />
                  </tr>
                </thead>
                <tbody>
                  {submodules.map((row) => (
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
                  ))}
                </tbody>
              </table>
            </Card>

            <div className="space-y-3">
              <Card title="Details">
                <KeyValues
                  rows={[
                    ["ID", "mod-001"],
                    ["Course", "MRCPsych Paper A"],
                    ["Week", "1"],
                    ["Display order", "10"],
                    ["Duration", "240 mins"],
                    ["SubModules", "2"],
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
            <DangerZone
              body="Deleting this module will also remove submodules, lessons, and learner progress records."
              label="Delete module"
              onDelete={() => openDelete("module")}
            />
          }
        />
      )}

      {activeView === "SubModules" && (
        <InfoPanel
          title="SubModules"
          description="SubModules are grouped topics within a module and can represent live track or reading track content."
          actionLabel="Open submodule list"
          onAction={() => goTo("SubModule list")}
        />
      )}

      {activeView === "SubModule list" && (
        <div className="space-y-4">
          <Breadcrumb items={["Modules", "Week 1", "SubModules"]} />
          <PageHeader
            title="SubModules"
            subtitle="Week 1 - Neuroscience foundations · MRCPsych Paper A"
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

      {activeView === "Create submodule" && (
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
            <VisibilityApiSide endpoint="POST /api/courses/{id}/modules/{id}/submodules" />
          }
        />
      )}

      {activeView === "Edit submodule" && (
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
            <DangerZone
              body="Deleting this submodule will also remove lessons and learner progress records."
              label="Delete submodule"
              onDelete={() => openDelete("submodule")}
            />
          }
        />
      )}

      {activeView === "Lessons" && (
        <InfoPanel
          title="Lessons"
          description="Lessons are the final learning units inside each submodule."
          actionLabel="Open lesson list"
          onAction={() => goTo("Lesson list")}
        />
      )}

      {activeView === "Lesson list" && (
        <div className="space-y-4">
          <Breadcrumb
            items={[
              "Modules",
              "Week 1",
              "SubModules",
              "Neuroanatomy",
              "Lessons",
            ]}
          />
          <PageHeader
            title="Lessons"
            subtitle="Neuroanatomy & functional systems · Week 1 · MRCPsych Paper A"
            meta={["sub-001", "Live track", "3 lessons"]}
            actions={
              <>
                <button
                  type="button"
                  onClick={() => goTo("SubModule list")}
                  className="rounded-lg border border-[#E5E5E8] px-4 py-2 text-[13px] font-semibold text-[#6B6B6B] hover:bg-[#F5F5F7]"
                >
                  SubModules
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
          subtitle="Neuroanatomy & functional systems · sub-001"
          breadcrumbs={["SubModules", "Lessons", "New"]}
          onCancel={() => goTo("Lesson list")}
          onSubmit={() => {
            notify("Lesson created");
            goTo("Lesson detail");
          }}
          submitLabel="Create lesson"
          main={<LessonFormSection />}
          side={
            <VisibilityApiSide endpoint="POST /api/courses/{id}/modules/{id}/submodules/{id}/lessons" />
          }
        />
      )}

      {activeView === "Lesson detail" && (
        <div className="space-y-4">
          <Breadcrumb
            items={["Modules", "Week 1", "SubModules", "Lessons", "les-002"]}
          />

          <PageHeader
            title="Live session: cortical anatomy"
            subtitle="les-002 · sub-001 · mod-001 · MRCPsych Paper A"
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
            <Card title="Content">
              <div className="space-y-3 text-[13px]">
                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#6B6B6B]">
                    Meeting URL
                  </p>
                  <div className="rounded border border-[#E5E5E8] bg-[#F5F5F7] px-3 py-2 text-[#007AFF]">
                    https://zoom.us/j/completedoctor-week1-live
                  </div>
                </div>
                <p className="text-[#6B6B6B]">
                  Interactive live session covering cortical anatomy and
                  functional mapping.
                </p>
              </div>
            </Card>

            <Card title="Details">
              <KeyValues
                rows={[
                  ["ID", "les-002"],
                  ["Type", "LIVE"],
                  ["Published", "Yes"],
                  ["Required", "Yes"],
                  ["Duration", "90 minutes"],
                  ["Scheduled", "28 Jul 2025, 19:00"],
                  ["SubModule", "sub-001"],
                  ["Module", "mod-001"],
                ]}
              />
            </Card>
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
          main={<LessonFormSection />}
          side={
            <DangerZone
              body="Deleting this lesson removes learner progress records for the lesson."
              label="Delete lesson"
              onDelete={() => openDelete("lesson")}
            />
          }
        />
      )}

      {activeView === "Curriculum tree" && (
        <div className="space-y-4">
          <Breadcrumb
            items={["Courses", "MRCPsych Paper A", "Curriculum tree"]}
          />

          <PageHeader
            title="Curriculum tree"
            subtitle="MRCPsych Paper A live course - full module/submodule/lesson structure"
            meta={["FULL depth", "COHORT", "6 modules", "~29 lessons"]}
            actions={
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
            }
          />

          <div className="space-y-2">
            {courseModulesData.map((module, index) => (
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
                    {module.subModules} submodules · {module.lessons} lessons
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
              onClick={() => setActiveView(lastView)}
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

function getDeleteConfig(kind: DeleteKind): {
  title: string;
  body: string;
  warning: string;
  cta: string;
  success: string;
  next: ModuleView;
} {
  if (kind === "module") {
    return {
      title: "Delete this module?",
      body: "You are about to permanently delete Week 1 - Neuroscience foundations (mod-001).",
      warning:
        "This also deletes related submodules, lessons, and learner progress records.",
      cta: "Delete module",
      success: "Module deleted",
      next: "Module list",
    };
  }

  if (kind === "submodule") {
    return {
      title: "Delete this submodule?",
      body: "You are about to permanently delete Neuroanatomy & functional systems (sub-001).",
      warning: "This also deletes all lessons in this submodule.",
      cta: "Delete submodule",
      success: "Submodule deleted",
      next: "SubModule list",
    };
  }

  return {
    title: "Delete this lesson?",
    body: "You are about to permanently delete Live session: cortical anatomy (les-002).",
    warning: "This also deletes learner progress records for this lesson.",
    cta: "Delete lesson",
    success: "Lesson deleted",
    next: "Lesson list",
  };
}

function lessonTone(type: LessonRow["type"]) {
  if (type === "LIVE") return "purple" as const;
  if (type === "QUIZ") return "coral" as const;
  if (type === "READING") return "teal" as const;
  if (type === "VIDEO") return "amber" as const;
  return "gray" as const;
}

function PageHeader({
  title,
  subtitle,
  meta,
  actions,
}: {
  title: string;
  subtitle: string;
  meta?: string[];
  actions?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#E5E5E8] bg-white px-5 py-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-[20px] font-semibold text-[#121212]">{title}</h2>
          {meta && (
            <div className="my-2 flex flex-wrap gap-1.5">
              {meta.map((item) => (
                <Chip key={item} tone="gray">
                  {item}
                </Chip>
              ))}
            </div>
          )}

          <p className="text-[12px] text-[#6B6B6B]">{subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      </div>
    </div>
  );
}

function Breadcrumb({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#6B6B6B]">
      {items.map((item, index) => (
        <span key={`${item}-${index}`}>
          {index > 0 ? <span className="mr-2 text-[#E5E5E8]">/</span> : null}
          {item}
        </span>
      ))}
    </div>
  );
}

// function ContextBanner({
//   name,
//   meta,
//   actionLabel,
//   onAction,
// }: {
//   name: string;
//   meta: string[];
//   actionLabel: string;
//   onAction: () => void;
// }) {
//   return (
//     <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[#E5E5E8] bg-white px-4 py-3">
//       <div className="h-10 w-14 rounded-md bg-gradient-to-br from-[#007AFF] to-[#006DE0]" />
//       <div className="min-w-0 flex-1">
//         <p className="text-[13px] font-semibold text-[#121212]">{name}</p>
//         <div className="mt-1 flex flex-wrap gap-1.5">
//           {meta.map((item) => (
//             <Chip key={item} tone="gray">
//               {item}
//             </Chip>
//           ))}
//         </div>
//       </div>
//       <button
//         type="button"
//         onClick={onAction}
//         className="rounded-md border border-[#E5E5E8] px-3 py-1.5 text-[12px] font-semibold text-[#6B6B6B] hover:bg-[#F5F5F7]"
//       >
//         {actionLabel}
//       </button>
//     </div>
//   );
// }

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-lg border border-[#E5E5E8] bg-white px-4 py-3">
      <p className="text-[20px] font-bold" style={{ color }}>
        {value}
      </p>
      <p className="text-[11px] text-[#6B6B6B]">{label}</p>
    </div>
  );
}

function TableCard({
  search,
  onSearch,
  placeholder,
  countLabel,
  trailing,
  filters,
  children,
}: {
  search: string;
  onSearch: (value: string) => void;
  placeholder: string;
  countLabel: string;
  trailing?: React.ReactNode;
  filters?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#E5E5E8] bg-white">
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E5E5E8] px-3 py-2">
        <div className="relative min-w-[220px] flex-1 sm:max-w-[280px]">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B6B6B]" />
          <input
            type="text"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder={placeholder}
            className="w-full rounded-md border border-[#E5E5E8] bg-[#F5F5F7] py-1.5 pl-8 pr-3 text-[12px] text-[#121212] outline-none focus:border-[#007AFF]"
          />
        </div>
        {filters}
        <span className="ml-auto text-[11px] text-[#6B6B6B]">{countLabel}</span>
        {trailing}
      </div>
      {children}
    </div>
  );
}

function Badge({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "published" | "required" | "optional";
}) {
  const toneClass =
    tone === "published"
      ? "bg-[#EAF3FF] text-[#006DE0]"
      : tone === "required"
        ? "bg-[#EEF3FF] text-[#1D4ED8]"
        : "bg-[#F5F5F7] text-[#6B6B6B]";

  return (
    <span
      className={`rounded px-2 py-1 text-[10px] font-semibold ${toneClass}`}
    >
      {children}
    </span>
  );
}

function Chip({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "purple" | "teal" | "coral" | "amber" | "gray";
}) {
  const toneClass =
    tone === "purple"
      ? "bg-[#EEF3FF] text-[#1D4ED8]"
      : tone === "teal"
        ? "bg-[#EAF3FF] text-[#006DE0]"
        : tone === "coral"
          ? "bg-[#FFF3EE] text-[#C2410C]"
          : tone === "amber"
            ? "bg-[#FFF7E6] text-[#B45309]"
            : "bg-[#F5F5F7] text-[#6B6B6B]";

  return (
    <span
      className={`rounded px-2 py-1 text-[10px] font-semibold ${toneClass}`}
    >
      {children}
    </span>
  );
}

function IconButton({
  onClick,
  icon,
  label,
}: {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#E5E5E8] text-[#6B6B6B] hover:bg-[#F5F5F7]"
    >
      {icon}
    </button>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E5E5E8] bg-white">
      <div className="border-b border-[#E5E5E8] px-4 py-3">
        <h3 className="text-[13px] font-semibold text-[#121212]">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function KeyValues({ rows }: { rows: [string, string][] }) {
  return (
    <div className="space-y-2">
      {rows.map(([k, v]) => (
        <div
          key={k}
          className="flex justify-between gap-3 border-b border-[#E5E5E8] pb-2"
        >
          <span className="text-[11px] text-[#6B6B6B]">{k}</span>
          <span className="text-right text-[12px] font-medium text-[#121212]">
            {v}
          </span>
        </div>
      ))}
    </div>
  );
}

function FormLayout({
  title,
  subtitle,
  breadcrumbs,
  main,
  side,
  submitLabel,
  onCancel,
  onSubmit,
}: {
  title: string;
  subtitle: string;
  breadcrumbs: string[];
  main: React.ReactNode;
  side: React.ReactNode;
  submitLabel: string;
  onCancel: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="space-y-4">
      <Breadcrumb items={breadcrumbs} />
      <PageHeader
        title={title}
        subtitle={subtitle}
        actions={
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-[#E5E5E8] px-4 py-2 text-[13px] font-semibold text-[#6B6B6B] hover:bg-[#F5F5F7]"
          >
            Cancel
          </button>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <div>{main}</div>
        <div>{side}</div>
      </div>

      <div className="flex justify-end gap-2 border-t border-[#E5E5E8] pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px] font-semibold text-[#6B6B6B]"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="rounded-md bg-[#007AFF] px-3 py-2 text-[13px] font-semibold text-white"
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
}

function ModuleFormSection() {
  return (
    <div className="space-y-3">
      <Card title="Basic information">
        <div className="space-y-3">
          <Field label="Module title">
            <input
              type="text"
              defaultValue="Week 1 - Neuroscience foundations"
              className="w-full rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px]"
            />
          </Field>

          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Week number">
              <input
                type="number"
                defaultValue={1}
                className="w-full rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px]"
              />
            </Field>
            <Field label="Display order">
              <input
                type="number"
                defaultValue={10}
                className="w-full rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px]"
              />
            </Field>
          </div>

          <Field label="Description">
            <textarea
              defaultValue="Core neuroanatomy, neurophysiology, and neurotransmitter systems underpinning psychiatric understanding."
              className="min-h-[88px] w-full rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px]"
            />
          </Field>
        </div>
      </Card>

      <Card title="Prerequisites">
        <p className="mb-2 text-[12px] text-[#6B6B6B]">
          Learners must complete listed modules before this one unlocks.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="rounded border border-[#E5E5E8] bg-[#F5F5F7] px-2 py-1 font-mono text-[11px]">
            mod-001
          </span>
        </div>
      </Card>
    </div>
  );
}

function SubmoduleFormSection() {
  return (
    <div className="space-y-3">
      <Card title="Basic information">
        <div className="space-y-3">
          <Field label="SubModule title">
            <input
              type="text"
              defaultValue="Neuroanatomy & functional systems"
              className="w-full rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px]"
            />
          </Field>

          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Display order">
              <input
                type="number"
                defaultValue={10}
                className="w-full rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px]"
              />
            </Field>
            <Field label="Duration (minutes)">
              <input
                type="number"
                defaultValue={90}
                className="w-full rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px]"
              />
            </Field>
          </div>

          <Field label="Description">
            <textarea
              defaultValue="Cortical structures, limbic system, basal ganglia, and their clinical relevance."
              className="min-h-[88px] w-full rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px]"
            />
          </Field>
        </div>
      </Card>

      <Card title="Track & visibility">
        <div className="space-y-2 text-[13px] text-[#6B6B6B]">
          <label className="flex items-center gap-2 rounded-md border border-[#007AFF] bg-[#EAF3FF] px-3 py-2">
            <input type="radio" name="track" defaultChecked />
            Live track (required)
          </label>
          <label className="flex items-center gap-2 rounded-md border border-[#E5E5E8] px-3 py-2">
            <input type="radio" name="track" />
            Reading track (optional)
          </label>
        </div>
      </Card>
    </div>
  );
}

function LessonFormSection() {
  return (
    <div className="space-y-3">
      <Card title="Lesson type">
        <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-5">
          {[
            ["LIVE", "Zoom session with schedule"],
            ["VIDEO", "Pre-recorded video"],
            ["QUIZ", "Assessment link"],
            ["READING", "Guided reading"],
            ["RESOURCE", "Downloadable files"],
          ].map(([type, desc]) => (
            <label
              key={type}
              className="rounded-md border border-[#E5E5E8] px-3 py-2 text-[12px] hover:bg-[#F5F5F7]"
            >
              <input
                type="radio"
                name="lesson-type"
                defaultChecked={type === "LIVE"}
                className="mr-2"
              />
              <span className="font-semibold text-[#121212]">{type}</span>
              <p className="mt-1 text-[11px] text-[#6B6B6B]">{desc}</p>
            </label>
          ))}
        </div>
      </Card>

      <Card title="Content">
        <div className="space-y-3">
          <Field label="Title">
            <input
              type="text"
              defaultValue="Live session: cortical anatomy"
              className="w-full rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px]"
            />
          </Field>

          <Field label="Description">
            <textarea
              defaultValue="Interactive live session covering cortical anatomy and functional mapping."
              className="min-h-[88px] w-full rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px]"
            />
          </Field>

          <Field label="Meeting URL">
            <input
              type="url"
              defaultValue="https://zoom.us/j/completedoctor-week1-live"
              className="w-full rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px]"
            />
          </Field>
        </div>
      </Card>
    </div>
  );
}

function VisibilityApiSide({ endpoint }: { endpoint: string }) {
  return (
    <div className="space-y-3">
      <Card title="Visibility">
        <div className="space-y-2 text-[13px] text-[#6B6B6B]">
          <label className="flex items-center justify-between rounded-md border border-[#E5E5E8] bg-[#F5F5F7] px-3 py-2">
            Published
            <input type="checkbox" defaultChecked />
          </label>
          <label className="flex items-center justify-between rounded-md border border-[#E5E5E8] bg-[#F5F5F7] px-3 py-2">
            Required
            <input type="checkbox" defaultChecked />
          </label>
        </div>
      </Card>
      <Card title="API preview">
        <p className="mb-2 text-[11px] text-[#6B6B6B]">{endpoint}</p>
        <pre className="overflow-auto rounded-md bg-[#F5F5F7] p-2 text-[10px] text-[#6B6B6B]">
          {`{
  "title": "...",
  "isPublished": true,
  "isRequired": true
}`}
        </pre>
      </Card>
    </div>
  );
}

function DangerZone({
  body,
  label,
  onDelete,
}: {
  body: string;
  label: string;
  onDelete: () => void;
}) {
  return (
    <Card title="Danger zone">
      <p className="mb-3 text-[12px] text-[#6B6B6B]">{body}</p>
      <button
        type="button"
        onClick={onDelete}
        className="rounded-md border border-[#D92D20] px-3 py-2 text-[12px] font-semibold text-[#D92D20] hover:bg-[#FEECEC]"
      >
        {label}
      </button>
    </Card>
  );
}

function InfoPanel({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div className="rounded-xl border border-[#E5E5E8] bg-white p-6 text-center">
      <h3 className="text-[18px] font-semibold text-[#121212]">{title}</h3>
      <p className="mx-auto mt-2 max-w-[680px] text-[13px] text-[#6B6B6B]">
        {description}
      </p>
      <button
        type="button"
        onClick={onAction}
        className="mt-4 rounded-md bg-[#007AFF] px-3 py-2 text-[13px] font-semibold text-white"
      >
        {actionLabel}
      </button>
    </div>
  );
}

function InfoMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-r-md border-l-4 border-[#007AFF] bg-[#F5F5F7] px-3 py-2 text-[12px] text-[#6B6B6B]">
      {children}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-[#6B6B6B]">
        {label}
      </span>
      {children}
    </label>
  );
}
