"use client";
import React, { useEffect, useState } from "react";
import {
  useNameContext,
  useSelectedTripDestinationContext,
  useSelectedTripStartDateContext,
  useSelectedTripEndDateContext,
  useLoginStatusContext,
  useCreateStatusContext,
  useAccountStatusContext,
} from "@/context/DataContext";

import { usePathname } from "next/navigation";
import { format } from "date-fns";
import { parseISO } from "date-fns";
import MenuComponent from "./MenuComponent";

const HeaderComponent = () => {
  const path = usePathname();
  const { loginStatus } = useLoginStatusContext();
  const { createStatus } = useCreateStatusContext();
  const { accountStatus } = useAccountStatusContext();
  const { name } = useNameContext();
  const { selectedTripStartDate } = useSelectedTripStartDateContext();
  const { selectedTripEndDate } = useSelectedTripEndDateContext();
  const { selectedTripDestination } = useSelectedTripDestinationContext();

  const [isHidden, setIsHidden] = useState(false);
  useEffect(() => {
    setIsHidden(path == "/");
  }, [path]);

  const findPath = () => {
    const startDate = selectedTripStartDate ? parseISO(selectedTripStartDate) : null;
    const endDate = selectedTripEndDate ? parseISO(selectedTripEndDate) : null;
  
    switch (true) {
      case path === "/ItinerarySuggestionPages/AddSuggestionPage":
        return {
          topMessage: (
            <p>
              Hi <span className="text-[#4A90E2] text-xl">{name}</span>, Let&apos;s Plan For
            </p>
          ),
          destination: selectedTripDestination,
          message: "What activities are you excited about?",
          color: "text-black text-sm",
        };
  
      case path.startsWith("/ItinerarySuggestionPages"):
        return {
          topMessage: (
            <p>
              Hi <span className="text-[#4A90E2] text-xl">{name}</span>, Let&apos;s Plan For
            </p>
          ),
          destination: selectedTripDestination,
          message: startDate && endDate
            ? `for ${format(startDate, "MMM dd")} - ${format(endDate, "MMM dd")}`
            : "Unknown Dates",
          color: "text-[#E67E22] text-sm",
        };
  
      case path === "/Trip/TripList":
        return {
          topMessage: (
            <p>
              Hi <span className="text-[#4A90E2] text-xl">{name}</span>,
            </p>
          ),
          destination: "",
          message: <p>Looking Forward to <br /> These Trips?</p>,
          color: "text-[#34495E] text-2xl",
        };
  
      case path === "/Trip/AddTrip":
        return {
          topMessage: (
            <p>
              Hi <span className="text-[#4A90E2] text-xl">{name}</span>,
            </p>
          ),
          destination: "",
          message: <p>Where Do You <br /> Want to Go?</p>,
          color: "text-[#34495E] text-2xl",
        };
  
      case loginStatus === "failed":
        return {
          topMessage: (
            <p className="text-[#E67E22] text-2xl">
              Invalid Username <br /> or Password.
            </p>
          ),
          destination: "",
          message: "Please try again.",
          color: "",
        };
  
      case loginStatus === "create":
        return {
          topMessage: (
            <p>
              Hello, <span className="text-[#E67E22] text-2xl">Itinerista</span>
            </p>
          ),
          destination: "",
          message: <p>Ready For an Adventure?</p>,
          color: "text-[#34495E] text-2xl text-medium",
        };
  
      case createStatus === "success":
        return {
          topMessage: <p className="text-[#E67E22] text-2xl">Congratulations</p>,
          destination: "",
          message: <p>Account Created Successfully!</p>,
          color: "text-[#34495E] text-2xl text-medium",
        };
  
      case createStatus === "exists":
        return {
          topMessage: <p className="text-[#E67E22] text-2xl">Uh Oh</p>,
          destination: "",
          message: <p>Account Already Exists.</p>,
          color: "text-[#34495E] text-2xl text-medium",
        };
  
      case createStatus === "failed":
        return {
          topMessage: <p className="text-[#E67E22] text-2xl">Uh Oh</p>,
          destination: "",
          message: <p>Passwords Don&apos;t Match.</p>,
          color: "text-[#34495E] text-2xl text-medium",
        };
        case path === "/NotificationPage":
          return {
            topMessage:
            (
              <p>
                Hi <span className="text-[#4A90E2] text-xl">{name}</span>,
              </p>
            ),
            destination: "",
            message: <p>Some New Things For You</p>,
            color: "text-[#34495E] text-2xl text-medium",
          };
        case accountStatus === "password":
          return {
            topMessage:
            (
              <p>
                Hi <span className="text-[#4A90E2] text-xl">{name}</span>,
              </p>
            ),
            destination: "",
            message: <p>Want to Update Your Password</p>,
            color: "text-[#34495E] text-2xl text-medium",
          };
          case accountStatus === "account":
            return {
              topMessage:
              (
                <p>
                  Hi <span className="text-[#4A90E2] text-xl">{name}</span>,
                </p>
              ),
              destination: "",
              message: <p>Want to Update Your Account</p>,
              color: "text-[#34495E] text-2xl text-medium",
            };
          case accountStatus === "mustmatch":
            return {
              topMessage:
              (
                <p>
                  Hi <span className="text-[#4A90E2] text-xl">{name}</span>,
                </p>
              ),
              destination: "",
              message: <p>New Passwords Do Not Match!</p>,
              color: "text-[#34495E] text-2xl text-medium",
            };
          case accountStatus === "failed":
            return {
              topMessage:
              (
                <p>
                  Hi <span className="text-[#4A90E2] text-xl">{name}</span>,
                </p>
              ),
              destination: "",
              message: <p>Old Password Is Not Correct!</p>,
              color: "text-[#34495E] text-2xl text-medium",
            };
          case accountStatus === "successPass":
            return {
              topMessage:
              (
                <p>
                  Hi <span className="text-[#4A90E2] text-xl">{name}</span>,
                </p>
              ),
              destination: "",
              message: <p>Password Changed Successfully</p>,
              color: "text-[#34495E] text-2xl text-medium",
            };
          case accountStatus === "successAcc":
            return {
              topMessage:
              (
                <p>
                  Hi <span className="text-[#4A90E2] text-xl">{name}</span>,
                </p>
              ),
              destination: "",
              message: <p>Name Changed Successfully</p>,
              color: "text-[#34495E] text-2xl text-medium",
            };
          case accountStatus === "failAcc":
            return {
              topMessage:
              (
                <p>
                  Hi <span className="text-[#4A90E2] text-xl">{name}</span>,
                </p>
              ),
              destination: "",
              message: <p>Name Did Not Change</p>,
              color: "text-[#34495E] text-2xl text-medium",
            };
            
  
      default:
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
    <div className="block lg:hidden">
      <div className="bg-[#E1ECFF] min-h-[14rem]  lg:min-h-[13.2rem] lg:max-h-[13.2rem] pt-10 pb-10 relative min-w-screen max-w-screen mb-6">
        <div className="mx-8 mt-10 font-inter">
          <img
            className="h-10 absolute left-6 top-10"
            src="/assets/Icons/itineraLogo.svg"
            alt=""
          />

          {!isHidden && <MenuComponent />}

          <div className="font-medium text-[#34495E] mt-5">
            {bottom.topMessage}
          </div>
          <p className="text-3xl text-[#E67E22]">{bottom.destination}</p>
          <div className={` ${bottom.color}`}>{bottom.message}</div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
