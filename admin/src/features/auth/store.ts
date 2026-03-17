import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AuthUser } from "./types";
import type { AuthErrorType } from "@/lib/auth-errors";

type AuthStoreState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  error: { type: AuthErrorType; message: string } | null;

  // User operations
  setAuthUser: (user: AuthUser) => void;
  clearAuth: () => void;

  // Store operations
  setHasHydrated: (value: boolean) => void;
  setError: (error: { type: AuthErrorType; message: string } | null) => void;
  clearError: () => void;
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      hasHydrated: false,
      error: null,

      setAuthUser: (user) => {
        set({
          user,
          isAuthenticated: true,
          error: null,
        });
      },

      clearAuth: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      setHasHydrated: (value) => {
        set({ hasHydrated: value });
      },

      setError: (error) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
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
