
import { INotificationData, NotificationTypeEnum } from '@/lib/NotificationInterfaces'
import { getToken } from '@/lib/services/DataServices';
import { GetTripDetails } from '@/lib/services/TripDataService';
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'; 
import { useSelectedTripIdContext } from '@/context/DataContext';
import { useRouter } from 'next/navigation';

const NotificationComponent = ({notification,index}:{notification:INotificationData,index:number}) => {
    const router = useRouter();
    const [componentMsg1,setComponentMsg1]= useState <string>("");
    const [componentMsg2,setComponentMsg2]=useState<string>("");
    const [tripDestination,setTripDestination]=useState<string>("");
    const {setSelectedTripId}=useSelectedTripIdContext();

    const bgColors: string[] = ["bg-[#1A89BC]","bg-[#4AAAE2]","bg-[#F4B400]","bg-[#E67E22]","bg-[#4A90E2]"];
    const IconSwitch = (referenceTable: string) => {
        switch(referenceTable){
        case 'trip':
            return '/assets/Icons/Orion_aircraft-climb_white_weight2.svg';
        case 'activity':
            return '/assets/Icons/Orion_markers 1.svg'
        case 'itinerary':
            return '/assets/Icons/Orion_travel-map 1.svg';
        default:
            return '/assets/Icons/Orion_camera.svg'; 
        }
    }


    
    useEffect(()=>{
        const FetchTripDetailsAndFormatMsg=async()=>{
            const tripData = await GetTripDetails(notification.referenceId,getToken());
            if (!tripData)
                {
    
                    console.log("No trip data found");
                    return;
                }
            setTripDestination(tripData.destination);
           
            switch(notification.type){
                case NotificationTypeEnum.TripAdded: 
                    setComponentMsg1("You've been invited to an adventure in  ");
                    const formattedStartDate= format(new Date(tripData.startDate + "T12:00:00"), 'MMM dd');
                    const formattedEndDate= format(new Date(tripData.endDate + "T12:00:00"), 'MMM dd, yyyy');
                    setComponentMsg2("on "+formattedStartDate+"-"+formattedEndDate);
                    break;
                  case NotificationTypeEnum.TripUpdated: 
                    setComponentMsg1("Your trip to ");
        
                    setComponentMsg2("has been updated");
                    break;
                    case NotificationTypeEnum.ItineraryGenerated: 
                    setComponentMsg1("Your new itinerary for ");
 
                    setComponentMsg2("is ready to explore");
                    break;
                default: 
                    setComponentMsg1("You have a new notification");
                    setComponentMsg2("");
                    break;
            }
              

        }
      
        FetchTripDetailsAndFormatMsg();

    },[notification])

    const handleNotificationClick=()=>{// route to trip cards and set the selected trip context based on the card that was clicked
        setSelectedTripId(notification.referenceId); // references to the trip id for this notification
        router.push('/Trip/TripList');
    }

  return (
    <>
  
        <div  className={`${bgColors[index % bgColors.length]} cursor-pointer text-white p-4 my-2 mb-10 mx-8 sm:mx-16 md:mx-36 rounded-bl-2xl rounded-tr-2xl relative flex flex-col`} onClick={handleNotificationClick}>
       
            <p> {componentMsg1}</p>
            <div className='flex justify-between'>
  
                <div>
                    <h3 className='text-2xl mb-1'>{tripDestination}</h3>
                    <p> {componentMsg2}</p>
                </div>
            

                <div className='flex align-middle'>
                    <img src={IconSwitch(notification.referenceTable)} alt="category" className=' w-15 opacity-50   ' />
                </div>
            </div>
        </div>
      
    </>
    
  )
}

export default NotificationComponent