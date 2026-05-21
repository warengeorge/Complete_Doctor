import { GripVertical, Pencil, Trash2 } from "lucide-react";

import type { ModuleView } from "../../course-detail-module-views";
import { Badge, Breadcrumb, Chip, IconButton, PageHeader, TableCard } from "../shared";
import type { LessonRow } from "../types";
import { lessonTone } from "../utils";

type LessonListTabProps = {
  hasSubmodules: boolean;
  hasModules: boolean;
  courseName: string;
  selectedModuleWeekLabel: string;
  selectedModuleTitle: string;
  selectedModuleIdentifier: string;
  selectedModuleLessonCount: number;
  searchLessons: string;
  onSearchLessons: (value: string) => void;
  lessonFilter: LessonRow["type"] | "All";
  onLessonFilterChange: (value: LessonRow["type"] | "All") => void;
  filteredLessons: LessonRow[];
  onGoTo: (view: ModuleView) => void;
  onOpenDeleteLesson: () => void;
};

export function LessonListTab({
  hasSubmodules,
  hasModules,
  courseName,
  selectedModuleWeekLabel,
  selectedModuleTitle,
  selectedModuleIdentifier,
  selectedModuleLessonCount,
  searchLessons,
  onSearchLessons,
  lessonFilter,
  onLessonFilterChange,
  filteredLessons,
  onGoTo,
  onOpenDeleteLesson,
}: LessonListTabProps) {
  return (
    <div className="space-y-4">
      <Breadcrumb
        items={
          hasSubmodules
            ? ["Modules", selectedModuleWeekLabel, "SubModules", "Neuroanatomy", "Lessons"]
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
                onClick={() => onGoTo("SubModule list")}
                className="rounded-lg border border-[#E5E5E8] px-4 py-2 text-[13px] font-semibold text-[#6B6B6B] hover:bg-[#F5F5F7]"
              >
                SubModules
              </button>
            ) : hasModules ? (
              <button
                type="button"
                onClick={() => onGoTo("Module detail")}
                className="rounded-lg border border-[#E5E5E8] px-4 py-2 text-[13px] font-semibold text-[#6B6B6B] hover:bg-[#F5F5F7]"
              >
                Module detail
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => onGoTo("Curriculum tree")}
              className="rounded-lg border border-[#E5E5E8] px-4 py-2 text-[13px] font-semibold text-[#6B6B6B] hover:bg-[#F5F5F7]"
            >
              Curriculum tree
            </button>
            <button
              type="button"
              onClick={() => onGoTo("Create lesson")}
              className="rounded-lg bg-[#007AFF] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#006DE0]"
            >
              New lesson
            </button>
          </>
        }
      />

      <TableCard
        search={searchLessons}
        onSearch={onSearchLessons}
        placeholder="Search lessons..."
        countLabel={`${filteredLessons.length} lessons`}
        filters={
          <div className="flex gap-1">
            {["All", "LIVE", "QUIZ", "RESOURCE"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => onLessonFilterChange(type as LessonRow["type"] | "All")}
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
                onClick={() => onGoTo("Lesson detail")}
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
                      onClick={(event) => {
                        event.stopPropagation();
                        onGoTo("Edit lesson");
                      }}
                      label="Edit lesson"
                      icon={<Pencil className="h-3.5 w-3.5" />}
                    />
                    <IconButton
                      onClick={(event) => {
                        event.stopPropagation();
                        onOpenDeleteLesson();
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
  );
}
