"use client";

import { EventScheduleIcon } from "@/components/icons/event-schedule";
import { ResourceUploadIcon } from "@/components/icons/resource-upload";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

const actions = [
  {
    label: "Create a new course",
    icon: <Plus className="h-3 w-3 text-[#007AFF]" />,
  },
  {
    label: "Schedule an event",
    icon: <EventScheduleIcon className="h-4.5 w-4 text-[#007AFF]" />,
  },
  {
    label: "Upload a resource",
    icon: <ResourceUploadIcon className="h-4.5 w-3.5 text-[#007AFF]" />,
  },
];

export function QuickActions() {
  return (
    <div className="space-y-4">
      <h2 className="text-[15px] font-semibold text-[#0C0C0C]">
        Quick actions
      </h2>

      <div className="space-y-4">
        {actions.map((action, idx) => (
          <Card
            key={idx}
            className="flex  gap-4 p-4 cursor-pointer bg-white max-w-100 transition "
          >
            {/* Icon container */}
            <div className="flex max-w-47.25 justify-between items-center">
              <div className="bg-[#007AFF1A] w-12 h-12 rounded-md flex items-center justify-center">
                {action.icon}
              </div>

              {/* Label */}
              <span className="text-sm font-semibold text-[#081021]">
                {action.label}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
