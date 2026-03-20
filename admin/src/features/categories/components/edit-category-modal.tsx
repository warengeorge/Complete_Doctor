"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import type { CategoryListItem } from "../types";
import { useUpdateCategoryMutation } from "../services/useUpdateCategoryMutation";

export type EditCategoryPayload = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

type EditCategoryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: CategoryListItem | null;
  onSubmit?: (payload: EditCategoryPayload) => void;
};

const fieldClassName =
  "h-12 rounded-xl border border-[#E7E7EA] bg-[#FCFCFD] text-sm text-[#2D2F33] placeholder:text-[#B1B1B3] focus-visible:ring-[#007AFF]";

const descriptionClassName =
  "block w-full min-h-[120px] rounded-xl border border-[#E7E7EA] bg-[#FCFCFD] px-4 py-3 text-sm text-[#2D2F33] placeholder:text-[#B1B1B3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]";

type EditCategoryFormValues = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

const emptyForm: EditCategoryFormValues = {
  id: "",
  name: "",
  slug: "",
  description: "",
};

export function EditCategoryModal({
  open,
  onOpenChange,
  category,
  onSubmit,
}: EditCategoryModalProps) {
  const updateCategoryMutation = useUpdateCategoryMutation();
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    watch,
    formState: { errors, isSubmitting, touchedFields, isSubmitted },
  } = useForm<EditCategoryFormValues>({
    defaultValues: emptyForm,
  });

  useEffect(() => {
    if (open && category) {
      reset({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description ?? "",
      });
      clearErrors();
      return;
    }
    if (!open) {
      reset(emptyForm);
      clearErrors();
    }
  }, [open, category, reset, clearErrors]);

  const nameValue = watch("name");
  const slugValue = watch("slug");
  const isValid = Boolean(nameValue?.trim() && slugValue?.trim());
  const isBusy = isSubmitting || updateCategoryMutation.isPending;

  const showSlugError =
    Boolean(errors.slug?.message) && (touchedFields.slug || isSubmitted);

  const onFormSubmit = handleSubmit(async (values) => {
    clearErrors();

    const payload: EditCategoryPayload = {
      id: values.id,
      name: values.name.trim(),
      slug: values.slug.trim(),
      description: values.description.trim(),
    };

    try {
      await updateCategoryMutation.mutateAsync(payload);
      onSubmit?.(payload);
      toast.success("Category updated successfully.");
      onOpenChange(false);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to update category.";
      setError("root", { message });
      toast.error(message);
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-2xl border-[#ECECEF]">
        <form className="space-y-6" onSubmit={onFormSubmit}>
          <input type="hidden" {...register("id")} />
          <DialogHeader className="flex-col items-start gap-1">
            <DialogTitle className="text-[28px]">Edit category</DialogTitle>
            <DialogDescription>
              Update category details for this collection.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#303030]">
                Category name
              </label>
              <Input
                placeholder="e.g. MSRA"
                className={fieldClassName}
                disabled={isBusy}
                {...register("name", {
                  required: "Category name is required.",
                })}
              />
              {errors.name?.message ? (
                <p className="text-xs text-[#B42318]">{errors.name.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#303030]">
                Slug
              </label>
              <Input
                placeholder="e.g. msra"
                className={cn(fieldClassName, "lowercase")}
                disabled={isBusy}
                {...register("slug", {
                  required: "Slug is required.",
                  minLength: {
                    value: 3,
                    message: "Slug must be at least 3 characters.",
                  },
                  pattern: {
                    value: /^[a-z0-9-]+$/,
                    message: "Use lowercase letters, numbers, and hyphens only.",
                  },
                })}
              />
              <p className="text-xs text-[#7A7A7A]">
                Used in URLs. Use lowercase letters, numbers, and hyphens.
              </p>
              {showSlugError ? (
                <p className="text-xs text-[#B42318]">{errors.slug?.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#303030]">
                Description (optional)
              </label>
              <textarea
                placeholder="Add a short description"
                className={descriptionClassName}
                disabled={isBusy}
                {...register("description")}
              />
            </div>
          </div>

          {errors.root?.message ? (
            <p className="text-sm text-[#B42318]">{errors.root.message}</p>
          ) : null}

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-11 min-w-32 border-[#E1E1E4] bg-[#F3F3F5] px-6 font-semibold text-[#272727] hover:bg-[#ECECEF]"
              disabled={isBusy}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isBusy}
              className="h-11 min-w-44 bg-[#007AFF] px-6 font-semibold text-white hover:bg-[#006DE0] disabled:opacity-60"
            >
              {isBusy ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
