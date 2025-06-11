'use client';

// import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, Share2, Calendar, AlarmClockCheck  } from 'lucide-react';
import Link from 'next/link';
import { type Course, useCourseStore } from '../../../../store/useStore';

export default function CoursePage() {
  const router = useRouter();
  const { id } = useParams();
  const course = useCourseStore((state) =>
    state.courses.find((c) => c.id === id)
  );

  if (!course) {
    return <div>No course found</div>;
  }

  return (
    <div className='flex flex-col items-center justify-center gap-2.5 bg-[#FAFAFA] p-[calc(100vw*0.05)] 3xl:py-9 3xl:px-25'>
      <div className='w-full h-7.5 flex items-center justify-between border'>
        <div className='flex items-center justify-center gap-2'>
          <Link href='/' className='text-[10px] 3xl:text-sm'>
            Home
          </Link>
          <ChevronLeft
            className='w-2 h-2 3xl:w-4 3xl:h-4'
            onClick={() => router.back()}
          />
          <span className='text-[10px] 3xl:text-sm font-semibold'>
            {course.name}
          </span>
        </div>
        <div className='flex items-center justify-center gap-2'>
          <Share2 className='w-2 h-2 3xl:w-4 3xl:h-4' />
          <span className='text-[10px] 3xl:text-sm'>Share</span>
        </div>
      </div>

      <div className='w-full h-29.5 bg-white flex flex-col justify-between p-3.75 rounded-lg'>
        <div className='flex flex-col gap-2.5'>
          <h1 className='text-lg 3xl:text-4xl text-[#121212] font-semibold'>
            {course.name}
          </h1>
          <span>{course.code}</span>
        </div>
        <div className='w-full h-4 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Calendar className='w-2 h-2 3xl:w-4 3xl:h-4' />
            <span>{course.date}</span>
          </div>
          <div className='flex items-center gap-2'>
            <AlarmClockCheck  className='w-2 h-2 3xl:w-4 3xl:h-4' />
            <span>{course.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
