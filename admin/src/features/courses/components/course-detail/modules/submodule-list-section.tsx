import { GripVertical, Pencil, Trash2 } from "lucide-react";

import {
  Badge,
  Breadcrumb,
  Chip,
  IconButton,
  InfoMessage,
  PageHeader,
  TableCard,
} from "./shared";
import type { ModuleSubmoduleRow } from "./types";
import { getSubmoduleTrackTone } from "./view-helpers";

type SubmoduleListSectionProps = {
  courseName: string;
  selectedModuleTitle: string;
  selectedModuleIdentifier: string;
  selectedModuleWeekLabel: string;
  selectedModuleSubmoduleCount: number;
  selectedModuleLessonCount: number;
  searchSubmodules: string;
  onSearchSubmodules: (value: string) => void;
  filteredSubmodules: ModuleSubmoduleRow[];
  onOpenModuleDetail: () => void;
  onOpenCreateSubmodule: () => void;
  onOpenLessonList: () => void;
  onOpenEditSubmodule: () => void;
  onOpenDeleteSubmodule: () => void;
};

export function SubmoduleListSection({
  courseName,
  selectedModuleTitle,
  selectedModuleIdentifier,
  selectedModuleWeekLabel,
  selectedModuleSubmoduleCount,
  selectedModuleLessonCount,
  searchSubmodules,
  onSearchSubmodules,
  filteredSubmodules,
  onOpenModuleDetail,
  onOpenCreateSubmodule,
  onOpenLessonList,
  onOpenEditSubmodule,
  onOpenDeleteSubmodule,
}: SubmoduleListSectionProps) {
  return (
    <div className="space-y-4">
      <Breadcrumb items={["Modules", selectedModuleWeekLabel, "SubModules"]} />
      <PageHeader
        title="SubModules"
        subtitle={`${selectedModuleTitle} · ${courseName}`}
        meta={[
          selectedModuleIdentifier,
          selectedModuleWeekLabel,
          `${selectedModuleSubmoduleCount} submodules`,
          `${selectedModuleLessonCount} lessons total`,
        ]}
        actions={
          <>
            <button
              type="button"
              onClick={onOpenModuleDetail}
              className="rounded-lg border border-[#E5E5E8] px-4 py-2 text-[13px] font-semibold text-[#6B6B6B] hover:bg-[#F5F5F7]"
            >
              Module detail
            </button>
            <button
              type="button"
              onClick={onOpenCreateSubmodule}
              className="rounded-lg bg-[#007AFF] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#006DE0]"
            >
              New submodule
            </button>
          </>
        }
      />

      <InfoMessage>
        SubModules are grouped topics within a module and can represent live track
        or reading track content
      </InfoMessage>

      <TableCard
        search={searchSubmodules}
        onSearch={onSearchSubmodules}
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
            {filteredSubmodules.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="px-3 py-6 text-center text-[13px] text-[#6B6B6B]"
                >
                  No submodules found.
                </td>
              </tr>
            ) : (
              filteredSubmodules.map((row) => (
                <tr
                  key={row.id}
                  className="cursor-pointer border-t border-[#E5E5E8] text-[13px] hover:bg-[#F5F5F7]"
                  onClick={onOpenLessonList}
                >
                  <td className="px-3 py-2 text-[#6B6B6B]">
                    <GripVertical className="h-4 w-4" />
                  </td>
                  <td className="px-3 py-2">
                    <p className="font-semibold">{row.title}</p>
                    <p className="text-[11px] text-[#6B6B6B]">{row.id}</p>
                  </td>
                  <td className="px-3 py-2">
                    <Chip tone={getSubmoduleTrackTone(row.track)}>{row.track}</Chip>
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
            )}
          </tbody>
        </table>
      </TableCard>
    </div>
  );
}
