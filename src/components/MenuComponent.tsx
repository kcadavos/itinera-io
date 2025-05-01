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
  };
  return (
    <>
      <div className="bg-white rounded-full w-15 h-15 flex justify-center absolute  top-5 right-10 ">
        <img
          onClick={menuToggle}
          className="w-9 "
          src="/assets/Icons/Orion_world-map2.svg"
          alt="Menu"
        />
      </div>
      {!isHidden && (
        <div className="grid text-[#E67E22] font-medium mt-5 gap-2">
          <Link href="/Trip/TripList" onClick={menuToggle}>Trip Dashboard</Link>
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
