"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative h-[459px] lg:h-[575px] xl:h-[694px] bg-[#0A0057] overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0">
        <div className="h-full w-full grid grid-cols-12 gap-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-blue-500/20 h-full" />
          ))}
        </div>
        <div className="absolute inset-0 grid grid-rows-12 gap-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-b border-blue-500/20 w-full" />
          ))}
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-[459px] lg:h-[575px] xl:h-[694px] flex justify-center lg:justify-start items-center border">
        <div className="w-[315px] xl:w-[668px] h-auto xl:h-[273px] gap-[30px]  xl:gap-[50px] flex flex-col justify-center items-center text-white lg:ml-18 xl:ml-[90px]">
          <div className="xl:w-full xl:flex xl:flex-col xl:gap-[12px] xl:items-start">
            <h1 className="xl:h-[110px] text-[32px] xl:text-[42px] text-center xl:text-left font-bold">
              Your Trusted Guide for MRCGP AKT, SCA, MSRA & PLAB Success
            </h1>
            <p className="text-sm xl:text-[18px] text-center xl:text-left font-medium leading-7">
              Join thousands of doctors preparing smarter with focused courses,
              expert lectures, and exam-driven resources.
            </p>
          </div>

          <button className="h-[45px] w-[315px] xl:[179px] bg-[#007AFF] text-sm rounded-[2px] xl:self-start">
            Book your course
          </button>
        </div>
        <Image
          src="/images/hero-pic.svg"
          alt="med pro"
          width={600}
          height={300}
          priority
          className="hidden lg:block xl:hidden absolute bottom-0 right-[90.6px]"
        />
        <Image
          src="/images/hero-pic.svg"
          alt="med pro"
          width={734}
          height={663}
          priority
          className="hidden xl:block absolute bottom-0 right-[90.6px]"
        />
      </div>
    </div>
  );
}
