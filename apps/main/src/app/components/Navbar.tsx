import Image from 'next/image';
import React from 'react';
import HeaderLinks from './HeaderLinks';

const Navbar = () => {
  return (
    <div className='flex justify-between items-center py-3 px-8 lg:px-20 w-full h-[3.375rem] lg:h-20 bg-white'>
      <Image
        src='/icons/complete-doc-logo.svg'
        alt='logo'
        width={120.56}
        height={30}
        className='lg:hidden'
      />
      <Image
        src='/icons/complete-doc-logo.svg'
        alt='logo'
        width={160}
        height={40}
        className='hidden lg:block'
      />
      <HeaderLinks />
      <div className='flex justify-around md:justify-between items-center w-[4.406875rem] sm:w-[100px] md:w-[125px] lg:w-[145px] h-7 lg:h-8'>
        <span className='lg:p-2'>
          <Image src='/icons/cart.svg' alt='logo' width={18.75} height={15} />
        </span>
        <span className='sm:hidden'>
          <Image
            src='/icons/hamburger.svg'
            alt='logo'
            width={18.75}
            height={15}
          />
        </span>
        <div className='hidden md:flex items-center justify-center'>|</div>
        <button className='hidden sm:block text-white text-xs h-full px-4 bg-[#007AFF] rounded-xs'>
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Navbar;
