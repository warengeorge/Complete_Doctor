"use client";

import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  enrolledStudentsData,
  pendingStudentsData,
} from "@/features/courses/data/course-students";
import { courseEventsData } from "@/features/courses/data/course-events";
import { courseQuestionsData } from "@/features/courses/data/course-questions";
import type { CourseListItem } from "@/features/courses/types";
import {
  CourseDetailHeader,
  CourseDetailTabs,
  CourseDetailOverview,
  CourseDetailStudents,
  CourseDetailModules,
  CourseDetailEvents,
  CourseDetailResources,
  CourseDetailQuestionBank,
} from "@/features/courses/components";
import { useCourseByIdQuery } from "@/features/courses/services/useCourseByIdQuery";
import type { CourseDetail } from "@/features/courses/services/courses-api";

type TabLabel =
  | "Overview"
  | "Students"
  | "Modules"
  | "Events & Schedule"
  | "Resources"
  | "Question Bank"
  | "Announcements"
  | "Reviews";

export default function Course() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabLabel>("Overview");
  const courseQuery = useCourseByIdQuery(id);

  const course = useMemo<CourseListItem | null>(() => {
    if (!courseQuery.data) return null;
    return mapCourseToListItem(courseQuery.data);
  }, [courseQuery.data]);

  const overview = useMemo(() => {
    if (!courseQuery.data) return null;
    return mapCourseToOverview(courseQuery.data);
  }, [courseQuery.data]);

  if (courseQuery.isLoading) {
    return <CourseDetailPageSkeleton />;
  }

  if (courseQuery.isError) {
    return (
      <div className="py-20 text-center text-[16px] text-[#6B6B6B]">
        Unable to load course.
      </div>
    );
  }

  if (!course || !overview) {
    return (
      <div className="py-20 text-center text-[16px] text-[#6B6B6B]">
        Course not found
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <CourseDetailHeader
        course={course}
        resourceCount={25}
        enrolledStudents={3050}
      />

      <CourseDetailTabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabLabel)}
      />

      <div>
        {activeTab === "Overview" && <CourseDetailOverview {...overview} />}
        {activeTab === "Students" && (
          <CourseDetailStudents
            enrolledStudents={enrolledStudentsData}
            pendingStudents={pendingStudentsData}
          />
        )}
        {activeTab === "Modules" && (
          <CourseDetailModules
            courseId={id}
            depth={courseQuery.data?.depth}
            courseTitle={courseQuery.data?.title}
            preloadedModules={courseQuery.data?.modules}
          />
        )}
        {activeTab === "Events & Schedule" && (
          <CourseDetailEvents events={courseEventsData} />
        )}
        {activeTab === "Resources" && <CourseDetailResources />}
        {activeTab === "Question Bank" && (
          <CourseDetailQuestionBank questions={courseQuestionsData} />
        )}
        {activeTab !== "Overview" &&
          activeTab !== "Students" &&
          activeTab !== "Modules" &&
          activeTab !== "Events & Schedule" &&
          activeTab !== "Resources" &&
          activeTab !== "Question Bank" && (
            <p className="text-center text-[#6B6B6B] py-20">
              {activeTab} content goes here
            </p>
          )}
      </div>
    </section>
  );
}

function mapCourseToListItem(course: CourseDetail): CourseListItem {
  return {
    id: course.id,
    title: course.title,
    category: resolveCategoryName(course) ?? "Uncategorized",
    status: resolveStatus(course.courseStatus),
    enrolledStudents: 0,
    createdAt: formatCourseDate(course.createdAt ?? course.updatedAt ?? null),
    image: course.coverImageUrl || "/images/event-image1.svg",
  };
}

function mapCourseToOverview(course: CourseDetail) {
  return {
    description: course.description ?? "",
    details: {
      schedule: course.primaryDate
        ? formatCourseDate(course.primaryDate)
        : "Flexible",
      time: course.sessionFrequency ?? "—",
      location: "Online",
      instructor: resolveInstructor(course) ?? "—",
    },
    objectives: course.objectives ?? [],
    merits: course.targetAudience ?? [],
  };
}

function resolveStatus(value?: string | null): CourseListItem["status"] {
  switch (value?.toUpperCase()) {
    case "PUBLISHED":
      return "Published";
    case "ARCHIVED":
      return "Archived";
    default:
      return "Draft";
  }
}

function resolveCategoryName(course: CourseDetail) {
  if (typeof course.category === "string" && course.category.trim()) {
    return course.category;
  }

  if (
    course.category &&
    typeof course.category === "object" &&
    course.category.name
  ) {
    return course.category.name;
  }

  if (course.categoryName) {
    return course.categoryName;
  }

  const categories = Array.isArray(course.categories) ? course.categories : [];
  const first = categories[0];
  return first?.categoryName ?? null;
}

function resolveInstructor(course: CourseDetail) {
  const instructors = Array.isArray(course.instructors)
    ? course.instructors
    : [];

  for (const instructor of instructors) {
    if (typeof instructor === "string" && instructor.trim()) {
      return instructor;
    }
    if (
      instructor &&
      typeof instructor === "object" &&
      typeof instructor.name === "string" &&
      instructor.name.trim()
    ) {
      return instructor.name;
    }
  }

  return null;
}

function formatCourseDate(value: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function CourseDetailPageSkeleton() {
  return (
    <section className="space-y-8">
      <div className="rounded-xl border border-[#E5E5E8] bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="space-y-3">
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-40" />
            <div className="flex flex-wrap gap-2 pt-1">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-28 rounded-full" />
              <Skeleton className="h-6 w-32 rounded-full" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Skeleton className="h-10 w-28 rounded-lg" />
            <Skeleton className="h-10 w-36 rounded-lg" />
          </div>
        </div>
      </div>

      <div className="w-full border-b border-[#E5E5E8]">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={`tab-skeleton-${index}`}
              className="h-8 w-24 shrink-0 rounded-md"
            />
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <div className="space-y-4 rounded-xl border border-[#E5E5E8] bg-white p-6">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[95%]" />
          <Skeleton className="h-4 w-[88%]" />
          <Skeleton className="h-4 w-[92%]" />
          <Skeleton className="h-4 w-[70%]" />
        </div>

        <div className="space-y-4 rounded-xl border border-[#E5E5E8] bg-white p-6">
          <Skeleton className="h-5 w-32" />
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={`meta-row-skeleton-${index}`}
              className="flex items-center justify-between gap-3"
            >
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-28" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
