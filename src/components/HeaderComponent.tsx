"use client";
import React, { useEffect, useState } from "react";
import {
  useNameContext,
  useSelectedTripDestinationContext,
  useSelectedTripStartDateContext,
  useSelectedTripEndDateContext,
} from "@/context/DataContext";

import { usePathname } from "next/navigation";
import { format } from "date-fns";
import { parseISO } from "date-fns";
import MenuComponent from "./MenuComponent";

const HeaderComponent = () => {
  const path = usePathname();

  const { name } = useNameContext();
  const { selectedTripStartDate } = useSelectedTripStartDateContext();
  const { selectedTripEndDate } = useSelectedTripEndDateContext();
  const { selectedTripDestination } = useSelectedTripDestinationContext();

  const [isHidden, setIsHidden] = useState(false);
  useEffect(() => {
    setIsHidden(path == "/");
  }, [path]);

  const findPath = () => {
    const startDate = selectedTripStartDate
      ? parseISO(selectedTripStartDate)
      : null;
    const endDate = selectedTripEndDate ? parseISO(selectedTripEndDate) : null;

    if (path === "/ItinerarySuggestionPages/AddSuggestionPage") {
      return {
        topMessage: (
          <p>
            {`Hi `}
            <span className="text-[#4A90E2] text-xl">{name}</span>
            {`, let's plan for`}{" "}
          </p>
        ),
        destination: selectedTripDestination,
        message: "What activities are you excited about?",
        color: "text-black text-sm",
      };
    } else if (path.startsWith("/ItinerarySuggestionPages")) {
      return {
        topMessage: (
          <p>
            {`Hi `}
            <span className="text-[#4A90E2] text-xl">{name}</span>
            {`, let's plan for`}{" "}
          </p>
        ),
        destination: selectedTripDestination,
        message:
          startDate && endDate
            ? `for ${format(startDate, "MMM dd")} - ${format(
                endDate,
                "MMM dd"
              )}`
            : "Unknown Dates",
        color: "text-[#E67E22] text-sm",
      };
    } else if (path === "/Trip/TripList") {
      return {
        topMessage: (
          <p>
            {`Hi `}
            <span className="text-[#4A90E2] text-xl">{name}</span>
            {`,`}
          </p>
        ),
        destination: "",
        message: (
          <p>
            Looking forward to <br /> these trips?
          </p>
        ),
        color: "text-[#34495E] text-2xl",
      };
    } else if (path === "/Trip/AddTrip") {
      return {
        topMessage: (
          <p>
            {`Hi `}
            <span className="text-[#4A90E2] text-xl">{name}</span>
            {`,`}
          </p>
        ),
        destination: "",
        message: (
          <p>
            Where do you <br /> want to go?
          </p>
        ),
        color: "text-[#34495E] text-2xl",
      };
    } else {
      return {
        topMessage: (
          <p className="text-[#E67E22] text-2xl">
            Votes In,
            <br />
            Adventure Out.
          </p>
        ),
        destination: "",
        message: "Log In.",
        color: "text-[#34495E] text-2xl text-medium",
      };
    }
  };

  const bottom = findPath();

  return (
    <div>
      <div className="bg-[#E1ECFF] min-h-[14rem]  lg:min-h-[13.2rem] lg:max-h-[13.2rem] pt-10 pb-10 relative min-w-screen max-w-screen mb-6">
        <div className="mx-8 mt-10 font-inter">
        
          <img className="h-10 absolute left-6 top-10" src="/assets/icons/itineraLogo.svg" alt="" />
       
          {!isHidden && <MenuComponent />}

          <div className="font-medium text-[#34495E]">{bottom.topMessage}</div>
          <p className="text-3xl text-[#E67E22]">{bottom.destination}</p>
          <div className={` ${bottom.color}`}>{bottom.message}</div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
