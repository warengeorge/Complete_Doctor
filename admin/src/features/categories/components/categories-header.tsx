"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { CreateCategoryModal } from "./create-category-modal";

export function CategoriesHeader() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-[18px] font-semibold text-[#121212]">Categories</h1>
        <p className="text-[14px] text-[#606060]">
          Manage category details and organize course offerings.
        </p>
      </div>

      <Button
        type="button"
        onClick={() => setIsCreateOpen(true)}
        className="h-10 min-w-52 bg-[#007AFF] px-5 text-[14px] font-semibold text-white hover:bg-[#006DE0]"
      >
        <span className="inline-flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create new category
        </span>
      </Button>

      <CreateCategoryModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />
    </div>
  );
}
