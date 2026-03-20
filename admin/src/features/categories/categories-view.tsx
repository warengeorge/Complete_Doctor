"use client";

import { CategoriesHeader } from "./components/categories-header";
import { CategoriesTable } from "./components/categories-table";
import { useCategoriesQuery } from "./services/useCategoriesQuery";

export function CategoriesView() {
  const categoriesQuery = useCategoriesQuery({ page: 1, pageSize: 10 });

  return (
    <section className="w-full space-y-5">
      <CategoriesHeader />

      <div className="rounded-xl border border-[#E5E5E8] bg-white p-3 sm:p-4">
        {categoriesQuery.isLoading ? (
          <div className="flex min-h-[240px] items-center justify-center text-sm text-[#6B6B6E]">
            Loading categories...
          </div>
        ) : categoriesQuery.isError ? (
          <div className="flex min-h-[240px] flex-col items-center justify-center gap-2 text-sm text-[#B42318]">
            <span>Unable to load categories.</span>
            <span className="text-xs text-[#7A7A7A]">
              {categoriesQuery.error instanceof Error
                ? categoriesQuery.error.message
                : "Please try again."}
            </span>
          </div>
        ) : (
          <CategoriesTable rows={categoriesQuery.data?.items ?? []} />
        )}
      </div>
    </section>
  );
}
