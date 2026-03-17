import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuthStore } from "../store";
import { logoutRequest } from "./auth-api";
import { AUTH_ME_QUERY_KEY } from "./auth-query-keys";

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      clearAuth();
      queryClient.removeQueries({ queryKey: AUTH_ME_QUERY_KEY });
    },
  });
}
