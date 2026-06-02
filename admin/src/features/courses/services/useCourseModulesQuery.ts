"use client";

import { useQuery } from "@tanstack/react-query";

import { getCourseModulesRequest } from "./course-modules-api";
import { COURSE_MODULES_QUERY_KEY } from "./courses-query-keys";

export function useCourseModulesQuery(courseId?: string) {
  return useQuery({
    queryKey: [...COURSE_MODULES_QUERY_KEY, courseId],
    queryFn: () => getCourseModulesRequest(courseId ?? ""),
    enabled: Boolean(courseId),
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
