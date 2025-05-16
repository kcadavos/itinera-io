'use client'
import { GetLoggedInUserData, Login } from '@/lib/services/DataServices';
import { IToken } from '@/lib/Interfaces';
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import { useLoginStatusContext, useNameContext, useUserIdContext } from '@/context/DataContext';


const LogInComponent = () => {
  
 
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {setName}=useNameContext();
  const {setUserId}= useUserIdContext();
  const [errorDisplayEmail, setErrorDisplayEmail] = useState<boolean>(false);
  const [errorDisplayPassword, setErrorDisplayPassword] = useState<boolean>(false);

  
  const router = useRouter();
  const { setLoginStatus } = useLoginStatusContext();

  const submitLogin = async () => {
    const userData = {
      email: email,
      password: password
      
    }
    console.log('button pressed');

    if(email != '' && password != ''){
      const token: IToken = await Login(userData);

      if(token != null){
        setLoginStatus('success')
        if(typeof window != null){
          localStorage.setItem("ItineraToken", token.token);
          console.log(token.token);
          console.log(email)  
          const loggedInData = await GetLoggedInUserData(email);

          if(loggedInData != null){
            //set data context values
            setName(loggedInData.name);
            setUserId(loggedInData.id)
            sessionStorage.setItem("ItineraUserId",String(loggedInData.id));
            router.push('/Trip/TripList');
          }
        }
      }else{
        setLoginStatus('failed');
        setErrorDisplayEmail(true);
        setErrorDisplayPassword(true);        
      }
    }else{
      if(password == ''){
        setErrorDisplayPassword(true);
      }
      if(email == ''){
        setErrorDisplayEmail(true);
      }
    }
  
    
  }

  return (
    <div className=''>
      
      <div className="flex justify-start my-4 lg:my-8 pt-24 lg:pt-8">
        <div className="py-2  mr-4"> 
          <img src="/assets/Icons/Orion_user-address.svg" alt="user address" className="w-10" />
        </div>
            
        <input type="email" placeholder="Email Address" required  className={`bg-white lg:bg-[#ECF0F1] rounded-lg p-4 px-6 ${errorDisplayEmail ? 'border-2 border-[#F40000]' : 'border-none'}`} onChange={(e) => setEmail(e.target.value)} />
            
      </div>
          
      <div className="flex justify-start my-4 lg:my-8">
        <div className="py-2 mr-4"> 
          <img src="/assets/Icons/Orion_keyhole.svg" alt="user address" className="w-10" />
        </div>
            
        <input type="password" placeholder="Password" required className={`bg-white lg:bg-[#ECF0F1] rounded-lg p-4 px-6 ${errorDisplayPassword ? 'border-2 border-[#F40000]' : 'border-none'}`} onChange={(e) => setPassword(e.target.value)} />
      </div>

      {
        (errorDisplayEmail || errorDisplayPassword) ? <p className="text-[#F40000] text-center text-md mt-5">*Field Required</p> : <></>
      }

      <div className="flex justify-center my-4 absolute -bottom-9 left-1/2 transform -translate-x-1/2 ">
        <button className="bg-[#E67E22] hover:bg-[#d56b0f] lg:border-4 lg:border-white text-xl text-white rounded-xl p-[.6rem] px-12 lg:px-14 cursor-pointer" onClick={submitLogin}>Log In</button>
      </div>
              
    </div>
  )
}

export default LogInComponent