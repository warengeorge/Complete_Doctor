"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getCoursesRequest,
  type CoursesListParams,
} from "./courses-api";
import { COURSES_LIST_QUERY_KEY } from "./courses-query-keys";

export function useCoursesQuery(params: CoursesListParams = {}) {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 50;
  const fetchAll = params.fetchAll ?? false;

  return useQuery({
    queryKey: [...COURSES_LIST_QUERY_KEY, page, pageSize, fetchAll],
    queryFn: () => getCoursesRequest({ page, pageSize, fetchAll }),
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
