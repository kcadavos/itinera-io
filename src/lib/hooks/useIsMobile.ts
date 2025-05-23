import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {

    if (typeof window === "undefined") return; 
    
    const checkScreen = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkScreen(); // Initial check
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [breakpoint]);

  return isMobile;
}