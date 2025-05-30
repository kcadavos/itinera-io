'use client'

import React, { useEffect, useState } from 'react'
import UndecidedCardComponent from '../UndecidedCardComponent'
import { useSelectedTripIdContext, useSelectedTripIsVotingOpenContext, useUserIdContext } from '@/context/DataContext';
import { GetUndecidedActivities } from '@/lib/services/ActivityServices';
import {IActivityListData} from '@/lib/Interfaces';
import { getToken } from '@/lib/services/DataServices';

const UndecidedListComponent = () => {
  const {userId} = useUserIdContext();
  const {selectedTripId} = useSelectedTripIdContext();
  const {selectedTripIsVotingOpen} = useSelectedTripIsVotingOpenContext();
  const [undecidedList, setUndecidedList] = useState<IActivityListData[] | null>(null);


  const getUndecidedList = async () => {
    const undecidedListData = await GetUndecidedActivities(userId, selectedTripId, getToken());
    setUndecidedList(undecidedListData);
  }

  useEffect(()=>{
    
    getUndecidedList();
       
  },[userId, selectedTripId]);

  
  return (
    <div>
      { 
        undecidedList != null ? 
        <div >
          {
            selectedTripIsVotingOpen ? <p className='text-center text-[#2C3E50] my-2'>What do you think about these activities?</p> : 
            <p className='text-center text-[#2C3E50] my-2'>Here&apos;s what you didn&apos;t get a chance to vote on.</p>
          }

          <div className='mb-35' >
            <UndecidedCardComponent activities={undecidedList} getUndecidedList={getUndecidedList} />
          </div>        
        </div> 
        : <p className='text-center text-xl pt-5 text-[#2C3E50] mb-2'>No undecided activities.</p>
      }
    </div>
    
  )
}

export default UndecidedListComponent