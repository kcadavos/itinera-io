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
          {
            src: "/assets/icons/Orion_add-place.svg",
            href: "/ItinerarySuggestionPages/AddSuggestionPage",
            alt: "Add Suggestions Button"
          },
          {
            src: "/assets/icons/Orion_markers 1.svg ",
            href: "/ItinerarySuggestionPages/UndecidedListPage",
            alt:"Undecided List Button"
          },
          {
            src: "/assets/icons/Orion_checkin-place 2.svg",
            href: "/ItinerarySuggestionPages/LikedListPage",
            alt:"Liked List Button"
          },
          {
            src: "/assets/icons/Orion_delete-place 1.svg",
            href: " /ItinerarySuggestionPages/DislikedListPage",
            alt: "Itinerary Button"
          },
          {
            src: "/assets/icons/Orion_travel-map 1.svg",
            href: " /ItinerarySuggestionPages/ItineraryPage",
            alt: "Itinerary Button"
          },
        ];
      case "/ItinerarySuggestionPages/DislikedListPage":
        return [
          {
            src: "/assets/icons/Orion_add-place 1.svg",
            href: "/ItinerarySuggestionPages/AddSuggestionPage",
             alt: "Add Suggestions Button"
          },
          {
            src: "/assets/icons/Orion_markers 1.svg ",
            href: "/ItinerarySuggestionPages/UndecidedListPage",
            alt:"Undecided List Button"
          },
          {
            src: "/assets/icons/Orion_checkin-place 2.svg",
            href: "/ItinerarySuggestionPages/LikedListPage",
            alt:"Liked List Button"
          },
          {
            src: "/assets/icons/Orion_delete-place.svg",
            href: "/ItinerarySuggestionPages/DislikedListPage",
          },
          {
            src: "/assets/icons/Orion_travel-map 1.svg",
            href: "/ItinerarySuggestionPages/ItineraryPage",
            alt: "Itinerary Button"
          },
        ];
      case "/ItinerarySuggestionPages/ItineraryPage":
        return [
          {
            src: "/assets/icons/Orion_add-place 1.svg",
            href: "/ItinerarySuggestionPages/AddSuggestionPage",
             alt: "Add Suggestions Button"
          },
          {
            src: "/assets/icons/Orion_markers 1.svg ",
            href: "/ItinerarySuggestionPages/UndecidedListPage",
            alt:"Undecided List Button"
          },
          {
            src: "/assets/icons/Orion_checkin-place 2.svg",
            href: " /ItinerarySuggestionPages/LikedListPage",
            alt:"Liked List Button"
          },
          {
            src: "/assets/icons/Orion_delete-place 1.svg",
            href: "/ItinerarySuggestionPages/DislikedListPage",
            alt: "Disliked List Button"
          },
          {
            src: "/assets/icons/Orion_travel-map.svg",
            href: "/ItinerarySuggestionPages/ItineraryPage",
            alt: "Itinerary Button"
          },
        ];

      case "/ItinerarySuggestionPages/LikedListPage":
        return [
          {
            src: "/assets/icons/Orion_add-place 1.svg",
            href: " /ItinerarySuggestionPages/AddSuggestionPage",
             alt: "Add Suggestions Button"
          },
          {
            src: "/assets/icons/Orion_markers 1.svg ",
            href: "/ItinerarySuggestionPages/UndecidedListPage",
            alt:"Undecided List Button"
          },
          {
            src: "/assets/icons/Orion_checkin-place.svg",
            href: " /ItinerarySuggestionPages/LikedListPage",
            alt:"Liked List Button"
          },
          {
            src: "/assets/icons/Orion_delete-place 1.svg",
            href: "/ItinerarySuggestionPages/DislikedListPage",
             alt: "Disliked List Button"
          },
          {
            src: "/assets/icons/Orion_travel-map 1.svg",
            href: " /ItinerarySuggestionPages/ItineraryPage",
            alt: "Itinerary Button"
          },
        ];
      case "/ItinerarySuggestionPages/UndecidedListPage":
        return [
          {
            src: "/assets/icons/Orion_add-place 1.svg",
            href: " /ItinerarySuggestionPages/AddSuggestionPage",
             alt: "Add Suggestions Button"
          },
          {
            src: "/assets/icons/Orion_markers.svg ",
            href: " /ItinerarySuggestionPages/UndecidedListPage",
            alt:"Undecided List Button"
          },
          {
            src: "/assets/icons/Orion_checkin-place 2.svg",
            href: "/ItinerarySuggestionPages/LikedListPage",
            alt:"Liked List Button"
          },
          {
            src: "/assets/icons/Orion_delete-place 1.svg",
            href: " /ItinerarySuggestionPages/DislikedListPage",
             alt: "Disliked List Button"
          },
          {
            src: "/assets/icons/Orion_travel-map 1.svg",
            href: "/ItinerarySuggestionPages/ItineraryPage",
            alt: "Itinerary Button"
          },
        ];
      default:
        return [
          {
            src: "/assets/icons/Orion_add-place 1.svg",
            href: " /ItinerarySuggestionPages/AddSuggestionPage",
             alt: "Add Suggestions Button"
          },
          {
            src: "/assets/icons/Orion_markers 1.svg ",
            href: " /ItinerarySuggestionPages/UndecidedListPage",
            alt:"Undecided List Button"
          },
          {
            src: "/assets/icons/Orion_checkin-place 2.svg",
            href: "/ItinerarySuggestionPages/LikedListPage",
            alt:"Liked List Button"
          },
          {
            src: "/assets/icons/Orion_delete-place 1.svg",
            href: " /ItinerarySuggestionPages/DislikedListPage",
             alt: "Disliked List Button"
          },
          {
            src: "/assets/icons/Orion_travel-map 1.svg",
            href: " /ItinerarySuggestionPages/ItineraryPage",
            alt: "Itinerary Button"
          }
        ];
    }
  };
  const images = selectedPage();
  return (
    <div className="fixed bottom-0 w-full">
      <div className=" bg-[#1ABC9C] min-w-screen max-w-screen py-5 rounded-t-4xl  ">
        <div className="flex gap-5 justify-center ">
          {images.map(({ src, href, alt }, index) => (
            <Link key={index} href={href}>
              <img className="w-13 h-13" src={src} alt={alt} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavbarComponent;
