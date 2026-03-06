"use client";

/**
 * React Query Provider
 * Provides server-state management for the application
 * Handles all API calls, caching, and synchronization
 * Server-state-first architecture
 */

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

import { getQueryClient } from "@/lib/query-client";

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
