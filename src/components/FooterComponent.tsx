import { useAccountStatusContext, useLoginStatusContext } from "@/context/DataContext";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import React from 'react'

const FooterComponent = () => {
    const path = usePathname();
    const {loginStatus} = useLoginStatusContext();
    const { accountStatus, setAccountStatus } = useAccountStatusContext();


    const handleClick = () =>{
      setAccountStatus(accountStatus === 'account' ? 'password' : 'account' )
    }
    const selectedPage = () => {
        switch(true){
            case  path == "/HomePage":
            return {text:"Initialize a Trip",
              src:"/assets/Icons/Orion_aircraft 1.svg",
              href:"/Trip/AddTrip",
              onClick: undefined,
                  };
            case path === "/Trip/TripList":
            return { 
              text:"Initiate a Trip",
              src:"/assets/Icons/Orion_aircraft 1.svg",
              //set href to an object instead of just string to add 'query' for identifying when user is adding a trip
               href: {
                pathname: "/Trip/AddTrip",
                query: { mode: 'add' },
                onClick: undefined,
              }
            } ;
            case accountStatus === 'account':
              return{
                text:"Initiate a Trip",
              src:"/assets/Icons/Orion_aircraft 1.svg",
              //set href to an object instead of just string to add 'query' for identifying when user is adding a trip
               href: {
                pathname: "/Trip/AddTrip",
                query: { mode: 'add' },
                onClick: handleClick,
              }

              };
            // case loginStatus === "create":
            //   return{
            //     text: "hi",
            //     src: "",
            //     href: "",

            // };
            
            default:
                return {text: "Go to Trip List",
                  src:"/assets/Icons/Orion_destination-map 1.svg",
                  href:"/Trip/TripList",
                  onClick: undefined,
                };

        }
    }
    const bottom = selectedPage();
  return (
    
      <div className="fixed bottom-0 w-full">
      <div className=" bg-[#1ABC9C] min-w-screen max-w-screen py-5 rounded-t-4xl  ">
        <div className="text-white flex justify-center text-4xl font-medium ">        
         <Link href={bottom.href} onClick={bottom.onClick} className="flex">
        <p>{bottom.text}</p>
        <img className='w-12 h-12' src={bottom.src} alt="image" />
         </Link>
          
        </div>
      </div>
    </div>
    
  )
}

export default FooterComponent
