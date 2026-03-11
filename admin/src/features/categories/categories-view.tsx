"use client";

import { categoriesListData } from "./data/categories-list";
import { CategoriesHeader } from "./components/categories-header";
import { CategoriesTable } from "./components/categories-table";

export function CategoriesView() {
  return (
    <section className="w-full space-y-5">
      <CategoriesHeader />

      <div className="rounded-xl border border-[#E5E5E8] bg-white p-3 sm:p-4">
        <CategoriesTable rows={categoriesListData} />
      </div>
    </section>
  );
}
