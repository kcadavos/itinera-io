'use client'

import { useUserIdContext } from '@/context/DataContext';
import { getToken } from '@/lib/services/DataServices';
import { AddTrip, GetParticipantsId } from '@/lib/services/TripDataService';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

//for date picker
import { format } from "date-fns"

 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const AddTripComponent = () => {
    const router = useRouter();
    // add new trip useStates
    const [destination,setDestination]= useState<string>('');
    const [startDate, setStartDate] = useState<string>(''); 
    const[endDate,setEndDate]= useState<string> ('');
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

    const SaveTripDetails=async()=>{

        const trip={
            id:0,
            destination:destination,
            startDate:startDate,// 'YYYY-MM-DD'  this is also how it is saved in DB for DateOnly data type
            endDate:endDate, //'YYYY-MM-DD' this is also how it is saved in DB for DateOnly data type
            ownerId: userId,
            participantsId: participantIds,
            isVotingOpen: true
        }
        
        const result = await AddTrip(trip,getToken())
      
        if(result){
            alert("Trip Added Here!");
            router.push("/Trip/TripList");
          }else{
            alert("Trip not added");
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
                <div className='w-full'>
                <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full bg-white rounded-md py-1 px-2 justify-start text-left font-normal",
            !startDate && "text-muted-foreground"
          )  }
        >
          
          {startDate ? format(startDate,"yyyy-MM-dd") : <span>Start Date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={startDate ? new Date(startDate) : undefined}
          onSelect={(date) => {
            if (date) setStartDate(date.toISOString().split("T")[0]); // format as 'YYYY-MM-DD'
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover> 
                </div>
              
                 

                {/* <input type="text" placeholder='Start Date YYYY-MM-DD' className='bg-white rounded-md py-1 px-2 w-full' onChange={(e) => setStartDate(e.target.value)} /> */}
            </div>

            <div className='flex justify-start my-4'>
                <div className=" mr-2"> 
                    <img src="/assets/Icons/Orion_meeting-geotag.svg" alt="End Date" className='w-8' />
                </div>
                <div className='w-full'>
                <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full bg-white rounded-md py-1 px-2 justify-start text-left font-normal",
            !endDate && "text-muted-foreground"
          )  }
        >
          
          {endDate ? format(endDate,"yyyy-MM-dd") : <span>End Date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={endDate ? new Date(endDate) : undefined}
          onSelect={(date) => {
            if (date) setEndDate(date.toISOString().split("T")[0]); // format as 'YYYY-MM-DD' removes time
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover> 
                </div>
                {/* <input type="text" placeholder='End Date YYYY-MM-DD' className='bg-white rounded-md py-1 px-2 w-full'     onChange={(e) => setEndDate(e.target.value)}/> */}
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