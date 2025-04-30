'use client'

import React, { useEffect, useState } from 'react'
import { useSelectedTripIdContext, useUserIdContext } from '@/context/DataContext';
import { IActivityListData } from '@/lib/Interfaces';
import { GetDislikedActivities } from '@/lib/services/ActivityServices';
import DisikedCardComponent from '../LikedCardComponent';

const DislikedListComponent = () => {
    const {userId} = useUserIdContext();
    const {selectedTripId} = useSelectedTripIdContext();
    const [dislikedList, setDislikedList] = useState<IActivityListData[] | null>(null);
  
    useEffect(()=>{
      const getDislikedList = async ()=>{
        const dislikedListData = await GetDislikedActivities(userId, selectedTripId);
        setDislikedList(dislikedListData);
      }
      getDislikedList();         
    },[userId, selectedTripId]);

   

  return (
    <div>
      <p className='text-center text-[#2C3E50] mb-2'>These are the acivities you disliked.</p>
      <div className='mb-35' > 
        <DisikedCardComponent activities={dislikedList} />
      </div>
    </div>
    
  )
}

export default DislikedListComponent