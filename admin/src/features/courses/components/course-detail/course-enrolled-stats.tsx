"use client";

export type CourseStatsCardProps = {
  enrolledStudents: number;
};

export function CourseStatsCard({ enrolledStudents }: CourseStatsCardProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-[#E5E5E8] bg-white px-4 py-2 shadow-sm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-5 w-5 shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
      <div className="text-sm">
        <p className="font-semibold text-[#121212]">
          {enrolledStudents.toLocaleString()}
        </p>
        <p className="text-[#6B6B6B]">Total Enrolled Students</p>
      </div>
    </div>
  );
}
