"use client";

import { ReactNode } from "react";
import { Toaster } from "sonner";

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <Toaster position="top-center" closeButton={true} richColors={true} />
    </>
  );
}
