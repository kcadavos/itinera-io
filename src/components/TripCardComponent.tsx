import { ITripData } from "@/lib/TripInterfaces";
import React, { useEffect, useRef } from "react";
import { format } from "date-fns";
import {
  useSelectedTripDestinationContext,
  useSelectedTripEndDateContext,
  useSelectedTripIdContext,
  useSelectedTripIsVotingOpenContext,
  useSelectedTripOwnerIdContext,
  useSelectedTripParticipantsIdListContext,
  useSelectedTripStartDateContext,
  useUserIdContext,
} from "@/context/DataContext";
import { useRouter } from "next/navigation";

// for accordion
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GetTripDetails } from "@/lib/services/TripDataService";
import { getToken } from "@/lib/services/DataServices";

const TripCardComponent = ({ trips }: { trips: ITripData[] }) => {
  console.log(trips);
  const bgColors = [
    "bg-[#1A89BC]",
    "bg-[#4AAAE2]",
    "bg-[#F4B400]",
    "bg-[#E67E22]",
    "bg-[#4A90E2]",
  ]; // for alternating the trip colors
  const router = useRouter();
  const { userId } = useUserIdContext();
  const { selectedTripId, setSelectedTripId } = useSelectedTripIdContext();
  const { setSelectedTripDestination } = useSelectedTripDestinationContext();
  const { setSelectedTripStartDate } =
    useSelectedTripStartDateContext();
  const {  setSelectedTripEndDate } =
    useSelectedTripEndDateContext();
  const { setSelectedParticipantsIdList } =
    useSelectedTripParticipantsIdListContext();
  const { setSelectedTripOwnerId } = useSelectedTripOwnerIdContext();
  const { setSelectedTripIsVotingOpen } = useSelectedTripIsVotingOpenContext();

  // Refs to autos croll to selected trip
  const tripRefs = useRef<(HTMLDivElement | null)[]>([]);

  // const updateTripContext = (trip: ITripData) => {

    
  //   console.log(trip+  "TRIP data 50");
  //   setSelectedTripId(trip.id);
  //   setSelectedTripDestination(trip.destination);
  //   setSelectedTripStartDate(trip.startDate);
  //   setSelectedTripEndDate(trip.endDate);
  //   setSelectedParticipantsIdList(trip.participantsId);
  //   setSelectedTripOwnerId(trip.ownerId);
  //   setSelectedTripIsVotingOpen(trip.isVotingOpen);
  // };

  const updateTripContext = async (trip?: ITripData) => {
    if (!trip) {
      // Trip is undefined, fetch from session or API
      const storedTripId = Number(sessionStorage.getItem("ItineraSelectedTripId"));
      
      if (!storedTripId || isNaN(storedTripId)) {
        console.error("No trip ID available to fetch trip data.");
        return;
      }
  
      try {
        const fetchedTrip = await GetTripDetails(storedTripId, getToken());
        
        if (fetchedTrip) {
          console.log("Fetched trip from API:", fetchedTrip);
          updateTripContext(fetchedTrip); // Recursively call with valid trip
        } else {
          console.error("Trip not found.");
        }
      } catch (err) {
        console.error("Failed to fetch trip:", err);
      }
  
      return;
    }
  
    // Trip exists, update context
    console.log(trip, "TRIP data 50");
    setSelectedTripId(trip.id);
    setSelectedTripDestination(trip.destination);
    setSelectedTripStartDate(trip.startDate);
    setSelectedTripEndDate(trip.endDate);
    setSelectedParticipantsIdList(trip.participantsId);
    setSelectedTripOwnerId(trip.ownerId);
    setSelectedTripIsVotingOpen(trip.isVotingOpen);
  };

  const handleSelectTrip = (trip: ITripData) => {
    if (trip.isVotingOpen) {
      router.push("/ItinerarySuggestionPages/UndecidedListPage");
    } else {
      router.push("/ItinerarySuggestionPages/ItineraryPage");
    }
  };

  const handleEditTrip = () => {
    router.push("/Trip/AddTrip");
  };


  // Auto scroll to expanded accordion item
  useEffect(() => {
    const index = trips.findIndex((trip) => trip.id === selectedTripId);
    const ref = tripRefs.current[index];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (selectedTripId)
      {
         console.log("TRIPS INDEX" +index);
         console.log((JSON.stringify( trips[index])));
         console.log("len"+ trips.length);
        updateTripContext(trips[index]);
      }
    else
      setSelectedTripId(
        Number(sessionStorage.getItem("ItineraSelectedTripId"))
      );
  }, [selectedTripId, trips]);

  useEffect(() => {
    console.log("TRIP ID CHANGED" + selectedTripId);
    if (selectedTripId >= 0)
      sessionStorage.setItem("ItineraSelectedTripId", String(selectedTripId));
  }, [selectedTripId]);

  return (
    <>
      {/*Accordion */}
      {/* value is for indicating what is collapsed in the accordion*/}
      <Accordion
        type="single"
        collapsible
        value={`${selectedTripId}`}
        onValueChange={(val) => setSelectedTripId(Number(val))}
        className="w-full p-6 "
      >
        {trips.length > 0 ? (
          trips.map((trip, index) => (
            <AccordionItem
              key={index}
              value={`${trip.id}`}
              className={`border  border-white rounded-2xl p-6 w-full relative ${
                index !== 0 ? "-mt-6" : ""
              } ${bgColors[index % bgColors.length]}`}
              onClick={() => updateTripContext(trip)}
            >
              <div
                ref={(el) => {
                  tripRefs.current[index] = el;
                }}
              >
                <AccordionTrigger className="flex justify-between   items-center  w-full   [&>svg]:hidden cursor-pointer">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-white capitalize">
                    {trip.destination}
                  </h5>
                  <p className="font-normal text-lg text-white">
                    {format(new Date(trip.startDate + "T12:00:00"), "MMM dd")}-
                    {format(new Date(trip.endDate + "T12:00:00"), "MMM dd")}
                  </p>
                </AccordionTrigger>
                <AccordionContent>
                  <div>
                    <p className=" text-center font-normal text-3xl lg:text-2xl text-white mb-5 ">
                      {trip.isVotingOpen
                        ? "Voting in Progress"
                        : "Itinerary generated"}
                    </p>

                    <div className="flex justify-between ">
                      <div
                        className="flex  flex-col  items-center gap-2 cursor-pointer hover:opacity-80"
                        onClick={() => handleEditTrip()}
                      >
                        <img
                          src="/assets/Icons/Orion_aircraft_lightweight_white.svg"
                          alt="Edit/ View Trip Details"
                          className="w-auto h-20 lg:h-12"
                        />

                        <p className="text-center font-normal  text-lg  text-white ">
                          {" "}
                          {userId === trip.ownerId && trip.isVotingOpen == true
                            ? "Edit Trip Details"
                            : "View Trip Details"}
                        </p>
                      </div>
                      {trip.isVotingOpen ? (
                        <div
                          className=" flex  flex-col  items-center gap-2  hover:cursor-pointer hover:opacity-80"
                          onClick={() => handleSelectTrip(trip)}
                        >
                          <img
                            src="/assets/Icons/Orion_markers_lightweight_white.svg"
                            alt="View Activities"
                            className="w-auto h-20 lg:h-12"
                          />
                          <p className=" text-center font-normal text-lg text-white ">
                            View Activities
                          </p>
                        </div>
                      ) : (
                        <div
                          className="flex  flex-col  items-center gap-2 hover:cursor-pointer hover:opacity-80"
                          onClick={() => handleSelectTrip(trip)}
                        >
                          <img
                            src="/assets/Icons/Orion_travel-map_lightweight_white.svg"
                            alt="View Itinerary"
                            className=" w-auto h-20 lg:h-12"
                          />
                          <p className=" text-center font-normal   text-lg text-white ">
                            View Itinerary
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </div>
            </AccordionItem>
          ))
        ) : (
          <p className="text-2xl"> No trips data list available</p>
        )}
      </Accordion>
    </>
  );
};

export default TripCardComponent;
