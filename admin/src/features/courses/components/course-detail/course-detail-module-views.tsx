"use client";

export const moduleViews = [
  "Module list",
  "Create module",
  "Module detail",
  "Edit module",
  "SubModules",
  "SubModule list",
  "Create submodule",
  "Edit submodule",
  "Lesson list",
  "Create lesson",
  "Lesson detail",
  "Edit lesson",
  "Curriculum tree",
  "Delete confirm",
] as const;

export type ModuleView = (typeof moduleViews)[number];

type CourseDetailModuleViewsProps = {
  activeView: ModuleView;
  onViewChange: (view: ModuleView) => void;
  isModule: boolean;
  data?: readonly ModuleView[];
};

export function CourseDetailModuleViews({
  activeView,
  onViewChange,
  isModule,
  data = moduleViews,
}: CourseDetailModuleViewsProps) {
  if (!isModule) {
    return null;
  }

  return (
    <div className="rounded-lg border border-[#E5E5E8] bg-white p-2">
      <div className="flex gap-1 overflow-x-auto pb-1">
        {data.map((view) => {
          const isActive = activeView === view;
          return (
            <button
              key={view}
              type="button"
              onClick={() => onViewChange(view)}
              className={`rounded-md px-3 py-2 text-[13px] font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-[#007AFF] text-white"
                  : "text-[#4B4B4B] hover:bg-[#F3F3F5]"
              }`}
            >
              {view}
            </button>
          );
        })}
      </div>
    </div>
  );
}
