"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";

const data = [
  { month: "Jan", value: 5 },
  { month: "Feb", value: 50 },
  { month: "Mar", value: 50 },
  { month: "Apr", value: 65 },
  { month: "May", value: 60 },
  { month: "Jun", value: 75 },
  { month: "Jul", value: 50 },
  { month: "Aug", value: 85 },
  { month: "Sep", value: 95 },
  { month: "Oct", value: 70 },
  { month: "Nov", value: 100 },
  { month: "Dec", value: 90 },
];

export function EnrollmentChart() {
  return (
    <Card className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold">Student Enrollment Trend</h2>
          <Info size={16} className="text-muted-foreground" />
        </div>

        <select className="w-full rounded-md border bg-background px-3 py-1 text-sm sm:w-auto">
          <option>This year</option>
          <option>Last year</option>
        </select>
      </div>

      {/* Chart */}
      <div className="h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              className="text-xs"
            />
            <YAxis axisLine={false} tickLine={false} className="text-xs" />
            <Tooltip />
            <Line
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
