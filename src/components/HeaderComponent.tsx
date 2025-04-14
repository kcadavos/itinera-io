"use client"
import { GetLoggedInUserData } from '@/lib/DataServices';

import React, { useState, useEffect } from 'react';


const HeaderComponent = () => {
  const [destination, setDestination] = useState<string>('');
  const  [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const func = async()=>{
    

    var  userInfo = await GetLoggedInUserData(email);
    
   
    if(userInfo == null){
      setName("error");
    }else{
      
      setName(userInfo.name) 
    }
  }
 useEffect(()=>{
   func();
  }, [])
  
  const placeId ="Stockton, CA"
 


  return (
    <div>
      <div className='bg-[#E1ECFF] min-h-[10rem] max-h-[10rem] lg:min-h-[13.2rem] lg:max-h-[13.2rem] pt-10 pb-5 min-w-screen max-w-screen mb-6'>
        <div className="mx-8 font-inter">
          <p className=" text-[#1ABC9C]">Itinera-IO</p>
          <p>Hi {name}, lets plan for</p>
          <p className='text-3xl text-[#E67E22]'>{placeId}</p>
          <p className='text-sm'>What are you excided about?</p>  
        </div>  
      </div>
    </div>
  )
}

export default HeaderComponent
