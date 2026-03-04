"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Plus } from "lucide-react";
import type { CourseEvent } from "../../types";
import { ScheduleEventModal } from "@/features/events/components/schedule-event-modal";

const ITEMS_PER_PAGE_DEFAULT = 10;

export type CourseDetailEventsProps = {
  events: CourseEvent[];
};

export function CourseDetailEvents({ events }: CourseDetailEventsProps) {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_DEFAULT);

  const filtered = useMemo(
    () =>
      events.filter(
        (e) =>
          e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.venue.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [events, searchTerm],
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const pageItems = filtered.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="space-y-4">
      {/* header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="sr-only">Events & Schedule</h2>
        <div className="flex gap-2">
          <h2 className="text-[16px] font-semibold text-[#151515] mb-2">
            Events & Schedule
          </h2>
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
          <button
            onClick={() => setIsScheduleOpen(true)}
            className="rounded-lg bg-[#007AFF] px-4 py-2 text-[14px] font-medium text-white hover:bg-[#006DE0] flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Schedule event
          </button>
        </div>
      </div>

      {/* table */}
      <div className="overflow-x-auto rounded-lg border border-[#E5E5E8]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E5E5E8] bg-[#F5F5F7]">
              <th className="px-4 py-3 text-left text-[14px] font-semibold text-[#313131]">
                Event name
              </th>
              <th className="px-4 py-3 text-left text-[14px] font-semibold text-[#313131]">
                Date
              </th>
              <th className="px-4 py-3 text-left text-[14px] font-semibold text-[#313131]">
                Time
              </th>
              <th className="px-4 py-3 text-left text-[14px] font-semibold text-[#313131]">
                Status
              </th>
              <th className="px-4 py-3 text-left text-[14px] font-semibold text-[#313131]">
                Link/Venue
              </th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((ev, idx) => (
              <tr
                key={ev.id}
                className="border-b border-[#E5E5E8] transition-colors hover:bg-[#F9F9FB]"
              >
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="h-10 w-16 object-cover rounded"
                  />
                  <span className="text-[14px] font-medium text-[#121212]">
                    {ev.title}
                  </span>
                </td>
                <td className="px-4 py-3 text-[14px] text-[#313131]">
                  {ev.date}
                </td>
                <td className="px-4 py-3 text-[14px] text-[#313131]">
                  {ev.time}
                </td>
                <td className="px-4 py-3 text-[14px] text-[#313131]">
                  {ev.status}
                </td>
                <td className="px-4 py-3 text-[14px] text-[#313131]">
                  {ev.link ? (
                    <a
                      href={ev.link}
                      className="text-[#007AFF] hover:underline"
                    >
                      <span className="text-[#313131]">{ev.venue}</span> - [Join
                      Link]
                    </a>
                  ) : (
                    ev.venue
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination and info */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-[14px] text-[#6B6B6B]">
          {filtered.length === 0
            ? "No events found"
            : `${startIdx + 1}-${Math.min(startIdx + itemsPerPage, filtered.length)} of ${filtered.length}`}
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
      <ScheduleEventModal
        open={isScheduleOpen}
        onOpenChange={setIsScheduleOpen}
      />
    </div>
  );
}
