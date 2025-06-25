import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className='w-full h-auto py-15 lg:py-20 px-[30px] lg:px-25 bg-gray-200/80'>
      <div className='w-full h-[375px] md:h-[143px] flex flex-col md:flex-row items-center gap-[50px] md:justify-between'>
        <div className='w-full h-[95px] gap-[15px] flex flex-col'>
          <Image
            src='/icons/complete-doc-logo.svg'
            width={160.7}
            height={40}
            alt='logo'
            className='block lg:hidden'
          />
          <Image
            src='/icons/complete-doc-logo.svg'
            width={200}
            height={50}
            alt='logo'
            className='hidden lg:block'
          />
          <span className='text-[13px] md:text-[15px] font-medium'>Guiding You to Exam Success with Expert-Led Preparation</span>
        </div>
        <div className='w-full lg:w-[520px] h-[110px] lg:h-[143px] flex justify-between md:gap-[120px]'>
            <div className='w-[73px] lg:w-[120px] h-full flex flex-col gap-[15.45px]'>
                <h3 className='text-[#737373] text-xs lg:text-[15.5px] uppercase'>Quick Links</h3>
                <ul className='flex flex-col gap-[15.45px] text-xs lg:text-base text-[#0C0C0C] font-semibold'>
                    <li>Overview</li>
                    <li>Sitemap</li>
                    <li>Giftcards</li>
                </ul>
            </div>
            <div className='w-[73px] lg:w-[95px] h-full flex flex-col gap-[15.45px]'>
                <h3 className='text-[#737373] text-xs lg:text-[15.5px] uppercase'>Company</h3>
                <ul className='flex flex-col gap-[15.45px] text-xs lg:text-base text-[#0C0C0C] font-semibold'>
                    <li>Overview</li>
                    <li>Sitemap</li>
                    <li>Giftcards</li>
                </ul>
            </div>
            <div className='w-[84px] lg:w-[120px] h-full flex flex-col gap-[15.45px]'>
                <h3 className='text-[#737373] text-xs lg:text-[15.5px] uppercase'>Support</h3>
                <ul className='flex flex-col gap-[15.45px] text-xs lg:text-base text-[#0C0C0C] font-semibold'>
                    <li>Legal</li>
                    <li>Privacy Policy</li>
                    <li>Terms of Use</li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
