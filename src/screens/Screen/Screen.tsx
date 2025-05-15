import React from "react";
import { CenterByAnima } from "./sections/CenterByAnima";
import { CenterWrapperByAnima } from "./sections/CenterWrapperByAnima/CenterWrapperByAnima";
import { DivWrapperByAnima } from "./sections/DivWrapperByAnima/DivWrapperByAnima";
import { BottomCenterByAnima } from "./sections/BottomCenterByAnima/BottomCenterByAnima";
import { BottomByAnima } from "./sections/BottomByAnima/BottomByAnima";
import { FooterByAnima } from "./sections/FooterByAnima";
import { HeaderByAnima } from "./sections/HeaderByAnima";

export const Screen = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-col items-center w-full overflow-x-hidden">
      <div className="bg-white w-full max-w-[1600px]">
        <HeaderByAnima />
        <CenterByAnima />
        <CenterWrapperByAnima />
        <DivWrapperByAnima />
        <BottomCenterByAnima />
        <BottomByAnima />
      </div>
      <div className="w-full">
        <FooterByAnima />
      </div>
    </div>
  );
};
