"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type CoursesListPaginationProps = {
  currentPage: number;
  totalPages: number;
  resultsPerPage: number;
  totalResults: number;
  onPageChange: (page: number) => void;
  onResultsPerPageChange: (value: number) => void;
};

export function CoursesListPagination({
  currentPage,
  totalPages,
  resultsPerPage,
  totalResults,
  onPageChange,
  onResultsPerPageChange,
}: CoursesListPaginationProps) {
  const normalizedTotalPages = Math.max(1, totalPages);
  const safeCurrentPage = Math.min(
    Math.max(currentPage, 1),
    normalizedTotalPages,
  );
  const start =
    totalResults === 0 ? 0 : (safeCurrentPage - 1) * resultsPerPage + 1;
  const end =
    totalResults === 0
      ? 0
      : Math.min(safeCurrentPage * resultsPerPage, totalResults);

  const pageItems = getPageItems(safeCurrentPage, normalizedTotalPages);

  return (
    <div className="flex flex-col gap-3 pt-1 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-2 text-[14px] text-[#313131]">
        <button
          type="button"
          disabled={safeCurrentPage === 1}
          onClick={() => onPageChange(Math.max(safeCurrentPage - 1, 1))}
          className="inline-flex h-8 items-center gap-1 rounded-md border border-[#E1E1E4] bg-[#F3F3F5] px-3 text-[#7A7A7D] disabled:opacity-60"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Back
        </button>

        {pageItems.map((item, index) =>
          item === "ellipsis" ? (
            <span key={`ellipsis-${index}`} className="px-1">
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              className={`h-8 min-w-8 rounded-md px-2 ${
                item === safeCurrentPage
                  ? "bg-[#333336] text-white"
                  : "text-[#313131] hover:bg-[#F3F3F5]"
              }`}
            >
              {item}
            </button>
          ),
        )}

        <button
          type="button"
          disabled={safeCurrentPage === normalizedTotalPages}
          onClick={() =>
            onPageChange(Math.min(safeCurrentPage + 1, normalizedTotalPages))
          }
          className="inline-flex h-8 items-center gap-1 rounded-md border border-[#E1E1E4] bg-[#F3F3F5] px-3 text-[#313131] disabled:opacity-60"
        >
          Next
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#313131]">
        <div className="flex items-center gap-2">
          <span>Result per page</span>
          <select
            value={resultsPerPage}
            onChange={(event) => onResultsPerPageChange(Number(event.target.value))}
            className="h-8 rounded-md border border-[#E1E1E4] bg-[#F9F9FA] px-2"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
        <span>
          {start}-{end} of {totalResults}
        </span>
      </div>
    </div>
  );
}

function getPageItems(
  currentPage: number,
  totalPages: number,
): Array<number | "ellipsis"> {
  if (totalPages <= 9) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items: Array<number | "ellipsis"> = [1];
  const left = Math.max(2, currentPage - 2);
  const right = Math.min(totalPages - 1, currentPage + 2);

  if (left > 2) {
    items.push("ellipsis");
  }

  for (let page = left; page <= right; page += 1) {
    items.push(page);
  }

  if (right < totalPages - 1) {
    items.push("ellipsis");
  }

  items.push(totalPages);
  return items;
}
