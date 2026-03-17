"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store";
import { logoutRequest } from "../services/auth-api";
import { useAuthMeQuery } from "../services/useAuthMeQuery";

type AuthBootstrapProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export function AuthBootstrap({
  children,
  fallback = null,
}: AuthBootstrapProps) {
  const router = useRouter();
  const setAuthUser = useAuthStore((state) => state.setAuthUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const user = useAuthStore((state) => state.user);

  const hasHandledError = useRef(false);

  const meQuery = useAuthMeQuery(hasHydrated);

  useEffect(() => {
    if (!meQuery.data?.data?.user) {
      return;
    }

    setAuthUser(meQuery.data.data.user);
  }, [meQuery.data, setAuthUser]);

  useEffect(() => {
    if (!meQuery.isError || hasHandledError.current) {
      return;
    }

    hasHandledError.current = true;

    void logoutRequest()
      .catch(() => null)
      .finally(() => {
        clearAuth();
        router.replace("/");
        router.refresh();
      });
  }, [clearAuth, meQuery.isError, router]);

  if (!hasHydrated) {
    return <>{fallback}</>;
  }

  if (user) {
    return <>{children}</>;
  }

  if (meQuery.isFetching) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
