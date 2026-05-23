import { Pencil, Trash2 } from "lucide-react";

import type { ModuleView } from "../../course-detail-module-views";
import {
  Badge,
  Breadcrumb,
  Card,
  Chip,
  IconButton,
  InfoMessage,
  KeyValues,
  PageHeader,
} from "../shared";
import type { LessonRow, ModuleSubmoduleRow } from "../types";
import { getSubmoduleTrackTone } from "../view-helpers";
import { lessonTone } from "../utils";

type ModuleDetailTabProps = {
  courseName: string;
  hasSubmodules: boolean;
  selectedModuleTitle: string;
  selectedModuleIdentifier: string;
  selectedModuleWeekLabel: string;
  selectedModuleSubmoduleCount: number;
  selectedModuleLessonCount: number;
  selectedModuleDisplayOrder: number;
  selectedModuleDuration: number | null;
  selectedModuleIsPublished: boolean;
  selectedModuleIsRequired: boolean;
  selectedModuleMediaCount: number;
  selectedModuleAssessmentCount: number;
  selectedModuleCreatedAt: string;
  selectedModuleDescription: string;
  selectedModuleAvailable: boolean;
  detailLoading: boolean;
  detailError: boolean;
  moduleSubmodules: ModuleSubmoduleRow[];
  filteredLessons: LessonRow[];
  onOpenDeleteModule: () => void;
  onOpenEditModule: () => void;
  onOpenNext: () => void;
  onOpenLessonDetail: (lessonId: string) => void;
  onOpenEditLesson: () => void;
  onOpenDeleteLesson: () => void;
  onOpenEditSubmodule: () => void;
  onOpenDeleteSubmodule: () => void;
  onGoTo: (view: ModuleView) => void;
  formatDisplayDate: (value: string) => string;
};

