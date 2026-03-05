"use client";

import { Plus, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import type { CourseModule } from "../types";

type CourseContentFormProps = {
  modules: CourseModule[];
  onAddModule: () => void;
  onAddAnotherModule: () => void;
  onRemoveModule: (moduleId: string) => void;
  onModuleFieldChange: (
    moduleId: string,
    field: "title" | "description",
    value: string,
  ) => void;
  onSubModuleChange: (moduleId: string, index: number, value: string) => void;
  onAddSubModule: (moduleId: string) => void;
  onRemoveSubModule: (moduleId: string, subModuleIndex: number) => void;
};

const inputClassName =
  "h-12 rounded-xl border border-[#E6E6E8] bg-[#FAFAFACC] text-sm text-[#2D2F33] placeholder:text-[#B1B1B3] focus-visible:ring-[#007AFF]";

export function CourseContentForm({
  modules,
  onAddModule,
  onAddAnotherModule,
  onRemoveModule,
  onModuleFieldChange,
  onSubModuleChange,
  onAddSubModule,
  onRemoveSubModule,
}: CourseContentFormProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#E5E5E8] bg-white">
      <header className="flex items-center justify-between border-b border-[#E5E5E8] px-5 py-4">
        <h2 className="text-[16px] font-semibold text-[#151515]">Course Content</h2>
        <button
          type="button"
          onClick={onAddModule}
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#E1E1E4] bg-[#F3F3F5] px-4 text-[14px] font-semibold text-[#313131] hover:bg-[#ECECEF]"
        >
          <Plus className="h-4 w-4" />
          Add module
        </button>
      </header>

      <div className="space-y-3 p-5">
        {modules.map((module, moduleIndex) => (
          <div
            key={module.id}
            className="overflow-hidden rounded-xl border border-[#E5E5E8] bg-white"
          >
            <header className="flex items-center justify-between border-b border-[#E5E5E8] px-5 py-4">
              <h3 className="text-[15px] font-semibold text-[#1A1A1A]">
                Module {moduleIndex + 1}
              </h3>
              {modules.length > 1 ? (
                <button
                  type="button"
                  onClick={() => onRemoveModule(module.id)}
                  className="text-[13px] font-semibold text-[#B42318] hover:text-[#912018]"
                >
                  Remove module
                </button>
              ) : null}
            </header>

            <div className="space-y-6 p-5">
              <div className="space-y-2">
                <label className="text-[14px] font-semibold text-[#313131]">Title</label>
                <Input
                  value={module.title}
                  onChange={(event) =>
                    onModuleFieldChange(module.id, "title", event.target.value)
                  }
                  placeholder="e.g., Introduction to MRCGP AKT Exam"
                  className={inputClassName}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[14px] font-semibold text-[#313131]">
                  Description
                </label>
                <Input
                  value={module.description}
                  onChange={(event) =>
                    onModuleFieldChange(module.id, "description", event.target.value)
                  }
                  placeholder="Briefly describe the focus of this module"
                  className={inputClassName}
                />
              </div>

              <div className="space-y-3">
                <label className="text-[14px] font-semibold text-[#313131]">
                  Sub-module (optional)
                </label>
                <div className="space-y-3">
                  {module.subModules.map((subModule, subModuleIndex) => (
                    <div
                      key={`${module.id}-${subModuleIndex}`}
                      className="flex items-center gap-2"
                    >
                      <Input
                        value={subModule}
                        onChange={(event) =>
                          onSubModuleChange(
                            module.id,
                            subModuleIndex,
                            event.target.value,
                          )
                        }
                        placeholder="e.g., AKT Exam Format and Scoring"
                        className={inputClassName}
                      />
                      {module.subModules.length > 1 ? (
                        <button
                          type="button"
                          onClick={() => onRemoveSubModule(module.id, subModuleIndex)}
                          aria-label={`Remove sub-module ${subModuleIndex + 1}`}
                          className="rounded-full bg-[#EFEFF1] p-1.5 text-[#5D5D5D] hover:bg-[#E3E3E6]"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      ) : null}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => onAddSubModule(module.id)}
                    className={cn(
                      "inline-flex items-center gap-2 text-[14px] font-semibold text-[#2F2F31]",
                    )}
                  >
                    <Plus className="h-4 w-4" />
                    Add sub-module
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={onAddAnotherModule}
          className="inline-flex w-full items-center gap-2 rounded-xl border border-[#E5E5E8] bg-[#FDFDFD] px-5 py-4 text-[14px] font-semibold text-[#313131] hover:bg-[#F7F7F9]"
        >
          <Plus className="h-4 w-4" />
          Add another module
        </button>
      </div>
    </section>
  );
}
