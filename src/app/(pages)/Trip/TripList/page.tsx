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
const [tripListData,setTripListData] = useState<ITripData[] | null>(null); //sets to null initially so that it doesnt route to add trip upon page load while data is not yet fetched
const {selectedTripId,setSelectedTripId}=useSelectedTripIdContext();

// routing to add trips when trip list is empty
// useEffect(()=>{
//   if (tripListData !== null && tripListData.length ===0)
//     {
//       console.log("ROUTER PUSH");
//       router.push("/Trip/AddTrip");
//     }
// },[router,tripListData])

useEffect(()=>{ // pick up triplist data
const getTripListData = async ()=>{
  const tripList= (await GetTripListByUserId(userId,getToken()));
  //  Sort by startDate (earliest first)
  // const sortedTrips = tripList.sort((a:ITripData, b:ITripData) =>  new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  if (tripList.length>0 && tripList !== null)  
  {  setTripListData(tripList);

      if (selectedTripId==0)
       setSelectedTripId(tripList[0].id)
  } // this is for initial load when no selected trip yet
 
  else{ // if no existing trips found go to add trip page
    const params = new URLSearchParams();
    params.set('mode', 'add')
    router.push("/Trip/AddTrip?"+params.toString());// adds a query value add if routed and not from footer link

  }

} 
  if(userId)// if user refreshes the page, get the userId from session storage
    {
      getTripListData();
      console.log("USER"+ userId);
    }
    else{
      setUserId(Number(sessionStorage.getItem("ItineraUserId")))
    }
  
},[selectedTripId,userId,router]);

              

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