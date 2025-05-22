"use client";
import { useAccountStatusContext } from "@/context/DataContext";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

const MenuComponent = () => {
  const [isHidden, setIsHidden] = useState(true);
  const { accountStatus, setAccountStatus } = useAccountStatusContext();
  const menuRef = useRef<HTMLDivElement>(null);

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
    setIsHidden(true);
  };

  // ✅ Click-outside logic
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsHidden(true);
      }
    };

    if (!isHidden) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isHidden]);

  return (
    <>
      <div
        className="lg:bg-[#1ABC9C] lg:rounded-l-full flex justify-center absolute top-5 right-5  lg:top-0 lg:right-0 p-1 bg-white rounded-4xl lg:p-4 cursor-pointer"
        onClick={menuToggle}
      >
        <img
          className="w-10 rounded-full"
          src="/assets/Icons/OrionWorldMapBg.svg"
          alt="Menu"
        />
      </div>

      {/* Wrapped only the menu part in the ref */}
      <div ref={menuRef}>
        {!isHidden && (
          <div className="grid text-[#E67E22] font-medium mt-5 gap-2 lg:pl-2 lg:pt-2">
            <Link href="/Trip/TripList" className="block lg:hidden" onClick={menuToggle}>
              Trip Dashboard
            </Link>
            <Link href="/AccountDetails" onClick={changeHeader}>
              Account Details
            </Link>
            <Link href="/NotificationPage" onClick={menuToggle}>
              Notifications
            </Link>
            <Link href="/" onClick={logOut}>
              Log Out
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default MenuComponent;
