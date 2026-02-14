"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu className="mt-7 gap-2.5">
        {items.map((item) => {
          const isActive =
            pathname === item.url || pathname.startsWith(`${item.url}/`);

          return (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={item.title}
                className="group
                    data-[active=true]:bg-[#007AFF]
                     data-[active=true]:text-white"
              >
                <Link href={item.url} className="flex items-center gap-3.75">
                  {item.icon && <item.icon className="h-4 w-4 shrink-0" />}
                  <span className="font-medium text-[#151515] group-data-[active=true]:text-white">
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
