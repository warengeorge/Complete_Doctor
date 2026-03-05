"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Share2,
  Calendar,
  AlarmClockCheck,
  Check,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCourseStore } from "../../../../lib/store";

export default function CoursePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { addToCart, courses, expandedSections, toggleSection, hasHydrated } =
    useCourseStore();

  // Wait for hydration to complete
  if (!hasHydrated) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-lg">Course not found</div>
      </div>
    );
  }

  const currentExpandedSections = expandedSections[course.id] || [];

  return (
    <>
      <div className="md:hidden flex flex-col items-center justify-center gap-2.5 bg-[#FAFAFA] px-[calc(100vw*0.05)] pt-[calc(100vw*0.05)] pb-15">
        {/* Navigation Header */}
        <div className="w-full h-7.5 flex items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <Link href="/" className="text-[10px] 3xl:text-sm font-medium">
              Home
            </Link>
            <ChevronLeft
              className="w-2 h-2 3xl:w-4 3xl:h-4"
              onClick={() => router.back()}
            />
            <span className="text-[10px] 3xl:text-sm font-semibold">
              {course.name}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Share2 className="w-2 h-2 3xl:w-4 3xl:h-4" />
            <span className="text-[10px] 3xl:text-sm">Share</span>
          </div>
        </div>

        {/* Course Info Header */}
        <div className="w-full bg-white flex flex-col justify-between shadow-sm p-3.75 rounded-lg border">
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-2.5">
              <h1 className="text-lg text-[#121212] font-semibold">
                {course.name}
              </h1>
              <span className="w-16 h-[18px] font-medium text-[9px] bg-[rgba(234,234,234,0.80)] rounded-full flex items-center justify-center">
                {course.code}
              </span>
            </div>
            <div className="w-full h-4 flex items-center gap-7.5">
              <div className="flex items-center gap-3">
                <Calendar className="w-3 h-3" />
                <span className="text-[10px] text-[#646464] font-semibold">
                  {course.date}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <AlarmClockCheck className="w-3 h-3" />
                <span className="text-[10px] text-[#646464] font-semibold">
                  {course.duration}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Course Image and Price */}
        <div className="w-full bg-white flex flex-col justify-between shadow-sm p-2.5 rounded-lg border">
          <div className="w-full h-[215px] mb-4">
            <Image
              src={course.image}
              alt={course.name}
              width={800}
              height={215}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex items-center gap-5 mb-4">
            <span className="text-[#081021] font-semibold">
              £{course.price}
            </span>
            <span className="text-[#B5B5B5] text-[10px] font-semibold line-through">
              £{course.oldPrice}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <button
              className="flex-1 h-10 bg-[#007AFF] text-white rounded-sm mr-4 hover:bg-blue-600 transition-colors"
              onClick={() => {
                addToCart(course);
                router.push("/cart");
              }}
            >
              Enrol
            </button>
            <div className="py-2.5 px-3.75 border border-[#ECECEC] rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer">
              <ShoppingCart className="w-4 h-4" />
              <span>Save</span>
            </div>
          </div>
        </div>

        {/* About Course Section */}
        <div className="w-full p-3.75 bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200 flex flex-col gap-8.75">
          <div className="">
            <h2 className="text-sm font-semibold text-[#081021] mb-2">
              About this course
            </h2>
            <p className="text-xs text-justify text-[#737373] leading-[20.776px] mb-8.75">
              {course.about}
            </p>
          </div>

          {/* Time Commitment */}
          <div className="">
            <h2 className="text-sm font-semibold text-[#081021] mb-2">
              Time Commitment
            </h2>
            <p className="text-xs text-[#737373] leading-[20.776px] mb-8.75">
              {course.time}
            </p>
          </div>

          {/* Course Objectives */}

          <div className="">
            <h2 className="text-sm font-semibold text-[#081021] mb-2">
              Course Objectives
            </h2>
            <h3 className="text-xs font-medium text-[#737373] mb-2.5">
              By the end of this course, you will be able to:
            </h3>
            <ul className="space-y-3 mb-8.75">
              {course.objectives.map((objective) => (
                <li key={objective.id} className="flex items-start gap-3">
                  <Check className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-medium text-[#737373] leading-[20.776px]">
                    {objective.content}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Course Merits */}
          <div className="">
            <h2 className="text-sm font-semibold text-[#081021] mb-2">
              Who Should Take This Course?
            </h2>
            <h3 className="text-xs font-medium text-[#737373] mb-2.5">
              This course is ideal for:
            </h3>
            <ul className="space-y-3 mb-8.75">
              {course.merits.map((merit) => (
                <li key={merit.id} className="flex items-start gap-3">
                  <Check className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-medium text-[#737373] leading-[20.776px]">
                    {merit.content}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Course Syllabus */}
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-3.75 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-[#151515]">
                  Course Syllabus
                </h2>
                {/* <p className='text-sm text-gray-600 mt-1'>
                {course.syllabus.length} sections • Instructor:{' '}
                {course.instructor}
              </p> */}
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {course.syllabus.map((section) => {
              const isExpanded = currentExpandedSections.includes(section.id);

              return (
                <div
                  key={section.id}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <button
                    onClick={() => toggleSection(course.id, section.id)}
                    className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-150 focus:outline-none focus:bg-gray-50"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <span className="text-xs font-medium text-[#737373]">
                          {section.id}: {section.title}
                        </span>
                        {/* <p className='text-xs text-gray-500 mt-1'>
                        {section.content.length} topics
                      </p> */}
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        )}
                      </div>
                    </div>
                  </button>

                  {isExpanded && section.content.length > 0 && (
                    <div className="px-6 pb-4">
                      <div className="pl-4 border-l-2 border-blue-100">
                        {section.content.map((item, itemIndex) => (
                          <div key={itemIndex} className="py-2">
                            <span className="text-xs text-gray-700">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* desktop */}
      <div className="hidden md:flex flex-col items-center justify-center gap-2.5 shadow-sm bg-[#FAFAFA] px-25 pt-8.75 pb-20">
        {/* Navigation Header */}
        <div className="w-full h-9.5 flex items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <Link href="/" className="text-sm font-medium text-[#646464]">
              Home
            </Link>
            <ChevronLeft className="w-4 h-4" onClick={() => router.back()} />
            <span className="text-sm text-[#0C0C0C] font-semibold">
              {course.name}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Share2 className="w-2 h-2 3xl:w-4 3xl:h-4" />
            <span className="text-sm text-[#0C0C0C] 3xl:text-sm">Share</span>
          </div>
        </div>

        <div className="w-full flex items-start gap-2.5">
          {/* left */}
          <div className="w-[850px] flex flex-col gap-2.5">
            <div className="w-full h-[124px] bg-white flex flex-col justify-between shadow-sm p-6.25 rounded-lg border">
              <div className="flex flex-col gap-6.25">
                <div className="flex items-center justify-between">
                  <h1 className="text-[22px] text-[#121212] font-semibold">
                    {course.name}
                  </h1>
                  <span className="w-auto h-5.5 py-1.5 px-3 font-semibold text-[10px] bg-[rgba(234,234,234,0.80)] rounded-full flex items-center justify-center">
                    {course.code}
                  </span>
                </div>
                <div className="w-full h-4 flex items-center gap-7.5">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-3 h-3" />
                    <span className="text-sm text-[#646464] font-semibold">
                      {course.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <AlarmClockCheck className="w-3 h-3" />
                    <span className="text-sm text-[#646464] font-semibold">
                      {course.duration}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* About Course Section */}
            {/* <div className='w-full p-[25px_25px_40px_25px] bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200 flex flex-col gap-10'>
              <div className=''>
                <h2 className='text-base font-semibold text-[#081021] mb-2'>
                  About this course
                </h2>
                <p className='text-sm text-justify text-[#737373] leading-[24px] mb-10'>
                  {course.about}
                </p>
              </div> */}
            <div className="w-full p-3.75 bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200 flex flex-col gap-8.75">
              <div className="">
                <h2 className="text-base font-semibold text-[#081021] mb-2">
                  About this course
                </h2>
                <p className="text-sm text-justify text-[#737373] leading-[20.776px] mb-8.75">
                  {course.about}
                </p>
              </div>

              {/* Time Commitment */}
              <div className="">
                <h2 className="text-base font-semibold text-[#081021] mb-2">
                  Time Commitment
                </h2>
                <p className="text-sm text-[#737373] leading-[20.776px] mb-8.75">
                  {course.time}
                </p>
              </div>

              {/* Course Objectives */}

              <div className="">
                <h2 className="text-base font-semibold text-[#081021] mb-2">
                  Course Objectives
                </h2>
                <h3 className="text-sm font-medium text-[#737373] mb-3">
                  By the end of this course, you will be able to:
                </h3>
                <ul className="space-y-3 mb-8.75">
                  {course.objectives.map((objective) => (
                    <li key={objective.id} className="flex items-center gap-3">
                      <Check className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm font-medium text-[#737373] leading-[20.776px]">
                        {objective.content}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Course Merits */}
              <div className="">
                <h2 className="text-base font-semibold text-[#081021] mb-2">
                  Who Should Take This Course?
                </h2>
                <h3 className="text-sm font-medium text-[#737373] mb-3">
                  This course is ideal for:
                </h3>
                <ul className="space-y-3 mb-8.75">
                  {course.merits.map((merit) => (
                    <li key={merit.id} className="flex items-start gap-3">
                      <Check className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm font-medium text-[#737373] leading-[20.776px]">
                        {merit.content}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="w-[380px] flex flex-1 flex-col gap-2.5">
            {/* Course Image and Price */}
            <div className="w-full bg-white flex flex-col justify-between shadow-sm p-2.5 rounded-lg border">
              <div className="w-full h-[215px] mb-4">
                <Image
                  src={course.image}
                  alt={course.name}
                  width={800}
                  height={215}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex items-center gap-5 mb-4">
                <span className="text-lg text-[#081021] font-semibold">
                  £{course.price}
                </span>
                <span className="text-[#B5B5B5] text-xs font-semibold line-through">
                  £{course.oldPrice}
                </span>
              </div>
              <div className="flex items-center justify-between text-[15px]">
                <button
                  className="flex-1 h-10 bg-[#007AFF] font-medium text-white rounded-sm mr-4 hover:bg-blue-600 transition-colors"
                  onClick={() => {
                    addToCart(course);
                    router.push("/cart");
                  }}
                >
                  Enrol
                </button>
                <div className="py-2.5 px-3.75 border border-[#ECECEC] rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer">
                  <ShoppingCart className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Course Syllabus */}
            <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-3.75 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-[#151515]">
                      Course Syllabus
                    </h2>
                    {/* <p className='text-sm text-gray-600 mt-1'>
                {course.syllabus.length} sections • Instructor:{' '}
                {course.instructor}
              </p> */}
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {course.syllabus.map((section) => {
                  const isExpanded = currentExpandedSections.includes(
                    section.id,
                  );

                  return (
                    <div
                      key={section.id}
                      className="border-b border-gray-100 last:border-b-0"
                    >
                      <button
                        onClick={() => toggleSection(course.id, section.id)}
                        className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-150 focus:outline-none focus:bg-gray-50"
                        aria-expanded={isExpanded}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <span className="text-sm font-medium text-[#737373]">
                              {section.id}: {section.title}
                            </span>
                            {/* <p className='text-xs text-gray-500 mt-1'>
                        {section.content.length} topics
                      </p> */}
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4 text-gray-500" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-gray-500" />
                            )}
                          </div>
                        </div>
                      </button>

                      {isExpanded && section.content.length > 0 && (
                        <div className="px-6 pb-4">
                          <div className="pl-4 border-l-2 border-blue-100">
                            {section.content.map((item, itemIndex) => (
                              <div key={itemIndex} className="py-2">
                                <span className="text-xs text-gray-700">
                                  {item}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
