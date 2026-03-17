import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuthStore } from "../store";
import type { LoginInput } from "../types";
import { loginRequest } from "./auth-api";
import { AUTH_ME_QUERY_KEY } from "./auth-query-keys";

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  return useMutation({
    mutationFn: (input: LoginInput) => loginRequest(input),
    onSuccess: (response) => {
      const user = response.data.user;
      setAuthUser(user);
      queryClient.setQueryData(AUTH_ME_QUERY_KEY, {
        success: true,
        message: "Success",
        data: { user },
      });
    },
  });
}
