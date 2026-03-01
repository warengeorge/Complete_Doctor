"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import {
  AlignLeft,
  CalendarDays,
  Clock3,
  Image as ImageIcon,
  Link2,
  MoveRight,
  PencilLine,
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
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import type { EventItem } from "../types";
import {
  formatDateForEditInput,
  formatTimeForEditInput,
  parseEditDateTime,
} from "../utils";

type EditEventModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: EventItem | null;
  onSubmit?: (updatedEvent: EventItem) => void;
};

type EditEventFormState = {
  title: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  description: string;
  link: string;
  coverImageName: string;
  coverImageSizeKb: number;
  coverImageSrc: string;
  setReminder: boolean;
};

type FieldRowProps = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  children: ReactNode;
};

function toInitialState(event: EventItem): EditEventFormState {
  return {
    title: event.title,
    startDate: formatDateForEditInput(event.startDate),
    endDate: formatDateForEditInput(event.endDate),
    startTime: formatTimeForEditInput(event.startDate),
    endTime: formatTimeForEditInput(event.endDate),
    description: event.description,
    link: event.link ?? "",
    coverImageName: event.coverImageName ?? "Course-cover-image",
    coverImageSizeKb: event.coverImageSizeKb ?? 156,
    coverImageSrc: event.image,
    setReminder: event.setReminder ?? false,
  };
}

const inputBaseClass =
  "h-12 rounded-xl bg-[#FCFCFD] text-base placeholder:text-[#B1B1B3] focus-visible:ring-[#007AFF]";

function editableFieldClass(value: string) {
  return cn(
    inputBaseClass,
    value.trim()
      ? "border border-[#5E5E61] font-medium text-[#313131]"
      : "border border-[#E7E7EA] text-[#B1B1B3]",
  );
}

