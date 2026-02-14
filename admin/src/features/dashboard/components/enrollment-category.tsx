"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";

const data = [
  { name: "MRCPG AKT", value: 100 },
  { name: "MSRA Masterclass", value: 60 },
  { name: "UKMLA PLAB 1", value: 40 },
  { name: "SCA", value: 34 },
];

export function EnrollmentCategory() {
  return (
    <Card className="p-4">
      <h2 className="mb-4 text-sm font-medium">Enrollment by Category</h2>

      <div className="h-60">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} innerRadius={50} outerRadius={80} dataKey="value">
              {data.map((_, index) => (
                <Cell key={index} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
