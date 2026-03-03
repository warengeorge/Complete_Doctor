"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const tabItems = [
  "Overview",
  "Students",
  "Events & Schedule",
  "Resources",
  "Question Bank",
  "Announcements",
  "Reviews",
] as const;

type TabLabel = (typeof tabItems)[number];

export function CourseDetailTabs({
  value,
  onValueChange,
}: {
  value: TabLabel;
  onValueChange: (v: string) => void;
}) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className="w-full">
      <TabsList className="flex flex-wrap gap-0 border-b border-[#E5E5E8] bg-transparent rounded-none p-0 h-auto">
        {tabItems.map((label) => (
          <TabsTrigger
            key={label}
            value={label}
            className={cn(
              "px-4 py-2 text-[14px] font-medium rounded-none border-b-2 border-transparent data-[state=active]:border-[#007AFF] data-[state=active]:text-[#121212] data-[state=inactive]:text-[#6B6B6B]",
            )}
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={value} className="mt-4">
        {/* content is rendered by parent via state */}
      </TabsContent>
    </Tabs>
  );
}
