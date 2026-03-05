"use client";

import type { CourseListItem } from "../../types";
import { CourseDetailNav } from "./course-detail-nav";
import { CourseInfoCard } from "./course-info-card";
import { CourseStatsCard } from "./course-enrolled-stats";

export type CourseDetailHeaderProps = {
  course: CourseListItem;
  resourceCount: number;
  enrolledStudents: number;
};

export function CourseDetailHeader({
  course,
  resourceCount,
  enrolledStudents,
}: CourseDetailHeaderProps) {
  return (
    <div className="space-y-6 ">
      {/* Navigation and Edit button */}
      <CourseDetailNav course={course} />

      {/* Course info and stats */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8 bg-white rounded-md px-6.25 py-5">
        <div className="flex-1">
          <CourseInfoCard course={course} resourceCount={resourceCount} />
        </div>
        <div className="w-full sm:w-auto lg:mt-7">
          <CourseStatsCard enrolledStudents={enrolledStudents} />
        </div>
      </div>
    </div>
  );
}
