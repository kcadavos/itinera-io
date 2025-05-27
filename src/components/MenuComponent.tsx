"use client";

import { useAccountStatusContext } from "@/context/DataContext";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

const MenuComponent = () => {
  const [isHidden, setIsHidden] = useState(true);
  const { accountStatus, setAccountStatus } = useAccountStatusContext();

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const menuToggle = () => {
    setIsHidden((prev) => !prev);
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

  useEffect(() => {
    // Delay setting up the listener to avoid reacting to the same click that toggled it
    const timeout = setTimeout(() => {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node;

        if (
          menuRef.current &&
          buttonRef.current &&
          !menuRef.current.contains(target) &&
          !buttonRef.current.contains(target)
        ) {
          setIsHidden(true);
        }
      };

      if (!isHidden) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, 0);

    return () => clearTimeout(timeout);
  }, [isHidden]);

  return (
    <>
      {/* Toggle Button */}
      <div
        ref={buttonRef}
        className="lg:bg-[#1ABC9C] lg:rounded-l-full flex justify-center absolute top-5 right-5 lg:top-0 lg:right-0 p-1 bg-white rounded-4xl lg:p-4 cursor-pointer z-50"
        onClick={menuToggle}
      >
        <img
          className="w-10 rounded-full"
          src="/assets/Icons/OrionWorldMapBg.svg"
          alt="Menu"
        />
      </div>

      {/* Menu */}
      <div
        ref={menuRef}
        className={`
          transition-all duration-500 ease-in-out overflow-hidden
          ${isHidden ? "max-h-0 opacity-0" : "max-h-96 opacity-100"}
        `}
        style={{ transitionProperty: "max-height, opacity" }}
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
            className="transition-colors duration-300 hover:text-[#D35400]"
            onClick={changeHeader}
          >
            Account Details
          </Link>
          <Link
            href="/NotificationPage"
            className="transition-colors duration-300 hover:text-[#D35400]"
            onClick={menuToggle}
          >
            Notifications
          </Link>
          <Link
            href="/"
            className="transition-colors duration-300 hover:text-[#D35400]"
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
