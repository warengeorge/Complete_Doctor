"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
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

import type { CreateCategoryInput } from "../services/categories-api";
import { useCreateCategoryMutation } from "../services/useCreateCategoryMutation";

export type CreateCategoryPayload = CreateCategoryInput;

type CreateCategoryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type CreateCategoryFormValues = {
  name: string;
  slug: string;
  description: string;
  icon: File | null;
};

const initialFormState: CreateCategoryFormValues = {
  name: "",
  slug: "",
  description: "",
  icon: null,
};

const fieldClassName =
  "h-12 rounded-xl border border-[#E7E7EA] bg-[#FCFCFD] text-sm text-[#2D2F33] placeholder:text-[#B1B1B3] focus-visible:ring-[#007AFF]";

const descriptionClassName =
  "block w-full min-h-[120px] rounded-xl border border-[#E7E7EA] bg-[#FCFCFD] px-4 py-3 text-sm text-[#2D2F33] placeholder:text-[#B1B1B3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]";

export function CreateCategoryModal({
  open,
  onOpenChange,
}: CreateCategoryModalProps) {
  const createCategoryMutation = useCreateCategoryMutation();

  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting, touchedFields, isSubmitted },
  } = useForm<CreateCategoryFormValues>({
    defaultValues: initialFormState,
  });

  const icon = watch("icon");

  useEffect(() => {
    if (!open) {
      reset(initialFormState);
      clearErrors();
    }
  }, [open, reset, clearErrors]);

  const showSlugError =
    Boolean(errors.slug?.message) && (touchedFields.slug || isSubmitted);

  const onFormSubmit = handleSubmit(async (values) => {
    clearErrors();

    const payload: CreateCategoryPayload = {
      name: values.name.trim(),
      slug: values.slug.trim(),
      description: values.description.trim() || undefined,
      icon: values.icon,
    };

    try {
      await createCategoryMutation.mutateAsync(payload);

      toast.success("Category created successfully.");
      onOpenChange(false);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to create category.";
      setError("root", { message });
      toast.error(message);
    }
  });

  const isBusy = isSubmitting || createCategoryMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto rounded-2xl border-[#ECECEF]">
        <form className="space-y-6" onSubmit={onFormSubmit}>
          <DialogHeader className="flex-col items-start gap-1">
            <DialogTitle className="text-[28px]">Create category</DialogTitle>
            <DialogDescription>
              Add a new category to organize courses on the platform.
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
              <Controller
                control={control}
                name="slug"
                rules={{
                  required: "Slug is required.",
                  minLength: {
                    value: 3,
                    message: "Slug must be at least 3 characters.",
                  },
                  pattern: {
                    value: /^[a-z0-9-]+$/,
                    message:
                      "Use lowercase letters, numbers, and hyphens only.",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="e.g. msra"
                    className={cn(fieldClassName, "lowercase")}
                    disabled={isBusy}
                    minLength={3}
                    onChange={(event) =>
                      field.onChange(normalizeSlug(event.target.value))
                    }
                  />
                )}
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

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#303030]">
                Icon (optional)
              </label>
              <div className="flex flex-col gap-2 rounded-xl border border-dashed border-[#D9D9DD] bg-[#F9F9FB] px-4 py-3">
                <Controller
                  name="icon"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        field.onChange(event.target.files?.[0] ?? null)
                      }
                      className="text-sm text-[#2D2F33]"
                      disabled={isBusy}
                    />
                  )}
                />
                {icon ? (
                  <div className="flex items-center justify-between text-xs text-[#4A4A4D]">
                    <span className="truncate">{icon.name}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setValue("icon", null, { shouldDirty: true })
                      }
                      className="text-[#B42318] hover:underline"
                      disabled={isBusy}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-[#7A7A7A]">
                    Upload a PNG or SVG icon (optional).
                  </p>
                )}
              </div>
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
              disabled={isBusy}
              className="h-11 min-w-44 bg-[#007AFF] px-6 font-semibold text-white hover:bg-[#006DE0] disabled:opacity-60"
            >
              {isBusy ? "Creating..." : "Create category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/--+/g, "-");
}
