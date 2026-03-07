"use client";

import { Bell, ChevronDownIcon } from "lucide-react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useAuthUser } from "@/features/auth";

function getDisplayName(user: ReturnType<typeof useAuthUser>["user"]) {
  const profile = user?.profile;
  const fullName = [profile?.firstName, profile?.lastName]
    .filter(Boolean)
    .join(" ");

  return profile?.displayName || fullName || user?.email || "Admin";
}

function getInitials(name: string) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return initials || "AD";
}

export function AppHeader() {
  const { isMobile } = useSidebar();
  const { user } = useAuthUser();
  const displayName = getDisplayName(user);
  const resolvedName = user ? displayName : "Admin";
  const initials = getInitials(resolvedName);

  return (
    <header className="sticky top-0 z-50 flex h-18.75 w-full items-center justify-between border-b bg-white px-4 sm:px-6">
      {/* Left */}
      <SidebarTrigger />
      <div className="flex items-center gap-4">
        {!isMobile && (
          <Image
            src="/icons/complete-doc-logo.svg"
            alt="Complete Doctor Logo"
            width={161}
            height={40}
            priority
          />
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Notification */}
        <div className={`relative`}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors shrink-0"
                aria-label="Notifications"
              >
                <Bell className="size-4 sm:size-5" />
                <span className="absolute -right-1 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  3
                </span>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications 🔔</p>
            </TooltipContent>
          </Tooltip>
          {/* <Bell className="h-5 w-5" />
          <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            3
          </span> */}
        </div>

        {/* User */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAEAEA] bg-opacity-80 text-sm font-medium">
            {initials}
          </div>
          <span className="hidden text-sm font-semibold text-[#646464] sm:inline">
            {resolvedName}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="size-6 rounded-full border bg-white"
          >
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
