import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AuthUser } from "./types";

type AuthStoreState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  setAuthUser: (user: AuthUser) => void;
  clearAuth: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      hasHydrated: false,
      setAuthUser: (user) => {
        set({
          user,
          isAuthenticated: true,
        });
      },
      clearAuth: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
      setHasHydrated: (value) => {
        set({ hasHydrated: value });
      },
    }),
    {
      name: "admin-auth-store",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
