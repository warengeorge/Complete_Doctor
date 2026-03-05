// src/components/layout/nav-logout.tsx
"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { LogOut } from "lucide-react";
// import { logout } from "@/lib/actions/logout";

export function NavLogout() {
  const { state } = useSidebar();
  const isCollapsed = state !== "expanded";

  const logoutButton = (
    <button
      type="submit"
      aria-label="Logout"
      className={`flex w-full items-center rounded-md py-2 text-sm text-[#DC0000] ${
        isCollapsed ? "justify-center px-2" : "gap-3.75 px-3"
      }`}
    >
      <LogOut className="h-4 w-4 font-medium shrink-0" />
      {!isCollapsed && <span className="font-medium">Logout</span>}
    </button>
  );

  return (
    <form action={""}>
      {isCollapsed ? (
        <Tooltip>
          <TooltipTrigger asChild>{logoutButton}</TooltipTrigger>
          <TooltipContent side="right" sideOffset={8}>
            Logout
          </TooltipContent>
        </Tooltip>
      ) : (
        logoutButton
      )}
    </form>
  );
}
