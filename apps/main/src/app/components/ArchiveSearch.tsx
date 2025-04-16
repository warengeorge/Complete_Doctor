import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { CiSearch } from "react-icons/ci";

const ArchiveSearch = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);

  return (
    <div className='w-full h-[244px] bg-[#006] px-[30px] py-[50px] flex items-center justify-center'>
      <div className='flex flex-col items-center w-full md:w-[700px] h-[144px] md:h-[173px] gap-[30px] md:gap-[50px]'>
        <div className='w-full h-[74px] text-white flex flex-col gap-2'>
          <h2 className='text-[20px] md:text-[32px] font-bold text-center'>
            Browse Our Archive
          </h2>
          <h3 className='text-[13px] md:text-[17px] font-medium leading-[20px] text-center px-8'>
            Easily explore our previous courses and live sessions.{' '}
          </h3>
        </div>
        <div className='w-full h-10 md:h-[45px] gap-[5px] md:gap-2 flex items-center justify-center'>
          <div className='w-[216px] md:w-[598px] h-full bg-white/60 flex items-center gap-5'>
            <div className='w-[78px] md:w-[103px] h-full flex justify-center items-center'>
              <Select defaultValue={currentYear.toString()}>
                <SelectTrigger className='w-[78px] h-[23px] bg-white/60 border-white/60 text-black'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className='bg-[#1A2555] border-white/60'>
                  {years.map((year) => (
                    <SelectItem
                      key={year}
                      value={year.toString()}
                      className='text-white hover:bg-[#1A2555] focus:bg-black/10 focus:text-white'
                    >
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='w-full h-full relative'>
              <Input
                type='text'
                placeholder='Enter a keyword...'
                className='w-full h-full bg-white/60 border-white/60 text-black/70 placeholder:text-gray-400 text-xs md:text-base focus-visible:ring-white/80 px-5 md:px-12'
              />
              <CiSearch className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs md:text-2xl' />
            </div>
          </div>
          <button className='w-[94px] h-full text-white text-xs font-semibold bg-[#007AFF]'>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArchiveSearch;
