'use client'

import React, { useEffect, useState } from 'react'
import { useSelectedTripIdContext, useSelectedTripIsVotingOpenContext, useUserIdContext } from '@/context/DataContext';
import { IActivityListData } from '@/lib/Interfaces';
import { GetLikedActivities } from '@/lib/services/ActivityServices';
import LikedCardComponent from '../LikedCardComponent';
import { getToken } from '@/lib/services/DataServices';

const LikedListComponent = () => {
    const {userId} = useUserIdContext();
    const {selectedTripId} = useSelectedTripIdContext();
    const {selectedTripIsVotingOpen} = useSelectedTripIsVotingOpenContext();
    const [likedList, setLikedList] = useState<IActivityListData[] | null>(null);
  

    const getLikedList = async ()=>{
      const likedListData = await GetLikedActivities(userId, selectedTripId, getToken());
      setLikedList(likedListData);
    }
    useEffect(()=>{
      
      getLikedList();

    },[userId, selectedTripId]);

   

  return (
    <div>
      {
        likedList != null ? 
        <div>
          {
            selectedTripIsVotingOpen ? <p className='text-center text-[#2C3E50] my-2'>These are the acivities you liked.</p> : 
            <p className='text-center text-[#2C3E50] my-2'>You&apos;re in for these!</p>
          }
          
          <div className='mb-35' > 
            <LikedCardComponent activities={likedList} getLikedList={getLikedList} />
          </div>
        </div> 
        : <p className='text-center text-[#2C3E50] mb-2'>No liked activities.</p>
      }
    </div>
    
  )
}

export default LikedListComponent