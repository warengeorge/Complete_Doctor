"use client";

/**
 * Root Providers
 * Composes all application-level providers
 * Order matters - providers should wrap features that depend on them
 */

import { QueryProvider } from "./providers/query-provider";
import { ToastProvider } from "./providers/toast-provider";
import { ZustandProvider } from "./providers/zustand-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <ZustandProvider>
        <ToastProvider>{children}</ToastProvider>
      </ZustandProvider>
    </QueryProvider>
  );
}
