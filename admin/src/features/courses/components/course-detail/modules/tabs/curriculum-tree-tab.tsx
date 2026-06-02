import { GripVertical } from "lucide-react";

import type { ModuleView } from "../../course-detail-module-views";
import { Badge, Breadcrumb, Chip, InfoMessage, PageHeader } from "../shared";
import type { LessonRow, ModuleRow, ModuleSubmoduleRow } from "../types";
import { lessonTone } from "../utils";

type CurriculumTreeTabProps = {
  courseName: string;
  courseDepth: string;
  hasModules: boolean;
  hasSubmodules: boolean;
  isLoading: boolean;
  isError: boolean;
  moduleRows: ModuleRow[];
  curriculumModules: Array<{
    module: ModuleRow;
    submodules: ModuleSubmoduleRow[];
    lessons: LessonRow[];
  }>;
  totalLessons: number;
  flatLessons: LessonRow[];
  onGoTo: (view: ModuleView) => void;
  onOpenEditModule: (moduleId: string) => void;
  onOpenEditSubmodule: (moduleId: string, submoduleId: string) => void;
  onOpenEditLesson: (
    moduleId: string,
    submoduleId: string | null,
    lessonId: string,
  ) => void;
};

export function CurriculumTreeTab({
  courseName,
  courseDepth,
  hasModules,
  hasSubmodules,
  isLoading,
  isError,
  moduleRows,
  curriculumModules,
  totalLessons,
  flatLessons,
  onGoTo,
  onOpenEditModule,
  onOpenEditSubmodule,
  onOpenEditLesson,
}: CurriculumTreeTabProps) {
  return (
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
            ? [`${courseDepth} depth`, "COHORT", `${moduleRows.length} modules`, `${totalLessons} lessons`]
            : [`${courseDepth} depth`, "COHORT", `${flatLessons.length} lessons`]
        }
        actions={
          <>
            {hasModules ? (
              <>
                <button
                  type="button"
                  onClick={() => onGoTo("Module list")}
                  className="rounded-lg border border-[#E5E5E8] px-4 py-2 text-[13px] font-semibold text-[#6B6B6B] hover:bg-[#F5F5F7]"
                >
                  Module list
                </button>
                <button
                  type="button"
                  onClick={() => onGoTo("Create module")}
                  className="rounded-lg bg-[#007AFF] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#006DE0]"
                >
                  New module
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => onGoTo("Lesson list")}
                  className="rounded-lg border border-[#E5E5E8] px-4 py-2 text-[13px] font-semibold text-[#6B6B6B] hover:bg-[#F5F5F7]"
                >
                  Lesson list
                </button>
                <button
                  type="button"
                  onClick={() => onGoTo("Create lesson")}
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
        {isLoading ? (
          <InfoMessage>Loading curriculum tree from API...</InfoMessage>
        ) : isError ? (
          <InfoMessage>
            We could not load all curriculum branches. Please refresh and try again.
          </InfoMessage>
        ) : null}

        {hasModules
          ? curriculumModules.map(({ module, submodules, lessons }, index) => (
              <div key={module.id} className="rounded-lg border border-[#E5E5E8] bg-white px-4 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <GripVertical className="h-4 w-4 text-[#6B6B6B]" />
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#F5F5F7] text-[10px] font-semibold text-[#6B6B6B]">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold text-[#121212]">{module.title}</p>
                    <p className="text-[11px] text-[#6B6B6B]">{module.id}</p>
                  </div>
                  <Badge tone="published">{module.status}</Badge>
                  <Badge tone={module.required ? "required" : "optional"}>
                    {module.required ? "Required" : "Optional"}
                  </Badge>
                  <span className="text-[11px] text-[#6B6B6B]">
                    {hasSubmodules
                      ? `${submodules.length} submodules · ${lessons.length} lessons`
                      : `${lessons.length} lessons`}
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenEditModule(module.id)}
                    className="rounded-md border border-[#007AFF] px-2 py-1 text-[11px] font-semibold text-[#007AFF] hover:bg-[#EAF3FF]"
                  >
                    Edit
                  </button>
                </div>

                {hasSubmodules ? (
                  <div className="mt-3 space-y-2 border-l border-dashed border-[#E5E5E8] pl-4">
                    {submodules.length === 0 ? (
                      <p className="text-[11px] text-[#6B6B6B]">No submodules found.</p>
                    ) : (
                      submodules.map((submodule) => {
                        const submoduleLessons = lessons.filter(
                          (lesson) => lesson.subModuleId === submodule.id,
                        );

                        return (
                          <div
                            key={submodule.id}
                            className="rounded-md border border-[#E5E5E8] bg-[#FCFCFD] px-3 py-2"
                          >
                            <div className="flex flex-wrap items-center gap-2">
                              <div className="min-w-0 flex-1">
                                <p className="text-[12px] font-semibold text-[#121212]">
                                  {submodule.title}
                                </p>
                                <p className="text-[10px] text-[#6B6B6B]">{submodule.id}</p>
                              </div>
                              <Badge tone="published">{submodule.status}</Badge>
                              <span className="text-[10px] text-[#6B6B6B]">
                                {submoduleLessons.length} lessons
                              </span>
                              <button
                                type="button"
                                onClick={() => onOpenEditSubmodule(module.id, submodule.id)}
                                className="rounded-md border border-[#007AFF] px-2 py-1 text-[10px] font-semibold text-[#007AFF] hover:bg-[#EAF3FF]"
                              >
                                Edit
                              </button>
                            </div>
                            {submoduleLessons.length > 0 ? (
                              <div className="mt-2 space-y-1 border-l border-[#E5E5E8] pl-3">
                                {submoduleLessons.map((lesson) => (
                                  <div
                                    key={lesson.id}
                                    className="flex flex-wrap items-center gap-2 text-[11px]"
                                  >
                                    <span className="font-medium text-[#121212]">
                                      {lesson.title}
                                    </span>
                                    <Chip tone={lessonTone(lesson.type)}>{lesson.type}</Chip>
                                    <Badge tone="published">{lesson.status}</Badge>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        onOpenEditLesson(module.id, submodule.id, lesson.id)
                                      }
                                      className="rounded-md border border-[#007AFF] px-2 py-0.5 text-[10px] font-semibold text-[#007AFF] hover:bg-[#EAF3FF]"
                                    >
                                      Edit
                                    </button>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="mt-2 text-[10px] text-[#6B6B6B]">
                                No lessons found in this submodule.
                              </p>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                ) : (
                  <div className="mt-3 space-y-1 border-l border-dashed border-[#E5E5E8] pl-4">
                    {lessons.length > 0 ? (
                      lessons.map((lesson) => (
                        <div key={lesson.id} className="flex flex-wrap items-center gap-2 text-[11px]">
                          <span className="font-medium text-[#121212]">{lesson.title}</span>
                          <Chip tone={lessonTone(lesson.type)}>{lesson.type}</Chip>
                          <Badge tone="published">{lesson.status}</Badge>
                          <button
                            type="button"
                            onClick={() => onOpenEditLesson(module.id, null, lesson.id)}
                            className="rounded-md border border-[#007AFF] px-2 py-0.5 text-[10px] font-semibold text-[#007AFF] hover:bg-[#EAF3FF]"
                          >
                            Edit
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-[11px] text-[#6B6B6B]">No lessons found.</p>
                    )}
                  </div>
                )}
              </div>
            ))
          : flatLessons.map((lesson, index) => (
              <div key={lesson.id} className="rounded-lg border border-[#E5E5E8] bg-white px-4 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <GripVertical className="h-4 w-4 text-[#6B6B6B]" />
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#F5F5F7] text-[10px] font-semibold text-[#6B6B6B]">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold text-[#121212]">{lesson.title}</p>
                    <p className="text-[11px] text-[#6B6B6B]">{lesson.id}</p>
                  </div>
                  <Chip tone={lessonTone(lesson.type)}>{lesson.type}</Chip>
                  <Badge tone="published">{lesson.status}</Badge>
                  <span className="text-[11px] text-[#6B6B6B]">{lesson.duration}</span>
                  <button
                    type="button"
                    onClick={() => onOpenEditLesson("", null, lesson.id)}
                    className="rounded-md border border-[#007AFF] px-2 py-1 text-[11px] font-semibold text-[#007AFF] hover:bg-[#EAF3FF]"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
