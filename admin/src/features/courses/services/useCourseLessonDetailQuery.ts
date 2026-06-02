"use client";

import { useQuery } from "@tanstack/react-query";

import { getCourseLessonByIdRequest } from "./course-modules-api";
import { COURSE_LESSON_DETAIL_QUERY_KEY } from "./courses-query-keys";

export function useCourseLessonDetailQuery(lessonId?: string, enabled = true) {
  return useQuery({
    queryKey: [...COURSE_LESSON_DETAIL_QUERY_KEY, lessonId],
    queryFn: () => getCourseLessonByIdRequest(lessonId ?? ""),
    enabled: Boolean(lessonId && enabled),
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
