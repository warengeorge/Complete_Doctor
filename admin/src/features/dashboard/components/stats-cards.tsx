"use client";

import { Card } from "@/components/ui/card";
import { CalendarDays, Check, CircleAlert, LucideIcon } from "lucide-react";

type Stat = {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  iconColor?: string;
  iconBg?: string;
};

const stats: Stat[] = [
  { label: "Total courses", value: 21 },

  {
    label: "Ongoing courses",
    value: "03",
    icon: CircleAlert,
    iconColor: "text-[#1640C1]",
    iconBg: "bg-[#1640C11F]",
  },
  {
    label: "Upcoming lectures",
    value: "08",
    icon: CalendarDays,
    iconColor: "text-[#EA7128]",
    iconBg: "bg-[#EA71281F]",
  },
  {
    label: "Completed",
    value: 34,
    icon: Check,
    iconColor: "text-[#1FC16B]",
    iconBg: "bg-[#1FC16B1F]",
  },

  { label: "Total enrolled students", value: 234 },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="p-3 max-w-57.25 max-h-[74.18px]">
            <div className="flex items-center justify-between">
              <div className="space-y-2.5">
                <p className="text-[11.5px]  text-[#313131] font-medium">
                  {stat.label}
                </p>
                <p className="text-lg font-medium">{stat.value}</p>
              </div>

              {Icon && (
                <span
                  className={`rounded-full w-7.5 h-7.5 flex items-center justify-center ${stat.iconBg}`}
                >
                  <Icon className={`h-4 w-4 ${stat.iconColor}`} />
                </span>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
