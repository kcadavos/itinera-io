"use client"
import { LoginDetailsUser } from '@/lib/services/AccountDetailsService';
import { GetParticipantEmail, GetParticipantName } from '@/lib/services/TripDataService';
import React, { useEffect, useState } from 'react'


const AccountDetailsComponent = () => {

  const [ username, setUsername] = useState<string>('');
  const [ email, setEmail] = useState<string>('');

  useEffect(()=>{
    const userId = Number(sessionStorage.getItem("ItineraUserId")) || 0 ;
    const fetchEmail = async ()=>{
      setEmail(await GetParticipantEmail(userId))   
    setUsername(await GetParticipantName(userId)|| "");
    }
    fetchEmail()
  }, [])

  const  submitChange = async ()=>{
    const userId = Number(sessionStorage.getItem("ItineraUserId")) || 0 ;
    const token = localStorage.getItem("ItineraToken"); 

    const userData = {
      id: userId ,
      email: await GetParticipantEmail(userId),
      name: username
    }

    if (!token) {
      console.error("Missing token");
      return;
    }
    console.log(userData)
      await LoginDetailsUser(userData, token);
      
   
    
  }
  return (
    <div className="bg-[#ECF0F1] rounded-2xl min-h-[26rem] min-w-[20rem] lg:min-h-[25rem] lg:max-w-[20rem] mx-4 px-4 relative mb-25 ">
    <div className="flex justify-start my-4 pt-10">
      <div className="mr-4">
        <img
          src="/assets/Icons/Orion_user-address.svg"
          alt="user address"
          className="w-10 p-1"
        />
      </div>

      <input
        type="email"
        placeholder="Email Address"
        required
        disabled
        className="bg-white rounded-lg p-1 px-6 "
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>



    <div className="flex justify-start my-4">
      <div className="mr-4">
        <img
          src="/assets/Icons/Orion_profile-picture.svg"
          alt="name"
          className="w-10 p-1"
        />
      </div>

      <input
        type="text"
        placeholder=""
        value={username}
        required
        className="bg-white rounded-lg p-1 px-6"
        onChange={(e) => setUsername(e.target.value)}

      />
    </div>

    <div className="flex justify-center mt-18 absolute -bottom-7 left-1/2 transform -translate-x-1/2">
      <button className="bg-[#E67E22] hover:bg-[#d56b0f] border-4 border-white text-xl text-white rounded-[2.5rem] p-3 cursor-pointer" onClick={submitChange}>
        <img
          src="/assets/Icons/Orion_add-user.svg"
          className="w-10"
          alt="add"
        />
      </button>
    </div>
  </div>
  )
}

export default AccountDetailsComponent