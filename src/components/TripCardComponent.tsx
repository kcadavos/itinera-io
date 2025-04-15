import { ITripData } from '@/lib/Interfaces'
import React, { useEffect } from 'react'
import { format } from 'date-fns'; 
import { useSelectedTripDestinationContext, useSelectedTripEndDateContext, useSelectedTripIdContext, useSelectedTripStartDateContext } from '@/context/DataContext';

const TripCardComponent = ({ trips }:{trips:ITripData[]}) => {
    const {selectedTripId,setSelectedTripId}= useSelectedTripIdContext();
    const {setSelectedTripDestination}= useSelectedTripDestinationContext();
    const {selectedTripStartDate,setSelectedTripStartDate}=useSelectedTripStartDateContext();
    const{selectedTripEndDate,setSelectedTripEndDate}=useSelectedTripEndDateContext();
    
    useEffect(()=>{
    console.log("COMPONENT"+trips);
    },[trips])

 const handleSelectTrip= (trip:ITripData)=>{
    setSelectedTripId (trip.id);
    setSelectedTripDestination(trip.destination);
    setSelectedTripStartDate(trip.startDate);
    setSelectedTripEndDate(trip.endDate);
 }
 useEffect (()=>{
    console.log("SELECTED TRIP"+selectedTripId);
  
 },[selectedTripId])

 useEffect (()=>{
    console.log("START" +selectedTripStartDate)
 },[selectedTripStartDate])


 useEffect (()=>{
    console.log("END" +selectedTripEndDate)
 },[selectedTripEndDate])

    return (
        <>
        <div className=''>
            
    {trips.length>0 ?
       ( <div className='flex flex-wrap justify-center gap-6 '>
    { trips.map((trip) => (
        <a key={trip.id} href="#" onClick={()=>handleSelectTrip(trip)} className="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <div className='flex justify-between'>
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{trip.destination}</h5>
    <p className="font-normal text-gray-700 dark:text-gray-400">{format(trip.startDate,'MMM-dd')} - {format(trip.endDate,'MMM-dd')}</p>
    
    </div>
    <p className="text-center font-normal text-gray-700 dark:text-gray-400">{trip.isVotingOpen? "Voting in Progress" : "Itinerary generated"}</p>
    </a>
      
    ))}
    </div>
     ): <p className='text-2xl'> No trips available</p>}
    </div>
    </>
 
  )
}

export default TripCardComponent