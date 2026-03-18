"use client";

import Link from "next/link";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

import type { CourseListItem } from "../types";

type CoursesListTableProps = {
  rows: CourseListItem[];
  selectedIds: Set<string>;
  onToggleRow: (id: string) => void;
  onToggleAll: () => void;
};

export function CoursesListTable({
  rows,
  selectedIds,
  onToggleRow,
  onToggleAll,
}: CoursesListTableProps) {
  const allSelected =
    rows.length > 0 && rows.every((row) => selectedIds.has(row.id));

  return (
    <div className="overflow-hidden rounded-xl border border-[#E5E5E8] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-230 border-separate border-spacing-y-3">
          <thead>
            <tr className="bg-[#E9ECEF] text-left text-[14px] text-[#495057]">
              <th className="w-12 rounded-l-lg px-4 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleAll}
                  aria-label="Select all courses"
                  className="h-4 w-4 rounded border-[#313131]"
                />
              </th>
              <th className="px-3 py-3">Course title</th>
              <th className="px-3 py-3">Category</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Enrolled students</th>
              <th className="px-3 py-3">Date created</th>
              <th className="w-12 rounded-r-lg px-3 py-3"></th>
            </tr>
          </thead>

          <tbody>
            {rows.map((course, index) => (
              <tr
                key={course.id}
                className={`text-[14px] ${
                  index % 2 === 1 ? "bg-[#F6F7F8]" : "bg-white"
                }`}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(course.id)}
                    onChange={() => onToggleRow(course.id)}
                    aria-label={`Select ${course.title}`}
                    className="h-4 w-4 rounded border-[#313131]"
                  />
                </td>

                <td className="px-3 py-3">
                  <Link
                    href={
                      course.status === "Draft"
                        ? `/courses/create/${course.id}`
                        : `/courses/${course.id}`
                    }
                    className="flex items-center gap-3 hover:opacity-75 transition-opacity"
                  >
                    <div className="relative h-12 w-16 overflow-hidden rounded-md">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="max-w-[16rem] text-[14px] font-medium text-[#313131] hover:text-[#007AFF]">
                      {course.title}
                    </span>
                  </Link>
                </td>

                <td className="px-3 py-3 text-[14px] text-[#313131]">
                  {course.category}
                </td>
                <td
                  className={`px-3 py-3 text-[14px] ${getStatusTextClass(course.status)}`}
                >
                  {course.status}
                </td>
                <td className="px-3 py-3 text-[14px] text-[#313131] font-medium">
                  {course.enrolledStudents}
                </td>
                <td className="px-3 py-3 text-[14px] text-[#313131] font-medium">
                  {course.createdAt}
                </td>
                <td className="px-3 py-3 text-right">
                  <button
                    type="button"
                    aria-label={`Open ${course.title} actions`}
                    className="rounded p-1 text-[#6B6B6E] hover:bg-[#EDEEFA]"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function getStatusTextClass(status: CourseListItem["status"]) {
  switch (status) {
    case "Ongoing":
      return "text-[#008409]";
    case "Upcoming":
      return "text-[#007AFF]";
    case "Ended":
      return "text-[#DC0000]";
    case "Draft":
      return "text-[#9A6A00]";
    default:
      return "text-[#404043]";
  }
}

export function getStatusBgClass(status: CourseListItem["status"]) {
  switch (status) {
    case "Ongoing":
      return "bg-[#008409]/10";
    case "Upcoming":
      return "bg-[#007AFF]/10";
    case "Ended":
      return "bg-[#DC0000]/10";
    case "Draft":
      return "bg-[#FFC107]/15";
    default:
      return "bg-[#404043]/10";
  }
}
