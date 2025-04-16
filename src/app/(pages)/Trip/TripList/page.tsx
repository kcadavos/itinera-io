'use client'
import FooterComponent from '@/components/FooterComponent'
import TripCardComponent from '@/components/TripCardComponent'
import {  useUserIdContext } from '@/context/DataContext'
import { ITripData } from '@/lib/Interfaces'
import { getTripListByUserId } from '@/lib/TripDataService'
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'

const TripList = () => {
const router = useRouter();
const {userId} = useUserIdContext();
const [tripListData,setTripListData] = useState<ITripData[] | null>(null); //sets to null initially so that it doesnt route to add trip upon page load while data is not yet fetched


useEffect(()=>{
  if (tripListData !== null && tripListData.length <=0){
    console.log("TRIP LEN"+tripListData.length)
    router.push("/Trip/AddTrip");
  }
},[tripListData])

useEffect(()=>{
const getTripListData = async (userId:number)=>{
  const tripList= (await getTripListByUserId(userId));  
    console.log("SET TRIP LIST")
    
    setTripListData(tripList);
    
}
    getTripListData(userId);
    console.log("USER"+ userId);
},[userId]);


  return (
<>
   {( tripListData!==null && tripListData.length>0) &&

    <TripCardComponent  trips={tripListData}/> 
   }
    <FooterComponent/>
    
    </>


  )
}

export default TripList