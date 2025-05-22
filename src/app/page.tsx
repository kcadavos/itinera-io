'use client'

import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
  const router = useRouter();
  const isMobile = useIsMobile(); // this is a hook to determine the screen size

  useEffect(() => {
    if (isMobile === false) {
      router.push("/LoginPage"); // routes to login screen
    } 

  }, [isMobile, router]);

  if (isMobile === undefined) {
    return null; // Prevent hydration mismatch on initial load since it will be undefined
  }
    if (!isMobile) {
    return null; // Prevent rendering splash on desktop (redirect handled in useEffect)
  }

  return (
    <div className="font-roboto m-0 p-0 max-h-screen max-w-screen">
  {( isMobile===true) &&  
   (<>
  {/*mobile view show splash block else route to login page */}    
     <div className=" w-full h-screen relative">
    {/* Background image wrapper */}
    <div className="absolute inset-0 z-0">
      {/* Background image with overlay */}
      <div className="w-full h-full bg-[url(/assets/images/shifaaz-shamoon.png)] bg-cover bg-no-repeat bg-center"
           style={{ backgroundPosition: '60% center', filter: 'brightness(85%)' }}>
      </div>
    </div>
  
    {/* Foreground content - sits above the image and overlay */}
    <div className="relative z-10 flex flex-col items-center justify-between h-full text-white text-center px-4 py-15">
      <img
        src="/assets/Icons/itineralogo2.svg"
        alt="itineralogo"
        className="h-15 w-auto self-end"
        />
  
      <p className="pb-40 font-inter text-outline leading-tight  tracking-wide font-extrabold text-5xl text-[#CD6000]">
        Because <br />
        group chats <br />
        don't<br/>
        plan trips
      </p>
      <div className="pb-10">

      <button  onClick={() => router.push("/LoginPage")} className=" text-white bg-[#1ABC9C] px-6 py-2 rounded-full font-bold border-2 border-white">
        Get Started
      </button>
      </div>
    </div>

  </div>
        </>
   )
}

 
  
   

    </div> 
  );
}
