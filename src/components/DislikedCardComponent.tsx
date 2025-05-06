import { useSelectedTripIsVotingOpenContext, useUserIdContext } from '@/context/DataContext';
import {IActivityListData } from '@/lib/Interfaces'
import { RemoveVote } from '@/lib/services/ActivityServices';
import { getToken } from '@/lib/services/DataServices';
import React from 'react'

const DislikedCardComponent = ({ activities, getDislikedList }:{activities:IActivityListData[] | null, getDislikedList: () => Promise<void>;}) => {
  const bgColors: string[] = ["bg-[#1A89BC]","bg-[#4AAAE2]","bg-[#F4B400]","bg-[#E67E22]","bg-[#4A90E2]"];
  const {userId} = useUserIdContext();
  const {selectedTripIsVotingOpen} = useSelectedTripIsVotingOpenContext();
  
    const IconSwitch = (category: string) => {
        switch(category){
            case 'Adventure & Outdoors':
                return '/assets/Icons/Orion_beach.svg'
            case 'Culture & History':
                return '/assets/Icons/Orion_binocular.svg';
            case 'Food & Drink':
                return '/assets/Icons/Orion_restaurant.svg';
            case 'Relaxation & Wellness':
                return '/assets/Icons/Orion_sun-lounger.svg';
            case 'Entertainment & Nightlife':
                return '/assets/Icons/Orion_camping.svg';
            default:
                return '/assets/Icons/Orion_camera.svg'; 
        }
    }

    const removeVoteFromDisliked = async (activitiesId: number, vote: string) => {
        const voteData = {
            activityId: activitiesId,
            userId: userId,
            voteType: vote  
        }
        
        const result = await RemoveVote(voteData, getToken());
        if(result){
            console.log('success');
        }else{
            console.log('something went wrong');
        }
        getDislikedList();
    }
  
    return (
      activities?.map((activity: IActivityListData, idx: number) => (
          <div key={idx} className={`${bgColors[idx % bgColors.length]} p-4 my-2 mb-10 mx-8 sm:mx-16 md:mx-36 rounded-bl-2xl rounded-tr-2xl relative`}>
  
            {
                selectedTripIsVotingOpen ? 
                <div className="flex justify-center mt-18 absolute -top-23 -right-12 transform -translate-x-7/8">
                    <button className="bg-[#1ABC9C] hover:bg-[#67afa0] border-2 border-white text-xl text-white rounded-[2.5rem] p-[.1rem] cursor-pointer" onClick={() => removeVoteFromDisliked(activity.id, "no")} >
                        <img
                        src="/assets/Icons/Orion_remove.svg"
                        className="w-8"
                        alt="add"
                        />
                    </button>
                </div> :
                <></>
            }
  
            <div className='flex justify-between mb-3'>
      
                <div className='text-white'>
                    <h3 className='text-2xl mb-1'>{activity.activity}</h3>
                    <p className='text-md my-1'>{activity.address}</p>
                    <p className='text-xs my-2'>{activity.details}</p>
                </div>
          
                <div className='mr-5'>
                    <img src={IconSwitch(activity.category)} alt="category" className=' w-15' />
                </div>
            </div>
  
          </div>
      ))
    )
}

export default DislikedCardComponent