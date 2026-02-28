"use client";

import { Circle, Clock3, EllipsisVertical, PencilLine } from "lucide-react";
import type { ComponentType } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type EventMenuAction = "edit" | "reschedule" | "cancel";

type ActionItem = {
  key: EventMenuAction;
  label: string;
  icon: ComponentType<{ className?: string }>;
  danger?: boolean;
};

const actions: ActionItem[] = [
  { key: "edit", label: "Edit event", icon: PencilLine },
  { key: "reschedule", label: "Reschedule event", icon: Clock3 },
  { key: "cancel", label: "Cancel event", icon: Circle, danger: true },
];

type EventActionsMenuProps = {
  onAction?: (action: EventMenuAction) => void;
};

export function EventActionsMenu({ onAction }: EventActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="shrink-0 text-[#555555]"
          aria-label="Open event options"
        >
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <DropdownMenuItem
              key={action.key}
              className={cn(
                action.danger
                  ? "text-[#DC0000] focus:bg-[#FFFFFF]"
                  : "text-[#313131] focus:bg-[#ECECEC]",
              )}
              onSelect={() => onAction?.(action.key)}
            >
              <span
                className={cn(
                  "inline-flex items-center justify-center",
                  action.danger && "h-5 w-5 rounded-full bg-[#DC00001A]",
                )}
              >
                <Icon
                  className={cn(
                    action.danger
                      ? "h-2 w-2 fill-current stroke-current"
                      : "h-4 w-4",
                  )}
                />
              </span>
              <span className="font-medium text-[14px]">{action.label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
