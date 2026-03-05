"use client";

import { useId, useRef } from "react";
import { Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { CourseContentAsset } from "../types";

type UploadCardProps = {
  title: string;
  fileInputId: string;
  file: CourseContentAsset | null;
  onFileSelect: (file: File | null) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

type CourseContentSidebarProps = {
  lectureNotes: CourseContentAsset | null;
  lectureVideos: CourseContentAsset | null;
  studyMaterials: CourseContentAsset | null;
  onLectureNotesSelect: (file: File | null) => void;
  onLectureVideosSelect: (file: File | null) => void;
  onStudyMaterialsSelect: (file: File | null) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function CourseContentSidebar({
  lectureNotes,
  lectureVideos,
  studyMaterials,
  onLectureNotesSelect,
  onLectureVideosSelect,
  onStudyMaterialsSelect,
  onPrevious,
  onNext,
}: CourseContentSidebarProps) {
  const lectureNotesInputId = useId();
  const lectureVideosInputId = useId();
  const studyMaterialsInputId = useId();

  const lectureNotesRef = useRef<HTMLInputElement>(null);
  const lectureVideosRef = useRef<HTMLInputElement>(null);
  const studyMaterialsRef = useRef<HTMLInputElement>(null);

  return (
    <aside className="space-y-3">
      <UploadCard
        title="Lecture notes"
        file={lectureNotes}
        fileInputId={lectureNotesInputId}
        onFileSelect={onLectureNotesSelect}
        inputRef={lectureNotesRef}
      />
      <UploadCard
        title="Lecture videos"
        file={lectureVideos}
        fileInputId={lectureVideosInputId}
        onFileSelect={onLectureVideosSelect}
        inputRef={lectureVideosRef}
      />
      <UploadCard
        title="Study materials"
        file={studyMaterials}
        fileInputId={studyMaterialsInputId}
        onFileSelect={onStudyMaterialsSelect}
        inputRef={studyMaterialsRef}
      />

      <div className="grid gap-2 sm:grid-cols-2">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="h-11 border-[#E0E0E2] bg-[#F3F3F5] text-[14px] font-semibold text-[#313131] hover:bg-[#ECECEF]"
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={onNext}
          className="h-11 bg-[#007AFF] text-[14px] font-semibold text-white hover:bg-[#006DE0]"
        >
          Next
        </Button>
      </div>
    </aside>
  );
}

function UploadCard({
  title,
  fileInputId,
  file,
  onFileSelect,
  inputRef,
}: UploadCardProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#E5E5E8] bg-white">
      <header className="border-b border-[#E5E5E8] px-5 py-4">
        <h3 className="text-[15px] font-semibold text-[#151515]">{title}</h3>
      </header>

      <div className="space-y-3 px-5 py-4">
        <label
          htmlFor={fileInputId}
          className="flex min-h-20 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-[#DFDFE3] bg-[#FAFAFACC] text-[#313131]"
        >
          <Upload className="h-4 w-4" />
          <span className="text-[14px] font-semibold">Upload file(s)</span>
        </label>

        <input
          ref={inputRef}
          id={fileInputId}
          type="file"
          className="hidden"
          onChange={(event) => onFileSelect(event.target.files?.[0] ?? null)}
        />

        {file ? (
          <div className="flex items-center justify-between rounded-lg bg-[#F4F4F6] px-3 py-2">
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium text-[#313131]">{file.name}</p>
              <p className="text-[12px] text-[#6F6F72]">{file.sizeKb}KB</p>
            </div>

            <button
              type="button"
              onClick={() => {
                onFileSelect(null);
                if (inputRef.current) {
                  inputRef.current.value = "";
                }
              }}
              aria-label={`Remove ${title}`}
              className="rounded-full bg-[#E8E8EB] p-1.5 text-[#5D5D5D] hover:bg-[#DEDEE2]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
