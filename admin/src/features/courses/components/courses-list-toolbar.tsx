"use client";

import { Filter, List, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type CoursesFilterTab = "All" | "Ongoing" | "Upcoming" | "Ended" | "Drafts";

type CoursesListToolbarProps = {
  activeTab: CoursesFilterTab;
  onTabChange: (tab: CoursesFilterTab) => void;
  search: string;
  onSearchChange: (value: string) => void;
};

const tabs: CoursesFilterTab[] = ["All", "Ongoing", "Upcoming", "Ended", "Drafts"];

export function CoursesListToolbar({
  activeTab,
  onTabChange,
  search,
  onSearchChange,
}: CoursesListToolbarProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={cn(
              "rounded-lg px-4 py-2 text-[13.2px]",
              activeTab === tab
                ? "bg-[#ECECEC] text-[#0C0C0C]"
                : "text-[#737373] hover:bg-[#F3F3F5]",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-end">
        <div className="relative w-full md:max-w-60">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737373]" />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search..."
            className="h-10 rounded-lg border-[#E6E6E8] bg-[#FCFCFD] pl-9 text-[14px] placeholder:text-[#151515]"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          className="h-10 rounded-lg border-[#E1E1E4] bg-[#F3F3F5] px-4 text-[14px] font-medium text-[#151515] hover:bg-[#ECECEF]"
        >
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-10 rounded-lg border-[#E1E1E4] bg-[#F3F3F5] px-4 text-[14px] font-medium text-[#151515] hover:bg-[#ECECEF]"
        >
          <List className="h-4 w-4" />
          List
        </Button>
      </div>
    </div>
  );
}

export type { CoursesFilterTab };
