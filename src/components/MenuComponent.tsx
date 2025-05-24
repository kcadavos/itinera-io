"use client";

import { useAccountStatusContext } from "@/context/DataContext";
import Link from "next/link";
import React, { useState } from "react";

const MenuComponent = () => {
  const [isHidden, setIsHidden] = useState(true);
  const { accountStatus, setAccountStatus } = useAccountStatusContext();

  const menuToggle = () => {
    setIsHidden(!isHidden);
  };

  const changeHeader = () => {
    setAccountStatus(accountStatus === "account" ? "password" : "account");
    setIsHidden(true);
  };

  const logOut = () => {
    setAccountStatus("idle");
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <>
      {/* Toggle Button */}
      <div className="lg:bg-[#1ABC9C] lg:rounded-l-full flex justify-center absolute top-5 right-5 lg:top-0 lg:right-0 p-1 bg-white rounded-4xl lg:p-4 cursor-pointer z-50">
        <img
          onClick={menuToggle}
          className="w-10 rounded-full"
          src="/assets/Icons/OrionWorldMapBg.svg"
          alt="Menu"
        />
      </div>

      {/* Smooth Menu Collapse */}
      <div
        className={`
          transition-all duration-500 ease-in-out overflow-hidden
          ${isHidden ? "max-h-0 opacity-0" : "max-h-96 opacity-100"}
        `}
        style={{
          transitionProperty: "max-height, opacity",
        }}
      >
        <div className="grid text-[#E67E22] font-medium mt-1 gap-2 lg:pl-2 lg:pt-2">
          <Link
            href="/Trip/TripList"
            className="block lg:hidden transition-colors duration-300 hover:text-[#D35400]"
            onClick={menuToggle}
          >
            Trip Dashboard
          </Link>
          <Link
            href="/AccountDetails"
            className="transition-colors duration-300 hover:text-[#D35400] "
            onClick={changeHeader}
          >
            Account Details
          </Link>
          <Link
            href="/NotificationPage"
            className="transition-colors duration-300 hover:text-[#D35400] "
            onClick={menuToggle}
          >
            Notifications
          </Link>
          <Link
            href="/"
            className="transition-colors duration-300 hover:text-[#D35400] "
            onClick={logOut}
          >
            Log Out
          </Link>
        </div>
      </div>
    </>
  );
};

export default MenuComponent;