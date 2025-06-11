'use client';

// import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, Share2 } from 'lucide-react';
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
    <div className='flex items-center justify-center bg-[#FAFAFA] p-5 3xl:py-9 3xl:px-25'>
      <div className='w-[335px] 3xl:w-[1240px] bg-white'>
        <div className='w-full flex items-center justify-between'>
          <div className='flex items-center justify-center gap-2 border'>
            <Link href='/' className='text-[10px] 3xl:text-sm'>
              Home
            </Link>
            <ChevronLeft className='w-2 h-2 3xl:w-4 3xl:h-4' onClick={() => router.back()} />
            <span className='text-[10px] 3xl:text-sm'>{course.name}</span>
          </div>
          <div className='flex items-center justify-center gap-2 border'>
            <Share2 className='w-2 h-2 3xl:w-4 3xl:h-4' />
            <span className='text-[10px] 3xl:text-sm'>Share</span>
          </div>
        </div>
      </div>
    </div>
  );
}
