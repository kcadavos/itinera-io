'use client'
import TripCardComponent from '@/components/TripCardComponent'
import {  useUserIdContext } from '@/context/DataContext'
import { ITripData } from '@/lib/Interfaces'
import { getTripListByUserId } from '@/lib/TripDataService'
import React, { useEffect, useState } from 'react'

const TripList = () => {
const {userId} = useUserIdContext();
const [tripListData,setTripListData] = useState<ITripData[]>([]);




const getTripListData = async (userId:number)=>{
    const tripList= (await getTripListByUserId(userId));
    setTripListData(tripList);
}   

useEffect(()=>{
    getTripListData(userId);
},[userId])

// useEffect(()=>{
//     console.log("INSIDE USE EFFECT"+JSON.stringify(tripListData));
// },[tripListData])

  return (
   <TripCardComponent  trips={tripListData}/>

  )
}

export default TripList