import Link from "next/link";
import { usePathname } from 'next/navigation'
import React from 'react'

const FooterComponent = () => {
    const path = usePathname();
    const selectedPage = () => {
        switch(path){
            case "/HomePage":
            return {text:"Initailize a Trip",
              src:"/assets/icons/Orion_aircraft 1.svg",
              href:"/Trip/AddTrip"
                  };
            case "/Trip/TripList":
            return { text:"Initiate a Trip",
              src:"/assets/icons/Orion_aircraft 1.svg",
               href:"/Trip/AddTrip"
            } ;
            default:
                return {text: "Go to Trip List",
                  src:"/assets/icons/Orion_destination-map 1.svg",
                  href:"/Trip/TripList"
                };

        }
    }
    const bottom = selectedPage();
  return (
    
      <div className="fixed bottom-0 w-full">
      <div className=" bg-[#1ABC9C] min-w-screen max-w-screen py-5 rounded-t-4xl  ">
        <div className="text-white flex justify-center text-4xl font-medium ">
         <Link href={bottom.href}>
        <p>{bottom.text}</p>
        <img className='w-12 h-12' src={bottom.src} alt="image" />
         </Link>
          
        </div>
      </div>
    </div>
    
  )
}

export default FooterComponent
