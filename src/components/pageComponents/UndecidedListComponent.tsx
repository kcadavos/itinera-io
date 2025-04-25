'use client'

import React, { useEffect, useState } from 'react'
import UndecidedCardComponent from '../UndecidedCardComponent'
import { useSelectedTripIdContext, useUserIdContext } from '@/context/DataContext';
import { GetUndecidedActivities } from '@/lib/services/ActivityServices';
import { IUndecidedData } from '@/lib/Interfaces';

const UndecidedListComponent = () => {
  const {userId} = useUserIdContext();
  const {selectedTripId} = useSelectedTripIdContext();
  const [undecidedList, setUndercidedList] = useState<IUndecidedData[] | null>(null);

  useEffect(()=>{
    const getUndecidedList = async ()=>{
      const undecidedListData = await GetUndecidedActivities(userId, selectedTripId);
      setUndercidedList(undecidedListData);
    }
    getUndecidedList();
       
  },[userId]);
  },[userId]);

  return (
    <div>
      <p className='text-center text-[#2C3E50] mb-2'>What do you think about these activities?</p>
      <UndecidedCardComponent activities={undecidedList} />
    </div>
  )
}

export default UndecidedListComponent