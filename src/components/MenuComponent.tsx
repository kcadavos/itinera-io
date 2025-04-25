"use client";
import Link from "next/link";
import React, { useState } from "react";

const MenuComponent = () => {
  const [isHidden, setIsHidden] = useState(true);

  const menuToggle = () => {
    setIsHidden(!isHidden);
  };

  return (
    <>
      <div className="bg-white rounded-full w-15 h-15 flex justify-center absolute  top-5 right-10 ">
        <img
          onClick={menuToggle}
          className="w-9 "
          src="/assets/icons/Orion_world-map2.svg"
          alt="Menu"
        />
      </div>
      {!isHidden && (
        <div className="grid text-[#E67E22] font-medium gap-2">
          <Link href="/Trip/TripList">Trip Dashboard</Link>
          <Link href="/AccountDetails">Account Details</Link>
          <Link href="/NotificationPage">Notifications</Link>
          <Link
            href="/"
            onClick={() => {
              localStorage.clear();
            }}
          >
            Log Out
          </Link>
        </div>
      )}
    </>
  );
};

export default MenuComponent;
