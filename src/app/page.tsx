'use client'

import AccountCreationComponent from "@/components/AccountCreationComponent";
import LogInComponent from "@/components/LogInComponent";
import { useState } from "react";

export default function Home() {
  const [switchBool, setSwitchBool] = useState<boolean>(true);
  
  const handleSwitch = () => {
    setSwitchBool(!switchBool);
  }

  
  return (
    <div className="font-roboto m-0 p-0 max-h-screen max-w-screen">
      <div className='bg-[#E1ECFF] rounded-2xl py-10 min-w-screen max-w-screen mb-6'>
        <div className="mx-8 font-inter">
        <p className=" text-[#1ABC9C]">Itinera-IO</p>
        {
          switchBool ? (
            <div className="text-3xl">            
              <p className="text-[#E67E22]">Votes In, </p>
              <p className="text-[#E67E22]">Adventure Out.</p>
              <p className="text-[#2C3E50]">Log In.</p>
            </div>
          ) : (
            <div className="text-3xl">            
              <div className="flex">
                <p className="text-[#2C3E50]">Welcome, </p>
                <p className="text-[#E67E22]">Nomad.</p>
              </div>
              <p className="text-[#2C3E50]">Ready for an Adventure?</p>
            </div>
          )
        }
          
          
        </div>
        
      </div>
      

      <div className="bg-[#ECF0F1] rounded-2xl min-h-[28rem] min-w-[20rem] lg:min-h-[25rem] lg:max-w-[20rem] mx-4 px-4">

        {
          switchBool ? <LogInComponent /> : <AccountCreationComponent />
        }        
      
        <div className="text-[#2C3E50] text-center  lg:mt-20">
            {/* <p >Forgot Password?</p> */}
            {
              switchBool ? <button className="bg-none" onClick={handleSwitch}>Don't have an account?</button> : <p></p>
            }
            
        </div>
      </div>



      <div className=" bg-[#1ABC9C] min-w-screen max-w-screen py-5 rounded-t-4xl mt-7">
        {
          switchBool ? (
            <div className="flex text-white text-3xl justify-center ">
              <p>Hello, </p>
              <p className="text-[#2C3E50]">Itinerista</p>
              <p>.</p>
            </div>
          ) : (
            <div className="flex text-white text-3xl justify-center ">
              <button className="bg-none" onClick={handleSwitch}>Already have an Account?</button>
            </div>
          )
        }
        
      </div>
    </div>
  );
}
