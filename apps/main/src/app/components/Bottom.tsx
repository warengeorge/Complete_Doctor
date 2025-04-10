import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedin } from 'react-icons/fa';

const Bottom = () => {
  
  return (
    <div className='w-full h-[138px] flex justify-center items-center py-[30px] px-5 md:px-15 lg:px-25'>
      <div className='w-full flex flex-col-reverse md:flex-row justify-center md:justify-between items-center gap-[30px]'>
        <div className='text-xs md:text-base flex gap-[15px]'>
          <span>&copy;</span>
          <span>Complete Doctor, {new Date().getFullYear()}</span>
        </div>
        <div className='flex items-center gap-5 w-auto h-[60px]'>
          <Link
            href='#'
            className='w-[40px] h-[40px] rounded-full flex justify-center items-center bg-[#D9D9D9] hover:bg-[#F8F7F4] transition-all duration-300 ease-in-out'
          >
            <FaFacebookF className='text-[#0B0A0A] text-base' />
          </Link>
          <Link
            href='#'
            className='w-[40px] h-[40px] rounded-full flex justify-center items-center bg-[#D9D9D9] hover:bg-[#F8F7F4] transition-all duration-300 ease-in-out'
          >
            <FaTwitter className='text-[#0B0A0A] text-base' />
          </Link>
          <Link
            href='#'
            className='w-[40px] h-[40px] rounded-full flex justify-center items-center bg-[#D9D9D9] hover:bg-[#F8F7F4] transition-all duration-300 ease-in-out'
          >
            <FaYoutube className='text-[#0B0A0A] text-base' />
          </Link>
          <Link
            href='#'
            className='w-[40px] h-[40px] rounded-full flex justify-center items-center bg-[#D9D9D9] hover:bg-[#F8F7F4] transition-all duration-300 ease-in-out'
          >
            <FaLinkedin className='text-[#0B0A0A] text-base' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Bottom;
