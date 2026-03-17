"use client";

/**
 * Advanced Auth Hooks
 * Provides utility hooks for auth-related operations
 */

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/features/auth/store";
import { useLogoutMutation } from "@/features/auth/services/useLogoutMutation";

/**
 * Hook to check user permissions
 */
export function useAuthPermission() {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));

  const hasRole = useCallback(
    (role: string): boolean => {
      if (!user) return false;
      return user.roles.includes(role);
    },
    [user],
  );

  const hasAnyRole = useCallback(
    (roles: string[]): boolean => {
      if (!user) return false;
      return roles.some((role) => user.roles.includes(role));
    },
    [user],
  );

  const hasAllRoles = useCallback(
    (roles: string[]): boolean => {
      if (!user) return false;
      return roles.every((role) => user.roles.includes(role));
    },
    [user],
  );

  return { hasRole, hasAnyRole, hasAllRoles };
}

/**
 * Hook for enforcing re-authentication
 * Used for sensitive operations
 */
export function useRequireAuth() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore((state) => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
  }));

  const requireAuth = useCallback(
    (callback?: () => void) => {
      if (!isAuthenticated || !user) {
        router.replace("/");
        return false;
      }

      callback?.();
      return true;
    },
    [isAuthenticated, user, router],
  );

  return { requireAuth, user, isAuthenticated };
}

/**
 * Hook to handle automatic logout on errors
 */
export function useAutoLogout() {
  const router = useRouter();
  const logoutMutation = useLogoutMutation();

  const logout = useCallback(
    (reason?: string) => {
      console.warn("Auto-logout triggered:", reason || "session expired");

      logoutMutation.mutate(undefined, {
        onSettled: () => {
          router.replace("/");
          router.refresh();
        },
      });
    },
    [logoutMutation, router],
  );

  return { logout };
}

/**
 * Hook to get user display name
 */
export function useUserDisplayName(): string {
  const user = useAuthStore((state) => state.user);

  if (!user) return "User";

  // Try to get display name from profile
  if (user.profile?.displayName) {
    return user.profile.displayName;
  }

  // Fallback to email prefix
  if (user.email) {
    return user.email.split("@")[0] || "User";
  }

  return "User";
}

/**
 * Hook to check if user is admin
 */
export function useIsAdmin(): boolean {
  const user = useAuthStore((state) => state.user);

  if (!user) return false;

  return user.roles.includes("ADMIN");
}

/**
 * Hook to check if user is instructor
 */
export function useIsInstructor(): boolean {
  const user = useAuthStore((state) => state.user);

  if (!user) return false;

  return user.instructor !== null;
}

/**
 * Hook to check if user is learner
 */
export function useIsLearner(): boolean {
  const user = useAuthStore((state) => state.user);

  if (!user) return false;

  return user.learner !== null;
}
