'use client';

import React, { useRef } from 'react';

import { Card } from '@/components/ui/card';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import Image from 'next/image';
import { events } from '@/lib/data/events';
import { Clock } from './icons/icons';

const UpcomingEvents = () => {
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
    <div className='px-5 py-10 md: flex flex-col'>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <section className='flex items-center gap-2'>
            <h2 className='font-medium text-[#0C0C0C]'>Upcoming Events</h2>
            <div className='flex md:hidden gap-2'>
              <span
                onClick={() => scroll('left')}
                className='flex items-center justify-center rounded-full w-[2.25rem] h-[2.25rem] bg-white cursor-pointer border border-[#E2E4E9] active:bg-neutral-200'
              >
                <FaArrowLeft />
              </span>
              <span
                onClick={() => scroll('right')}
                className='flex items-center justify-center rounded-full w-[2.25rem] h-[2.25rem] bg-white cursor-pointer border border-[#E2E4E9] active:bg-neutral-200'
              >
                <FaArrowRight />
              </span>
            </div>
          </section>
        </div>
      </div>

      <div
        ref={scrollRef}
        className='w-auto h-[260.6px] md:h-auto flex md:flex-wrap gap-[15px] overflow-x-hidden scroll-smooth'
      >
        {events.map((event, index) => (
          <Card
            key={index}
            className='flex-none justify-center items-center w-[301.4px] h-full overflow-hidden bg-black/5 rounded-[6px] gap-[11.3px] p-4'
          >
            <Image
              src={event.image}
              width={275}
              height={135}
              objectFit='cover'
              alt='event'
            />
            <div className='flex flex-col gap-[26.4px] w-full'>
            <div className='flex flex-col gap-[6px]'>
              <h3 className='text-[#081021] text-xs font-semibold'>
                {event.header}
              </h3>
              <h4 className='text-[#737373] text-[10px] leading-[13.565px]'>
                {event.body.substring(0, 115)}...
              </h4>
            </div>
            <div className='flex justify-between items-center w-full'>
              <div className='flex items-center gap-[13.8px]'>
                <span>
                  <Clock />
                </span>
                <span className='text-[#313131] text-[10px] font-semibold'>{event.date}</span>
              </div>
              <div className='flex items-center gap-[13.8px]'>
                <span>
                  <Clock />
                </span>
                <span className='text-[#313131] text-[10px] font-semibold'>{event.time}</span>
              </div>
            </div>
            </div>
            
          </Card>
        ))}
      </div>
      <button className='text-white text-[13px] font-semibold bg-[#007AFF] w-full max-w-[330px] md:max-w-[198px] h-[46px] mt-[30px] mx-auto rounded-[1px]'>View Full Calendar</button>
    </div>
  );
};

export default UpcomingEvents;
