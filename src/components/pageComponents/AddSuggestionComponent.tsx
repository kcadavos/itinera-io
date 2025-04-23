'use client'

import { useSelectedTripIdContext } from '@/context/DataContext';
import { AddActivity } from '@/lib/services/ActivityServices';
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

const AddSuggestionComponent = () => {
    //const {selectedTripId} = useSelectedTripIdContext();
    const [activity, setActivity] = useState<string>('');
    const [categorty, setCategory] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [detailes, setDetails] = useState<string>('');

    const selectedTripId = 33

    const activityData = {
        tripId: selectedTripId,
        activity: activity,
        category: categorty,
        address: address,
        details: detailes,
    }

    const addActivityFetch = async () => {
        const result = await AddActivity(activityData);
        
        if(result){
            alert("Activity Created!");
            setActivity('');
            setCategory('');
            setAddress('');
            setDetails('');

        }else{
            alert("something went wrong");
        } 
    }



  return (
    <div>
        {/* mobile */}
        <div className="block md:hidden">
            
            <div className="bg-[#ECF0F1] rounded-2xl min-h-[28rem] min-w-[20rem] lg:min-h-[25rem] lg:max-w-[20rem] mx-4 px-4 relative mb-40">

                <div className='p-2 pt-8'>

                    <div className='flex justify-start my-4'>
                        <div className=" mr-2"> 
                            <img src="/assets/Icons/Orion_pointer.svg" alt="activity" className="w-8" />
                        </div>

                        <input type="text" placeholder='Activity' className='bg-white rounded-md py-1 px-2 w-full' onChange={(e) => setActivity(e.target.value)} />
                    </div>

                    <div className='flex justify-start my-4'>
                        <div className=" mr-2"> 
                            <img src="/assets/Icons/Orion_travel-ticket.svg" alt="category" className="w-8" />
                        </div>

                        {/* <input type="text" placeholder='Category' className='bg-white rounded-md py-1 px-2 w-full' onChange={(e) => setCategory(e.target.value)} /> */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className='bg-white rounded-md py-1 px-2 w-full text-gray-500 text-start'>Category</button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-64 border-1 border-black">
                                <DropdownMenuGroup className='text-gray-500'>
                                    <DropdownMenuItem >Adventure & Outdoors</DropdownMenuItem>
                                    <DropdownMenuItem >Culture & History</DropdownMenuItem>
                                    <DropdownMenuItem >Food & Drink</DropdownMenuItem>
                                    <DropdownMenuItem >Relaxation & Wellness</DropdownMenuItem>
                                    <DropdownMenuItem >Entertainment &</DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className='flex justify-start my-4'>
                        <div className=" mr-2"> 
                            <img src="/assets/Icons/Orion_map-marker.svg" alt="category" className="w-8" />
                        </div>

                        <input type="text" placeholder='Address' className='bg-white rounded-md py-1 px-2 w-full' onChange={(e) => setAddress(e.target.value)}/>
                    </div>

                    <div className='flex justify-start my-4'>
                        <div className=" mr-2"> 
                            <img src="/assets/Icons/Orion_map-marker2.svg" alt="category" className="w-8" />
                        </div>

                        <textarea placeholder='Details' className='bg-white rounded-md py-1 px-2 pb-36 w-full resize-none' maxLength={350} onChange={(e) => setDetails(e.target.value)}></textarea>
                    </div>
                </div>

                <div className="flex justify-center absolute -bottom-7 left-1/2 transform -translate-x-1/2">
                    <button className="bg-[#E67E22] hover:bg-[#d56b0f] border-4 border-white text-xl text-white rounded-[2.5rem] p-3 cursor-pointer" >
                    <img src="/assets/Icons/Orion_add-place_solid.svg" className="w-10" alt="add" onClick={addActivityFetch} />
                    </button>
                </div>
                
            </div>

        </div>

    </div>
  )
}

export default AddSuggestionComponent