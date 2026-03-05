"use client";

import { useEffect, useMemo, useState } from "react";

import { StudentsPagination, StudentsTable, StudentsToolbar } from "./components";
import { studentsListData } from "./data/students-list";

export function StudentsView() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);

  const filteredStudents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return studentsListData;

    return studentsListData.filter((student) => {
      return (
        student.name.toLowerCase().includes(normalizedQuery) ||
        student.email.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [query]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / resultsPerPage),
  );

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const pageStartIndex = (currentPage - 1) * resultsPerPage;
  const currentRows = filteredStudents.slice(
    pageStartIndex,
    pageStartIndex + resultsPerPage,
  );

  return (
    <section className="w-full space-y-5">
      <StudentsToolbar
        query={query}
        onQueryChange={(value) => {
          setQuery(value);
          setCurrentPage(1);
        }}
      />

      <StudentsTable rows={currentRows} pageStartIndex={pageStartIndex} />

      <StudentsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        resultsPerPage={resultsPerPage}
        totalResults={filteredStudents.length}
        onPageChange={setCurrentPage}
        onResultsPerPageChange={(value) => {
          setResultsPerPage(value);
          setCurrentPage(1);
        }}
      />
    </section>
  );
}
