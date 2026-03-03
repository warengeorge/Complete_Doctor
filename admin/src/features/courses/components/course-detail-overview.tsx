"use client";

import { Check } from "lucide-react";

export type CourseDetailOverviewProps = {
  description: string;
  details: {
    schedule: string;
    time: string;
    location: string;
    instructor: string;
  };
  objectives: string[];
  merits: string[];
};

export function CourseDetailOverview({
  description,
  details,
  objectives,
  merits,
}: CourseDetailOverviewProps) {
  return (
    <div className="space-y-8">
      {/* about */}
      <div>
        <h2 className="text-[16px] font-semibold text-[#151515] mb-2">
          About this course
        </h2>
        <p className="text-[14px] text-[#6B6B6B] leading-relaxed">
          {description}
        </p>
      </div>

      {/* details */}
      <div>
        <h3 className="text-[14px] font-semibold text-[#151515] mb-2">
          Course Details
        </h3>
        <ul className="space-y-2 text-[14px] text-[#313131]">
          <li>
            <strong>Schedule:</strong> {details.schedule}
          </li>
          <li>
            <strong>Time:</strong> {details.time}
          </li>
          <li>
            <strong>Location:</strong> {details.location}
          </li>
          <li>
            <strong>Instructor:</strong> {details.instructor}
          </li>
        </ul>
      </div>

      {/* objectives */}
      <div>
        <h3 className="text-[14px] font-semibold text-[#151515] mb-2">
          Course Objectives
        </h3>
        <ul className="space-y-2 text-[14px] text-[#313131] list-inside list-disc">
          {objectives.map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
      </div>

      {/* merits */}
      <div>
        <h3 className="text-[14px] font-semibold text-[#151515] mb-2">
          Who Should Take This Course?
        </h3>
        <ul className="space-y-2 text-[14px] text-[#313131] list-inside list-disc">
          {merits.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
