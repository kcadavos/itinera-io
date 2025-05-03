import { useCreateStatusContext } from "@/context/DataContext";
import { CreateAccount } from "@/lib/services/DataServices";
import React, { useState } from "react";


const AccountCreationComponent = ({ switchboolswitch }:{switchboolswitch: (val: boolean) => void;}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const { setCreateStatus } = useCreateStatusContext();
  const [errorDisplayEmail, setErrorDisplayEmail] = useState<boolean>(false);
  const [errorDisplayPassword, setErrorDisplayPassword] = useState<boolean>(false);
  const [errorDisplayConfirmPassword, setErrorDisplayConfirmPassword] = useState<boolean>(false);
  const [errorDisplayName, setErrorDisplayName] = useState<boolean>(false);

  const submitCreation = async () => {
    console.log('button pressed');

    const userData = {
      email: email,
      password: password,
      name: username
    }

    if(password != '' && password == confirmPassword){
      const result = await CreateAccount(userData);

      if(result){
        setCreateStatus('success');
        switchboolswitch(true)
      }else{
        setCreateStatus('exists')
      } 
    }else{
      setCreateStatus('failed');
      if(password == ''){
        setErrorDisplayPassword(true);
      }else{
        setErrorDisplayPassword(false);
      }
      if(confirmPassword == ''){
        setErrorDisplayConfirmPassword(true);
      }else{
        setErrorDisplayConfirmPassword(false);
      }
    }

    if(email == ''){
      setErrorDisplayEmail(true);
    }else{
      setErrorDisplayEmail(false);
    }
    if(username == ''){
      setErrorDisplayName(true);
    }else{
      setErrorDisplayName(false);
    }
  }

  return (
    <div className=" ">
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
          className={`bg-white rounded-lg p-1 px-6 ${errorDisplayEmail ? 'border-2 border-[#F40000]' : 'border-none'}`}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex justify-start my-4">
        <div className="mr-4">
          <img
            src="/assets/Icons/Orion_keyhole.svg"
            alt="password"
            className="w-10 p-1"
          />
        </div>

        <input
          type="password"
          placeholder="Password"
          required
          className={`bg-white rounded-lg p-1 px-6 ${errorDisplayPassword ? 'border-2 border-[#F40000]' : 'border-none'}`}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex justify-start my-4 ">
        <div className="mr-4">
          <img
            src="/assets/Icons/Orion_key.svg"
            alt="confirm password"
            className="w-10 p-1"
          />
        </div>

        <input
          type="password"
          placeholder="Confirm Password"
          required
          className={`bg-white rounded-lg p-1 px-6 ${errorDisplayConfirmPassword ? 'border-2 border-[#F40000]' : 'border-none'}`}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          placeholder="Name"
          required
          className={`bg-white rounded-lg p-1 px-6 ${errorDisplayName ? 'border-2 border-[#F40000]' : 'border-none'}`}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {
        (errorDisplayEmail || errorDisplayPassword || errorDisplayConfirmPassword || errorDisplayName) ? <p className="text-[#F40000] text-center text-md mt-5">*Field Required</p> : <></>
      }

      <div className="flex justify-center mt-18 absolute -bottom-7 left-1/2 transform -translate-x-1/2">
        <button className="bg-[#E67E22] hover:bg-[#d56b0f] border-4 border-white text-xl text-white rounded-[2.5rem] p-3 cursor-pointer" onClick={submitCreation}>
          <img
            src="/assets/Icons/Orion_add-user.svg"
            className="w-10"
            alt="add"
          />
        </button>
      </div>
    </div>
  );
};

export default AccountCreationComponent;
