"use client";

import { useEffect, useState } from "react";

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

export type CreateCategoryPayload = {
  name: string;
  slug: string;
  description: string;
};

type CreateCategoryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (payload: CreateCategoryPayload) => void;
};

const initialFormState = {
  name: "",
  slug: "",
  description: "",
};

const fieldClassName =
  "h-12 rounded-xl border border-[#E7E7EA] bg-[#FCFCFD] text-sm text-[#2D2F33] placeholder:text-[#B1B1B3] focus-visible:ring-[#007AFF]";

const descriptionClassName =
  "block w-full min-h-[120px] rounded-xl border border-[#E7E7EA] bg-[#FCFCFD] px-4 py-3 text-sm text-[#2D2F33] placeholder:text-[#B1B1B3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]";

export function CreateCategoryModal({
  open,
  onOpenChange,
  onSubmit,
}: CreateCategoryModalProps) {
  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    if (!open) {
      setForm(initialFormState);
    }
  }, [open]);

  const updateField = (name: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isValid = Boolean(form.name.trim() && form.slug.trim());

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) return;
    onSubmit?.({
      name: form.name.trim(),
      slug: form.slug.trim(),
      description: form.description.trim(),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-2xl border-[#ECECEF]">
        <form className="space-y-6" onSubmit={handleSubmit}>
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
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="e.g. MSRA"
                className={fieldClassName}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#303030]">
                Slug
              </label>
              <Input
                value={form.slug}
                onChange={(event) => updateField("slug", event.target.value)}
                placeholder="e.g. msra"
                className={cn(fieldClassName, "lowercase")}
                required
              />
              <p className="text-xs text-[#7A7A7A]">
                Used in URLs. Use lowercase letters, numbers, and hyphens.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#303030]">
                Description (optional)
              </label>
              <textarea
                value={form.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                placeholder="Add a short description"
                className={descriptionClassName}
              />
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-11 min-w-32 border-[#E1E1E4] bg-[#F3F3F5] px-6 font-semibold text-[#272727] hover:bg-[#ECECEF]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isValid}
              className="h-11 min-w-44 bg-[#007AFF] px-6 font-semibold text-white hover:bg-[#006DE0] disabled:opacity-60"
            >
              Create category
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
