"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";


const navItems = [
  {
    
    name: "Propose",
    href: "/ItinerarySuggestionPages/AddSuggestionPage",
    srcBlack: "/assets/Icons/Orion_add-place.svg",
    srcWhite: "/assets/Icons/Orion_add-place 1.svg",
  },
  {
   
    name: "Pick",
    href: "/ItinerarySuggestionPages/UndecidedListPage",
    srcBlack: "/assets/Icons/Orion_markers.svg",
    srcWhite: "/assets/Icons/Orion_markers 1.svg",
  },
  {
    
    name: "Pin",
    href: "/ItinerarySuggestionPages/LikedListPage",
    srcBlack: "/assets/Icons/Orion_checkin-place.svg",
    srcWhite: "/assets/Icons/Orion_checkin-place 2.svg",
  },
  {
    
    name: "Pass",
    href: "/ItinerarySuggestionPages/DislikedListPage",
    srcBlack: "/assets/Icons/Orion_delete-place.svg",
    srcWhite: "/assets/Icons/Orion_delete-place 1.svg",
  },
  {
   
    name: "Plan",
    href: "/ItinerarySuggestionPages/ItineraryPage",
    srcBlack: "/assets/Icons/Orion_travel-map.svg",
    srcWhite: "/assets/Icons/Orion_travel-map 1.svg",
  },
];

const NavbarComponent = () => {
  const currentPath = usePathname();

  return (
   

    
      <div className="bg-[#1ABC9C] fixed bottom-0 lg:top-0  py-5 rounded-t-4xl lg:h-18 lg:py-3 lg:rounded-none lg:ml-64  xl:ml-94 lg:w-full left-0 lg:pr-15 ">
        <div className="flex gap-5 lg:gap-0 justify-center lg:justify-around">
          {navItems.map(({  name, href, srcBlack, srcWhite }) => {
            const isActive = currentPath === href;
            const src = isActive ? srcBlack : srcWhite;
            const textClass = isActive ? "text-black" : "text-white";
            
          
            return (
              <Link key={name} href={href} className="text-center flex gap-2">
                <img className="w-13 h-13" src={src} alt={`${name} Button`} />
                <p className={`hidden lg:block pt-2 font-medium text-3xl ${textClass}`}>{name}</p>
              </Link>
            );
          })}
        </div>
      </div>
  
          
  );
};

export default NavbarComponent;
