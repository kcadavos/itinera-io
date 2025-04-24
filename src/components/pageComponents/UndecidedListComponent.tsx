'use client'

import React, { useEffect } from 'react'
import UndecidedCardComponent from '../UndecidedCardComponent'
import { useSelectedTripIdContext, useUserIdContext } from '@/context/DataContext';
import { GetUndecidedActivities } from '@/lib/services/ActivityServices';

const UndecidedListComponent = () => {
    const {userId} = useUserIdContext();
    const {selectedTripId} = useSelectedTripIdContext();
    // useState for the list data

    useEffect(()=>{
        const getUndecidedList = async ()=>{
            const undecidedListData = await GetUndecidedActivities(userId, selectedTripId);
        }
        getUndecidedList();
       
    },[userId]);

  return (
    <div>
        <p className='text-center text-[#2C3E50] mb-2'>What do you think about these activities?</p>
        <UndecidedCardComponent />
    </div>
  )
}

export default UndecidedListComponent