import React from 'react';
import { IItineraryData } from '@/lib/ItineraryInterfaces';
import { addDays, format } from 'date-fns';
import { useSelectedTripStartDateContext } from '@/context/DataContext';

type DisplayItineraryDetailsProps = {
    iList: IItineraryData[];
};

const DisplayItineraryDayComponent = ({iList}:DisplayItineraryDetailsProps) => {
  const{selectedTripStartDate}=useSelectedTripStartDateContext();
  return (
    <>
      {iList.map((itinerary:IItineraryData, index:number) => (
        // <div key={index}>
        //   {/* Optional debug/info */}
        //   <p>{itinerary.activityIds} IDS</p>

        //   {/* Render child component, passing entire object */}
        //   {/* <ItineraryDetailsComponent itineraryItem={itinerary} /> */}
          
        // </div>
        <div key={index} className=' mx-10 py-10  relative'>
        <div className='flex px-5  justify-between p-3 border rounded-t-2xl bg-[#1ABC9C]'>
        <img src="/assets/Icons/itineraIcon.svg" className='w-3 h-auto'/>
        <p className='text-white text-2xl'>{format(addDays(new Date(selectedTripStartDate+"T12:00:00"),index),'MMM dd')} , {format(addDays(new Date(selectedTripStartDate+"T12:00:00"),index),'EEEE')}</p>
        </div>
          {/* start of the activities in the days*/ }
        <div className=' bg-white p-3 space-y-4 rounded-b-2xl flex justify-between'>
            <div className='bg-amber-600 rounded-full w-18 h-auto p-3 border-2 border-black'>
              <img src="/assets/Icons/Orion_travel-map 1.svg" className="object-cover" alt="Activity Type Icon"/>
            </div>
             {/* <ItineraryDetailsComponent ={itinerary.activityIds}/> */}
             <p>insert activities here</p>

        <div>  
            <p className='text-lg'>
     
      </p>
      </div>
     </div>
    </div>
      ))}
    </>
  );
};

export default DisplayItineraryDayComponent;