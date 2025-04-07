import React from 'react';

const Pitch = () => {
  return (
    <div className='w-[90%] xl:w-[563.7px] h-[260px] xl:h-[343px] flex flex-col items-center justify-center xl:items-start gap-[30px] xl:gap-10'>
      <div className='w-[183px] xl:w-[225px] flex items-center gap-[15px]'>
        <span className='w-[4px] h-[4px] bg-[#007AFF]'></span>
        <h2 className='uppercase text-[10px] xl:text-xs font-bold leading-[120%] text-[#646464]'>
          start learning with us today
        </h2>
      </div>
      <div className='w-full h-[218px] flex flex-col items-center xl:items-start justify-center gap-[10px] xl:gap-[20px]'>
        <h2 className='text-[18px] xl:text-[22px] font-bold leading-[1.125] text-[#0C0C0C]'>
          Your Companion for Medical Exam Success
        </h2>
        <div className='w-full h-[162px] flex flex-col justify-center gap-[10px] text-[13px] xl:text-base text-[#646464] font-medium'>
          <p className='leading-[1.125] xl:leading-[1.875]'>
            Prepare with confidence using resources designed to help you excel
            at every step.
          </p>
          <p className='leading-[1.125] xl:leading-[1.875]'>
            From live classes to recorded lectures and study materials, we
            provide the support you need to tackle exams like{' '}
            <span className='text-[#007AFF]'>MRCGP AKT</span>,{' '}
            <span className='text-[#007AFF]'>SCA</span>,
            <span className='text-[#007AFF]'> MSRA</span>, and{' '}
            <span className='text-[#007AFF]'>PLAB</span>.
          </p>
          <p className='leading-[1.125] xl:leading-[1.875]'>
            Join a growing community of medical professionals building knowledge
            and passing their exams with ease.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pitch;
