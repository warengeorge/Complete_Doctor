"use client";

import { useState, useMemo } from "react";
import { Search, Filter, MoreHorizontal } from "lucide-react";
import type { EnrolledStudent } from "../types";

export type CourseDetailStudentsProps = {
  enrolledStudents: EnrolledStudent[];
  pendingStudents: EnrolledStudent[];
};

type TabType = "enrolled" | "pending";

const getAvatarColor = (initials: string) => {
  const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-orange-500",
    "bg-green-500",
    "bg-red-500",
    "bg-indigo-500",
    "bg-cyan-500",
  ];
  const code = initials.charCodeAt(0) + initials.charCodeAt(1);
  return colors[code % colors.length];
};

export function CourseDetailStudents({
  enrolledStudents,
  pendingStudents,
}: CourseDetailStudentsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("enrolled");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Get the students based on active tab
  const currentStudents =
    activeTab === "enrolled" ? enrolledStudents : pendingStudents;

  // Handle tab change - reset pagination
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Filter students based on search term
  const filteredStudents = useMemo(() => {
    return currentStudents.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [currentStudents, searchTerm]);

  // Paginate
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="space-y-4">
      {/* Header with search and filter */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => handleTabChange("enrolled")}
            className={`rounded-lg px-4 py-2 text-[14px] font-semibold ${
              activeTab === "enrolled"
                ? "bg-[#ECECEC] text-[#0C0C0C]"
                : "bg-[#F5F5F7] text-[#6B6B6B] hover:bg-[#EBEBF0]"
            }`}
          >
            Enrolled students
          </button>
          <button
            onClick={() => handleTabChange("pending")}
            className={`rounded-lg px-4 py-2 text-[14px] font-semibold ${
              activeTab === "pending"
                ? "bg-[#ECECEC] text-[#0C0C0C]"
                : "bg-[#F5F5F7] text-[#6B6B6B] hover:bg-[#EBEBF0]"
            }`}
          >
            Pending confirmation
          </button>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B6B6B]" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-lg border border-[#E5E5E8] bg-white py-2 pl-10 pr-4 text-[14px] placeholder-[#6B6B6B] focus:border-[#007AFF] focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-[#E5E5E8] bg-white px-4 py-2 text-[14px] font-medium text-[#313131] hover:bg-[#F5F5F7]">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-[#E5E5E8]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E5E5E8] bg-[#F5F5F7]">
              <th className="px-4 py-3 text-left text-[14px] font-semibold text-[#313131]">
                S/N
              </th>
              <th className="px-4 py-3 text-left text-[14px] font-semibold text-[#313131]">
                Student name
              </th>
              <th className="px-4 py-3 text-left text-[14px] font-semibold text-[#313131]">
                Email address
              </th>
              <th className="px-4 py-3 text-left text-[14px] font-semibold text-[#313131]">
                Date enrolled
              </th>
              <th className="px-4 py-3 text-center text-[14px] font-semibold text-[#313131]">
                Action
              </th>
              {activeTab === "pending" && (
                <th className="px-4 py-3 text-center text-[14px] font-semibold text-[#313131]"></th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedStudents.map((student, index) => (
              <tr
                key={student.id}
                className="border-b border-[#E5E5E8] transition-colors hover:bg-[#F9F9FB]"
              >
                <td className="px-4 py-3 text-[14px] text-[#313131]">
                  {String(startIndex + index + 1).padStart(2, "0")}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-semibold text-white ${getAvatarColor(student.initials)}`}
                    >
                      {student.initials}
                    </div>
                    <span className="text-[14px] font-medium text-[#121212]">
                      {student.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[14px] text-[#313131]">
                  {student.email}
                </td>
                <td className="px-4 py-3 text-[14px] text-[#313131]">
                  {student.enrolledDate}
                </td>
                <td className="px-4 py-3 text-center">
                  {activeTab === "pending" ? (
                    <button className="inline-flex items-center rounded bg-[#007AFF] px-3 py-1 text-[14px] font-medium text-white hover:bg-[#006DE0]">
                      Confirm
                    </button>
                  ) : (
                    <button className="inline-flex h-8 w-8 items-center justify-center rounded hover:bg-[#F5F5F7]">
                      <MoreHorizontal className="h-4 w-4 text-[#6B6B6B]" />
                    </button>
                  )}
                </td>
                {activeTab === "pending" && (
                  <td className="px-4 py-3 text-center">
                    <button className="inline-flex h-8 w-8 items-center justify-center rounded hover:bg-[#F5F5F7]">
                      <MoreHorizontal className="h-4 w-4 text-[#6B6B6B]" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-[14px] text-[#6B6B6B]">
          {filteredStudents.length === 0
            ? "No students found"
            : `${startIndex + 1}-${Math.min(startIndex + itemsPerPage, filteredStudents.length)} of ${filteredStudents.length}`}
        </div>

        <div className="flex items-center gap-1 overflow-x-auto">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="rounded border border-[#E5E5E8] px-3 py-2 text-[14px] font-medium text-[#313131] disabled:opacity-50 hover:bg-[#F5F5F7]"
          >
            Back
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            // Show first page, last page, current page, and nearby pages
            if (
              page === 1 ||
              page === totalPages ||
              Math.abs(page - currentPage) <= 1
            ) {
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`rounded px-3 py-2 text-[14px] font-medium ${
                    page === currentPage
                      ? "bg-[#121212] text-white"
                      : "border border-[#E5E5E8] text-[#313131] hover:bg-[#F5F5F7]"
                  }`}
                >
                  {page}
                </button>
              );
            } else if (page === 2 || page === totalPages - 1) {
              return (
                <span key={page} className="px-2 py-2 text-[14px]">
                  ...
                </span>
              );
            }
            return null;
          })}

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="rounded border border-[#E5E5E8] px-3 py-2 text-[14px] font-medium text-[#313131] disabled:opacity-50 hover:bg-[#F5F5F7]"
          >
            Next
          </button>
        </div>

        <div className="text-[14px] text-[#6B6B6B]">
          Result per page:{" "}
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="rounded border border-[#E5E5E8] bg-white px-2 py-1 text-[14px] font-medium"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
}
