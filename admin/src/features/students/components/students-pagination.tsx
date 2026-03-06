"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type StudentsPaginationProps = {
  currentPage: number;
  totalPages: number;
  resultsPerPage: number;
  totalResults: number;
  onPageChange: (page: number) => void;
  onResultsPerPageChange: (value: number) => void;
};

export function StudentsPagination({
  currentPage,
  totalPages,
  resultsPerPage,
  totalResults,
  onPageChange,
  onResultsPerPageChange,
}: StudentsPaginationProps) {
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
    <div className="flex flex-col gap-3 pt-1 lg:flex-row lg:items-center lg:justify-center">
      <div className="flex flex-wrap items-center justify-center gap-2 text-[14px] text-[#313131]">
        <button
          type="button"
          disabled={safeCurrentPage === 1}
          onClick={() => onPageChange(Math.max(1, safeCurrentPage - 1))}
          className="inline-flex h-8 items-center gap-1 rounded-md border border-[#E3E3E6] bg-[#F6F6F7] px-3 text-[#9A9A9D] disabled:opacity-60"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Back
        </button>

        {pageItems.map((item, index) =>
          item === "ellipsis" ? (
            <span key={`ellipsis-${index}`} className="px-1 text-[#313131]">
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
                  : "text-[#313131] hover:bg-[#EFF0F2]"
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
            onPageChange(Math.min(normalizedTotalPages, safeCurrentPage + 1))
          }
          className="inline-flex h-8 items-center gap-1 rounded-md border border-[#E3E3E6] bg-[#F6F6F7] px-3 text-[#313131] disabled:opacity-60"
        >
          Next
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 text-[13px] text-[#313131] lg:ml-3">
        <div className="flex items-center gap-2">
          <span>Result per page</span>
          <select
            value={resultsPerPage}
            onChange={(event) => onResultsPerPageChange(Number(event.target.value))}
            className="h-8 rounded-md border border-[#E3E3E6] bg-[#F9F9FA] px-2 text-[#313131]"
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
  if (totalPages <= 10) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 5) {
    return [1, 2, 3, 4, 5, 6, 7, 8, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 4) {
    return [
      1,
      "ellipsis",
      totalPages - 7,
      totalPages - 6,
      totalPages - 5,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "ellipsis",
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
    "ellipsis",
    totalPages,
  ];
}
