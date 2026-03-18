"use client";

import { useMemo, useState } from "react";

import { coursesListData } from "./data/courses-list";
import { CoursesListHeader } from "./components/courses-list-header";
import { CoursesListPagination } from "./components/courses-list-pagination";
import {
  CoursesListToolbar,
  type CoursesFilterTab,
} from "./components/courses-list-toolbar";
import { CoursesListTable } from "./components/courses-list-table";
import { CoursesListGrid } from "./components/courses-list-grid";

export function CoursesListView() {
  const [activeTab, setActiveTab] = useState<CoursesFilterTab>("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [viewType, setViewType] = useState<"table" | "grid">("table");

  const filtered = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    return coursesListData.filter((course) => {
      const matchesTab =
        activeTab === "All"
          ? true
          : activeTab === "Drafts"
            ? course.status === "Draft"
            : course.status === activeTab;

      const matchesSearch =
        normalized.length === 0
          ? true
          : course.title.toLowerCase().includes(normalized) ||
            course.category.toLowerCase().includes(normalized);

      return matchesTab && matchesSearch;
    });
  }, [activeTab, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / resultsPerPage));
  const currentRows = useMemo(() => {
    const start = (currentPage - 1) * resultsPerPage;
    return filtered.slice(start, start + resultsPerPage);
  }, [currentPage, filtered, resultsPerPage]);

  const handleTabChange = (tab: CoursesFilterTab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSelectedIds(new Set());
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleToggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleToggleAll = () => {
    setSelectedIds((prev) => {
      const allSelected = currentRows.every((row) => prev.has(row.id));
      if (allSelected) return new Set();
      return new Set(currentRows.map((row) => row.id));
    });
  };

  return (
    <section className="w-full space-y-5">
      <CoursesListHeader />

      <div className="rounded-xl border border-[#E5E5E8] bg-white p-3 sm:p-4">
        <CoursesListToolbar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          search={search}
          onSearchChange={handleSearchChange}
          viewType={viewType}
          onViewTypeChange={setViewType}
        />

        <div className="mt-3">
          {viewType === "table" ? (
            <CoursesListTable
              rows={currentRows}
              selectedIds={selectedIds}
              onToggleRow={handleToggleRow}
              onToggleAll={handleToggleAll}
            />
          ) : (
            <CoursesListGrid
              rows={currentRows}
              selectedIds={selectedIds}
              onToggleRow={handleToggleRow}
            />
          )}
        </div>

        <div className="mt-4">
          <CoursesListPagination
            currentPage={currentPage}
            totalPages={totalPages}
            resultsPerPage={resultsPerPage}
            totalResults={filtered.length}
            onPageChange={setCurrentPage}
            onResultsPerPageChange={(value) => {
              setResultsPerPage(value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
    </section>
  );
}
