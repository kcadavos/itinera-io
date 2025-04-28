'use client'

import { useSelectedTripDestinationContext, useSelectedTripEndDateContext, useSelectedTripIdContext,    useSelectedTripStartDateContext, useUserIdContext } from '@/context/DataContext';
import { getToken } from '@/lib/services/DataServices';
import {  AddTripReturnTripId, GetParticipantsId } from '@/lib/services/TripDataService';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

// for date picker
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";


const AddTripComponent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // to identify if user is adding a new trip or editing or viewing
    const [mode] = useState(searchParams.get('mode'));

    // context for selected trip when trip is added
    const {setSelectedTripId}= useSelectedTripIdContext();
    const {selectedTripDestination} = useSelectedTripDestinationContext();
    const {selectedTripStartDate}=useSelectedTripStartDateContext();
    const {selectedTripEndDate}=useSelectedTripEndDateContext();
    // const {selectedParticipantsIdList}=useSelectedTripParticipantsIdListContext();
    

    // add new trip useStates
    const [destination,setDestination]= useState<string>('');
    // const [startDate, setStartDate] = useState<string>('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    // const[endDate,setEndDate]= useState<string> ('');
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [participantsEmailList,setParticipantsEmailList] = useState<string>('');
    const [participantIds, setParticipantIds] = useState<number[]> ([]);
    const{userId}=useUserIdContext();
    // const [editable, setIsEditable] =useState<boolean>(true);
    
    // error checking
    const [submitted, setSubmitted] = useState(false);

    //mode of the page either reset the value of the fields else set values from data context
    useEffect(()=>{  
            if (mode === 'add') {
                setDestination('');
                setStartDate(null);
                setEndDate(null);
                setParticipantIds([]);
                } else {
                setDestination(selectedTripDestination);
                const parsedStartDate = parse(selectedTripStartDate, "yyyy-MM-dd", new Date());
                setStartDate(parsedStartDate); 
                const parsedEndDate = parse(selectedTripEndDate, "yyyy-MM-dd", new Date());
                setEndDate(parsedEndDate); 
             
             }
      }, [mode, selectedTripDestination,selectedTripStartDate,selectedTripEndDate]);

   
    const SaveTripDetails=async()=>{
        setSubmitted(true);
        const trip={
            id:0,
            destination:destination,
            startDate:startDate ? format(startDate, 'yyyy-MM-dd') : '',// 'YYYY-MM-DD'  this is also how it is saved in DB for DateOnly data type
            endDate:endDate ? format(endDate, 'yyyy-MM-dd') : '',//'YYYY-MM-DD' this is also how it is saved in DB for DateOnly data type
            ownerId: userId,
            participantsId: participantIds,
            isVotingOpen: true
        }
        
        if (destination && startDate && endDate && participantsEmailList)
            {
                const tripId = await AddTripReturnTripId(trip,getToken())
      
                if(tripId){
                    alert("Trip Added !");
                    setSelectedTripId(tripId);
                    router.push("/Trip/TripList");
                  }else{
                    alert("Sorry Trip not added");
                  }
            }
        
      
    }

    
    useEffect(()=>{
        const handleParticipantsEmailList = async(emails:string)=>{
            const participantsEmailList = emails.split(',').map(email => email.trim()).filter(email => email.length > 0); //Split to array and remove white spaces and empty entries
            const participantsIdList = await Promise.all(participantsEmailList.map(email => GetParticipantsId(email)));
             setParticipantIds (participantsIdList.filter((id): id is number => id != null));// removes null items before setting to partcipantsList
    
        }
        handleParticipantsEmailList(participantsEmailList);
    },[participantsEmailList])


    // useEffect(()=>{
        
    //     console.log("PARTS"+participantIds);
    //     console.log("USERID"+userId);
    //     console.log("START", startDate);
    //     console.log("End"+ endDate);
    //     console.log("SEARCH PARAMS" +mode);
    // },[userId,participantIds,startDate,endDate])

    useEffect (()=>{
        console.log("USERID CHANGED "+userId);
        console.log("SET START"+ selectedTripStartDate);
        
    },[userId])


     
  return (
    //for mobile
    <div className="block">
  
    <div className="bg-[#ECF0F1] rounded-2xl min-h-[28rem] min-w-[20rem] lg:min-h-[25rem] lg:max-w-[20rem] mx-4 px-4 relative mb-40">

        <div className='p-2 pt-8'>
                <p className={`text-red-500 ${(submitted &&( !destination || !startDate || !endDate || !participantsEmailList)) ? 'block':'hidden'}`}>* Field Required </p>
            <div className='flex justify-start my-4'>
                <div className=" mr-2"> 
                    <img src="/assets/Icons/Orion_globe.svg" alt="Destination " className="w-8" />
                </div>

                <input type="text" value={destination} placeholder='*Destination' className={`bg-white rounded-md py-1 px-2 w-full ${submitted && !destination ? 'border-2 border-red-500' : ''} `}   onChange={(e) => setDestination(e.target.value)}/>
            </div>

            <div className='flex  justify-start my-4'>
            <div className=" mr-2"> 
                    <img src="/assets/Icons/Orion_meeting-geotag.svg" alt="Start Date" className="w-8" />
                    
                </div>
             
                
    <DatePicker
 
      selected={ startDate}
      onChange={(newDate: Date | null) => setStartDate(newDate)}
      placeholderText="*Start Date"
      dateFormat="MM/dd/yyyy"  className={`bg-white rounded-md py-1 px-2 w-full ${submitted && !startDate ? 'border-2 border-red-500' : ''} `}
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
      placeholderText="*End  Date"
      dateFormat="MM/dd/yyyy"  className={`bg-white rounded-md py-1 px-2 w-full ${submitted && !endDate ? 'border-2 border-red-500' : ''} `}
    />
                
            </div>

            <div className='flex justify-start my-4'>
                <div className=" mr-2"> 
                    <img src="/assets/Icons/Orion_people.svg" alt="Participants" className="w-8" />
                </div>


                <textarea placeholder='*Participants e-mail address  (separate with comma)' className={`bg-white rounded-md py-1 px-2 pb-36 w-full resize-none ${submitted && (!participantsEmailList) ? 'border-2 border-red-500' : ''} `} onChange ={(e)=>setParticipantsEmailList(e.target.value)}></textarea>
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