// import { useSelectedTripStartDateContext } from '@/context/DataContext'
// import { format } from 'date-fns';
import React from 'react'

const ItineraryDetailsComponent = () => {
    // const{selectedTripStartDate}=useSelectedTripStartDateContext();
  return (
    <div className=' mx-10 py-10  relative'>
        <div className='flex px-5  justify-between p-3 border rounded-t-2xl bg-[#1ABC9C]'>
        <img src="/assets/Icons/itineraIcon.svg" className='w-3 h-auto'/>
        {/* <p className='text-white text-2xl'>{format(new Date(selectedTripStartDate+"T12:00:00"),'MMM dd')} , {format(new Date(selectedTripStartDate+"T12:00:00"),'EEEE')}</p> */}
        </div>
          {/* start of the activities in the days*/ }
        <div className=' bg-white p-3 space-y-4 rounded-b-2xl flex justify-between'>
            <div className='bg-amber-600 rounded-full w-18 h-auto p-3 border-2 border-black'>
              <img src="/assets/Icons/Orion_travel-map 1.svg" className="object-cover" alt="Generate Itinerary"/>
            </div>
              <div className='flex flex-col  w-full  items-end'>
                <p className='text-2xl  font-medium'> Whale Watching</p>
                <p className='text-xl'>  Address</p>

              </div>

        <div>  
            <p className='text-lg'>
     
      </p>
      </div>
     </div>
    </div>
  )
}

export default ItineraryDetailsComponent