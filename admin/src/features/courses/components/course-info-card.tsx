"use client";

import type { CourseListItem } from "../types";
import { getStatusTextClass, getStatusBgClass } from "./courses-list-table";

export type CourseInfoCardProps = {
  course: CourseListItem;
  resourceCount: number;
};

export function CourseInfoCard({ course, resourceCount }: CourseInfoCardProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-4">
      {/* Image and title block */}
      <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
        <div className="relative h-28 w-40 shrink-0 overflow-hidden rounded-lg sm:h-20 sm:w-32">
          <img
            src={course.image}
            alt={course.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
            <span
              className={`w-fit rounded-full px-2 py-1 text-[10px] font-semibold ${getStatusTextClass(course.status)} ${getStatusBgClass(course.status)}`}
            >
              {course.status}
            </span>
            <h1 className="text-lg font-semibold text-[#121212] sm:text-[20px]">
              {course.title}
            </h1>
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-[#313131] sm:gap-4 sm:text-[14px]">
            <span className="flex items-center gap-1">
              <svg
                width="12"
                height="15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
              >
                <path
                  d="M0.722229 12.639V3.03342C0.722229 2.22446 0.722229 1.81967 0.879664 1.51069C1.01815 1.2389 1.23896 1.01809 1.51075 0.879603C1.81973 0.722168 2.22452 0.722168 3.03348 0.722168H9.67793C10.0824 0.722168 10.2849 0.722168 10.4394 0.800885C10.5753 0.870127 10.6851 0.980533 10.7543 1.11643C10.8331 1.27092 10.8333 1.47331 10.8333 1.87779V10.4C10.8333 10.8045 10.8331 11.0065 10.7543 11.161C10.6851 11.2968 10.5755 11.4076 10.4396 11.4769C10.2852 11.5555 10.0829 11.5555 9.67925 11.5555H2.34723C1.44977 11.5555 0.722229 12.283 0.722229 13.1805C0.722229 13.4797 0.964741 13.7222 1.2639 13.7222H8.95703C9.36072 13.7222 9.563 13.7222 9.71734 13.6435C9.85324 13.5743 9.96288 13.4636 10.0321 13.3277C10.1108 13.1732 10.1111 12.9711 10.1111 12.5666V11.5555"
                  stroke="currentColor"
                  strokeWidth="1.44444"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="truncate">{course.category}</span>
            </span>
            <span className="flex items-center gap-1 whitespace-nowrap">
              📁 {resourceCount} resources
            </span>
            <span className="flex items-center gap-1 whitespace-nowrap">
              🗓 {course.createdAt}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
