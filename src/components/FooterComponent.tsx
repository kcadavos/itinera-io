import { usePathname } from 'next/navigation'
import React from 'react'

const FooterComponent = () => {
    const path = usePathname();
    const selectedPage = () => {
        switch(path){
            case "/HomePage":
            return "Initailize A Trip";
            default:
                return "Go To Trip List";

        }
    }
  return (
    
      <div className="fixed bottom-0 w-full">
      <div className=" bg-[#1ABC9C] min-w-screen max-w-screen py-5 rounded-t-4xl  ">
        <div className="text-white justify-center ">
          <p></p>
          
        </div>
      </div>
    </div>
    
  )
}

export default FooterComponent
