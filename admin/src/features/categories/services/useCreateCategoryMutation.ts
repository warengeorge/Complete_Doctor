import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { CreateCategoryInput } from "./categories-api";
import { createCategoryRequest } from "./categories-api";
import { CATEGORIES_LIST_QUERY_KEY } from "./categories-query-keys";

export function useCreateCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateCategoryInput) => createCategoryRequest(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_LIST_QUERY_KEY });
    },
  });
}
