"use client";
import DesktopSideComponent from "@/components/DesktopSideComponent";
import FooterComponent from "@/components/FooterComponent";
import HeaderComponent from "@/components/HeaderComponent";
import NavbarComponent from "@/components/NavbarComponent";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const route = usePathname();
  const [isHidden, setIsHidden] = useState(false);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    
      const isLargeScreen = window.innerWidth >= 1024;
      const isItineraryRoute = route.startsWith("/ItinerarySuggestionPages");
      setIsHidden(!isLargeScreen); 
      setShowNav(isLargeScreen || (!isLargeScreen && isItineraryRoute));
  }, [route]);

  return (
    <div>
      <div className="grid lg:grid-cols-4 lg:gap-0">
        <div className="lg:col-[1]">
          <DesktopSideComponent />
        </div>
        <div className="w-full lg:col-start-2 lg:col-span-3">
          {showNav && <NavbarComponent />}
          <HeaderComponent/>
          {children}
        </div>
      </div>
      {isHidden && <FooterComponent />}
    </div>
  );
};

export default Layout;
