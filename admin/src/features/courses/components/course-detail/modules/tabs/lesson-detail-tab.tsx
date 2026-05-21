import type { ModuleView } from "../../course-detail-module-views";
import { Breadcrumb, Card, KeyValues, PageHeader } from "../shared";

type LessonDetailTabProps = {
  hasSubmodules: boolean;
  hasModules: boolean;
  selectedModuleWeekLabel: string;
  selectedModuleIdentifier: string;
  courseName: string;
  onOpenDeleteLesson: () => void;
  onGoTo: (view: ModuleView) => void;
  onNotify: (message: string) => void;
};

export function LessonDetailTab({
  hasSubmodules,
  hasModules,
  selectedModuleWeekLabel,
  selectedModuleIdentifier,
  courseName,
  onOpenDeleteLesson,
  onGoTo,
  onNotify,
}: LessonDetailTabProps) {
  return (
    <div className="space-y-4">
      <Breadcrumb
        items={
          hasSubmodules
            ? ["Modules", selectedModuleWeekLabel, "SubModules", "Lessons", "les-002"]
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
                  Meeting URL
                </p>
                <div className="flex flex-wrap items-center justify-between gap-2 rounded border border-[#E5E5E8] bg-[#F5F5F7] px-3 py-2">
                  <span className="text-[#007AFF]">
                    https://zoom.us/j/completedoctor-week1-live
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onNotify("Meeting URL copied")}
                      className="rounded-md border border-[#E5E5E8] px-2 py-1 text-[12px] font-medium text-[#6B6B6B] hover:bg-white"
                    >
                      Copy
                    </button>
                    <button
                      type="button"
                      onClick={() => onNotify("Open link action coming soon")}
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
                  Interactive live session covering cortical anatomy and functional
                  mapping.
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
                    onClick={() => onNotify("Download action coming soon")}
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
                onClick={() => onGoTo("Edit lesson")}
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
                ...(hasSubmodules ? ([['SubModule', 'sub-001']] as [string, string][]) : []),
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
  );
}
