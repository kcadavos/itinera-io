import React from 'react';
import { IItineraryData } from '@/lib/ItineraryInterfaces';
import { addDays, format } from 'date-fns';
import { useSelectedTripStartDateContext } from '@/context/DataContext';
import ItineraryActivityDetailsComponent from '../ItineraryActivityDetailsComponent';

type DisplayItineraryDetailsProps = {
    iList: IItineraryData[];
};

const DisplayItineraryDayComponent = ({iList}:DisplayItineraryDetailsProps) => {
  const{selectedTripStartDate}=useSelectedTripStartDateContext();


  return (
    <>
      {iList.map((itinerary:IItineraryData, index:number) => (
 

        //itinerary day section 
        <div key={index} className=' mx-10 py-10  relative'> 

        {/*itinerary day header*/ }
        <div className='flex px-5  justify-between p-3 border rounded-t-2xl bg-[#1ABC9C]'>
        <img src="/assets/Icons/itineraIcon.svg" className='w-3 h-auto ms-6'/>
        <p className='text-white text-2xl'>{format(addDays(new Date(selectedTripStartDate+"T12:00:00"),index),'MMM dd')} , {format(addDays(new Date(selectedTripStartDate+"T12:00:00"),index),'EEEE')}</p>
        </div>  {/*end of itinerary day header*/ }


          {/* start of the activities in the days section*/ }
          <div className=' bg-white p-3 space-y-4 rounded-b-2xl ' >
        
            {itinerary.activityIds.map((activityId: number, idx:number )=>(
            
           <div key={activityId} id="activityComponent" className='pb-10'>
              <ItineraryActivityDetailsComponent activityId={activityId} index={idx} iListLength={itinerary.activityIds.length}/>
         
            </div>))} 
            {/* end of mapping activity details */}
            
          </div> 
        
        </div>
      ))}
  </>
  );
};

export default DisplayItineraryDayComponent;