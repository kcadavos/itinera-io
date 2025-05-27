'use client'

import React, { useEffect, useState } from 'react'
import { useSelectedTripIdContext, useSelectedTripIsVotingOpenContext, useUserIdContext } from '@/context/DataContext';
import { IActivityListData } from '@/lib/Interfaces';
import { GetDislikedActivities } from '@/lib/services/ActivityServices';
import DisikedCardComponent from '../DislikedCardComponent';
import { getToken } from '@/lib/services/DataServices';

const DislikedListComponent = () => {
    const {userId} = useUserIdContext();
    const {selectedTripId} = useSelectedTripIdContext();
    const {selectedTripIsVotingOpen} = useSelectedTripIsVotingOpenContext();
    const [dislikedList, setDislikedList] = useState<IActivityListData[] | null>(null);
  

    const getDislikedList = async ()=>{
      const dislikedListData = await GetDislikedActivities(userId, selectedTripId, getToken());
      setDislikedList(dislikedListData);
    }
    useEffect(()=>{
            
      getDislikedList();    

    },[userId, selectedTripId]);

   

  return (
    <div>
      {
        dislikedList != null ? 
        <div>
          {
            selectedTripIsVotingOpen ? <p className='text-center text-[#2C3E50] my-2'>These are the acivities you disliked.</p>: 
            <p className='text-center text-[#2C3E50] my-2'>You passed on these.</p>
          }
          
          <div className='mb-35' > 
            <DisikedCardComponent activities={dislikedList} getDislikedList={getDislikedList} />
          </div>
        </div>
        : <p className='text-center text-[#2C3E50] mb-2'>No disliked activities.</p>
      }
    </div>
    
  )
}

export default DislikedListComponent