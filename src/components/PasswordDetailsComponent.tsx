"use client";
import { useAccountStatusContext } from "@/context/DataContext";
import { LoginDetailsPassword } from "@/lib/services/AccountDetailsService";
import React, { useState } from "react";

const PasswordDetailsComponent = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const {setAccountStatus, accountStatus } = useAccountStatusContext();

  const handleClick = () => {
    setAccountStatus(accountStatus === "password" ? "account" : "password");
  };
  const submitChange = async () => {
    const userId = Number(sessionStorage.getItem("ItineraUserId")) || 0;
    const token = localStorage.getItem("ItineraToken");

    if (!token) {
      console.error("Missing token");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      console.error("Passwords do not match");
      setAccountStatus('mustmatch');
      return;
    }

    const userData = {
      userId: userId,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    console.log(userData)
    try {
      const result = await LoginDetailsPassword(userData, token);
      if (result) {
        setAccountStatus('successPass');
      } else {
      setAccountStatus('failed')
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <div className="bg-[#ECF0F1] rounded-2xl min-h-[26rem] min-w-[20rem] lg:min-h-[22rem] lg:max-w-full lg:mt-10 lg:mx-20 xl:mx-40 mx-4 px-4 relative mb-25 lg:px-10">
      <div className="flex justify-start my-4 pt-10 lg:pt-15">
        <div className="mr-4">
          <img
            src="/assets/Icons/Orion_keyhole.svg"
            alt="password"
            className="w-10 p-1"
          />
        </div>
        <input
          type="password"
          placeholder="Old Password"
          required
          className="bg-white rounded-lg p-1 px-6 w-full"
          onChange={(e) => setOldPassword(e.target.value)}
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
          placeholder="New Password"
          required
          className="bg-white rounded-lg p-1 px-6 w-full"
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div className="flex justify-start my-4">
        <div className="mr-4">
          <img
            src="/assets/Icons/Orion_key.svg"
            alt="confirm password"
            className="w-10 p-1"
          />
        </div>
        <input
          type="password"
          placeholder="Confirm New Password"
          required
          className="bg-white rounded-lg p-1 px-6 w-full"
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </div>
      <button className="flex justify-self-center mt-20 lg:mt-15  cursor-pointer" onClick={handleClick}><p className="text-[#34495E]">Change Name Instead?</p></button>
      <div className="flex justify-center mt-18 absolute -bottom-7 left-1/2 transform -translate-x-1/2">
        <button
          className="bg-[#E67E22] hover:bg-[#d56b0f] border-4 border-white text-xl text-white rounded-[2.5rem] p-3 cursor-pointer"
          onClick={submitChange}
        >
          <img
            src="/assets/Icons/Orion_add-user.svg"
            className="w-10"
            alt="submit"
          />
        </button>
      </div>
    </div>
  );
};

export default PasswordDetailsComponent;
