"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { UpdateCategoryInput } from "./categories-api";
import { updateCategoryRequest } from "./categories-api";
import { CATEGORIES_LIST_QUERY_KEY } from "./categories-query-keys";

export function useUpdateCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateCategoryInput) => updateCategoryRequest(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_LIST_QUERY_KEY });
    },
  });
}
