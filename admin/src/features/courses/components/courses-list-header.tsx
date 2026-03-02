"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CoursesListHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-[18px] font-semibold text-[#121212]">Courses</h1>
        <p className="text-[14px] text-[#606060]">
          View, manage, and update all your courses
        </p>
      </div>

      <Button
        asChild
        className="h-10 min-w-52 bg-[#007AFF] px-5 text-[14px] font-semibold text-white hover:bg-[#006DE0]"
      >
        <Link href="/courses/create" className="inline-flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create a new course
        </Link>
      </Button>
    </div>
  );
}
