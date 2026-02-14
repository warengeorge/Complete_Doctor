"use client";

import * as React from "react";

import { NavMain } from "./nav-main";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Settings,
 
} from "lucide-react";
import { CoursesIcon } from "@/components/icons/courses-icon";
import { StudentsIcon } from "@/components/icons/students-icon";

import { NavLogout } from "./nav-logout";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Courses",
      url: "/courses",
      icon: CoursesIcon,
    },
    {
      title: "Students",
      url: "/students",
      icon: StudentsIcon,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar({
  //  user,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="top-18.75 h-[calc(100vh-4.69rem)]"
    >
      <SidebarContent>
        <div className="mx-auto w-full max-w-50">
          <NavMain items={data.navMain} />
        </div>
      </SidebarContent>
      <SidebarFooter>
        <div className="mx-auto w-full max-w-40">
          <NavLogout />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
