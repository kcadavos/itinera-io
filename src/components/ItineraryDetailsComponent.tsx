// import { useSelectedTripStartDateContext } from '@/context/DataContext'
// import { format } from 'date-fns';
import { IItineraryData } from '@/lib/ItineraryInterfaces'
import React from 'react'
type Props = {
    itineraryItem: IItineraryData;
  };
  

const ItineraryDetailsComponent = ({ itineraryItem }: Props) => {
    // const{selectedTripStartDate}=useSelectedTripStartDateContext();
  return (
    <> <p> {itineraryItem.activityIds}ACTIVITIES</p></>
  )
}

export default ItineraryDetailsComponent