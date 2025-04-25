import { CreateAccount } from "@/lib/services/DataServices";
import React, { useState } from "react";

type AccountCreationProps = {
  switchboolswitch: (val: boolean) => void;
};

const AccountCreationComponent: React.FC<AccountCreationProps> = ({ switchboolswitch }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');


  const submitCreation = async () => {

    const userData = {
      email: email,
      password: password,
      name: username
    }

    if(password != '' && password == confirmPassword){
      const result = await CreateAccount(userData);

      if(result){
        alert("Account Created!");
        switchboolswitch(true)
      }else{
        alert("Account Already Exists");
      } 
    }else{
      alert("Passwords are not the same");
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
          className="bg-white rounded-lg p-1 px-6"
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
          className="bg-white rounded-lg p-1 px-6"
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
          className="bg-white rounded-lg p-1 px-6"
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
          className="bg-white rounded-lg p-1 px-6"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

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
