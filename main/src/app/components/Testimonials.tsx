'use client';

import React, { useRef } from 'react';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { testimonials } from '@/lib/data/testimonials';

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = container.offsetWidth;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='w-full h-auto py-10 lg:py-20 px-5 lg:px-25 flex flex-col gap-20'>
      <div className='flex flex-col gap-15'>
        <div className='w-full lg:w-[528px] h-[118px] lg:h-[97px] flex flex-col gap-[20px] lg:gap-[30px] justify-center items-center mx-auto'>
          <div className='w-[101px] lg:w-[109px] flex justify-center items-center gap-[15px]'>
            <span className='w-[4px] h-[4px] bg-[#007AFF]'></span>
            <h2 className='uppercase text-[10px] lg:text-[11px]'>
              testimonials
            </h2>
          </div>
          <div className='flex flex-col items-center justify-center gap-[10px] px-3'>
            <h2 className='text-[#0B0A0A] text-center text-[18px] lg:text-[22px] font-semibold leading-[21.6px]'>
              What Our Learners Say
            </h2>
            <p className='text-[#646464] text-center text-[13px] lg:text-[15px] leading-[15.6px] font-medium'>
              Join hundreds of aspiring medical professionals who&apos;ve gained
              the knowledge, confidence, and support they needed to excel in
              their exams.
            </p>
          </div>
        </div>

        <div
          ref={scrollRef}
          className='w-full h-[246px] md:h-auto flex gap-[15px] overflow-x-hidden scroll-smooth'
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className='flex-none justify-center w-[335px] md:w-[400px] lg:w-[600px] h-full flex flex-col gap-[30px] overflow-hidden border-[.5px] border-[#ECECEC] bg-[#FAFAFA] py-5 px-[15px] rounded-[10px]'
            >
              <div className='w-full flex flex-col gap-[15px]'>
                <div className='w-[82.7px] h-[14px] flex items-center gap-[5px]  text-white'>
                  
                    {Array.from({ length: testimonial.stars }, (_, i) => (
                      <span key={i} className='w-[12px] h-[14px] bg-[#009747] flex items-center justify-center'><svg
                        
                        width='14'
                        height='14'
                        viewBox='0 0 14 14'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M7.00001 10.5L3.50001 12.5L4.16668 8.83333L1.00001 5.83333L4.83334 5.5L7.00001 1.5L9.16668 5.5L12.9999 5.83333L9.83334 8.83333L10.5001 12.5L7.00001 10.5Z'
                          fill='#FFFFFF'
                        />
                      </svg>
                      </span>
                    ))}
                
                </div>
                <p className='w-full h-[114px] text-[#646464] text-xs md:text-[15px] font-medium leading-[19.2px]'>
                  {testimonial.body}
                </p>
              </div>
              <div>
                <h3 className='text-[#0C0C0C] text-[13px] md:text-base font-semibold'>
                  {testimonial.name}
                </h3>
                <span className='text-[10px] md:text-sm text-[#737373] font-medium'>
                  {testimonial.date}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className='w-[133.3px] h-10 flex items-center gap-[53.3px] mx-auto'>
          <span
            onClick={() => scroll('left')}
            className='flex items-center justify-center rounded-full w-10 h-full bg-white cursor-pointer border border-[#E2E4E9] active:bg-neutral-200'
          >
            <FaArrowLeft />
          </span>
          <span
            onClick={() => scroll('right')}
            className='flex items-center justify-center rounded-full w-10 h-full bg-white cursor-pointer border border-[#E2E4E9] active:bg-neutral-200'
          >
            <FaArrowRight />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
