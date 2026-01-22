import React from "react";
import { offerings } from "@/lib/services/offerings";

const Offerings = () => {
  return (
    <div className="w-full h-auto py-10 lg:py-20 px-[30px] lg:px-25 flex flex-col items-center gap-20 bg-[#FAFAFA]">
      <div className="w-full lg:w-[528px] h-[118px] lg:h-[97px] flex flex-col gap-[20px] lg:gap-[30px] justify-center items-center">
        <div className="w-[101px] lg:w-[109px] flex justify-center items-center gap-[15px]">
          <span className="w-[4px] h-[4px] bg-[#007AFF]"></span>
          <h2 className="uppercase text-[10px] lg:text-[11px]">
            what we offer
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center gap-[10px] px-3">
          <h2 className="text-[#0B0A0A] text-center text-[18px] lg:text-[22px] font-semibold leading-[21.6px]">
            Your Ultimate Medical Exam Prep Hub
          </h2>
          <p className="text-[#646464] text-center text-[13px] lg:text-[15px] leading-[15.6px] font-medium">
            Everything you need to prepare, practice, and excel in your medical
            exams.
          </p>
        </div>
      </div>
      <div className="w-full h-[509px] lg:h-[147px] flex flex-col lg:flex-row gap-[55px] lg:justify-between">
        {offerings.map((offering) => (
          <div
            key={offering.id}
            className="flex flex-col items-center justify-center w-full lg:w-[350px] h-[133px] lg:h-full rounded-[6.5px] gap-5"
          >
            <div className="w-10 h-10 flex justify-center items-center">
              <offering.icon />
            </div>
            <div className="w-full flex flex-col gap-[5px] items-center justify-center">
              <div className="w-[263px] text-sm text-[#0B0A0A] text-center font-semibold">
                {offering.header}
              </div>
              <div className="text-[#737373] text-xs font-medium text-center leading-[16.8px]">
                {offering.body}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offerings;
