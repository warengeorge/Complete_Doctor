// src/components/layout/nav-logout.tsx
"use client";

import { LogOut } from "lucide-react";
// import { logout } from "@/lib/actions/logout";

export function NavLogout() {
  return (
    <form action={""}>
      <button
        type="submit"
        className="flex w-full items-center gap-3.75 rounded-md px-3 py-2 text-sm text-[#DC0000]"
      >
        <LogOut className="h-4 w-4 font-medium" />
        <span className="font-medium">Logout</span>
      </button>
    </form>
  );
}
