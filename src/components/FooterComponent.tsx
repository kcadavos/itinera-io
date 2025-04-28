import Link from "next/link";
import { usePathname } from 'next/navigation'
import React from 'react'

const FooterComponent = () => {
    const path = usePathname();
    const selectedPage = () => {
        switch(path){
            case "/HomePage":
            return {text:"Initialize a Trip",
              src:"/assets/Icons/Orion_aircraft 1.svg",
              href:"/Trip/AddTrip"
                  };
            case "/Trip/TripList":
            return { 
              text:"Initiate a Trip",
              src:"/assets/Icons/Orion_aircraft 1.svg",
              //set href to an object instead of just string to add 'query' for identifying when user is adding a trip
               href: {
                pathname: "/Trip/AddTrip",
                query: { mode: 'add' }
              }
            } ;
            default:
                return {text: "Go to Trip List",
                  src:"/assets/Icons/Orion_destination-map 1.svg",
                  href:"/Trip/TripList"
                };

        }
    }
    const bottom = selectedPage();
  return (
    
      <div className="fixed bottom-0 w-full">
      <div className=" bg-[#1ABC9C] min-w-screen max-w-screen py-5 rounded-t-4xl  ">
        <div className="text-white flex justify-center text-4xl font-medium ">        
         <Link href={bottom.href}  className="flex">
        <p>{bottom.text}</p>
        <img className='w-12 h-12' src={bottom.src} alt="image" />
         </Link>
          
        </div>
      </div>
    </div>
    
  )
}

export default FooterComponent
