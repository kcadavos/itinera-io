"use client";
import React from "react";

const PasswordDetailsComponent = () => {
  return (
    <div className="bg-[#ECF0F1] rounded-2xl min-h-[26rem] min-w-[20rem] lg:min-h-[25rem] lg:max-w-[20rem] mx-4 px-4 relative mb-25 ">
      <div className="flex justify-start my-4 pt-10">
        <div className="mr-4">
          <img
            src="/assets/Icons/Orion_keyhole.svg"
            alt="password"
            className="w-10 p-1"
          />
        </div>

        <input
          type="password"
          placeholder=" Old Password"
          required
          className="bg-white rounded-lg p-1 px-6"
          // onChange={(e) => setPassword(e.target.value)}
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
          className="bg-white rounded-lg p-1 px-6"
          // onChange={(e) => setPassword(e.target.value)}
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
          placeholder="Confirm New Password"
          required
          className="bg-white rounded-lg p-1 px-6"
          // onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PasswordDetailsComponent;
