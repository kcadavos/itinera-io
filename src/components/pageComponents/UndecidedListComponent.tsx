'use client'

import React, { useEffect, useState } from 'react'
import UndecidedCardComponent from '../UndecidedCardComponent'
import { useSelectedTripIdContext, useUserIdContext } from '@/context/DataContext';
import { GetUndecidedActivities } from '@/lib/services/ActivityServices';
import {IActivityListData} from '@/lib/Interfaces';
import { getToken } from '@/lib/services/DataServices';

const UndecidedListComponent = () => {
  const {userId} = useUserIdContext();
  const {selectedTripId} = useSelectedTripIdContext();
  const [undecidedList, setUndecidedList] = useState<IActivityListData[] | null>(null);

  useEffect(()=>{
    const getUndecidedList = async ()=>{
      const undecidedListData = await GetUndecidedActivities(userId, selectedTripId, getToken());
      setUndecidedList(undecidedListData);
    }
    getUndecidedList();
       
  },[userId, selectedTripId]);

  
  return (
    <div>
      { 
        undecidedList != null ? 
        <div>
          <p className='text-center text-[#2C3E50] mb-2'>What do you think about these activities?</p>
          <div className='mb-35' >
            <UndecidedCardComponent activities={undecidedList} />
          </div>        
        </div> 
        : <p className='text-center text-[#2C3E50] mb-2'>No undecided activities.</p>
      }
    </div>
    
  )
}

export default UndecidedListComponent