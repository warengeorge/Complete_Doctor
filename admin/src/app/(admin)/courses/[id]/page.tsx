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
import type { CourseListItem } from "@/features/courses/types";
import {
  CourseDetailHeader,
  CourseDetailTabs,
  CourseDetailOverview,
  CourseDetailStudents,
  CourseDetailEvents,
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

  // derived detail information; in a real app this would come from the API
  const detailInfo = useMemo(
    () => ({
      description:
        "Welcome to Introduction to Clinical Medicine, a foundational course designed to equip medical students and professionals with the core principles of patient care, clinical reasoning, and diagnostic skills. This course covers essential topics such as patient history-taking, physical examination techniques, and the basics of differential diagnosis, setting the stage for clinical excellence.",
      details: {
        schedule: "Every Wednesday & Saturday",
        time: "7:00 PM GMT",
        location: "Zoom – Join Lecture",
        instructor: "Dr. Stanley",
      },
      objectives: [
        "Understand the core principles of clinical medicine and patient-centered care.",
        "Conduct a comprehensive medical history and perform basic physical examinations.",
        "Recognize common symptoms and their potential underlying conditions.",
        "Develop clinical reasoning and formulate basic differential diagnoses.",
      ],
      merits: [
        "Medical students in pre-clinical or clinical training",
        "Nurses & allied health professionals looking to improve patient interaction skills",
        "International medical graduates preparing for exams like PLAB, USMLE, or AMC",
        "Anyone interested in clinical decision-making and patient care",
      ],
    }),
    [],
  );

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
        {activeTab === "Overview" && <CourseDetailOverview {...detailInfo} />}
        {activeTab === "Students" && (
          <CourseDetailStudents
            enrolledStudents={enrolledStudentsData}
            pendingStudents={pendingStudentsData}
          />
        )}
        {activeTab === "Events & Schedule" && (
          <CourseDetailEvents events={courseEventsData} />
        )}
        {activeTab === "Question Bank" && (
          <CourseDetailQuestionBank questions={courseQuestionsData} />
        )}
        {activeTab !== "Overview" &&
          activeTab !== "Students" &&
          activeTab !== "Events & Schedule" &&
          activeTab !== "Question Bank" && (
            <p className="text-center text-[#6B6B6B] py-20">
              {activeTab} content goes here
            </p>
          )}
      </div>
    </section>
  );
}
