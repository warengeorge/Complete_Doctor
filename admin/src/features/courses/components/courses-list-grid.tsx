"use client";

import Image from "next/image";
import { Calendar } from "lucide-react";

import type { CourseListItem } from "../types";
import { CoursesIcon } from "@/components/icons/courses-icon";
import { getStatusClass } from "./courses-list-table";

type CoursesListGridProps = {
  rows: CourseListItem[];
  selectedIds: Set<string>;
  onToggleRow: (id: string) => void;
};

export function CoursesListGrid({
  rows,
  selectedIds,
  onToggleRow,
}: CoursesListGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {rows.map((course) => (
        <div
          key={course.id}
          className="relative rounded-xl border border-[#E5E5E8] bg-white shadow-sm overflow-hidden"
        >
          <div className="relative h-40 w-full">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover"
            />
          </div>

          {/* status badge */}
          <span
            className={`absolute top-2 left-2 rounded-full px-2 py-1 text-[10px] font-semibold 
              ${getStatusClass(course.status)} bg-white`}
          >
            {course.status}
          </span>

          {/* selection checkbox */}
          {/* <div className="absolute top-2 right-2">
            <input
              type="checkbox"
              checked={selectedIds.has(course.id)}
              onChange={() => onToggleRow(course.id)}
              aria-label={`Select ${course.title}`}
              className="h-4 w-4 rounded border-[#313131] bg-white"
            />
          </div> */}

          <div className="p-4 space-y-2">
            <h3 className="text-[15px] font-medium text-[#313131]">
              {course.title}
            </h3>
            <p className="text-[13px] text-[#6B6B6B] line-clamp-2">
              Lorem ipsum dolor sit amet consectetur. In cursus id tellus sed
              ipsum vestibulum consequat amet. Eu tellus feugiat in leo sit
              ipsum.
            </p>
            <div className="flex items-center justify-between text-[13px] text-[#313131]">
              <div className="flex items-center gap-1">
                <CoursesIcon className="h-4 w-4" />
                <span className="truncate">{course.category}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{course.createdAt}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
