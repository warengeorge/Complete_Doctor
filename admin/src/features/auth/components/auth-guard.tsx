"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuthUser } from "../hooks/use-auth-user";
import { useAuthStore } from "../store";
import { useLogoutMutation } from "../services/useLogoutMutation";

type AuthGuardProps = {
  hasServerToken: boolean;
  mode: "public" | "protected";
};

export function AuthGuard({ hasServerToken, mode }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const { user, isAuthenticated, hasHydrated } = useAuthUser();

  const logoutMutation = useLogoutMutation();
  const hasHandledMismatch = useRef(false);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (!hasServerToken) {
      if (mode === "protected" && (isAuthenticated || user)) {
        clearAuth();
      }

      hasHandledMismatch.current = false;
      return;
    }

    if (user && isAuthenticated) {
      hasHandledMismatch.current = false;

      if (mode === "public" && pathname !== "/dashboard") {
        router.replace("/dashboard");
      }

      return;
    }

    if (hasHandledMismatch.current) {
      return;
    }

    hasHandledMismatch.current = true;

    logoutMutation.mutate(undefined, {
      onSettled: () => {
        router.replace("/");
        router.refresh();
      },
    });
  }, [
    clearAuth,
    hasHydrated,
    hasServerToken,
    isAuthenticated,
    logoutMutation,
    mode,
    pathname,
    router,
    user,
  ]);

  return null;
}
