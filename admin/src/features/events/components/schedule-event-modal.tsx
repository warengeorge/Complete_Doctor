"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  AlignLeft,
  CalendarDays,
  Clock3,
  Image as ImageIcon,
  Link2,
  MoveRight,
  NotebookText,
  PencilLine,
  Upload,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ScheduleEventModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (payload: ScheduleEventPayload) => void;
};

export type ScheduleEventPayload = {
  title: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  description: string;
  course: string;
  link: string;
  coverImageName: string | null;
};

type FieldRowProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
};

type SelectedCoverImage = {
  name: string;
  sizeKb: number;
  previewUrl: string;
};

const fieldClassName =
  "h-12 rounded-xl border border-[#E7E7EA] bg-[#FCFCFD] text-sm text-[#2D2F33] placeholder:text-[#B1B1B3] focus-visible:ring-[#007AFF]";

const initialFormState = {
  title: "",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  description: "",
  course: "",
  link: "",
};

export function ScheduleEventModal({
  open,
  onOpenChange,
  onSubmit,
}: ScheduleEventModalProps) {
  const [form, setForm] = useState(initialFormState);
  const [coverImage, setCoverImage] = useState<SelectedCoverImage | null>(null);
  const fileInputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverImageUrlRef = useRef<string | null>(null);

  const clearCoverImage = () => {
    if (coverImageUrlRef.current) {
      URL.revokeObjectURL(coverImageUrlRef.current);
      coverImageUrlRef.current = null;
    }
    setCoverImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (!open) {
      setForm(initialFormState);
      clearCoverImage();
    }
  }, [open]);

  useEffect(() => {
    return () => {
      if (coverImageUrlRef.current) {
        URL.revokeObjectURL(coverImageUrlRef.current);
      }
    };
  }, []);

  const updateField = (name: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: ScheduleEventPayload = {
      ...form,
      coverImageName: coverImage?.name ?? null,
    };
    onSubmit?.(payload);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[90vh] overflow-y-auto rounded-2xl border-[#ECECEF] p-6 sm:p-8"
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <DialogHeader className="items-center">
            <DialogTitle className="text-[35px]">Schedule an event</DialogTitle>
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="rounded-full bg-[#F0F0F2] text-[#626262] hover:bg-[#E5E5E8]"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </DialogHeader>

          <div className="space-y-5">
            <FieldRow icon={PencilLine} label="Event Title">
              <Input
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
                placeholder="Add an event name/title"
                className={fieldClassName}
                required
              />
            </FieldRow>

            <FieldRow icon={CalendarDays} label="Date">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                <Input
                  type="date"
                  value={form.startDate}
                  onChange={(event) =>
                    updateField("startDate", event.target.value)
                  }
                  className={cn(fieldClassName, "placeholder:text-[#B1B1B3]")}
                  required
                />
                <MoveRight className="mx-auto h-4 w-4 text-[#767676]" />
                <Input
                  type="date"
                  value={form.endDate}
                  onChange={(event) =>
                    updateField("endDate", event.target.value)
                  }
                  className={fieldClassName}
                  required
                />
              </div>
            </FieldRow>

            <FieldRow icon={Clock3} label="Time">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                <Input
                  type="time"
                  value={form.startTime}
                  onChange={(event) =>
                    updateField("startTime", event.target.value)
                  }
                  className={fieldClassName}
                  required
                />
                <MoveRight className="mx-auto h-4 w-4 text-[#767676]" />
                <Input
                  type="time"
                  value={form.endTime}
                  onChange={(event) =>
                    updateField("endTime", event.target.value)
                  }
                  className={fieldClassName}
                  required
                />
              </div>
            </FieldRow>

            <FieldRow icon={AlignLeft} label="Description">
              <Input
                value={form.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                placeholder="Add a description"
                className={fieldClassName}
              />
            </FieldRow>

            <FieldRow icon={NotebookText} label="Course">
              <select
                value={form.course}
                onChange={(event) => updateField("course", event.target.value)}
                className={cn(
                  fieldClassName,
                  "w-full px-3 outline-none disabled:pointer-events-none disabled:opacity-50",
                  !form.course && "text-[#B1B1B3]",
                )}
              >
                <option value="">Select a course</option>
                <option value="mrcgp-akt">MRCGP AKT</option>
                <option value="msra-masterclass">MSRA Masterclass</option>
                <option value="sca">SCA Intensive Review</option>
              </select>
            </FieldRow>

            <FieldRow icon={Link2} label="Link">
              <Input
                type="url"
                value={form.link}
                onChange={(event) => updateField("link", event.target.value)}
                placeholder="http://"
                className={fieldClassName}
              />
            </FieldRow>

            <FieldRow icon={ImageIcon} label="Cover image">
              <div className="space-y-3">
                <label
                  htmlFor={fileInputId}
                  className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#E7E7EA] bg-[#FCFCFD] text-base font-medium text-[#313131]"
                >
                  <Upload className="h-4 w-4" />
                  Upload a cover image
                </label>
                <input
                  ref={fileInputRef}
                  id={fileInputId}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;

                    if (coverImageUrlRef.current) {
                      URL.revokeObjectURL(coverImageUrlRef.current);
                    }

                    const previewUrl = URL.createObjectURL(file);
                    coverImageUrlRef.current = previewUrl;

                    setCoverImage({
                      name: file.name,
                      sizeKb: Math.max(1, Math.round(file.size / 1024)),
                      previewUrl,
                    });
                  }}
                />
                {coverImage ? (
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-[#E7E7EA] bg-[#FCFCFD] p-2">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="h-13 w-13 shrink-0 overflow-hidden rounded-md bg-[#EDEDEF]">
                        <img
                          src={coverImage.previewUrl}
                          alt={coverImage.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-base font-semibold text-[#303030]">
                          {coverImage.name}
                        </p>
                        <p className="text-sm text-[#6B6B6B]">
                          {coverImage.sizeKb}KB
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="rounded-full bg-[#EFEFF1] p-1.5 text-[#5D5D5D] hover:bg-[#E3E3E6]"
                      onClick={clearCoverImage}
                      aria-label="Remove cover image"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : null}
              </div>
            </FieldRow>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-12 min-w-40 border-[#E1E1E4] bg-[#F3F3F5] px-8 text-lg font-semibold text-[#272727] hover:bg-[#ECECEF]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-12 min-w-48 bg-[#007AFF] px-8 text-lg font-semibold text-white hover:bg-[#006DE0]"
            >
              Schedule event
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function FieldRow({ icon: Icon, label, children }: FieldRowProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-[150px_1fr] sm:items-center sm:gap-4">
      <div className="flex items-center gap-3 text-xl font-medium text-[#313131]">
        <Icon className="h-5 w-5 text-[#3D3D3D]" />
        <span>{label}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}
