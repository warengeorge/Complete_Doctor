"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ResourceUploadModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  moduleOptions: string[];
  onSubmit: (payload: ResourceUploadPayload) => void;
};

export type ResourceUploadPayload = {
  title: string;
  module: string;
  file: File;
};

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = ["png", "jpg", "jpeg", "docx", "pdf"] as const;

const ALLOWED_MIME_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function getFileExtension(fileName: string) {
  const parts = fileName.split(".");
  if (parts.length < 2) return "";
  return parts.pop()?.toLowerCase() ?? "";
}

function getFileValidationError(file: File) {
  const extension = getFileExtension(file.name);
  const isAllowedExtension = ALLOWED_EXTENSIONS.includes(
    extension as (typeof ALLOWED_EXTENSIONS)[number],
  );

  if (!isAllowedExtension) {
    return "Unsupported file type. Please upload PNG, JPG, DOCX or PDF.";
  }

  if (file.type && !ALLOWED_MIME_TYPES.has(file.type)) {
    return "Unsupported file type. Please upload PNG, JPG, DOCX or PDF.";
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return "File is too large. Maximum size is 10MB.";
  }

  return null;
}

function formatFileSize(fileSizeBytes: number) {
  if (fileSizeBytes >= 1024 * 1024) {
    return `${(fileSizeBytes / (1024 * 1024)).toFixed(1)}MB`;
  }
  return `${Math.max(1, Math.round(fileSizeBytes / 1024))}KB`;
}

export function CourseDetailResourceUploadModal({
  open,
  onOpenChange,
  moduleOptions,
  onSubmit,
}: ResourceUploadModalProps) {
  const [title, setTitle] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      setTitle("");
      setSelectedModule("");
      setSelectedFile(null);
      setFormError(null);
      setIsDragging(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [open]);

  const handleFileSelect = (file: File) => {
    const validationError = getFileValidationError(file);
    if (validationError) {
      setSelectedFile(null);
      setFormError(validationError);
      return;
    }
    setSelectedFile(file);
    setFormError(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setFormError("Enter a resource title.");
      return;
    }

    if (!selectedModule) {
      setFormError("Select a module.");
      return;
    }

    if (!selectedFile) {
      setFormError("Choose a file to upload.");
      return;
    }

    onSubmit({
      title: title.trim(),
      module: selectedModule,
      file: selectedFile,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[760px] rounded-[2px] border-[#ECECEF] p-5 sm:p-10"
      >
        <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-[20px] sm:text-[22px]">
              Upload a file
            </DialogTitle>
            <DialogClose asChild>
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#EAEAEC] text-[#5E5E5E] hover:bg-[#DEDEE1]"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </DialogClose>
          </DialogHeader>

          <div className="space-y-2">
            <label
              htmlFor="resource-upload-title"
              className="text-sm font-semibold text-[#333333]"
            >
              Title
            </label>
            <Input
              id="resource-upload-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Add a name/title"
              className="h-12 border-[#DCDCE0] bg-[#FAFAFA] text-sm text-[#202020] placeholder:text-[#A2A2A5]"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="resource-upload-module"
              className="text-sm font-semibold text-[#333333]"
            >
              Module
            </label>
            <div className="relative">
              <select
                id="resource-upload-module"
                value={selectedModule}
                onChange={(event) => setSelectedModule(event.target.value)}
                className={cn(
                  "h-12 w-full appearance-none rounded-md border border-[#DCDCE0] bg-[#FAFAFA] px-4 pr-10 text-sm outline-none transition-[border,box-shadow] focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/20",
                  selectedModule ? "text-[#202020]" : "text-[#A2A2A5]",
                )}
              >
                <option value="">Select a module</option>
                {moduleOptions.map((moduleName) => (
                  <option key={moduleName} value={moduleName}>
                    {moduleName}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A8A8D]" />
            </div>
          </div>

          <input
            ref={fileInputRef}
            id={fileInputId}
            type="file"
            accept=".png,.jpg,.jpeg,.docx,.pdf"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              handleFileSelect(file);
            }}
          />

          <div
            className={cn(
              "rounded-md border border-dashed px-4 py-8 text-center sm:py-10",
              isDragging
                ? "border-[#007AFF] bg-[#F3F8FF]"
                : "border-[#E5E5E8] bg-[#FCFCFD]",
            )}
            onDragOver={(event) => {
              event.preventDefault();
            }}
            onDragEnter={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              setIsDragging(false);
            }}
            onDrop={(event) => {
              event.preventDefault();
              setIsDragging(false);
              const file = event.dataTransfer.files?.[0];
              if (!file) return;
              handleFileSelect(file);
            }}
          >
            <Upload className="mx-auto h-6 w-6 text-[#7A7A7D]" />
            <p className="mt-3 text-[16px] text-[#626262]">
              Drag and drop file here or
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-1 text-[16px] font-medium text-[#313131] underline underline-offset-2"
            >
              Choose file
            </button>

            {selectedFile ? (
              <p className="mt-3 text-sm text-[#4A4A4A]">
                {selectedFile.name} ({formatFileSize(selectedFile.size)})
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2 text-sm text-[#7A7A7D] sm:flex-row sm:items-center sm:justify-between">
            <span>Supported file types: PNG, JPG, DOCX, PDF</span>
            <span>Maximum size: 10MB</span>
          </div>

          {formError ? (
            <p className="rounded-md border border-[#FFD2D2] bg-[#FFF6F6] px-3 py-2 text-sm text-[#AC2222]">
              {formError}
            </p>
          ) : null}

          <div className="grid gap-3 pt-1 sm:ml-auto sm:w-full sm:max-w-[390px] sm:grid-cols-2 sm:gap-5">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-12 rounded-[2px] border-[#DADADD] bg-[#ECECEF] text-[15px] font-semibold text-[#1E1E1E] hover:bg-[#DFDFE2]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-12 rounded-[2px] bg-[#007AFF] text-[15px] font-semibold text-white hover:bg-[#006DE0]"
            >
              Upload
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
