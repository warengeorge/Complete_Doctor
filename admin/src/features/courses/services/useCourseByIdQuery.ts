"use client";

import { useQuery } from "@tanstack/react-query";

import { getCourseByIdRequest } from "./courses-api";
import { COURSE_DETAIL_QUERY_KEY } from "./courses-query-keys";

export function useCourseByIdQuery(courseId?: string) {
  return useQuery({
    queryKey: [...COURSE_DETAIL_QUERY_KEY, courseId],
    queryFn: () => getCourseByIdRequest(courseId ?? ""),
    enabled: Boolean(courseId),
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
