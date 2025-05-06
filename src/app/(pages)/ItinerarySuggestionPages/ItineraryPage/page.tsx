'use client'
import CloseVotingComponent from '@/components/CloseVotingComponent'
import DisplayItineraryDayComponent from '@/components/pageComponents/DisplayItineraryDayComponent'
import { useSelectedTripIdContext, useSelectedTripIsVotingOpenContext } from '@/context/DataContext'
import { IItineraryData } from '@/lib/ItineraryInterfaces'
import { getToken } from '@/lib/services/DataServices'
import { GetItineraryListByTripId } from '@/lib/services/ItineraryServices'
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'

const ItineraryPage = () => {
const router=useRouter();
const [itineraryListData,setItineraryListData] = useState<IItineraryData[] | null>(null);
const {selectedTripIsVotingOpen}=useSelectedTripIsVotingOpenContext();
const{selectedTripId,setSelectedTripId}=useSelectedTripIdContext();

useEffect(()=>{
  const getItineraryListData =async(selectedTripId:number)=>{
    const itineraryList = await GetItineraryListByTripId(selectedTripId,getToken())
    console.log("inside get Itinerary List")
    if (itineraryList.length>0 )
      {
       console.log( "inside itineraryList!=null" +JSON.stringify(itineraryList));


        setItineraryListData(itineraryList);
      }
      else
      {
         console.log(itineraryList.length) 
        console.log("List is empty")
      }
  }
  console.log("inside use effect for tripID" +selectedTripId )
  if(selectedTripId>0)
  getItineraryListData(selectedTripId);
else 
{
  setSelectedTripId(Number(sessionStorage.getItem("ItineraSelectedTripId")));
  console.log("trip id  is not greater than 0")
  router.push("/Trip/TripList")

}
 
  
},[selectedTripId, selectedTripIsVotingOpen])

useEffect(()=>{
console.log(itineraryListData+ "ITI IS CHANGED")
},[itineraryListData])

  return (
    <div className='bg-[#ECF0F1] h-full w-screen py-5 '>

      {selectedTripIsVotingOpen  ?   <CloseVotingComponent/>: 

       ( (itineraryListData!=null && itineraryListData.length>0)?
       <DisplayItineraryDayComponent iList={itineraryListData}/>
       : <p> Missing Itinerary Data.</p>
       )
      }

    </div>
  )
}

export default ItineraryPage
