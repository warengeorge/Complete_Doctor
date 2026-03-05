"use client";

import { ListFilter, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type StudentsToolbarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onFilterClick?: () => void;
};

export function StudentsToolbar({
  query,
  onQueryChange,
  onFilterClick,
}: StudentsToolbarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-[18px] font-semibold text-[#121212]">Students</h1>
        <p className="mt-1 text-sm text-[#606060]">
          Access a curated collection of study materials
        </p>
      </div>

      <div className="flex w-full gap-2.5 sm:w-auto">
        <div className="relative w-full sm:w-[250px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#808080]" />
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search..."
            className="h-11 border-[#DBDBDE] bg-[#FAFAFA] pl-9 text-sm text-[#151515]"
          />
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={onFilterClick}
          className="h-11 gap-2 border-[#D5D5D5] bg-[#FAFAFA] px-4 text-[#313131]"
        >
          <ListFilter className="h-4 w-4" />
          Filter
        </Button>
      </div>
    </div>
  );
}
