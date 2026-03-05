"use client";

import { Check, Calendar, Clock, MapPin, User } from "lucide-react";
import { useState } from "react";

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
  const [showFull, setShowFull] = useState(false);

  const shouldTruncate = description.split(" ").length > 50;

  return (
    <div className="space-y-8">
      {/* about */}
      <div>
        <h2 className="text-[16px] font-semibold text-[#151515] mb-2">
          About this course
        </h2>
        <p
          className={
            "text-[14px] text-[#6B6B6B] leading-relaxed " +
            (showFull ? "" : "line-clamp-3")
          }
        >
          {description}
        </p>
        {shouldTruncate && (
          <button
            className="mt-1 text-[14px] font-medium text-[#007AFF] hover:underline"
            onClick={() => setShowFull((v) => !v)}
          >
            {showFull ? "See less" : "See more"}
          </button>
        )}
      </div>

      {/* details */}
      <div className="border-t border-[#E5E5E8] pt-6">
        <h3 className="text-[14px] font-semibold text-[#151515] mb-2">
          Course Details
        </h3>
        <ul className="space-y-2 text-[14px] text-[#313131]">
          <li className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>
              <strong>Schedule:</strong> {details.schedule}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>
              <strong>Time:</strong> {details.time}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>
              <strong>Location:</strong>{" "}
              <a href="#" className="text-[#007AFF] hover:underline">
                {details.location}
              </a>
            </span>
          </li>
          <li className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>
              <strong>Instructor:</strong> {details.instructor}
            </span>
          </li>
        </ul>
      </div>

      {/* objectives */}
      <div className="border-t border-[#E5E5E8] pt-6">
        <h3 className="text-[14px] font-semibold text-[#151515] mb-2">
          Course Objectives
        </h3>
        <p className="text-[14px] text-[#313131] mb-2">
          By the end of this course, you will be able to:
        </p>
        <ul className="space-y-2 text-[14px] text-[#313131]">
          {objectives.map((o, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="h-4 w-4 shrink-0 mt-1 text-green-600" />
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* merits */}
      <div className="border-t border-[#E5E5E8] pt-6">
        <h3 className="text-[14px] font-semibold text-[#151515] mb-2">
          Who Should Take This Course?
        </h3>
        <p className="text-[14px] text-[#313131] mb-2">
          This course is ideal for:
        </p>
        <ul className="space-y-2 text-[14px] text-[#313131]">
          {merits.map((m, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="h-4 w-4 shrink-0 mt-1 text-green-600" />
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
