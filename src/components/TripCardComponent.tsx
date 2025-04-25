import { ITripData } from "@/lib/Interfaces";
import React, { useEffect, useRef } from "react";
import { format } from "date-fns";
import {
  useSelectedTripDestinationContext,
  useSelectedTripEndDateContext,
  useSelectedTripIdContext,
  useSelectedTripStartDateContext,
} from "@/context/DataContext";
import { useRouter } from "next/navigation";

// for accordion
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TripCardComponent = ({ trips }: { trips: ITripData[] }) => {
  const bgColors = [
    "bg-[#1A89BC]",
    "bg-[#4AAAE2]",
    "bg-[#F4B400]",
    "bg-[#E67E22]",
    "bg-[#4A90E2]",
  ]; // for alternating the trip colors
  const router = useRouter();
  const { selectedTripId, setSelectedTripId } = useSelectedTripIdContext();
  const { setSelectedTripDestination } = useSelectedTripDestinationContext();
  const { selectedTripStartDate, setSelectedTripStartDate } =
    useSelectedTripStartDateContext();
  const { selectedTripEndDate, setSelectedTripEndDate } =
    useSelectedTripEndDateContext();

  // Refs to autos croll to selected trip
  const tripRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleSelectTrip = (trip: ITripData) => {
    setSelectedTripId(trip.id);
    setSelectedTripDestination(trip.destination);
    setSelectedTripStartDate(trip.startDate);
    setSelectedTripEndDate(trip.endDate);

    if (trip.isVotingOpen) {
      router.push("/ItinerarySuggestionPages/AddSuggestionPage");
    } else {
      router.push("/Itinerary/ViewItinerary");
    }
  };
  // Auto scroll to expanded accordion item
  useEffect(() => {
    const index = trips.findIndex((trip) => trip.id === selectedTripId);
    const ref = tripRefs.current[index];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedTripId]);

  useEffect(() => {
    console.log("SELECTED TRIP" + selectedTripId);
  }, [selectedTripId]);

  useEffect(() => {
    console.log("START " + selectedTripStartDate);
  }, [selectedTripStartDate]);

  useEffect(() => {
    console.log("END " + selectedTripEndDate);
  }, [selectedTripEndDate]);

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
              className={`border border-white rounded-2xl p-6 w-full relative ${
                index !== 0 ? "-mt-6" : ""
              } ${bgColors[index % bgColors.length]}`}
            >
              <div
                ref={(el) => {
                  tripRefs.current[index] = el;
                }}
              >
                <AccordionTrigger className="flex justify-between   items-center  w-full   [&>svg]:hidden ">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-white capitalize">
                    {trip.destination}
                  </h5>
                  <p className="font-normal text-lg text-white">
                    {format(new Date(trip.startDate + "T12:00:00"), "MMM dd")}-
                    {format(new Date(trip.endDate + "T12:00:00"), "MMM dd")}
                  </p>
                </AccordionTrigger>
                <AccordionContent>
                  <div onClick={() => handleSelectTrip(trip)}>
                    <p className="text-center font-normal text-3xl text-white">
                      {trip.isVotingOpen
                        ? "Voting in Progress"
                        : "Itinerary generated"}
                    </p>
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
