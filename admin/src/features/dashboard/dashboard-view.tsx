"use client";

import { StatsCards } from "./components/stats-cards";
import { QuickActions } from "./components/quick-actions";
import { UpcomingEvents } from "./components/upcoming-events";
import { events } from "./data/events";
import { EnrollmentChart } from "./components/enrollment-chart";
import { EnrollmentCategory } from "./components/enrollment-category";
import { TopCoursesChart } from "./components/top-courses-chart";

export function DashboardView() {
  return (
    <div className="container w-full space-y-6">
      {/* Greeting */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-semibold text-[#121212]">
            Good morning, Joanne! ☁️
          </h1>
          <p className="text-[13px] text-[#606060]">
            Welcome to your learning dashboard
          </p>
        </div>
      </div>

      {/* Stats */}
      <StatsCards />

      {/* Quick Actions + Upcoming */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="min-w-0">
          <QuickActions />
        </div>
        <div className="min-w-0 lg:col-span-2">
          <UpcomingEvents events={events} />
        </div>
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <EnrollmentChart />
        </div>
        <div className="min-w-0">
          <EnrollmentCategory />
        </div>
      </div>

      {/* Bottom chart */}
      <TopCoursesChart />
    </div>
  );
}
