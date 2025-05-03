'use client'
import CloseVotingComponent from '@/components/CloseVotingComponent'
import DisplayItineraryDayComponent from '@/components/pageComponents/DisplayItineraryDayComponent'
import { useSelectedTripIdContext, useSelectedTripIsVotingOpenContext } from '@/context/DataContext'
import { IItineraryData } from '@/lib/ItineraryInterfaces'
import { getToken } from '@/lib/services/DataServices'
import { GetItineraryListByTripId } from '@/lib/services/ItineraryServices'
import React, { useEffect, useState } from 'react'

const ItineraryPage = () => {

const [itineraryListData,setItineraryListData] = useState<IItineraryData[] | null>(null);
const {selectedTripIsVotingOpen}=useSelectedTripIsVotingOpenContext();
const{selectedTripId}=useSelectedTripIdContext();

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
  getItineraryListData(selectedTripId);
  
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
