"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Filter, MoreHorizontal, X } from "lucide-react";
import type { EnrolledStudent } from "../../types";
import { CoursesListPagination } from "../courses-list-pagination";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [enrolledList, setEnrolledList] =
    useState<EnrolledStudent[]>(enrolledStudents);
  const [pendingList, setPendingList] =
    useState<EnrolledStudent[]>(pendingStudents);
  const [activeTab, setActiveTab] = useState<TabType>("enrolled");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isConfirmPaymentOpen, setIsConfirmPaymentOpen] = useState(false);
  const [selectedPendingStudent, setSelectedPendingStudent] =
    useState<EnrolledStudent | null>(null);

  useEffect(() => {
    setEnrolledList(enrolledStudents);
  }, [enrolledStudents]);

  useEffect(() => {
    setPendingList(pendingStudents);
  }, [pendingStudents]);

  // Get the students based on active tab
  const currentStudents = activeTab === "enrolled" ? enrolledList : pendingList;

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
  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / itemsPerPage),
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const handleOpenConfirmPayment = (student: EnrolledStudent) => {
    setSelectedPendingStudent(student);
    setIsConfirmPaymentOpen(true);
  };

  const handleConfirmPendingStudent = () => {
    if (!selectedPendingStudent) {
      return;
    }

    setPendingList((prev) =>
      prev.filter((student) => student.id !== selectedPendingStudent.id),
    );
    setEnrolledList((prev) => [...prev, selectedPendingStudent]);
    setIsConfirmPaymentOpen(false);
    setSelectedPendingStudent(null);
  };

  const handleCloseConfirmPayment = () => {
    setIsConfirmPaymentOpen(false);
    setSelectedPendingStudent(null);
  };

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
                    <button
                      type="button"
                      onClick={() => handleOpenConfirmPayment(student)}
                      className="inline-flex items-center rounded bg-[#007AFF] px-3 py-1 text-[14px] font-medium text-white hover:bg-[#006DE0]"
                    >
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
      <CoursesListPagination
        currentPage={currentPage}
        totalPages={totalPages}
        resultsPerPage={itemsPerPage}
        totalResults={filteredStudents.length}
        onPageChange={setCurrentPage}
        onResultsPerPageChange={(value) => {
          setItemsPerPage(value);
          setCurrentPage(1);
        }}
      />

      <Dialog
        open={isConfirmPaymentOpen}
        onOpenChange={(open) => {
          setIsConfirmPaymentOpen(open);
          if (!open) {
            setSelectedPendingStudent(null);
          }
        }}
      >
        <DialogContent
          className="max-w-140 border-[#E5E5E8] p-6 sm:p-6"
          showCloseButton={false}
        >
          <div className="flex items-start justify-between">
            <DialogTitle className="text-[18px] font-semibold text-[#121212]">
              Confirm Payment
            </DialogTitle>
            <DialogClose asChild>
              <button
                type="button"
                className="inline-flex h-6.5 w-6.5 items-center justify-center rounded-full bg-[#EFEFEF] text-[#1D1D1D] transition-colors hover:bg-[#DDDEE2]"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </DialogClose>
          </div>
          <div className="max-w-125 space-y-8.75">
            <DialogDescription className="mt-8 text-[16px] text-[#646464]">
              Are you sure you want to confirm this payment and enroll the user
              into the course?
            </DialogDescription>

            <div className="grid grid-cols-2 gap-5">
              <button
                type="button"
                onClick={handleCloseConfirmPayment}
                className="inline-flex h-12.5 items-center justify-center rounded-[2px] bg-[#ECECEC] text-[15px] font-medium text-[##151515] transition-colors hover:bg-[#D1D1D4]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmPendingStudent}
                className="inline-flex h-12.5 items-center justify-center rounded-[2px] bg-[#007AFF] text-[15px] font-medium text-white transition-colors hover:bg-[#006DE0]"
              >
                Confirm
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
