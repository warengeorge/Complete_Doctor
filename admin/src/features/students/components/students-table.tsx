"use client";

import { MoreHorizontal, UserRound } from "lucide-react";

import type { StudentListItem } from "../types";

type StudentsTableProps = {
  rows: StudentListItem[];
  pageStartIndex: number;
};

function StudentAvatar({ student }: { student: StudentListItem }) {
  if (student.avatar.type === "initials") {
    return (
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#007AFF] text-[10px] font-semibold text-white">
        {student.avatar.initials}
      </span>
    );
  }

  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F3D7BE]">
      <UserRound className="h-4 w-4 text-[#B57340]" />
    </span>
  );
}

export function StudentsTable({ rows, pageStartIndex }: StudentsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E5E5E8] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1040px] border-collapse">
          <thead>
            <tr className="bg-[#E9ECEF] text-left text-[14px]  text-[#0C0C0C]">
              <th className="w-24 px-6 py-4">S/N</th>
              <th className="px-5 py-4">Student name</th>
              <th className="px-5 py-4">Email address</th>
              <th className="w-64 px-5 py-4">Enrolled Courses</th>
              <th className="w-52 px-5 py-4">Date registered</th>
              <th className="w-14 px-5 py-4" />
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-sm text-[#6B6B6E]"
                >
                  No students found.
                </td>
              </tr>
            ) : (
              rows.map((student, index) => (
                <tr
                  key={student.id}
                  className={
                    index % 2 === 0
                      ? "bg-[#FFFFFF] text-[#313131]"
                      : "bg-[#F3F4F6] text-[#313131]"
                  }
                >
                  <td className="px-6 py-6 text-[14px] font-medium">
                    {String(pageStartIndex + index + 1).padStart(2, "0")}
                  </td>

                  <td className="px-5 py-6">
                    <div className="flex items-center gap-3">
                      <StudentAvatar student={student} />
                      <span className="text-[14px] font-medium text-[#313131]">
                        {student.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-6 text-[14px] text-[#313131]">
                    {student.email}
                  </td>
                  <td className="px-5 py-6 text-[14px] text-[#313131]">
                    {student.enrolledCourses}
                  </td>
                  <td className="px-5 py-6 text-[14px] text-[#313131]">
                    {student.dateRegistered}
                  </td>

                  <td className="px-4 py-6 text-right">
                    <button
                      type="button"
                      aria-label={`Open ${student.name} actions`}
                      className="rounded p-1 text-[#505256] hover:bg-[#E8EAEE]"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
