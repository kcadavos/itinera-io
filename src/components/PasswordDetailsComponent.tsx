"use client";
import React from "react";

const PasswordDetailsComponent = () => {
  return (
    <div className=" ">
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
          placeholder="Confirm Password"
          required
          className="bg-white rounded-lg p-1 px-6"
          // onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PasswordDetailsComponent;
