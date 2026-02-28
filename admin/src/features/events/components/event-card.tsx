"use client";

import Image from "next/image";
import { CalendarDays, Clock3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { EventActionsMenu } from "./event-actions-menu";
import type { EventMenuAction } from "./event-actions-menu";
import { EventsCountdown } from "./events-countdown";
import {
  buildSlotsLabel,
  formatEventDate,
  formatEventTimeRange,
  getSlotsProgress,
} from "../utils";
import type { EventItem } from "../types";

type EventCardProps = {
  event: EventItem;
  now: Date;
  onAction?: (action: EventMenuAction, event: EventItem) => void;
};

export function EventCard({ event, now, onAction }: EventCardProps) {
  const progress = getSlotsProgress(event.slotsLeft, event.slotsTotal);

  return (
    <Card className="w-full gap-4 rounded-xl border border-[#E4E4E7] bg-white px-3 py-3 shadow-none sm:px-4 sm:py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-md sm:h-31 sm:w-40">
          <Image src={event.image} alt={event.title} fill className="object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-[#111827] sm:text-[31px] sm:leading-9">
                {event.title}
              </h3>
              {event.badge ? (
                <span className="rounded-full bg-[#FDECEC] px-3 py-1 text-xs font-semibold text-[#FF0000]">
                  {event.badge.label}
                </span>
              ) : null}
            </div>

            <EventActionsMenu onAction={(action) => onAction?.(action, event)} />
          </div>

          <p className="mt-1 text-sm leading-6 text-[#646464]">
            {event.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-[#F0F0F0] pt-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
          <div className="flex items-center gap-2 text-sm font-medium text-[#646464]">
            <CalendarDays className="h-4 w-4" />
            <span>{formatEventDate(event.startDate)}</span>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-[#646464]">
            <Clock3 className="h-4 w-4" />
            <span>{formatEventTimeRange(event.startDate, event.endDate)}</span>
          </div>

          <div className="flex min-w-0 flex-1 items-center gap-3">
            <span className="shrink-0 text-sm font-medium text-[#555555]">
              {buildSlotsLabel(event.slotsLeft, event.slotsTotal)}
            </span>
            <div className="h-1.5 w-full rounded-full bg-[#E7E7E9]">
              <div
                className="h-full rounded-full bg-[#007AFF]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {event.action === "join" ? (
          <Button className="h-10 w-full bg-[#007AFF] px-6 text-sm font-semibold text-white hover:bg-[#006DE0] sm:w-auto">
            Join now
          </Button>
        ) : (
          <EventsCountdown startDate={event.startDate} now={now} />
        )}
      </div>
    </Card>
  );
}
