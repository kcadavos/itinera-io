import { useSelectedTripIdContext } from '@/context/DataContext';
import React, { useState } from 'react'

const AddSuggestionComponent = () => {
    const {selectedTripId} = useSelectedTripIdContext();
    const [activity, setActivity] = useState<string>();
    const [categorty, setCategory] = useState<string>();
    const [address, setAddress] = useState<string>();
    const [detailes, setADetails] = useState<string>();

    const activityData = {
        tripId: selectedTripId,
        activity: activity,
        category: categorty,
        address: address,
        details: detailes,
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

                        <input type="text" placeholder='Activity' className='bg-white rounded-md py-1 px-2 w-full' />
                    </div>

                    <div className='flex justify-start my-4'>
                        <div className=" mr-2"> 
                            <img src="/assets/Icons/Orion_travel-ticket.svg" alt="category" className="w-8" />
                        </div>

                        <input type="text" placeholder='Catagory' className='bg-white rounded-md py-1 px-2 w-full' />
                    </div>

                    <div className='flex justify-start my-4'>
                        <div className=" mr-2"> 
                            <img src="/assets/Icons/Orion_map-marker.svg" alt="category" className="w-8" />
                        </div>

                        <input type="text" placeholder='Address' className='bg-white rounded-md py-1 px-2 w-full'/>
                    </div>

                    <div className='flex justify-start my-4'>
                        <div className=" mr-2"> 
                            <img src="/assets/Icons/Orion_map-marker2.svg" alt="category" className="w-8" />
                        </div>

                        <textarea placeholder='Details' className='bg-white rounded-md py-1 px-2 pb-36 w-full resize-none' maxLength={350}></textarea>
                    </div>
                </div>

                <div className="flex justify-center absolute -bottom-7 left-1/2 transform -translate-x-1/2">
                    <button className="bg-[#E67E22] hover:bg-[#d56b0f] border-4 border-white text-xl text-white rounded-[2.5rem] p-3 cursor-pointer" >
                    <img src="/assets/Icons/Orion_add-place_solid.svg" className="w-10" alt="add" />
                    </button>
                </div>
                
            </div>

        </div>

    </div>
  )
}

export default AddSuggestionComponent