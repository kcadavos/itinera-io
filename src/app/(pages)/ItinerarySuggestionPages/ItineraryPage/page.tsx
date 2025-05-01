'use client'
import CloseVotingComponent from '@/components/CloseVotingComponent'
import ItineraryDetailsComponent from '@/components/ItineraryDetailsComponent'
import { useSelectedTripIsVotingOpenContext } from '@/context/DataContext'
import React from 'react'

const ItineraryPage = () => {
  const {selectedTripIsVotingOpen}=useSelectedTripIsVotingOpenContext();
  return (
    <div className='bg-[#ECF0F1] h-screen w-screen py-5 '>
      {selectedTripIsVotingOpen  ?   <CloseVotingComponent/>: <ItineraryDetailsComponent/>}

    </div>
  )
}

export default ItineraryPage
