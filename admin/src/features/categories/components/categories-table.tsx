"use client";

import { useState } from "react";
import { PencilLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { CategoryListItem } from "../types";
import { EditCategoryModal } from "./edit-category-modal";

type CategoriesTableProps = {
  rows: CategoryListItem[];
};

export function CategoriesTable({ rows }: CategoriesTableProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryListItem | null>(null);

  const handleEditClick = (category: CategoryListItem) => {
    setSelectedCategory(category);
    setIsEditOpen(true);
  };

  const handleEditOpenChange = (open: boolean) => {
    setIsEditOpen(open);
    if (!open) {
      setSelectedCategory(null);
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-[#E5E5E8] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] border-collapse">
            <thead>
              <tr className="bg-[#E9ECEF] text-left text-[14px] text-[#0C0C0C]">
                <th className="px-6 py-4">Category name</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Description</th>
                <th className="w-40 px-6 py-4">Courses count</th>
                <th className="w-32 px-6 py-4" />
              </tr>
            </thead>

            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-sm text-[#6B6B6E]"
                  >
                    No categories found.
                  </td>
                </tr>
              ) : (
                rows.map((category, index) => (
                  <tr
                    key={category.id}
                    className={
                      index % 2 === 0
                        ? "bg-[#FFFFFF] text-[#313131]"
                        : "bg-[#F3F4F6] text-[#313131]"
                    }
                  >
                    <td className="px-6 py-5 text-[14px] font-medium">
                      {category.name}
                    </td>
                    <td className="px-6 py-5 text-[14px] text-[#313131]">
                      {category.slug}
                    </td>
                    <td className="px-6 py-5 text-[14px] text-[#313131]">
                      {category.description?.trim().length
                        ? category.description
                        : "—"}
                    </td>
                    <td className="px-6 py-5 text-[14px] font-semibold text-[#313131]">
                      {category.coursesCount}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditClick(category)}
                        className="text-[#4B4B4B] hover:bg-[#E8EAEE]"
                      >
                        <PencilLine className="h-4 w-4" />
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <EditCategoryModal
        open={isEditOpen}
        onOpenChange={handleEditOpenChange}
        category={selectedCategory}
      />
    </>
  );
}
