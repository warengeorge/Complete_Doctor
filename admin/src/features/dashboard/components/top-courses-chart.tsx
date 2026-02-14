"use client";

import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";

const data = [
  { month: "Jan", sca: 40 },
  { month: "Feb", sca: 20 },
  { month: "Mar", sca: 80 },
  { month: "Apr", sca: 50 },
];

export function TopCoursesChart() {
  return (
    <Card className="p-4">
      <h2 className="mb-4 text-sm font-medium">Top Courses by Enrollment</h2>

      <div className="h-72">
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <Bar dataKey="sca" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
