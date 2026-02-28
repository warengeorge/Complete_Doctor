"use client";

import { Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type EventsToolbarProps = {
  query: string;
  onQueryChange: (value: string) => void;
};

export function EventsToolbar({ query, onQueryChange }: EventsToolbarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-semibold text-[#0C0C0C]">Events</h1>
        <p className="text-sm text-[#646464]">
          See the scheduled events on your calendar
        </p>
      </div>

      <div className="flex w-full gap-2 sm:w-auto">
        <div className="relative w-full sm:w-[240px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#808080]" />
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search..."
            className="h-10 bg-white pl-9 text-sm"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          className="h-10 gap-2 border-[#D5D5D5] bg-white px-4 text-[#313131]"
          aria-label="Filter events"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filter
        </Button>
      </div>
    </div>
  );
}
