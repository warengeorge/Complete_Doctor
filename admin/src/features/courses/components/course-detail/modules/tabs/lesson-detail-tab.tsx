import type { ModuleView } from "../../course-detail-module-views";
import { Breadcrumb, Card, KeyValues, PageHeader } from "../shared";
import type { CourseLessonDetailItem } from "@/features/courses/services/course-modules-api";

type LessonDetailTabProps = {
  hasSubmodules: boolean;
  hasModules: boolean;
  selectedModuleWeekLabel: string;
  selectedModuleIdentifier: string;
  courseName: string;
  selectedLessonId: string | null;
  selectedLessonTitle: string;
  selectedLessonType: string;
  selectedLessonPublished: boolean;
  selectedLessonRequired: boolean;
  selectedLessonDuration: string;
  selectedLessonScheduled: string;
  selectedLessonEndsAt: string;
  selectedLessonDescription: string;
  selectedLessonContent: string;
  selectedLessonLocation: string;
  selectedLessonCreatedAt: string;
  selectedLessonPrerequisites: string[];
  selectedLessonMediaCount: number;
  lessonDetailLoading: boolean;
  lessonDetailError: boolean;
  lessonDetailSource: CourseLessonDetailItem | null;
  onOpenDeleteLesson: () => void;
  onGoTo: (view: ModuleView) => void;
};

export function LessonDetailTab({
  hasSubmodules,
  hasModules,
  selectedModuleWeekLabel,
  selectedModuleIdentifier,
  courseName,
  selectedLessonId,
  selectedLessonTitle,
  selectedLessonType,
  selectedLessonPublished,
  selectedLessonRequired,
  selectedLessonDuration,
  selectedLessonScheduled,
  selectedLessonEndsAt,
  selectedLessonDescription,
  selectedLessonContent,
  selectedLessonLocation,
  selectedLessonCreatedAt,
  selectedLessonPrerequisites,
  selectedLessonMediaCount,
  lessonDetailLoading,
  lessonDetailError,
  lessonDetailSource,
  onOpenDeleteLesson,
  onGoTo,
}: LessonDetailTabProps) {
  const subtitle = hasSubmodules
    ? `${selectedLessonId ?? "—"} · ${selectedModuleIdentifier} · ${courseName}`
    : hasModules
      ? `${selectedLessonId ?? "—"} · ${selectedModuleIdentifier} · ${courseName}`
      : `${selectedLessonId ?? "—"} · ${courseName}`;

  return (
    <div className="space-y-4">
      <Breadcrumb
        items={
          hasSubmodules
            ? [
                "Modules",
                selectedModuleWeekLabel,
                "SubModules",
                "Lessons",
                selectedLessonId ?? "Lesson",
              ]
            : hasModules
              ? ["Modules", selectedModuleWeekLabel, "Lessons", selectedLessonId ?? "Lesson"]
              : ["Courses", "Lessons", selectedLessonId ?? "Lesson"]
        }
      />

      <PageHeader
        title={selectedLessonTitle}
        subtitle={subtitle}
        actions={
          <>
            <button
              type="button"
              onClick={onOpenDeleteLesson}
              className="rounded-lg border border-[#E5E5E8] px-4 py-2 text-[13px] font-semibold text-[#D92D20] hover:bg-[#FEECEC]"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => onGoTo("Edit lesson")}
              className="rounded-lg border border-[#007AFF] px-4 py-2 text-[13px] font-semibold text-[#007AFF] hover:bg-[#EAF3FF]"
            >
              Edit lesson
            </button>
            <button
              type="button"
              onClick={() => onGoTo("Lesson list")}
              className="rounded-lg border border-[#E5E5E8] px-4 py-2 text-[13px] font-semibold text-[#6B6B6B] hover:bg-[#F5F5F7]"
            >
              Lessons
            </button>
          </>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {!selectedLessonId ? (
            <Card title="Lesson unavailable">
              <p className="text-[13px] text-[#6B6B6B]">
                No lesson selected. Open a lesson from the list to view details.
              </p>
            </Card>
          ) : null}
          {lessonDetailLoading ? (
            <Card title="Loading">
              <p className="text-[13px] text-[#6B6B6B]">Loading lesson details...</p>
            </Card>
          ) : null}
          {lessonDetailError ? (
            <Card title="Refresh issue">
              <p className="text-[13px] text-[#6B6B6B]">
                We could not refresh lesson details. Showing last available data.
              </p>
            </Card>
          ) : null}
          <Card
            title="Content"
            action={
              <button
                type="button"
                onClick={() => onGoTo("Edit lesson")}
                className="rounded-md border border-[#007AFF] px-3 py-1 text-[12px] font-semibold text-[#007AFF] hover:bg-[#EAF3FF]"
              >
                Edit
              </button>
            }
          >
            <div className="space-y-4 text-[13px]">
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#6B6B6B]">
                  Description
                </p>
                <p className="text-[14px] text-[#121212]">
                  {selectedLessonDescription}
                </p>
              </div>

              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#6B6B6B]">
                  Content
                </p>
                <p className="text-[14px] text-[#121212]">{selectedLessonContent}</p>
              </div>

              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#6B6B6B]">
                  Location
                </p>
                <p className="text-[14px] text-[#121212]">{selectedLessonLocation}</p>
              </div>
            </div>
          </Card>

          <Card title="Prerequisites & gates">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[#6B6B6B]">
                  Prerequisites
                </p>
                {selectedLessonPrerequisites.length > 0 ? (
                  <span className="inline-flex rounded bg-[#FFF3EE] px-2 py-1 font-mono text-[11px] text-[#C2410C]">
                    {selectedLessonPrerequisites.join(", ")}
                  </span>
                ) : (
                  <span className="text-[12px] text-[#6B6B6B]">None</span>
                )}
              </div>
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[#6B6B6B]">
                  Unlocks
                </p>
                <span className="text-[12px] text-[#6B6B6B]">
                  {(lessonDetailSource?.isPrerequisiteFor?.length ?? 0) > 0
                    ? `${lessonDetailSource?.isPrerequisiteFor?.length ?? 0} lesson(s)`
                    : "None"}
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
                onClick={() => onGoTo("Edit lesson")}
                className="rounded-md border border-[#007AFF] px-3 py-1 text-[12px] font-semibold text-[#007AFF] hover:bg-[#EAF3FF]"
              >
                Edit
              </button>
            }
          >
            <KeyValues
              rows={[
                ["ID", selectedLessonId ?? "—"],
                ["Type", selectedLessonType],
                ["Published", selectedLessonPublished ? "Yes" : "No"],
                ["Required", selectedLessonRequired ? "Yes" : "No"],
                ["Duration", selectedLessonDuration],
                ["Scheduled", selectedLessonScheduled],
                ["Ends", selectedLessonEndsAt],
                ["Display order", String(lessonDetailSource?.displayOrder ?? 0)],
                ...(hasSubmodules
                  ? ([["SubModule", lessonDetailSource?.subModuleId ?? "—"]] as [
                      string,
                      string,
                    ][])
                  : []),
                ...(hasModules
                  ? ([["Module", selectedModuleIdentifier]] as [string, string][])
                  : []),
                ["Media", String(selectedLessonMediaCount)],
                ["Created", selectedLessonCreatedAt],
              ]}
            />
          </Card>

          <Card title="Learner progress">
            <KeyValues
              rows={[
                ["Completed", "—"],
                ["In progress", "—"],
                ["Not started", "—"],
              ]}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
