"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getCategoriesRequest,
  type CategoriesListParams,
} from "./categories-api";
import { CATEGORIES_LIST_QUERY_KEY } from "./categories-query-keys";

export function useCategoriesQuery(params: CategoriesListParams = {}) {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 10;

  return useQuery({
    queryKey: [...CATEGORIES_LIST_QUERY_KEY, page, pageSize],
    queryFn: () => getCategoriesRequest({ page, pageSize }),
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
