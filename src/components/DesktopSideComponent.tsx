"use client";

import React, { useEffect, useState } from "react";
import MenuComponent from "./MenuComponent";
import {
  useNameContext,
  useSelectedTripIdContext,
  useUserIdContext,
} from "@/context/DataContext";
import { useRouter } from "next/navigation";
import { ITripData } from "@/lib/TripInterfaces";
import { getToken } from "@/lib/services/DataServices";
import { GetTripListByUserId } from "@/lib/services/TripDataService";
import TripCardComponent from "./TripCardComponent";
import Link from "next/link";

const DesktopSideComponent = () => {
  const { name } = useNameContext();
  const { userId, setUserId } = useUserIdContext();
  const [tripListData, setTripListData] = useState<ITripData[]>([]);
  const { selectedTripId, setSelectedTripId } = useSelectedTripIdContext();
  const router = useRouter();

  useEffect(() => {
    const getTripListData = async () => {
      const tripList = await GetTripListByUserId(userId, getToken());
      if (tripList.length > 0 && tripList !== null) {
        setTripListData(tripList);

        if (selectedTripId == 0) setSelectedTripId(tripList[0].id);
      }
    };
    if (userId) {
      getTripListData();
      
    } else {
      setUserId(Number(sessionStorage.getItem("ItineraUserId")));
    }
  }, [selectedTripId, userId, router]);

  return (
    <div className="hidden lg:block">
      <div>
        <div className="bg-[#E1ECFF] min-h-[12rem] pt-2 pb-10 relative w-full  max-h-[13.5rem]">
          <div className="mx-6 mt-10 font-inter">
            <img
              className="h-10 absolute top-5 "
              src="/assets/Icons/itineralogo2.svg"
              alt=""
            />

            <div className="pb-2">
              <MenuComponent />
            </div>

            <div className="ml-2 ">
              <p className="font-medium text-[#34495E] ">
                Hi <span className="text-[#4A90E2] ">{name}</span>,
              </p>

              <p className="text-lg text-[#34495E]">
                Looking forward to these trips?
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-y-scroll max-h-[31rem] rounded-2xl">
        {tripListData !== null && tripListData.length > 0 && (
          <>
            <TripCardComponent trips={tripListData} />
          </>
        )}
        {tripListData.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center mt-24 px-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Ready to Explore?
            </h2>
            <p className="text-gray-600 mt-2 max-w-md">
              {" "}
              Welcome to your Trips Dashboard! You haven&apos;t planned a trip
              yet — but adventure is just a few clicks away. Start building your
              first getaway!{" "}
            </p>
          </div>
        )}
      </div>
      <div className="fixed bottom-0 w-1/4 ">
            <div className=" bg-[#1ABC9C] py-3 rounded-t-4xl ">
                <div className="text-white flex justify-center text-[2rem] font-medium ">        
                <Link
        href={{ pathname: "/Trip/AddTrip", query: { mode: "add" } }}
        className="flex items-center space-x-4"
      >
                    <p>Initiate a Trip</p>
                    <img src="/assets/Icons/Orion_aircraft 1.svg" alt="" className='w-12 h-12' />
                    </Link>
                </div>
            </div>
        </div>
    </div>
  );
};

export default DesktopSideComponent;
