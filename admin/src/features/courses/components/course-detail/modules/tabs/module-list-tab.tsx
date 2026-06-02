import { GripVertical, Pencil, Plus, Trash2 } from "lucide-react";

import {
  Badge,
  Breadcrumb,
  IconButton,
  PageHeader,
  StatCard,
  TableCard,
} from "../shared";
import type { ModuleRow } from "../types";

type ModuleListTabProps = {
  courseName: string;
  courseDepth: string;
  hasSubmodules: boolean;
  stats: {
    totalModules: number;
    requiredModules: number;
    publishedModules: number;
    totalLessons: number;
  };
  searchModules: string;
  onSearchModules: (value: string) => void;
  filteredModules: ModuleRow[];
  isLoading: boolean;
  isError: boolean;
  onOpenCurriculumTree: () => void;
  onOpenCreateModule: () => void;
  onOpenModuleDetail: (moduleId: string) => void;
  onOpenEditModule: (moduleId: string) => void;
  onOpenDeleteModule: (moduleId: string) => void;
  onNotifyReorder: () => void;
};

export function ModuleListTab({
  courseName,
  courseDepth,
  hasSubmodules,
  stats,
  searchModules,
  onSearchModules,
  filteredModules,
  isLoading,
  isError,
  onOpenCurriculumTree,
  onOpenCreateModule,
  onOpenModuleDetail,
  onOpenEditModule,
  onOpenDeleteModule,
  onNotifyReorder,
}: ModuleListTabProps) {
  return (
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
              onClick={onOpenCurriculumTree}
              className="rounded-lg border border-[#E5E5E8] bg-white px-4 py-2 text-[13px] font-semibold text-[#6B6B6B] hover:bg-[#F5F5F7]"
            >
              Curriculum tree
            </button>
            <button
              type="button"
              onClick={onOpenCreateModule}
              className="inline-flex items-center gap-2 rounded-lg bg-[#007AFF] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#006DE0]"
            >
              <Plus className="h-4 w-4" />
              New module
            </button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total modules" value={stats.totalModules} color="#007AFF" />
        <StatCard
          label="Required modules"
          value={stats.requiredModules}
          color="#534AB7"
        />
        <StatCard label="Published" value={stats.publishedModules} color="#007AFF" />
        <StatCard label="Total lessons" value={stats.totalLessons} color="#6B6B6B" />
      </div>

      <TableCard
        search={searchModules}
        onSearch={onSearchModules}
        placeholder="Search modules..."
        countLabel={`${filteredModules.length} modules`}
        trailing={
          <button
            type="button"
            onClick={onNotifyReorder}
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
              {hasSubmodules ? <th className="px-3 py-2">SubModules</th> : null}
              <th className="px-3 py-2">Lessons</th>
              <th className="px-3 py-2">Prerequisites</th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={hasSubmodules ? 9 : 8}
                  className="px-3 py-6 text-center text-[13px] text-[#6B6B6B]"
                >
                  Loading modules...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td
                  colSpan={hasSubmodules ? 9 : 8}
                  className="px-3 py-6 text-center text-[13px] text-[#D92D20]"
                >
                  Unable to load modules.
                </td>
              </tr>
            ) : filteredModules.length === 0 ? (
              <tr>
                <td
                  colSpan={hasSubmodules ? 9 : 8}
                  className="px-3 py-6 text-center text-[13px] text-[#6B6B6B]"
                >
                  No modules found.
                </td>
              </tr>
            ) : (
              filteredModules.map((module) => (
                <tr
                  key={module.id}
                  className="cursor-pointer border-t border-[#E5E5E8] text-[13px] hover:bg-[#F5F5F7]"
                  onClick={() => onOpenModuleDetail(module.id)}
                >
                  <td className="px-3 py-2 text-[#6B6B6B]">
                    <GripVertical className="h-4 w-4" />
                  </td>
                  <td className="px-3 py-2">
                    <p className="font-semibold text-[#121212]">{module.title}</p>
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
                  {hasSubmodules ? <td className="px-3 py-2">{module.subModules}</td> : null}
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
                        onClick={(event) => {
                          event.stopPropagation();
                          onOpenEditModule(module.id);
                        }}
                        label="Edit module"
                        icon={<Pencil className="h-3.5 w-3.5" />}
                      />
                      <IconButton
                        onClick={(event) => {
                          event.stopPropagation();
                          onOpenDeleteModule(module.id);
                        }}
                        label="Delete module"
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
