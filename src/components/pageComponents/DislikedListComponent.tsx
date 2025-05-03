'use client'

import React, { useEffect, useState } from 'react'
import { useSelectedTripIdContext, useUserIdContext } from '@/context/DataContext';
import { IActivityListData } from '@/lib/Interfaces';
import { GetDislikedActivities } from '@/lib/services/ActivityServices';
import DisikedCardComponent from '../DislikedCardComponent';
import { getToken } from '@/lib/services/DataServices';

const DislikedListComponent = () => {
    const {userId} = useUserIdContext();
    const {selectedTripId} = useSelectedTripIdContext();
    const [dislikedList, setDislikedList] = useState<IActivityListData[] | null>(null);
  
    useEffect(()=>{
      const getDislikedList = async ()=>{
        const dislikedListData = await GetDislikedActivities(userId, selectedTripId, getToken());
        setDislikedList(dislikedListData);
      }
      getDislikedList();         
    },[userId, selectedTripId, dislikedList]);

   

  return (
    <div>
      {
        dislikedList != null ? 
        <div>
          <p className='text-center text-[#2C3E50] mb-2'>These are the acivities you disliked.</p>
          <div className='mb-35' > 
            <DisikedCardComponent activities={dislikedList} />
          </div>
        </div>
        : <p className='text-center text-[#2C3E50] mb-2'>No disliked activities.</p>
      }
    </div>
    
  )
}

export default DislikedListComponent