import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuthStore } from "../store";
import type { LoginInput } from "../types";
import { loginRequest } from "./auth-api";

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  return useMutation({
    mutationFn: (input: LoginInput) => loginRequest(input),
    onSuccess: (response) => {
      setAuthUser(response.data.user);
      queryClient.setQueryData(["auth-user"], response.data.user);
    },
  });
}
