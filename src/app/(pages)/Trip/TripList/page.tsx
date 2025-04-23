'use client'
import FooterComponent from '@/components/FooterComponent'
import TripCardComponent from '@/components/TripCardComponent'
import {  useUserIdContext } from '@/context/DataContext'
import { getToken } from '@/lib/services/DataServices'
import { ITripData } from '@/lib/Interfaces'
import { GetTripListByUserId } from '@/lib/services/TripDataService'
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'

const TripList = () => {
const router = useRouter();
const {userId} = useUserIdContext();
const [tripListData,setTripListData] = useState<ITripData[] | null>(null); //sets to null initially so that it doesnt route to add trip upon page load while data is not yet fetched


useEffect(()=>{
  if (tripListData !== null && tripListData.length ===0)
    {
    
      router.push("/Trip/AddTrip");
    }
  
},[router,tripListData])

useEffect(()=>{
const getTripListData = async (userId:number)=>{

  const tripList= (await GetTripListByUserId(userId,getToken()));

//  Sort by startDate (latest first)
  const sortedTrips = tripList.sort((a:ITripData, b:ITripData) =>  new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

    setTripListData(sortedTrips);
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