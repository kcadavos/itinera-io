"use client";
import {
  useNameContext,
  useSelectedTripDestinationContext,
  useSelectedTripStartDateContext,
  useSelectedTripEndDateContext,
} from "@/context/DataContext";
import Link from "next/link";

import { usePathname } from "next/navigation";
//import { format } from "date-fns"; commented out for vercel

import React from "react";

const HeaderComponent = () => {
  const path = usePathname();

  const { name } = useNameContext();
  const { selectedTripStartDate } = useSelectedTripStartDateContext();
  const { selectedTripEndDate } = useSelectedTripEndDateContext();
  const { selectedTripDestination } = useSelectedTripDestinationContext();
  // const startDate = new Date(selectedTripStartDate);
  // const endDate = new Date(selectedTripEndDate);
  const findPath = () => {
    if (path == "/ItinerarySuggestionPages/AddSuggestionPage") {
      return {message: "What activities are you excided about?",
        color: "text-black"
      };
    } else {
    
      return { message:` for ${selectedTripStartDate} - ${selectedTripEndDate}`,
    color:"text-[#E67E22]"};
    }
  };

  const bottom = findPath();
  return (
    <div className="md:hidden">
      <div className="bg-[#E1ECFF] min-h-[10rem] max-h-[10rem] lg:min-h-[13.2rem] lg:max-h-[13.2rem] pt-10 pb-5 min-w-screen max-w-screen mb-6">
        <div className="mx-8 font-inter">
          <Link href="/Trip/TripList" className=" text-[#1ABC9C]">Itinera-IO</Link>
          <p>Hi {name}, lets plan for</p>
          <p className="text-3xl text-[#E67E22]"> {selectedTripDestination} </p>
          <p className={`text-sm ${bottom.color}` }>{bottom.message}</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
