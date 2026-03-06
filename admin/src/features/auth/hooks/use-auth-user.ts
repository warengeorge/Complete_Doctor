"use client";

import { useAuthStore } from "../store";

export function useAuthUser() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  return {
    user,
    isAuthenticated,
    hasHydrated,
  };
}
