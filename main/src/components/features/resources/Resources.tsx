import { resources } from "@/lib/services/resources";
import React from "react";

const Resources = () => {
  return (
    <div className="w-full xl:w-[606px] h-auto flex flex-wrap gap-2.5 items-center justify-center">
      {resources.map((resource, index) => (
        <div
          key={resource.id}
          className="flex items-center justify-center w-[162.5px] xl:w-[192.6px] h-[134.6px] xl:h-[171.6px] rounded-[6.5px] bg-white"
        >
          <div className="w-[136.2px] xl:w-[159.1px] h-[90.7px] xl:h-[127.3px] gap-[19.7px] xl:gap-[25.1px] flex flex-col justify-between items-center rounded-[6.5px]">
            <div className="w-full h-[43px] xl:h-[66.1px] flex justify-center items-center">
              <resource.icon />
            </div>
            <div className="text-[11.672px] text-[#0C0C0C] text-center leading-[14.115px] font-medium w-full h-7 xl:h-9">
              {resource.header}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Resources;
