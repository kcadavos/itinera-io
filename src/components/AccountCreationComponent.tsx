import { useAppcontext } from "@/context/DataContext";
import { CreateAccount } from "@/lib/DataServices";
import React, { useState } from "react";

const AccountCreationComponent = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const {setSwitchBool} = useAppcontext();

  const submitCreation = async () => {

    let userData = {
      email: email,
      password: password,
      name: username
    }

    if(password != '' && password == confirmPassword){
      let result = await CreateAccount(userData);

      result ? (
        alert("Account Created!"),
        setSwitchBool(true) 
      ) : alert("Account Already Exsists");
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
            alt="conferm password"
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
        <button className="bg-[#E67E22] border-4 border-white text-xl text-white rounded-4xl p-2 cursor-pointer" onClick={submitCreation}>
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
