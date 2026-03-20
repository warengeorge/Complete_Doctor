"use client";

import { CategoriesHeader } from "./components/categories-header";
import { CategoriesTable } from "./components/categories-table";
import { useCategoriesQuery } from "./services/useCategoriesQuery";
import { Skeleton } from "@/components/ui/skeleton";

export function CategoriesView() {
  const categoriesQuery = useCategoriesQuery({ page: 1, pageSize: 10 });

  return (
    <section className="w-full space-y-5">
      <CategoriesHeader />

      <div className="rounded-xl border border-[#E5E5E8] bg-white p-3 sm:p-4">
        {categoriesQuery.isLoading ? (
          <div className="overflow-hidden rounded-xl border border-[#E5E5E8] bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] border-collapse">
                <thead>
                  <tr className="bg-[#E9ECEF] text-left text-[14px] text-[#0C0C0C]">
                    {[
                      "Category name",
                      "Slug",
                      "Description",
                      "Courses count",
                      "",
                    ].map((label, index) => (
                      <th key={label || index} className="px-6 py-4">
                        {label ? (
                          label
                        ) : (
                          <span className="sr-only">Actions</span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0
                          ? "bg-[#FFFFFF] text-[#313131]"
                          : "bg-[#F3F4F6] text-[#313131]"
                      }
                    >
                      <td className="px-6 py-5">
                        <Skeleton className="h-4 w-40" />
                      </td>
                      <td className="px-6 py-5">
                        <Skeleton className="h-4 w-28" />
                      </td>
                      <td className="px-6 py-5">
                        <Skeleton className="h-4 w-64" />
                      </td>
                      <td className="px-6 py-5">
                        <Skeleton className="h-4 w-12" />
                      </td>
                      <td className="px-6 py-5 text-right">
                        <Skeleton className="ml-auto h-8 w-20 rounded-lg" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
