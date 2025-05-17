'use client'
import FooterComponent from '@/components/FooterComponent'
import TripCardComponent from '@/components/TripCardComponent'
import {  useSelectedTripIdContext, useUserIdContext } from '@/context/DataContext'
import { getToken } from '@/lib/services/DataServices'
import { ITripData } from '@/lib/TripInterfaces'
import { GetTripListByUserId } from '@/lib/services/TripDataService'
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'

const TripList = () => {
const router = useRouter();
const {userId,setUserId} = useUserIdContext();
const [tripListData,setTripListData] = useState<ITripData[] >([]); //sets to null initially so that it doesnt route to add trip upon page load while data is not yet fetched
const {selectedTripId,setSelectedTripId}=useSelectedTripIdContext();

useEffect(()=>{ // pick up triplist data
const getTripListData = async ()=>{
  const tripList= (await GetTripListByUserId(userId,getToken())); // returned data is already sorted from soonest to latest
   if (tripList.length>0 && tripList !== null)  
  {  setTripListData(tripList);

      if (selectedTripId==0)
       setSelectedTripId(tripList[0].id)
  } // this is for initial load when no selected trip yet
 
  // else{ // if no existing trips found go to add trip page
  //   const params = new URLSearchParams();
  //   params.set('mode', 'add')
  //   router.push("/Trip/AddTrip?"+params.toString());// adds a query value add if routed and not from footer link

  // }

} 
  if(userId)// if user refreshes the page, get the userId from session storage
    {
      getTripListData();
      console.log("USER"+ userId);
    }
    else{
      setUserId(Number(sessionStorage.getItem("ItineraUserId")))
    }
    console.log("TLDATA:" +JSON.stringify(tripListData));
  
},[selectedTripId,userId,router]);

              

  return (
    <div className='pb-40 '>
      {( tripListData!==null && tripListData.length>0) &&(
        <>
      <TripCardComponent  trips={tripListData}/> 
      <FooterComponent/>
        </>
      ) 
      }
      {( tripListData.length=== 0) && (
        <div className="flex flex-col items-center justify-center text-center mt-24 px-4">
        <h2 className="text-2xl font-semibold text-gray-800">Ready to Explore?</h2>
<p className="text-gray-600 mt-2 max-w-md">
Welcome to your Trips Dashboard! You haven’t planned a trip yet — but adventure is just a few clicks away. Start building your first getaway!
</p>
  
        </div>
      )}
    </div>


  )
}

export default TripList