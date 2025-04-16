'use client'
import AddTripComponent from '@/components/AddTripComponent'
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
<>
    {/* // if  user has trips they are part of , display trip cards else display add trip component */}
    { tripListData.length>0 ?  <TripCardComponent  trips={tripListData}/> : <AddTripComponent />}
    </>

  )
}

export default TripList