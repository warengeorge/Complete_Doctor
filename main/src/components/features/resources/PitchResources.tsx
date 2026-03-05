import React from "react";
import Pitch from "./Pitch";
import Resources from "./Resources";

const PitchResources = () => {
  return (
    <div className="w-full h-[877.73px] lg:h-[480px] xl:h-[520px] flex items-center justify-center bg-[#FAFAFA]">
      <div className="w-[90%] xl:w-[1240px] xl: h-[757.73px] lg:h-[440px] xl:h-[360px] flex flex-col lg:flex-row items-center justify-center xl:justify-between gap-[40px] xl:gap-[70px]">
        <Pitch />
        <Resources />
      </div>
    </div>
  );
};

export default PitchResources;
