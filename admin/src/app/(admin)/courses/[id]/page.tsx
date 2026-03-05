"use client";

import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

import { coursesListData } from "@/features/courses/data/courses-list";
import {
  enrolledStudentsData,
  pendingStudentsData,
} from "@/features/courses/data/course-students";
import { courseEventsData } from "@/features/courses/data/course-events";
import { courseQuestionsData } from "@/features/courses/data/course-questions";
import { courseDetailOverviewData } from "@/features/courses/data/course-detail-overview";
import type { CourseListItem } from "@/features/courses/types";
import {
  CourseDetailHeader,
  CourseDetailTabs,
  CourseDetailOverview,
  CourseDetailStudents,
  CourseDetailEvents,
  CourseDetailResources,
  CourseDetailQuestionBank,
} from "@/features/courses/components";

type TabLabel =
  | "Overview"
  | "Students"
  | "Events & Schedule"
  | "Resources"
  | "Question Bank"
  | "Announcements"
  | "Reviews";

export default function Course() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabLabel>("Overview");

  // find the course from our list data
  const course = useMemo<CourseListItem | undefined>(
    () => coursesListData.find((c) => c.id === id),
    [id],
  );

  if (!course) {
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
        {activeTab === "Overview" && (
          <CourseDetailOverview {...courseDetailOverviewData} />
        )}
        {activeTab === "Students" && (
          <CourseDetailStudents
            enrolledStudents={enrolledStudentsData}
            pendingStudents={pendingStudentsData}
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
