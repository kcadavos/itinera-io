'use client'

import LogInComponent from "@/components/LogInComponent";

export default function Home() {
  return (
    <div className="font-roboto">
      <div className='bg-[#E1ECFF] rounded-2xl py-10 pb-56 relative max-w-screen'>
        <div className="mx-8 font-inter">
        <p className=" text-[#1ABC9C]">Itinera-IO</p>
          <div className="text-3xl">            
            <p className="text-[#E67E22]">Votes In, </p>
            <p className="text-[#E67E22]">Adventure Out.</p>
            <p className="text-[#2C3E50]">Log In.</p>
          </div>
          
        </div>
        
      </div>
      
      <div className="bg-[#ECF0F1] rounded-2xl absolute bottom-35 min-h-[28rem] min-w-[20rem] mx-6 px-4">

        <LogInComponent />        

      </div>



      <div className="absolute bottom-0 bg-[#1ABC9C] w-screen py-5 rounded-t-4xl">
        <div className="flex text-white text-3xl justify-center ">
          <p>Hello, </p>
          <p className="text-[#2C3E50]"> Itinerista</p>
          <p>.</p>
        </div>
        
      </div>
    </div>
  );
}