export function EditEventModal({
  open,
  onOpenChange,
  event,
  onSubmit,
}: EditEventModalProps) {
  const [form, setForm] = useState<EditEventFormState | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (open && event) {
      setForm(toInitialState(event));
    }
  }, [open, event]);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const canSubmit = useMemo(() => {
    if (!form) return false;
    return Boolean(
      form.title.trim() && form.startDate.trim() && form.startTime.trim(),
    );
  }, [form]);

  const updateField = (
    name: keyof EditEventFormState,
    value: string | boolean,
  ) => {
    setForm((prev) => {
      if (!prev) return prev;
      return { ...prev, [name]: value };
    });
  };

  const handleCoverImageChange = (file: File | undefined) => {
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }
    objectUrlRef.current = objectUrl;

    setForm((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        coverImageName: file.name,
        coverImageSizeKb: Math.max(1, Math.round(file.size / 1024)),
        coverImageSrc: objectUrl,
      };
    });
  };

  const handleSubmit = (formEvent: React.FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();
    if (!event || !form) return;

    const updatedEvent: EventItem = {
      ...event,
      title: form.title.trim(),
      description: form.description.trim(),
      link: form.link.trim(),
      image: form.coverImageSrc || event.image,
      coverImageName: form.coverImageName,
      coverImageSizeKb: form.coverImageSizeKb,
      setReminder: form.setReminder,
      startDate: parseEditDateTime(
        form.startDate,
        form.startTime,
        event.startDate,
      ),
      endDate: parseEditDateTime(form.endDate, form.endTime, event.endDate),
    };

    onSubmit?.(updatedEvent);
    onOpenChange(false);
  };

  if (!event || !form) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[90vh] overflow-y-auto rounded-2xl border-[#ECECEF] p-6 sm:p-8"
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <DialogHeader className="items-center">
            <DialogTitle className="text-[35px]">
              Edit event details
            </DialogTitle>
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
                onChange={(inputEvent) =>
                  updateField("title", inputEvent.target.value)
                }
                className={editableFieldClass(form.title)}
                placeholder="Add an event name/title"
              />
            </FieldRow>

            <FieldRow icon={CalendarDays} label="Date">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                <Input
                  value={form.startDate}
                  onChange={(inputEvent) =>
                    updateField("startDate", inputEvent.target.value)
                  }
                  placeholder="DD/MM/YY"
                  className={editableFieldClass(form.startDate)}
                />
                <MoveRight className="mx-auto h-4 w-4 text-[#767676]" />
                <Input
                  value={form.endDate}
                  onChange={(inputEvent) =>
                    updateField("endDate", inputEvent.target.value)
                  }
                  placeholder="DD/MM/YY"
                  className={editableFieldClass(form.endDate)}
                />
              </div>
            </FieldRow>

            <FieldRow icon={Clock3} label="Time">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                <Input
                  value={form.startTime}
                  onChange={(inputEvent) =>
                    updateField("startTime", inputEvent.target.value)
                  }
                  placeholder="--"
                  className={editableFieldClass(form.startTime)}
                />
                <MoveRight className="mx-auto h-4 w-4 text-[#767676]" />
                <Input
                  value={form.endTime}
                  onChange={(inputEvent) =>
                    updateField("endTime", inputEvent.target.value)
                  }
                  placeholder="--"
                  className={editableFieldClass(form.endTime)}
                />
              </div>
            </FieldRow>

            <FieldRow icon={AlignLeft} label="Description">
              <textarea
                value={form.description}
                onChange={(inputEvent) =>
                  updateField("description", inputEvent.target.value)
                }
                className={cn(
                  "min-h-24 w-full rounded-xl bg-[#FCFCFD] px-3 py-3 text-base outline-none",
                  "focus-visible:ring-2 focus-visible:ring-[#007AFF]",
                  form.description.trim()
                    ? "border border-[#5E5E61] font-medium text-[#313131]"
                    : "border border-[#E7E7EA] text-[#B1B1B3]",
                )}
              />
            </FieldRow>

            <FieldRow icon={Link2} label="Link">
              <Input
                value={form.link}
                onChange={(inputEvent) =>
                  updateField("link", inputEvent.target.value)
                }
                className={editableFieldClass(form.link)}
                placeholder="http://"
              />
            </FieldRow>

            <FieldRow icon={ImageIcon} label="Cover image">
              <div className="flex items-center justify-between gap-3 rounded-xl border border-[#E7E7EA] bg-[#FCFCFD] p-2">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="relative h-13 w-13 shrink-0 overflow-hidden rounded-md bg-[#EDEDEF]">
                    {form.coverImageSrc ? (
                      <Image
                        src={form.coverImageSrc}
                        alt={form.coverImageName || "Cover image"}
                        fill
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold text-[#303030]">
                      {form.coverImageName || "No cover image selected"}
                    </p>
                    {form.coverImageSizeKb > 0 ? (
                      <p className="text-sm text-[#6B6B6B]">
                        {form.coverImageSizeKb}KB
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label
                    htmlFor={`edit-cover-image-${event.id}`}
                    className="cursor-pointer rounded-md px-2 py-1 text-xs font-medium text-[#007AFF] hover:bg-[#EEF5FF]"
                  >
                    Replace
                  </label>
                  <input
                    id={`edit-cover-image-${event.id}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(inputEvent) =>
                      handleCoverImageChange(inputEvent.target.files?.[0])
                    }
                  />
                  <button
                    type="button"
                    className="rounded-full bg-[#EFEFF1] p-1.5 text-[#5D5D5D] hover:bg-[#E3E3E6]"
                    onClick={() => {
                      setForm((prev) => {
                        if (!prev) return prev;
                        return {
                          ...prev,
                          coverImageName: "",
                          coverImageSizeKb: 0,
                          coverImageSrc: "",
                        };
                      });
                    }}
                    aria-label="Remove cover image"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </FieldRow>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[30px] font-medium text-[#313131]">
                Set reminder
              </span>
              <Switch
                checked={form.setReminder}
                onCheckedChange={(checked) =>
                  updateField("setReminder", checked)
                }
                aria-label="Set reminder"
              />
            </div>

            <DialogFooter className="gap-3">
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
                disabled={!canSubmit}
                className="h-12 min-w-48 bg-[#007AFF] px-8 text-lg font-semibold text-white hover:bg-[#006DE0]"
              >
                Save changes
              </Button>
            </DialogFooter>
          </div>
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
