import { useMutation } from "@tanstack/react-query";

import type { CreateCategoryInput } from "./categories-api";
import { createCategoryRequest } from "./categories-api";

export function useCreateCategoryMutation() {
  return useMutation({
    mutationFn: (input: CreateCategoryInput) => createCategoryRequest(input),
  });
}
