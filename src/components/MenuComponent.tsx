"use client";
import { useAccountStatusContext } from "@/context/DataContext";
import Link from "next/link";
import React, { useState } from "react";

const MenuComponent = () => {
  const [isHidden, setIsHidden] = useState(true);
 const {accountStatus , setAccountStatus} = useAccountStatusContext();
  const menuToggle = () => {
    setIsHidden(!isHidden);
  };
  const changeHeader = ()=>{
    setAccountStatus(accountStatus === 'account' ? 'password' : 'account' )
    setIsHidden(!isHidden)
  };

  const logOut = () =>{
  setAccountStatus("idle");
  localStorage.clear();
  sessionStorage.clear();
  };
  return (
    <>
      
      <div className="lg:bg-[#1ABC9C] lg:rounded-l-full flex justify-center absolute top-5 right-5  lg:top-0 lg:right-0 p-1 bg-white rounded-4xl lg:p-4 cursor-pointer">
        <img
          onClick={menuToggle}
          className="w-10 rounded-full "
          src="/assets/Icons/OrionWorldMapBG.svg"
          alt="Menu"
        />
      </div>
      {!isHidden && (
        <div className="grid text-[#E67E22] font-medium mt-5 gap-2">
          <Link href="/Trip/TripList" onClick={menuToggle} >Trip Dashboard</Link>
          <Link href="/AccountDetails" onClick={changeHeader}>Account Details</Link>
          <Link href="/NotificationPage" onClick={menuToggle}>Notifications</Link>
          <Link
            href="/"
            onClick={logOut}
          >
            Log Out
          </Link>
        </div>
      )}
    </>
  );
};

export default MenuComponent;
