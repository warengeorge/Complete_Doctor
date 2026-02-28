"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";

const data = [
  { name: "MRCGP AKT", value: 100 },
  { name: "MSRA Masterclass", value: 60 },
  { name: "UKMLA PLAB 1", value: 40 },
  { name: "SCA", value: 34 },
];

const COLORS = [
  "#1D4ED8", // dark blue
  "#2563EB",
  "#60A5FA",
  "#BFDBFE", // lightest
];

export function EnrollmentCategory() {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold">Enrollment by Category</h2>
          <Info size={16} className="text-muted-foreground" />
        </div>

        <select className="border rounded-md px-3 py-1 text-sm bg-background">
          <option>This year</option>
          <option>Last year</option>
        </select>
      </div>

      {/* Content */}
      <div className="flex items-center justify-between">
        {/* Donut Chart */}
        <div className="relative h-64 w-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={2}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Total */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-semibold">{total}</span>
            <span className="text-sm text-muted-foreground">Total</span>
          </div>
        </div>

        {/* Custom Legend */}
        <div className="space-y-4">
          {data.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-3">
              <span
                className="h-3 w-6 rounded-sm"
                style={{ backgroundColor: COLORS[index] }}
              />
              <span className="text-sm text-muted-foreground">
                {entry.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
