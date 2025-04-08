import React from 'react';

const ArchiveSearch = () => {
  return (
    <div className='w-full h-[244px] bg-[#006] px-[30px] py-[50px] flex items-center justify-center'>
      <div className='flex flex-col items-center w-full md:w-[700px] h-[144px] md:h-[173px] gap-[30px] md:gap-[50px]'>
        <div className='w-full h-[74px] text-white flex flex-col gap-2'>
          <h2 className='text-[20px] md:text-[32px] font-bold text-center'>Browse Our Archive</h2>
          <h3 className='text-[13px] md:text-[17px] font-medium leading-[20px] text-center px-8'>
            Easily explore our previous courses and live sessions.{' '}
          </h3>
        </div>
        <div className='w-full h-10 md:h-[45px] gap-[5px] md:gap-2 flex items-center justify-center'>
          <div className='w-[216px] md:w-[598px] h-full bg-black'>
            <div>
              <div className='w-12 h-[15px]'></div>
            </div>
            <div>
              <div className='w-[127px] h-[15px]'></div>
            </div>
          </div>
          <button className='w-[94px] h-full text-white text-xs font-semibold bg-[#007AFF]'>Search</button>
        </div>
      </div>
    </div>
  );
};

export default ArchiveSearch;
