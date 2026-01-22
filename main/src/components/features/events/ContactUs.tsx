import React from 'react';

const ContactUs = () => {
  return (
    <div className='w-full h-auto bg-[#F8F7F4] p-[30px] lg:py-[100px] lg:px-[260px] flex items-center justify-center'>
      <div className='flex flex-col items-center w-full md:w-[700px] h-[144px] md:h-[173px] gap-[30px] md:gap-[50px]'>
        <div className='w-full h-[62px] text-white flex flex-col gap-2 lg:gap-2.5'>
          <h2 className='text-[18px] md:text-[22px] font-semibold text-center text-[#0B0A0A]'>
            Have questions or need assistance?
          </h2>
          <h3 className='text-[13px] md:text-[17px] lg:text-[18px] font-medium leading-[15.6px] text-center text-[#646464] px-8'>
            Reach out to us for inquiries about courses, enrollment, or general
            support.
          </h3>
        </div>

        <button className='w-[140px] lg:w-[150px] h-[42px] lg:h-[50px] text-white text-[13px] lg:text-[15px] font-semibold bg-[#007AFF]'>
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default ContactUs;
