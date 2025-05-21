import { useAccountStatusContext } from "@/context/DataContext";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import React from 'react'

const FooterComponent = () => {
    const path = usePathname();
    // const {loginStatus} = useLoginStatusContext();
    const { accountStatus, setAccountStatus } = useAccountStatusContext();


    const handleClick = () =>{
      setAccountStatus(accountStatus === 'password' ? 'account' : 'password' )
    }
    
    const selectedPage = () => {
        switch(true){
            case  path == "/HomePage":
            return {
              css: "w-auto h-10 items-center",
              alt: "plane",
              text:"Initialize a Trip",
              // src:"/assets/Icons/Orion_aircraft 1.svg",
              src:"/assets/Icons/Orion_aircraft-climb_white.svg",
              href:"/Trip/AddTrip",
              onClick: undefined,
                  };
            case path === "/Trip/TripList":
            return { 
              css: "w-auto h-10 items-center",
              alt: "Plane",
              text:"Initiate a Trip",
              // src:"/assets/Icons/Orion_aircraft 1.svg",
              src: "/assets/Icons/Orion_aircraft-climb_white.svg",
               href: {
                pathname: "/Trip/AddTrip",
                query: { mode: 'add' },
              },
              onClick: undefined,
            } ;
            case accountStatus ==="successAcc":
            case accountStatus==='failAcc':
            case accountStatus === 'account':
              return{
                css: "",
                alt: undefined,
                text:"Change Password",
              src:undefined,
               href: "",
              onClick: handleClick,

              };
              case accountStatus ==="failed":
              case accountStatus ==="successPass":
              case accountStatus==="mustmatch":
              case accountStatus === "password":
                return{
                  css: "",
                  alt: undefined,
                  text:"Change Name",
                  src:undefined,
                   href: "",
                  onClick: handleClick,
                };
            // case loginStatus === "create":
            //   return{
            //     text: "hi",
            //     src: "",
            //     href: "",

            // };
            
            default:
                return {
                  css: "w-auto h-8 items-center ",
                  alt:"map",
                  text: "Go to Trip List",
                  src:"/assets/Icons/Orion_destination-map 1.svg",
                  href:"/Trip/TripList",
                  onClick: undefined,
                };

        }
    }
    const bottom = selectedPage();
  return (
    
    <div className="fixed bottom-0 w-full">
      <div className=" bg-[#1ABC9C] min-w-screen max-w-screen flex justify-center items-center   rounded-t-4xl h-15 ">
        <div className="text-white flex justify-center text-3xl font-medium ">        
         <Link href={bottom.href} onClick={bottom.onClick} className="flex items-center gap-2">
        <p className="pe-2">{bottom.text}</p>
        <img className={bottom.css} src={bottom.src} alt={bottom.alt} />
         </Link>
          
        </div>
      </div>
    </div>
    
  )
}

export default FooterComponent
