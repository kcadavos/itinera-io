import { GetLoggedInUserData, Login } from '@/lib/DataServices';
import { IToken } from '@/lib/Interfaces';
import React, { useState } from 'react'
import { useRouter } from "next/navigation";

const LogInComponent = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

  const submitLogin = async () => {
  
    let userData = {
      email: email,
      password: password
    }

    if(email != '' && password != ''){
      let token: IToken = await Login(userData);

    if(token != null){
      if(typeof window != null){
        localStorage.setItem("Token", token.token);
        console.log(token.token);
        console.log(email)  
        const loggedInData = await GetLoggedInUserData(email);

        if(loggedInData != null){
          router.push('/HomePage');
        }

        
      }
    }else{
      alert("Login was no good wrong password or somthing")
    }
    }
  
    
  }

  return (
    <div className=''>
      
      <div className="flex justify-start my-4 lg:my-6 pt-24 lg:pt-8">
        <div className="py-2  mr-4"> 
          <img src="/assets/Icons/Orion_user-address.svg" alt="user address" className="w-10" />
        </div>
            
        <input type="email" placeholder="Email Address" required className="bg-white lg:bg-[#ECF0F1] rounded-lg p-4 px-6" onChange={(e) => setEmail(e.target.value)} />
            
      </div>
          
      <div className="flex justify-start my-4 lg:my-6">
        <div className="py-2 mr-4"> 
          <img src="/assets/Icons/Orion_keyhole.svg" alt="user address" className="w-10" />
        </div>
            
        <input type="password" placeholder="Password" required className="bg-white lg:bg-[#ECF0F1] rounded-lg p-4 px-6" onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div className="flex justify-center my-4">
        <button className="bg-[#E67E22] text-xl text-white rounded-xl p-[.6rem] px-14 cursor-pointer" onClick={submitLogin}>Log In</button>
      </div>

        
    </div>
  )
}

export default LogInComponent