'use client'
import FooterComponent from '@/components/FooterComponent'
import TripCardComponent from '@/components/TripCardComponent'
import {  useSelectedTripIdContext, useUserIdContext } from '@/context/DataContext'
import { getToken } from '@/lib/services/DataServices'
import { ITripData } from '@/lib/Interfaces'
import { GetTripListByUserId } from '@/lib/services/TripDataService'
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'

const TripList = () => {
const router = useRouter();
const {userId} = useUserIdContext();
const [tripListData,setTripListData] = useState<ITripData[] | null>(null); //sets to null initially so that it doesnt route to add trip upon page load while data is not yet fetched
const {selectedTripId,setSelectedTripId}=useSelectedTripIdContext();

// routing when trip list is empty
useEffect(()=>{
  if (tripListData !== null && tripListData.length ===0)
    {
      router.push("/Trip/AddTrip");
    }
  
},[router,tripListData])

useEffect(()=>{
const getTripListData = async (userId:number)=>{
  const tripList= (await GetTripListByUserId(userId,getToken()));
  //  Sort by startDate (earliest first)
  const sortedTrips = tripList.sort((a:ITripData, b:ITripData) =>  new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    setTripListData(sortedTrips);
    if (selectedTripId==0){
      setSelectedTripId(sortedTrips[0].id)
    } // this is for initial load when no selected trip yet
   
}
    getTripListData(userId);
    console.log("USER"+ userId);
},[userId]);


  return (
    <div className='pb-40'>
      {( tripListData!==null && tripListData.length>0) &&(
        <>
      <TripCardComponent  trips={tripListData}/> 
        <FooterComponent/>
        </>
      )

        
      }

    </div>


  )
}

export default TripList