"use client"
import React, { useState } from 'react'

const HeaderComponent = () => {
  const [switchBool, setSwitchBool] = useState<boolean>(true);
  //const {switchBool, setSwitchBool} = useAppcontext();
  
  const handleSwitch = () => {
    setSwitchBool(!switchBool);
    console.log(switchBool)
  }
  return (
    <div>
      <div className='bg-[#E1ECFF] min-h-[10rem] max-h-[10rem] lg:min-h-[13.2rem] lg:max-h-[13.2rem] pt-10 pb-5 min-w-screen max-w-screen mb-6'>
        <div className="mx-8 font-inter">
          <p className=" text-[#1ABC9C]">Itinera-IO</p>
          <p>Hi name, lets plan for</p>
          <p className='text-3xl text-[#E67E22]'>Place</p>
          <p className='text-sm'>What are you excided about?</p>  
        </div>  
      </div>
    </div>
  )
}

export default HeaderComponent
