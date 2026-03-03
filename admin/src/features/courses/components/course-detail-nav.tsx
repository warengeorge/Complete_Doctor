"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import type { CourseListItem } from "../types";

export type CourseDetailNavProps = {
  course: CourseListItem;
};

export function CourseDetailNav({ course }: CourseDetailNavProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-sm text-[#6B6B6B]">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <ArrowLeft className="h-3 w-3" />
        <span className="font-semibold text-[#121212] truncate">
          {course.title}
        </span>
      </div>

      <button className="w-full rounded-lg bg-[#007AFF] px-4 py-2 text-[14px] font-semibold text-white hover:bg-[#006DE0] sm:w-auto">
        Edit course info
      </button>
    </div>
  );
}
