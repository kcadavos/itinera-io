"use client";

import AccountCreationComponent from "@/components/AccountCreationComponent";
import LogInComponent from "@/components/LogInComponent";
import { useState } from "react";
import { AppWrapper, useAppcontext } from "@/context/DataContext";


export default function Home() {
  const [switchBool, setSwitchBool] = useState<boolean>(true);
  //const {switchBool, setSwitchBool} = useAppcontext();
  
  const handleSwitch = () => {
    setSwitchBool(!switchBool);
    console.log(switchBool)
  }

  
  return (
    <div className="font-roboto m-0 p-0 max-h-screen max-w-screen">
      {/* mobile */}
      <div className="block md:hidden">
        <div className='bg-[#E1ECFF] rounded-2xl lg:min-h-[13.2rem] lg:max-h-[13.2rem] py-10 lg:pb-5 min-w-screen max-w-screen mb-6 lg:mb-4'>
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
        

        <div className="bg-[#ECF0F1] rounded-2xl min-h-[26rem] min-w-[20rem] lg:min-h-[25rem] lg:max-w-[20rem] mx-4 px-4 relative">


          {
            switchBool ? <LogInComponent /> : <AppWrapper>
              <AccountCreationComponent />
            </AppWrapper>
          }        
        
          <div className="text-[#2C3E50] text-center ">
              {/* <p >Forgot Password?</p> */}
              {
                switchBool ? <button className="bg-none cursor-pointer mt-16" onClick={handleSwitch}>Don't have an account?</button> : <p></p>
              }
              
          </div>

        </div>




        <div className=" bg-[#1ABC9C] min-w-screen max-w-screen py-5 rounded-t-4xl mt-17 lg:mt-[2.1rem]">
          {
            switchBool ? (
              <div className="flex text-white text-3xl justify-center ">
                <p>Hello, </p>
                <p className="text-[#2C3E50]">Itinerista</p>
                <p>.</p>
              </div>
            ) : (
              <div className="flex text-white text-3xl justify-center ">
                <button className="bg-none cursor-pointer" onClick={handleSwitch}>Already have an Account?</button>
              </div>
            )
          }
          
        </div>
      </div>
      


      {/* desktop */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-3">
          <div className="bg-[url(/assets/images/shifaaz-shamoon.png)] min-h-[100vh] max-w-[65rem] bg-cover bg-no-repeat col-span-2">
          
          </div>

          <div className="float-right bg-[#E1ECFF] min-h-screen max-h-screen">
            <div className=' rounded-2xl min-h-[13.2rem] max-h-[13.2rem] pt-10 pb-5 min-w-[30rem] max-w-[30rem] mb-2'>
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
            
            <div className="flex justify-center">
              {
                switchBool ?
                  <div className="bg-white rounded-2xl min-w-[26rem] min-h-[19rem] max-w-[26rem] mx-4 px-4 relative">
                    <div className="flex justify-center">
                      <LogInComponent /> 

                    </div>
                  </div> 
                  : <div className="bg-[#ECF0F1] rounded-2xl min-w-[22rem] min-h-[22rem] max-w-[25rem] mx-4 px-4 relative">
                    <div className="flex justify-center">
                      <AppWrapper>
                        <AccountCreationComponent />
                      </AppWrapper> 
                    </div>  
                  </div>
              }
              
            </div>
  
  
            <div className="bg-[#1ABC9C] min-w-[32rem] py-5 rounded-t-4xl mt-[2.6rem] absolute bottom-0">
              {
                switchBool ? (
                  <div className="flex text-white text-xl justify-center ">
                    <button className="bg-none cursor-pointer " onClick={handleSwitch}>Don't have an account? Sign Up</button>
                  </div>
                  
                ) : (
                  <div className="flex text-white text-xl justify-center ">
                    <button className="bg-none cursor-pointer" onClick={handleSwitch}>Already have an Account? Log In</button>
                  </div>
                )
              }
              
            </div>
          </div>
          
        </div>
        
        
      </div>


    </div>
  );
}
