"use client";

import { useState } from "react";
import { EventScheduleIcon } from "@/components/icons/event-schedule";
import { ResourceUploadIcon } from "@/components/icons/resource-upload";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { ScheduleEventModal } from "@/features/events/components/schedule-event-modal";

const actions = [
  {
    key: "create-course",
    label: "Create a new course",
    icon: <Plus className="h-3 w-3 text-[#007AFF]" />,
  },
  {
    key: "schedule-event",
    label: "Schedule an event",
    icon: <EventScheduleIcon className="h-4.5 w-4 text-[#007AFF]" />,
  },
  {
    key: "upload-resource",
    label: "Upload a resource",
    icon: <ResourceUploadIcon className="h-4.5 w-3.5 text-[#007AFF]" />,
  },
] as const;

export function QuickActions() {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const handleActionClick = (actionKey: (typeof actions)[number]["key"]) => {
    if (actionKey === "schedule-event") {
      setIsScheduleOpen(true);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-[15px] font-semibold text-[#0C0C0C]">
        Quick actions
      </h2>

      <div className="space-y-4">
        {actions.map((action) => {
          const content = (
            <Card
              className={cn(
                "w-full bg-white p-4 transition",
                action.key === "schedule-event"
                  ? "cursor-pointer hover:bg-[#F8FAFF]"
                  : "cursor-default",
              )}
            >
              {/* Icon container */}
              <div className="flex w-full min-w-0 items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#007AFF1A]">
                  {action.icon}
                </div>

                {/* Label */}
                <span className="text-sm font-semibold text-[#081021]">
                  {action.label}
                </span>
              </div>
            </Card>
          );

          if (action.key === "schedule-event") {
            return (
              <button
                key={action.key}
                type="button"
                onClick={() => handleActionClick(action.key)}
                className="w-full text-left"
              >
                {content}
              </button>
            );
          }

          return <div key={action.key}>{content}</div>;
        })}
      </div>

      <ScheduleEventModal
        open={isScheduleOpen}
        onOpenChange={setIsScheduleOpen}
      />
    </div>
  );
}
