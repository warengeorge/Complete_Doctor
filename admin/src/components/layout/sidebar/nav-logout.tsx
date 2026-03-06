// src/components/layout/nav-logout.tsx
"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LogOut } from "lucide-react";

import { useLogoutMutation } from "@/features/auth/services/useLogoutMutation";

export function NavLogout() {
  const router = useRouter();
  const { state } = useSidebar();
  const isCollapsed = state !== "expanded";
  const logoutMutation = useLogoutMutation();

  const logoutButton = (
    <button
      type="button"
      onClick={async () => {
        if (logoutMutation.isPending) {
          return;
        }

        try {
          await logoutMutation.mutateAsync();
          toast.success("Logged out successfully.");
          router.push("/");
          router.refresh();
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Unable to log out.";

          toast.error(message);
        }
      }}
      aria-label="Logout"
      className={`flex w-full items-center rounded-md py-2 text-sm text-[#DC0000] ${
        isCollapsed ? "justify-center px-2" : "gap-3.75 px-3"
      }`}
      disabled={logoutMutation.isPending}
    >
      <LogOut className="h-4 w-4 font-medium shrink-0" />
      {!isCollapsed && (
        <span className="font-medium">
          {logoutMutation.isPending ? "Logging out..." : "Logout"}
        </span>
      )}
    </button>
  );

  return (
    <div>
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
    </div>
  );
}
