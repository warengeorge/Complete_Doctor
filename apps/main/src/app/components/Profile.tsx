import React from 'react';
import Image from 'next/image';

const Profile = () => {
  return (
    <div className='w-full h-auto py-[50px] lg:py-[60px] xl:py-[80px] px-[20px] lg:px-[50px] xl:px-[140px] flex items-center justify-center bg-[#F8F7F4]'>
      <div className='w-full h-auto flex flex-col lg:flex-row items-center justify-center gap-[20px] lg:gap-[50px]'>
        <Image
          src='https://res.cloudinary.com/dlahyjhur/image/upload/v1744128371/Frame_2147226243_h8nvqc.png'
          width={335}
          height={350}
          objectFit='cover'
          className='sm:hidden'
          alt='doctors profile picture'
        />
        <Image
          src='https://res.cloudinary.com/dlahyjhur/image/upload/v1744128371/Frame_2147226243_h8nvqc.png'
          width={500}
          height={459}
          objectFit='cover'
          className='hidden sm:block'
          alt='doctors profile picture'
        />
        <div className='w-full h-[413px] lg:h-[459px] flex flex-col items-center justify-center lg:justify-between gap-[20px]'>
          <div className='w-full h-[353px] flex flex-col gap-[18px]'>
            <div className='flex flex-col gap-[10px]'>
              <h2 className='text-[#0C0C0C] lg:text-[22px] font-bold'>Dr. Stanley</h2>
              <h3 className='text-xs lg:text-[15px] text-[#313131] font-semibold '>
                CEO, Complete Doctor
              </h3>
            </div>
            <div className='text-[#646464] text-xs lg:text-base font-medium leading-[24px] lg:leading-[30px] flex flex-col gap-10'>
              <p>
                Lorem ipsum dolor sit amet consectetur. Massa massa amet elit
                ultrices sed auctor velit adipiscing. Sit egestas nisl praesent
                turpis. Vitae dapibus lectus rutrum magnis ultrices odio et
                magna aenean. Condimentum non massa pellentesque enim nunc.
                Nulla enim id est risus diam at aliquet nibh. Viverra tincidunt
                mauris aliquet eget justo. Molestie risus enim vitae rhoncus
                sociis elit egestas.
              </p>
              <p>
                Massa tristique orci scelerisque libero sed cras turpis faucibus
                sodales. Id praesent mi purus volutpat quam duis sit volutpat.
                Etiam sit nisl nam ac nunc volutpat ut vitae. Vel bibendum
                scelerisque ipsum pharetra.
              </p>
            </div>
          </div>
          <button className='w-[142px] lg:w-[152px] h-10 lg:h-[50px] bg-[#007AFF] text-[13px] lg:text-[15px] font-semibold text-white self-start sm:self-center lg:self-start'>
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
