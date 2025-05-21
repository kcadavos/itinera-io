"use client";

import AccountCreationComponent from "@/components/AccountCreationComponent";
import LogInComponent from "@/components/LogInComponent";
import { useLoginStatusContext } from "@/context/DataContext";

import {  useEffect, useState } from "react";

const LoginSignUpComponent = () => {

  const [switchBool, setSwitchBool] = useState<boolean>(true);
const {loginStatus, setLoginStatus} = useLoginStatusContext();
 
  const handleSwitch = () => {
    setLoginStatus(loginStatus === "create" ? "idle" : "create");
    setSwitchBool(!switchBool);
    console.log(switchBool)
  } 

  useEffect(()=>{
  
    alert(" Thanks for checking us out! We are re still working on the desktop experience.For the best view, please switch to a mobile or smaller screen.");
    },[])
  
  return (
    <div>
      {/* mobile */}
      <div className="block lg:hidden">
        
        <div className="bg-[#ECF0F1] rounded-2xl min-h-[26rem] min-w-[20rem] sm:min-h-[25rem] sm:max-w-none mx-4 sm:mx-16 md:mx-24 px-4 relative mb-25 flex justify-center">
          {
            switchBool ? <LogInComponent /> : <AccountCreationComponent switchboolswitch={setSwitchBool} />
          }  
        </div>

        <div className="text-[#2C3E50] text-center ">
              
              {
                switchBool ? <p className="mt-16" >Don’t have an account?</p> : <p className="mt-16" >Already have an account?</p>
              }
          </div>


        <div className=" bg-[#1ABC9C] min-w-screen max-w-screen py-5 rounded-t-4xl mt-3 lg:mt-[2.1rem] fixed bottom-0">
          {
            switchBool ? (
              <div className="flex text-white text-3xl justify-center ">
                <button className="bg-none cursor-pointer" onClick={handleSwitch}>Create an Account</button>
              </div>
            ) : (
              <div className="flex text-white text-3xl justify-center ">
                <button className="bg-none cursor-pointer" onClick={handleSwitch}>Login here</button>
              </div>
            )
          }          
        </div>
      </div>
      


      {/* desktop */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-3">
          <div className="bg-[url(/assets/images/shifaaz-shamoon.png)] h-auto max-w-full bg-cover bg-no-repeat col-span-2">
          
          </div>

          <div className="float-right bg-[#E1ECFF] min-h-screen max-h-screen">
            <div className=" rounded-2xl min-h-[13.2rem] max-h-[13.2rem] pt-10 pb-5 min-w-[30rem] max-w-[30rem] mb-2">


            <div className="mx-6">

              <img src="/assets/Icons/itineralogo2.svg" alt="itineralogo"  className="h-15 w-auto"/>
            </div>  
              <div className="mx-8 font-inter">
               
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
                        <p className="text-[#E67E22]">Itinerista.</p>
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
                    <AccountCreationComponent switchboolswitch={setSwitchBool}  /> 
                  </div>  
                </div>
              }  
            </div>
  
  
            <div className="bg-[#1ABC9C] min-w-[32rem] py-5 rounded-t-4xl mt-[2.6rem] absolute bottom-0">
              {
                switchBool ? (
                  <div className="flex text-white text-xl justify-center ">
                    <button className="bg-none cursor-pointer " onClick={handleSwitch}>Don’t have an account? Sign Up</button>
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
  )
}

export default LoginSignUpComponent