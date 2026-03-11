"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { EventScheduleIcon } from "@/components/icons/event-schedule";
import { ResourceUploadIcon } from "@/components/icons/resource-upload";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { ScheduleEventModal } from "@/features/events/components/schedule-event-modal";
import { CreateCategoryModal } from "@/features/categories/components/create-category-modal";

type ActionType = "link" | "modal" | "disabled";

type QuickAction = {
  key: string;
  label: string;
  icon: React.ReactNode;
  type: ActionType;
  href?: string;
  modalKey?: "schedule-event" | "create-category";
};

const actions: QuickAction[] = [
  {
    key: "create-course",
    label: "Create a new course",
    icon: <Plus className="h-3 w-3 text-[#007AFF]" />,
    type: "link",
    href: "/courses/create",
  },
  {
    key: "schedule-event",
    label: "Schedule an event",
    icon: <EventScheduleIcon className="h-4.5 w-4 text-[#007AFF]" />,
    type: "modal",
    modalKey: "schedule-event",
  },
  {
    key: "add-category",
    label: "Create a new category",
    icon: <Plus className="h-3 w-3 text-[#007AFF]" />,
    type: "modal",
    modalKey: "create-category",
  },
];

function ActionCard({
  label,
  icon,
  interactive,
}: {
  label: string;
  icon: React.ReactNode;
  interactive?: boolean;
}) {
  return (
    <Card
      className={cn(
        "w-full bg-white p-4 transition",
        interactive && "cursor-pointer hover:bg-[#F8FAFF]",
      )}
    >
      <div className="flex w-full min-w-0 items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#007AFF1A]">
          {icon}
        </div>

        <span className="text-sm font-semibold text-[#081021]">{label}</span>
      </div>
    </Card>
  );
}

export function QuickActions() {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);

  const handleOpenModal = (modalKey: QuickAction["modalKey"]) => {
    if (modalKey === "schedule-event") {
      setIsScheduleOpen(true);
      return;
    }
    if (modalKey === "create-category") {
      setIsCreateCategoryOpen(true);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-[15px] font-semibold text-[#0C0C0C]">
        Quick actions
      </h2>

      <div className="space-y-4">
        {actions.map((action) => {
          // Navigation actions
          if (action.type === "link" && action.href) {
            return (
              <Link key={action.key} href={action.href} className="block">
                <ActionCard
                  label={action.label}
                  icon={action.icon}
                  interactive
                />
              </Link>
            );
          }

          // Modal actions
          if (action.type === "modal") {
            return (
              <button
                key={action.key}
                type="button"
                onClick={() => handleOpenModal(action.modalKey)}
                className="w-full text-left"
              >
                <ActionCard
                  label={action.label}
                  icon={action.icon}
                  interactive
                />
              </button>
            );
          }

          // Disabled / future actions
          return (
            <ActionCard
              key={action.key}
              label={action.label}
              icon={action.icon}
            />
          );
        })}
      </div>

      <ScheduleEventModal
        open={isScheduleOpen}
        onOpenChange={setIsScheduleOpen}
      />
      <CreateCategoryModal
        open={isCreateCategoryOpen}
        onOpenChange={setIsCreateCategoryOpen}
      />
    </div>
  );
}
