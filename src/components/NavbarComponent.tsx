"use client";
import React from "react";
import Link from "next/link";

import { usePathname } from "next/navigation";

const NavbarComponent = () => {
  const currentPath = usePathname();
  const selectedPage = () => {
    switch (currentPath) {
      case "/ItinerarySuggestionPages/AddSuggestionPage":
        return [
          "/assets/icons/Orion_add-place.svg",
          "/assets/icons/Orion_markers 1.svg ",
          "/assets/icons/Orion_checkin-place 2.svg",
          "/assets/icons/Orion_delete-place 1.svg",
          "/assets/icons/Orion_travel-map 1.svg",
        ];
      case "/ItinerarySuggestionPages/DislikedListPage":
        return [
          "/assets/icons/Orion_add-place 1.svg",
          "/assets/icons/Orion_markers.svg ",
          "/assets/icons/Orion_checkin-place 2.svg",
          "/assets/icons/Orion_delete-place 1.svg",
          "/assets/icons/Orion_travel-map 1.svg",
        ];
      case "/ItinerarySuggestionPages/ItineraryPage":
        return [
          "/assets/icons/Orion_add-place 1.svg",
          "/assets/icons/Orion_markers 1.svg ",
          "/assets/icons/Orion_checkin-place.svg",
          "/assets/icons/Orion_delete-place 1.svg",
          "/assets/icons/Orion_travel-map 1.svg",
        ];

      case "/ItinerarySuggestionPages/LikedListPage":
        return [
          "/assets/icons/Orion_add-place 1.svg",
          "/assets/icons/Orion_markers 1.svg ",
          "/assets/icons/Orion_checkin-place 2.svg",
          "/assets/icons/Orion_delete-place.svg",
          "/assets/icons/Orion_travel-map 1.svg",
        ];
      case "/ItinerarySuggestionPages/UndecidedListPage":
        return [
          "/assets/icons/Orion_add-place 1.svg",
          "/assets/icons/Orion_markers 1.svg ",
          "/assets/icons/Orion_checkin-place 2.svg",
          "/assets/icons/Orion_delete-place 1.svg",
          "/assets/icons/Orion_travel-map.svg",
        ];
      default:
        return[
          "/assets/icons/Orion_add-place 1.svg",
          "/assets/icons/Orion_markers 1.svg ",
          "/assets/icons/Orion_checkin-place 2.svg",
          "/assets/icons/Orion_delete-place 1.svg",
          "/assets/icons/Orion_travel-map 1.svg",
        ];
    }
  };
  const images = selectedPage();
  return (
    <div className="fixed bottom-0 w-full">
      <div className=" bg-[#1ABC9C] min-w-screen max-w-screen py-5 rounded-t-4xl  ">
        <div className="flex gap-5 justify-center ">
          {images.map((  src, index) => (
            <img key={index} className="w-13 h-13" src={src}  alt="images" />
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default NavbarComponent;
