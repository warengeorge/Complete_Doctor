"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Play,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CourseDetailResourceUploadModal,
  type ResourceUploadPayload,
} from "./course-detail-resource-upload-modal";
import {
  getInitialExpandedLectureNoteSections,
  initialLectureNotesSections,
  initialLectureVideos,
  initialStudyMaterials,
  resourceModuleOptions,
  resourceTabItems,
  type CourseResourceItem,
  type LectureNotesSection,
  type LectureVideoItem,
  type ResourceTabKey,
} from "@/features/courses/data/course-resources";

const longDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

function createResourceId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : String(Date.now());
}

export function CourseDetailResources({
  lastUpdated = "March 12, 2025",
}: {
  lastUpdated?: string;
}) {
  const [activeResourceTab, setActiveResourceTab] =
    useState<ResourceTabKey>("lectureNotes");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [lectureNotesSections, setLectureNotesSections] =
    useState<LectureNotesSection[]>(initialLectureNotesSections);
  const [expandedLectureNoteSections, setExpandedLectureNoteSections] =
    useState<Record<string, boolean>>(getInitialExpandedLectureNoteSections);
  const [lectureVideos, setLectureVideos] =
    useState<LectureVideoItem[]>(initialLectureVideos);
  const [studyMaterials, setStudyMaterials] =
    useState<CourseResourceItem[]>(initialStudyMaterials);
  const [currentLastUpdated, setCurrentLastUpdated] = useState(lastUpdated);

  const hasResources = useMemo(() => {
    if (activeResourceTab === "lectureNotes") {
      return lectureNotesSections.some((section) => section.items.length > 0);
    }

    if (activeResourceTab === "lectureVideos") {
      return lectureVideos.length > 0;
    }

    return studyMaterials.length > 0;
  }, [activeResourceTab, lectureNotesSections, lectureVideos, studyMaterials]);

  const activeResourceContent = useMemo(
    () =>
      resourceTabItems.find((item) => item.id === activeResourceTab) ??
      resourceTabItems[0],
    [activeResourceTab],
  );

  const handleResourceUpload = (payload: ResourceUploadPayload) => {
    if (activeResourceTab === "lectureNotes") {
      const existingSection = lectureNotesSections.find(
        (section) => section.title === payload.module,
      );
      const newNoteItem: CourseResourceItem = {
        id: createResourceId(),
        title: payload.title,
      };

      if (existingSection) {
        setLectureNotesSections((previousSections) =>
          previousSections.map((section) =>
            section.id === existingSection.id
              ? { ...section, items: [...section.items, newNoteItem] }
              : section,
          ),
        );

        setExpandedLectureNoteSections((previousState) => ({
          ...previousState,
          [existingSection.id]: true,
        }));
      } else {
        const newSectionId = createResourceId();

        setLectureNotesSections((previousSections) => [
          ...previousSections,
          {
            id: newSectionId,
            title: payload.module,
            items: [newNoteItem],
          },
        ]);

        setExpandedLectureNoteSections((previousState) => ({
          ...previousState,
          [newSectionId]: true,
        }));
      }
    }

    if (activeResourceTab === "lectureVideos") {
      setLectureVideos((previousVideos) => [
        ...previousVideos,
        {
          id: createResourceId(),
          title: payload.title,
          thumbnail: "/images/event-image2.svg",
        },
      ]);
    }

    if (activeResourceTab === "studyMaterials") {
      setStudyMaterials((previousMaterials) => [
        ...previousMaterials,
        { id: createResourceId(), title: payload.title },
      ]);
    }

    setCurrentLastUpdated(longDateFormatter.format(new Date()));
  };

  const renderLectureNotesContent = () => (
    <div className="divide-y divide-[#E8E8EA]">
      {lectureNotesSections.map((section) => {
        const isExpanded = expandedLectureNoteSections[section.id] ?? false;

        return (
          <article key={section.id}>
            <div className="flex items-center justify-between gap-3 px-5 py-4">
              <h3 className="text-[16px] font-semibold text-[#2D2D2D]">
                {section.title}
              </h3>
              <button
                type="button"
                onClick={() =>
                  setExpandedLectureNoteSections((previousState) => ({
                    ...previousState,
                    [section.id]: !isExpanded,
                  }))
                }
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#DDDDDF] bg-[#F5F5F6] text-[#474747] hover:bg-[#ECECEE]"
              >
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            </div>

            {isExpanded && section.items.length > 0 ? (
              <div className="divide-y divide-[#E8E8EA] border-t border-[#E8E8EA] bg-[#F5F5F6]">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 px-5 py-4"
                  >
                    <p className="text-[14px] text-[#2F2F2F]">
                      {item.title}
                      {item.description ? ` - ${item.description}` : ""}
                    </p>
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#353535] hover:bg-[#E8E8EA]"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );

  const renderLectureVideosContent = () => (
    <div className="divide-y divide-[#E8E8EA]">
      {lectureVideos.map((video) => (
        <article
          key={video.id}
          className="flex items-center justify-between gap-3 px-5 py-4"
        >
          <div className="flex min-w-0 items-center gap-5">
            <div className="relative h-[54px] w-[112px] shrink-0 overflow-hidden rounded-md bg-[#D8D8DA]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={video.thumbnail}
                alt={video.title}
                className="h-full w-full object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90">
                  <Play className="h-3.5 w-3.5 fill-[#333333] text-[#333333]" />
                </span>
              </span>
            </div>
            <p className="truncate text-[16px] font-semibold text-[#2F2F2F]">
              {video.title}
            </p>
          </div>

          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#353535] hover:bg-[#E8E8EA]"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </article>
      ))}
    </div>
  );

  const renderStudyMaterialsContent = () => (
    <div className="divide-y divide-[#E8E8EA]">
      {studyMaterials.map((material) => (
        <article
          key={material.id}
          className="flex items-center justify-between gap-3 px-5 py-4"
        >
          <p className="truncate text-[16px] font-semibold text-[#2F2F2F]">
            {material.title}
          </p>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#353535] hover:bg-[#E8E8EA]"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </article>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[160px_minmax(0,1fr)]">
        <aside className="h-fit overflow-hidden rounded-lg border border-[#E5E5E8] bg-white p-2 shadow-sm">
          <div className="flex flex-col gap-1">
            {resourceTabItems.map((item) => {
              const isActive = item.id === activeResourceTab;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveResourceTab(item.id)}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-left text-[15px] font-medium transition-colors",
                    isActive
                      ? "bg-[#007AFF] text-white"
                      : "text-[#5E5E5E] hover:bg-[#F3F3F5] hover:text-[#1F1F1F]",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </aside>

        <section className="overflow-hidden rounded-lg border border-[#ECECEC] bg-white">
          <header className="flex items-center justify-between gap-3 border-b border-[#E5E5E8] px-5 py-3.5">
            <h2 className="text-[16px] font-semibold text-[#1F1F1F]">
              {activeResourceContent.label}
            </h2>
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#DDDDDF] bg-[#F5F5F6] text-[#2F2F2F] hover:bg-[#EBEBED]"
              aria-label={activeResourceContent.actionLabel}
            >
              <Plus className="h-4 w-4" />
            </button>
          </header>

          {!hasResources ? (
            <div className="flex min-h-[250px] flex-col items-center justify-center px-4 py-10 text-center">
              <h3 className="text-[22px] font-semibold text-[#333333] sm:text-[30px]">
                {activeResourceContent.emptyTitle}
              </h3>
              <p className="mt-1 max-w-[560px] text-[14px] text-[#676767]">
                {activeResourceContent.emptyDescription}
              </p>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(true)}
                className="mt-4 rounded-[2px] bg-[#007AFF] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#006DE0]"
              >
                {activeResourceContent.actionLabel}
              </button>
            </div>
          ) : activeResourceTab === "lectureNotes" ? (
            renderLectureNotesContent()
          ) : activeResourceTab === "lectureVideos" ? (
            renderLectureVideosContent()
          ) : (
            renderStudyMaterialsContent()
          )}
        </section>
      </div>

      <p className="text-right text-[14px] text-[#8A8A8A]">
        <span className="font-semibold text-[#5E5E5E]">Last updated:</span>{" "}
        {currentLastUpdated}
      </p>

      <CourseDetailResourceUploadModal
        open={isUploadModalOpen}
        onOpenChange={setIsUploadModalOpen}
        moduleOptions={resourceModuleOptions}
        onSubmit={handleResourceUpload}
      />
    </div>
  );
}
