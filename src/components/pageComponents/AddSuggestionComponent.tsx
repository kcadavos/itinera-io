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
import { useRouter } from 'next/navigation';

const AddSuggestionComponent = () => {
    const {selectedTripId} = useSelectedTripIdContext();
    const [activity, setActivity] = useState<string>('');
    const [categorty, setCategory] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [detailes, setDetails] = useState<string>('');

    const router = useRouter();


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
            router.push('/ItinerarySuggestionPages/UndecidedListPage');

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
                                <button className='bg-white rounded-md py-1 px-2 w-full text-[#34495E]/60 text-start hover:border-1 hover:border-black'>
                                    <div className='flex justify-between'>
                                        Category
                                        <svg width="14" height="18" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" className='pt-1 pr-1'>
                                            <path d="M8.0002 14L0.205975 0.500001L15.7944 0.500002L8.0002 14Z" fill="#6A6A6A" fillOpacity="0.56"/>
                                        </svg>
                                    </div>
                                    
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-64 border-1 border-black">
                                <DropdownMenuGroup className='text-[#34495E]/60'>
                                {
                                    categorty == 'Adventure & Outdoors' ? <DropdownMenuItem className='bg-[#ECF0F1]'>Adventure & Outdoors</DropdownMenuItem> : <DropdownMenuItem onClick={() => setCategory('Adventure & Outdoors')} >Adventure & Outdoors</DropdownMenuItem>       
                                }
                                {
                                    categorty == 'Culture & History' ? <DropdownMenuItem className='bg-[#ECF0F1]'>Culture & History</DropdownMenuItem> : <DropdownMenuItem onClick={() => setCategory('Culture & History')}>Culture & History</DropdownMenuItem>
                                }
                                {
                                    categorty == 'Food & Drink' ? <DropdownMenuItem className='bg-[#ECF0F1]'>Food & Drink</DropdownMenuItem> : <DropdownMenuItem onClick={() => setCategory('Food & Drink')}>Food & Drink</DropdownMenuItem>
                                }
                                {
                                    categorty == 'Relaxation & Wellness' ? <DropdownMenuItem className='bg-[#ECF0F1]'>Relaxation & Wellness</DropdownMenuItem> : <DropdownMenuItem onClick={() => setCategory('Relaxation & Wellness')}>Relaxation & Wellness</DropdownMenuItem>
                                }
                                {
                                    categorty == 'Entertainment & Nightlife' ? <DropdownMenuItem className='bg-[#ECF0F1]'>Entertainment & Nightlife</DropdownMenuItem> : <DropdownMenuItem onClick={() => setCategory('Entertainment & Nightlife')}>Entertainment & Nightlife</DropdownMenuItem>
                                }
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