export function ModuleDetailTab({
  courseName,
  hasSubmodules,
  selectedModuleTitle,
  selectedModuleIdentifier,
  selectedModuleWeekLabel,
  selectedModuleSubmoduleCount,
  selectedModuleLessonCount,
  selectedModuleDisplayOrder,
  selectedModuleDuration,
  selectedModuleIsPublished,
  selectedModuleIsRequired,
  selectedModuleMediaCount,
  selectedModuleAssessmentCount,
  selectedModuleCreatedAt,
  selectedModuleDescription,
  selectedModuleAvailable,
  detailLoading,
  detailError,
  moduleSubmodules,
  filteredLessons,
  onOpenDeleteModule,
  onOpenEditModule,
  onOpenNext,
  onOpenLessonDetail,
  onOpenEditLesson,
  onOpenDeleteLesson,
  onOpenEditSubmodule,
  onOpenDeleteSubmodule,
  onGoTo,
  formatDisplayDate,
}: ModuleDetailTabProps) {
  return (
    <div className="space-y-4">
      <Breadcrumb items={["Courses", courseName, "Modules", selectedModuleWeekLabel]} />

      <PageHeader
        title={selectedModuleTitle}
        subtitle={`${selectedModuleIdentifier} · ${courseName} · ${selectedModuleWeekLabel}`}
        actions={
          <>
            <button
              type="button"
              onClick={onOpenDeleteModule}
              className="rounded-lg border border-[#E5E5E8] px-4 py-2 text-[13px] font-semibold text-[#D92D20] hover:bg-[#FEECEC]"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={onOpenEditModule}
              className="rounded-lg border border-[#007AFF] px-4 py-2 text-[13px] font-semibold text-[#007AFF] hover:bg-[#EAF3FF]"
            >
              Edit module
            </button>
            <button
              type="button"
              onClick={onOpenNext}
              className="rounded-lg bg-[#007AFF] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#006DE0]"
            >
              {hasSubmodules ? "View submodules" : "View lessons"}
            </button>
          </>
        }
      />

      {!selectedModuleAvailable ? (
        <Card title="Module unavailable">
          <p className="text-[13px] text-[#6B6B6B]">
            No module selected. Open a module from the list to view details.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {detailLoading ? <InfoMessage>Loading module details...</InfoMessage> : null}
          {detailError ? (
            <InfoMessage>
              We could not refresh module details. Showing last available data.
            </InfoMessage>
          ) : null}

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
                    <th className="border-b border-[#E5E5E8] px-2 py-2">Status</th>
                    <th className="border-b border-[#E5E5E8] px-2 py-2">
                      {hasSubmodules ? "Lessons" : "Duration"}
                    </th>
                    <th className="border-b border-[#E5E5E8] px-2 py-2" />
                  </tr>
                </thead>
                <tbody>
                  {hasSubmodules ? (
                    moduleSubmodules.length > 0 ? (
                      moduleSubmodules.map((row) => (
                        <tr
                          key={row.id}
                          onClick={() => onGoTo("Lesson list")}
                          className="cursor-pointer border-b border-[#E5E5E8] text-[13px] hover:bg-[#F5F5F7]"
                        >
                          <td className="px-2 py-2">
                            <p className="font-semibold">{row.title}</p>
                            <p className="text-[11px] text-[#6B6B6B]">{row.id}</p>
                          </td>
                          <td className="px-2 py-2">
                            <Chip tone={getSubmoduleTrackTone(row.track)}>{row.track}</Chip>
                          </td>
                          <td className="px-2 py-2">
                            <Badge tone="published">{row.status}</Badge>
                          </td>
                          <td className="px-2 py-2">{row.lessons}</td>
                          <td className="px-2 py-2">
                            <div className="flex justify-end gap-1">
                              <IconButton
                                onClick={(event) => {
                                  event.stopPropagation();
                                  onOpenEditSubmodule();
                                }}
                                label="Edit submodule"
                                icon={<Pencil className="h-3.5 w-3.5" />}
                              />
                              <IconButton
                                onClick={(event) => {
                                  event.stopPropagation();
                                  onOpenDeleteSubmodule();
                                }}
                                label="Delete submodule"
                                icon={<Trash2 className="h-3.5 w-3.5" />}
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-2 py-4 text-center text-[12px] text-[#6B6B6B]"
                        >
                          No submodules found for this module.
                        </td>
                      </tr>
                    )
                  ) : (
                    filteredLessons.map((row) => (
                      <tr
                        key={row.id}
                        onClick={() => onOpenLessonDetail(row.id)}
                        className="cursor-pointer border-b border-[#E5E5E8] text-[13px] hover:bg-[#F5F5F7]"
                      >
                        <td className="px-2 py-2">
                          <p className="font-semibold">{row.title}</p>
                          <p className="text-[11px] text-[#6B6B6B]">{row.id}</p>
                        </td>
                        <td className="px-2 py-2">
                          <Chip tone={lessonTone(row.type)}>
                            {row.type}
                          </Chip>
                        </td>
                        <td className="px-2 py-2">
                          <Badge tone="published">{row.status}</Badge>
                        </td>
                        <td className="px-2 py-2">{row.duration}</td>
                        <td className="px-2 py-2">
                          <div className="flex justify-end gap-1">
                            <IconButton
                              onClick={(event) => {
                                event.stopPropagation();
                                onOpenEditLesson();
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
                    ))
                  )}
                </tbody>
              </table>
            </Card>

            <div className="space-y-3">
              <Card title="Details">
                <KeyValues
                  rows={[
                    ["ID", selectedModuleIdentifier],
                    ["Course", courseName],
                    ["Week", selectedModuleWeekLabel],
                    ["Display order", String(selectedModuleDisplayOrder)],
                    [
                      "Duration",
                      selectedModuleDuration ? `${selectedModuleDuration} mins` : "—",
                    ],
                    ...(hasSubmodules
                      ? ([["SubModules", String(selectedModuleSubmoduleCount)]] as [
                          string,
                          string,
                        ][])
                      : []),
                    ["Lessons", String(selectedModuleLessonCount)],
                    ["Published", selectedModuleIsPublished ? "Yes" : "No"],
                    ["Required", selectedModuleIsRequired ? "Yes" : "No"],
                    ["Media", String(selectedModuleMediaCount)],
                    ["Assessments", String(selectedModuleAssessmentCount)],
                    [
                      "Created",
                      selectedModuleCreatedAt
                        ? formatDisplayDate(selectedModuleCreatedAt)
                        : "—",
                    ],
                  ]}
                />
              </Card>
              <Card title="Description">
                <p className="text-[13px] leading-relaxed text-[#6B6B6B]">
                  {selectedModuleDescription}
                </p>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
