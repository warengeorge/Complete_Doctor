"use client";

import { useQuery } from "@tanstack/react-query";

import { getCourseModuleLessonsRequest } from "./course-modules-api";
import { COURSE_MODULE_LESSONS_QUERY_KEY } from "./courses-query-keys";

export function useCourseModuleLessonsQuery(
  courseId?: string,
  moduleId?: string,
  enabled = true,
) {
  return useQuery({
    queryKey: [...COURSE_MODULE_LESSONS_QUERY_KEY, courseId, moduleId],
    queryFn: () => getCourseModuleLessonsRequest(courseId ?? "", moduleId ?? ""),
    enabled: Boolean(courseId && moduleId && enabled),
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
