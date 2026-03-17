import { useQuery } from "@tanstack/react-query";

import { getMeRequest } from "./auth-api";
import { AUTH_ME_QUERY_KEY } from "./auth-query-keys";

export function useAuthMeQuery(enabled: boolean) {
  return useQuery({
    queryKey: AUTH_ME_QUERY_KEY,
    queryFn: getMeRequest,
    enabled,
    retry: false,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
