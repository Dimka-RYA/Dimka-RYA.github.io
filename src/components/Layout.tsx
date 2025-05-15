import React from "react";
import { HeaderByAnima } from "../screens/Screen/sections/HeaderByAnima";
import { FooterByAnima } from "../screens/Screen/sections/FooterByAnima";

interface LayoutProps {
  children: React.ReactNode;
  showHeroBanner?: boolean;
}

export const Layout = ({ children, showHeroBanner = true }: LayoutProps): JSX.Element => {
  return (
    <div className="bg-white flex flex-col items-center w-full overflow-x-hidden">
      <div className="bg-white w-full max-w-[1600px]">
        <HeaderByAnima showHeroBanner={showHeroBanner} />
        {children}
      </div>
      <div className="w-full">
        <FooterByAnima />
      </div>
    </div>
  );
}; 