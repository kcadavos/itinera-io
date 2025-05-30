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
import { format, parseISO } from "date-fns";
import MenuComponent from "./MenuComponent";

const HeaderComponent = () => {
  const path = usePathname();
  const { name } = useNameContext();
  const { selectedTripStartDate } = useSelectedTripStartDateContext();
  const { selectedTripEndDate } = useSelectedTripEndDateContext();
  const { selectedTripDestination } = useSelectedTripDestinationContext();
  const { loginStatus } = useLoginStatusContext();
  const { createStatus } = useCreateStatusContext();
  const { accountStatus } = useAccountStatusContext();

  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    setIsHidden(path == "/LoginPage");
  }, [path]);

  const findPath = () => {
    const startDate = selectedTripStartDate
      ? parseISO(selectedTripStartDate)
      : null;
    const endDate = selectedTripEndDate ? parseISO(selectedTripEndDate) : null;

    const greeting = (
      <p>
        Hi <span className="text-[#4A90E2] text-xl">{name}</span>,
      </p>
    );

    if (path === "/ItinerarySuggestionPages/AddSuggestionPage") {
      return {
        topMessage: greeting,
        destination: selectedTripDestination,
        message: "What activities are you excited about?",
        color: "text-black text-sm",
      };
    }

    if (path.startsWith("/ItinerarySuggestionPages")) {
      return {
        topMessage: greeting,
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
    }

    if (path === "/Trip/TripList") {
      return {
        topMessage: greeting,
        destination: "",
        message: (
          <p>
            Looking Forward to <br /> These Trips?
          </p>
        ),
        color: "text-[#34495E] text-2xl",
      };
    }

    if (path === "/Trip/AddTrip") {
      return {
        topMessage: greeting,
        destination: "",
        message: (
          <p>
            Where Do You <br /> Want to Go?
          </p>
        ),
        color: "text-[#34495E] text-2xl",
      };
    }

    if (path === "/NotificationPage") {
      return {
        topMessage: greeting,
        destination: "",
        message: <p>Some New Things For You</p>,
        color: "text-[#34495E] text-2xl text-medium",
      };
    }

    // Account status
    if (accountStatus === "password") {
      return {
        topMessage: greeting,
        destination: "",
        message: <p>Want to Update Your Password</p>,
        color: "text-[#34495E] text-2xl text-medium",
      };
    }

    if (accountStatus === "account") {
      return {
        topMessage: greeting,
        destination: "",
        message: <p>Want to Update Your Account</p>,
        color: "text-[#34495E] text-2xl text-medium",
      };
    }

    if (accountStatus === "mustmatch") {
      return {
        topMessage: greeting,
        destination: "",
        message: <p>New Passwords Do Not Match!</p>,
        color: "text-[#34495E] text-2xl text-medium",
      };
    }

    if (accountStatus === "failed") {
      return {
        topMessage: greeting,
        destination: "",
        message: <p>Old Password Is Not Correct!</p>,
        color: "text-[#34495E] text-2xl text-medium",
      };
    }

    if (accountStatus === "successPass") {
      return {
        topMessage: greeting,
        destination: "",
        message: <p>Password Changed Successfully</p>,
        color: "text-[#34495E] text-2xl text-medium",
      };
    }

    if (accountStatus === "successAcc") {
      return {
        topMessage: greeting,
        destination: "",
        message: <p>Name Changed Successfully</p>,
        color: "text-[#34495E] text-2xl text-medium",
      };
    }

    if (accountStatus === "failAcc") {
      return {
        topMessage: greeting,
        destination: "",
        message: <p>Name Did Not Change</p>,
        color: "text-[#34495E] text-2xl text-medium",
      };
    }

    if (loginStatus === "failed") {
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
    }

    if (loginStatus === "create") {
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
    }

    if (createStatus === "success") {
      return {
        topMessage: <p className="text-[#E67E22] text-2xl">Congratulations</p>,
        destination: "",
        message: <p>Account Created Successfully!</p>,
        color: "text-[#34495E] text-2xl text-medium",
      };
    }

    if (createStatus === "exists") {
      return {
        topMessage: <p className="text-[#E67E22] text-2xl">Uh Oh</p>,
        destination: "",
        message: <p>Account Already Exists.</p>,
        color: "text-[#34495E] text-2xl text-medium",
      };
    }

    if (createStatus === "failed") {
      return {
        topMessage: <p className="text-[#E67E22] text-2xl">Uh Oh</p>,
        destination: "",
        message: <p>Passwords Don&apos;t Match.</p>,
        color: "text-[#34495E] text-2xl text-medium",
      };
    }

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
  };

  const desktopLogic = () => {
    const startDate = selectedTripStartDate
      ? parseISO(selectedTripStartDate)
      : null;
    const endDate = selectedTripEndDate ? parseISO(selectedTripEndDate) : null;

    if (path === "/ItinerarySuggestionPages/AddSuggestionPage") {
      return {
        topMessage: (
          <p>
            {" "}
            Let&apos;s plan for{" "}
            <span className="text-5xl text-[#1A89BC]">
              {selectedTripDestination}{" "}
            </span>
            <span className="text-[#1A89BC]">
              {" "}
              {startDate && endDate
                ? `for ${format(startDate, "MMM dd")} - ${format(
                    endDate,
                    "MMM dd"
                  )}`
                : "Unknown Dates"}
            </span>{" "}
          </p>
        ),
        bottomMessage: " What activities are you excited about?",
      };
    }
    if (path === "/Trip/AddTrip") {
      return {
        topMessage: <p>Where do you want to go?</p>,
        bottomMessage: "",
      };
    }

    if (path === "/NotificationPage") {
      return {
        topMessage: <p>Some new things for you </p>,
        bottomMessage: " ",
      };
    }
    if (path === "/ItinerarySuggestionPages/ItineraryPage") {
      return {
        topMessage: (
          <p >
            {" "}
            Your itinerary for{" "}
            <span className="text-5xl text-[#1A89BC]">
              {selectedTripDestination}{" "}
            </span>
            <span className="text-[#1A89BC]">
              {" "}
              {startDate && endDate
                ? `for ${format(startDate, "MMM dd")} - ${format(
                    endDate,
                    "MMM dd"
                  )}`
                : "Unknown Dates"}
            </span>{" "}
          </p>
        ),
        bottomMessage: "",
      };
    }
    if (path === "/ItinerarySuggestionPages/UndecidedListPage") {
      return {
        topMessage: (
          <p>
            Let&apos;s plan for{" "}
            <span className="text-5xl text-[#1A89BC]">
              {selectedTripDestination}{" "}
            </span>
            <span className="text-[#1A89BC]">
              {" "}
              {startDate && endDate
                ? `for ${format(startDate, "MMM dd")} - ${format(
                    endDate,
                    "MMM dd"
                  )}`
                : "Unknown Dates"}
            </span>
          </p>
        ),
        bottomMessage: "What do you think about these activities?",
      };
    }
    if (path === "/ItinerarySuggestionPages/LikedListPage") {
      return {
        topMessage: (
          <p>
            Let&apos;s plan for{" "}
            <span className="text-5xl text-[#1A89BC]">
              {selectedTripDestination}{" "}
            </span>
            <span className="text-[#1A89BC]">
              {" "}
              {startDate && endDate
                ? `for ${format(startDate, "MMM dd")} - ${format(
                    endDate,
                    "MMM dd"
                  )}`
                : "Unknown Dates"}
            </span>
          </p>
        ),
        bottomMessage: (<p>These are the activities you <span className="text-[#E67E22]"> liked.</span></p>),
      };
    }
    if (path === "/ItinerarySuggestionPages/DislikedListPage") {
      return {
        topMessage: (
          <p>
            Let&apos;s plan for{" "}
            <span className="text-5xl text-[#1A89BC]">
              {selectedTripDestination}{" "}
            </span>
            <span className="text-[#1A89BC]">
              {" "}
              {startDate && endDate
                ? `for ${format(startDate, "MMM dd")} - ${format(
                    endDate,
                    "MMM dd"
                  )}`
                : "Unknown Dates"}
            </span>
          </p>
        ),
        bottomMessage: (<p>These are the activities you <span className="text-[#E67E22]">did not like.</span></p>),
      };
    }

    // Account status
    if (accountStatus === "password") {
      return {
        topMessage: <p className="text-[#E67E22] pt-8"> Change Your Password </p>,
        bottomMessage: " ",
      };
    }

    if (accountStatus === "account") {
      return {
        topMessage: <p className="text-[#E67E22] pt-8"> Change Your Name </p>,
        bottomMessage: "",
      };
    }

    if (accountStatus === "mustmatch") {
      return {
        topMessage: <p>New Passwords Do Not Match! </p>,
        bottomMessage: "",
      };
    }

    if (accountStatus === "failed") {
      return {
        topMessage: <p> Old Password Is Not Correct! </p>,
        bottomMessage: " ",
      };
    }

    if (accountStatus === "successPass") {
      return {
        topMessage: <p> Password Changed Successfully </p>,
        bottomMessage: " ",
      };
    }

    if (accountStatus === "successAcc") {
      return {
        topMessage: <p> Name Changed Successfully </p>,
        bottomMessage: " ",
      };
    }

    if (accountStatus === "failAcc") {
      return {
        topMessage: <p> Name Did Not Change </p>,
        bottomMessage: " ",
      };
    }

    return {
      topMessage: (
        <p>
          {" "}
          Let&apos;s plan for {selectedTripDestination}{" "}
          {startDate && endDate
            ? `for ${format(startDate, "MMM dd")} - ${format(
                endDate,
                "MMM dd"
              )}`
            : "Unknown Dates"}{" "}
        </p>
      ),
      bottomMessage: " What activities are you excited about?",
    };
  };

  const mobile = findPath();
  const desktop = desktopLogic();
  return (
    <div>
      <div className="bg-[#E1ECFF] lg:bg-[#ECF0F1] min-h-[13rem] lg:min-h-[7.5rem] lg:max-h-[7.5rem] lg:w-full pt-10 lg:p-0 pb-10 relative ">
        <div className="mx-8 mt-9 lg:mt-0 font-inter lg:hidden">
          <img
            className="h-12 absolute left-6 top-9"
            src="/assets/Icons/itineralogo2.svg"
            alt=""
          />

          {!isHidden && <MenuComponent />}

          <div className="font-medium text-[#34495E] mt-5 ">
            {mobile.topMessage}
          </div>

          <p className="text-3xl text-[#E67E22]">{mobile.destination}</p>

          <div className={mobile.color}>{mobile.message}</div>
        </div>
        <div className="hidden lg:block mt-0 ps-10 ">
          <div className="text-3xl pt-3 ">{desktop.topMessage}</div>
          <div className="text-2xl mt-3 ">{desktop.bottomMessage}</div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
