'use client'

import { useSelectedTripIdContext, useUserIdContext } from '@/context/DataContext';
import { getToken } from '@/lib/services/DataServices';
import {  AddTripReturnTripId, GetParticipantsId } from '@/lib/services/TripDataService';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

// for date picker
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns"


const AddTripComponent = () => {
    const router = useRouter();

    // context for selected trip when trip is added
    const {setSelectedTripId}= useSelectedTripIdContext();

    // add new trip useStates
    const [destination,setDestination]= useState<string>('');
    // const [startDate, setStartDate] = useState<string>('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    // const[endDate,setEndDate]= useState<string> ('');
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [participantIds, setParticipantIds] = useState<number[]> ([]);
    const{userId}=useUserIdContext();
    
    const handleParticipantsEmailList = async(emails:string)=>{
        const participantsEmailList = emails.split(',').map(email => email.trim()).filter(email => email.length > 0); //Split to array and remove white spaces and empty entries
        const participantsIdList = await Promise.all(participantsEmailList.map(email => GetParticipantsId(email)));
         setParticipantIds (participantsIdList.filter((id): id is number => id != null));// removes null items before setting to partcipantsList
    }

    useEffect(()=>{
        console.log("PARTS"+participantIds);
        console.log("USERID"+userId);
        console.log("START", startDate);
        console.log("End"+ endDate);
    },[userId,participantIds,startDate,endDate])

    useEffect (()=>{
        console.log("USERID CHANGED "+userId);
    },[userId])

    const SaveTripDetails=async()=>{

        const trip={
            id:0,
            destination:destination,
            startDate:startDate ? format(startDate, 'yyyy-MM-dd') : '',// 'YYYY-MM-DD'  this is also how it is saved in DB for DateOnly data type
            endDate:endDate ? format(endDate, 'yyyy-MM-dd') : '',//'YYYY-MM-DD' this is also how it is saved in DB for DateOnly data type
            ownerId: userId,
            participantsId: participantIds,
            isVotingOpen: true
        }
        
        const tripId = await AddTripReturnTripId(trip,getToken())
      
        if(tripId){
            alert("Trip Added !");
            setSelectedTripId(tripId);
            router.push("/Trip/TripList");
          }else{
            alert("Sorry Trip not added");
          }
    }
  return (
    //for mobile
    <div className="block">
  
    <div className="bg-[#ECF0F1] rounded-2xl min-h-[28rem] min-w-[20rem] lg:min-h-[25rem] lg:max-w-[20rem] mx-4 px-4 relative mb-40">

        <div className='p-2 pt-8'>

            <div className='flex justify-start my-4'>
                <div className=" mr-2"> 
                    <img src="/assets/Icons/Orion_globe.svg" alt="Destination" className="w-8" />
                </div>

                <input type="text" placeholder='Destination' className='bg-white rounded-md py-1 px-2 w-full'     onChange={(e) => setDestination(e.target.value)}/>
            </div>

            <div className='flex  justify-start my-4'>
            <div className=" mr-2"> 
                    <img src="/assets/Icons/Orion_meeting-geotag.svg" alt="Start Date" className="w-8" />
                    
                </div>
             
                
    <DatePicker
      selected={startDate}
      onChange={(newDate: Date | null) => setStartDate(newDate)}
      placeholderText="Start Date"
      dateFormat="MM/dd/yyyy"  className='bg-white rounded-md py-1 px-2 w-full'
    />
                
                
 
                {/* <input type="date" placeholder='Start Date MM/DD/YYYY' className='bg-white rounded-md py-1 px-2 w-full' onChange={(e) => setStartDate(e.target.value)} /> */}
            </div>

            <div className='flex justify-start my-4'>
                <div className=" mr-2"> 
                    <img src="/assets/Icons/Orion_meeting-geotag.svg" alt="End Date" className='w-8' />
                </div>
{/*              
                <input type="text" placeholder='End Date MM-DD-YYYY' className='bg-white rounded-md py-1 px-2 w-full'     onChange={(e) => setEndDate(e.target.value)}  /> */}
 

                    
<DatePicker
      selected={endDate}
      onChange={(newDate: Date | null) => setEndDate(newDate)}
      placeholderText="End  Date"
      dateFormat="MM/dd/yyyy"  className='bg-white rounded-md py-1 px-2 w-full'
    />
                
            </div>

            <div className='flex justify-start my-4'>
                <div className=" mr-2"> 
                    <img src="/assets/Icons/Orion_people.svg" alt="Participants" className="w-8" />
                </div>


                <textarea placeholder='Participants e-mail address    (separate with comma)' className='bg-white rounded-md py-1 px-2 pb-36 w-full resize-none' onChange ={(e)=>handleParticipantsEmailList(e.target.value)}></textarea>
            </div>
        </div>

        <div className="flex justify-center absolute -bottom-7 left-1/2 transform -translate-x-1/2">
            <button className="bg-[#E67E22] hover:bg-[#d56b0f] border-4 border-white text-xl text-white rounded-[2.5rem] p-3 cursor-pointer" >
            <img src="/assets/Icons/Orion_aircraft-climb_white.svg" className="w-10" alt="add"  
            onClick={SaveTripDetails}
            />
            </button>
        </div>
        
    </div>

</div>
  )
}

export default AddTripComponent