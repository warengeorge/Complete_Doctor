"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";

const data = [
  { month: "Jan", sca: 35, respiratory: 40, cardiology: 30 },
  { month: "Feb", sca: 15, respiratory: 20, cardiology: 25 },
  { month: "Mar", sca: 20, respiratory: 50, cardiology: 30 },
  { month: "Apr", sca: 18, respiratory: 15, cardiology: 25 },
  { month: "May", sca: 12, respiratory: 10, cardiology: 20 },
  { month: "Jun", sca: 20, respiratory: 30, cardiology: 25 },
  { month: "Jul", sca: 5, respiratory: 10, cardiology: 15 },
  { month: "Aug", sca: 18, respiratory: 15, cardiology: 20 },
  { month: "Sep", sca: 15, respiratory: 10, cardiology: 40 },
  { month: "Oct", sca: 5, respiratory: 8, cardiology: 15 },
  { month: "Nov", sca: 20, respiratory: 35, cardiology: 25 },
  { month: "Dec", sca: 25, respiratory: 45, cardiology: 30 },
];

export function TopCoursesChart() {
  return (
    <Card className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold">Top Courses by Enrollment</h2>
          <Info size={16} className="text-muted-foreground" />
        </div>

        <select className="w-full rounded-md border bg-background px-3 py-1 text-sm sm:w-auto">
          <option>This year</option>
          <option>Last year</option>
        </select>
      </div>

      {/* Chart */}
      <div className="h-72 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={30}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              className="text-xs"
            />

            <YAxis axisLine={false} tickLine={false} className="text-xs" />

            <Tooltip />

            {/* Stacked Bars */}
            <Bar
              dataKey="sca"
              stackId="a"
              fill="#1D4ED8"
              name="SCA Intensive Review"
            />

            <Bar
              dataKey="respiratory"
              stackId="a"
              fill="#60A5FA"
              name="Respiratory Module"
            />

            <Bar
              dataKey="cardiology"
              stackId="a"
              fill="#BFDBFE"
              name="Cardiology Mastery"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
