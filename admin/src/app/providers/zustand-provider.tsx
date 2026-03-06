"use client";

/**
 * Zustand Provider
 * Provides global state management for the application
 * Each feature manages its own stores independently
 * This provider acts as a wrapper for future global state needs
 */

import { ReactNode } from "react";

interface ZustandProviderProps {
  children: ReactNode;
}

export function ZustandProvider({ children }: ZustandProviderProps) {
  // Each feature creates and manages its own Zustand stores
  // This provider can be extended to provide global stores if needed
  return <>{children}</>;
}
