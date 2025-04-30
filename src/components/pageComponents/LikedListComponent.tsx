'use client'

import React, { useEffect, useState } from 'react'
import { useSelectedTripIdContext, useUserIdContext } from '@/context/DataContext';
import { IActivityListData } from '@/lib/Interfaces';
import { GetLikedActivities } from '@/lib/services/ActivityServices';
import LikedCardComponent from '../LikedCardComponent';

const LikedListComponent = () => {
    const {userId} = useUserIdContext();
    const {selectedTripId} = useSelectedTripIdContext();
    const [likedList, setLikedList] = useState<IActivityListData[] | null>(null);
  
    useEffect(()=>{
      const getLikedList = async ()=>{
        const likedListData = await GetLikedActivities(userId, selectedTripId);
        setLikedList(likedListData);
      }
      getLikedList();         
    },[userId, selectedTripId]);

   

  return (
    <div>
      <p className='text-center text-[#2C3E50] mb-2'>These are the acivities you liked.</p>
      <div className='mb-35' > 
        <LikedCardComponent activities={likedList} />
      </div>
    </div>
    
  )
}

export default LikedListComponent