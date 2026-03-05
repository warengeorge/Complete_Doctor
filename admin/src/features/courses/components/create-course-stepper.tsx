"use client";

import { Check, ChevronsRight } from "lucide-react";

import type { CourseStep } from "../types";

type CreateCourseStepperProps = {
  steps: CourseStep[];
  activeStep: number;
};

export function CreateCourseStepper({
  steps,
  activeStep,
}: CreateCourseStepperProps) {
  return (
    <div className="border-b border-[#E5E5E8] pb-2">
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        {steps.map((step, index) => {
          const isActive = step.id === activeStep;
          const isCompleted = step.id < activeStep;

          return (
            <div key={step.id} className="flex items-center gap-4">
              <div
                className={`flex items-center gap-3 border-b-2 pb-2 ${
                  isActive || isCompleted ? "border-[#121212]" : "border-transparent"
                }`}
              >
                <span
                  className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold ${
                    isActive
                      ? "bg-[#111111] text-white"
                      : isCompleted
                        ? "bg-[#007AFF] text-white"
                        : "bg-[#E5E5E8] text-[#7A7A7D]"
                  }`}
                >
                  {isCompleted ? <Check className="h-3 w-3" /> : step.id}
                </span>
                <span
                  className={`text-[15px] font-medium ${
                    isActive || isCompleted ? "text-[#0C0C0C]" : "text-[#616164]"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 ? (
                <ChevronsRight
                  className={`h-5 w-5 ${
                    isActive || isCompleted ? "text-[#0C0C0C]" : "text-[#646464]"
                  }`}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
