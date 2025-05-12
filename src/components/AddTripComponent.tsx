'use client'

import { useSelectedTripDestinationContext, useSelectedTripEndDateContext, useSelectedTripIdContext,    useSelectedTripOwnerIdContext,    useSelectedTripParticipantsIdListContext,    useSelectedTripStartDateContext, useUserIdContext } from '@/context/DataContext';
import { getToken } from '@/lib/services/DataServices';
import {  AddTripReturnTripId, EditTrip, GetParticipantEmail, GetParticipantsId } from '@/lib/services/TripDataService';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

// for date picker
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";


const AddTripComponent = () => {
    //for routing and query
    const router = useRouter();
    const searchParams = useSearchParams(); // for querying the mode the user
    
    // to identify if user is adding a new trip or editing or viewing
    const mode = searchParams.get('mode');
    
    // context for selected trip when trip is added or selected from the trip list
    const {selectedTripId,setSelectedTripId}= useSelectedTripIdContext();
    const {selectedTripDestination} = useSelectedTripDestinationContext();
    const {selectedTripStartDate}=useSelectedTripStartDateContext();
    const {selectedTripEndDate}=useSelectedTripEndDateContext();
    const{selectedParticipantsIdList}=useSelectedTripParticipantsIdListContext();
    const{selectedTripOwnerId}=useSelectedTripOwnerIdContext();
    
    // add/edit  trip data
    const{userId}=useUserIdContext();
    const [tripId,setTripId]=useState<number>(0);
    const [destination,setDestination]= useState<string>('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [participantsEmailList,setParticipantsEmailList] = useState<string>('');
    const [participantIds, setParticipantIds] = useState<number[]> ([]);
    const [isDisabled, setIsDisabled] =useState<boolean>(false);
    
    // error checking 
    const [submitted, setSubmitted] = useState(false);//false on page load
    const [startDateGreaterThanEndDateError,setStartDateGreaterThanEndDateError]= useState<boolean>(false);
    const [startDateNotInFutureError, setStartDateNotInFutureError] = useState <boolean>(false);
    const [endDateNotInFutureError, setEndDateNotInFutureError] = useState<boolean>(false);
    const [notFoundEmails,setNotFoundEmails] =useState<string[]>([]);

    //mode of the page either reset the value of the fields else set values from data context
    useEffect(()=>{  
            if (mode === 'add') {
                setTripId(0);
                setDestination('');
                setStartDate(null);
                setEndDate(null);
                setParticipantIds([]);
                setParticipantsEmailList('');
            
               
                } else { // for editing or viewing
                setTripId  (selectedTripId);
                setDestination(selectedTripDestination);
                const parsedStartDate = parse(selectedTripStartDate, "yyyy-MM-dd", new Date());
                setStartDate(parsedStartDate); 
                const parsedEndDate = parse(selectedTripEndDate, "yyyy-MM-dd", new Date());
                setEndDate(parsedEndDate); 
                setParticipantIds(selectedParticipantsIdList)
             
             }
      }, [mode,selectedTripId, selectedTripDestination,selectedTripStartDate,selectedTripEndDate,selectedParticipantsIdList]);

      //disbales the field in view mode for non-owner of the trip and is not in add mode 
      useEffect(()=>{
        
            if(userId!==selectedTripOwnerId && mode!=='add')
                setIsDisabled(true);
      },[selectedTripOwnerId,userId])

      /*routes if user refreshes page and userId is Lost*/
      useEffect(()=>{
        if(userId==0)
        router.push("/Trip/TripList")
      },[userId])

    
      const CheckStartEndDateAreValid = (): boolean => {
        if (!startDate || !endDate) {
            return false; 
        }
    
        const today = new Date();
        const isStartDateInPast = startDate < today;
        const isEndDateInPast = endDate < today;
        const isStartAfterEnd = endDate < startDate;

    setStartDateNotInFutureError(isStartDateInPast);
    setEndDateNotInFutureError(isEndDateInPast);
    setStartDateGreaterThanEndDateError(isStartAfterEnd);


    return !(isStartDateInPast || isEndDateInPast || isStartAfterEnd);
};
   
    const SaveTripDetails=async()=>{
        setNotFoundEmails([]);// clean the errors before submitting again
        setSubmitted(true);
        const {foundIds,emailsNotFound}= await transformParticipantsEmailToId(participantsEmailList);

        //do checks
        const datesAreValid = CheckStartEndDateAreValid();
        const hasAllFields = destination && startDate && endDate && foundIds.length > 0;
        const noErrors = datesAreValid && emailsNotFound.length === 0 && hasAllFields;

          // Update state (for UI display) after all logic
         setNotFoundEmails(emailsNotFound);
        setParticipantIds(foundIds);

       
        if (noErrors){
            console.log("ENTERED ALL VALID");
            const trip={
        
                id:tripId,
                destination:destination,
                startDate:startDate ? format(startDate, 'yyyy-MM-dd') : '',// 'YYYY-MM-DD'  this is also how it is saved in DB for DateOnly data type
                endDate:endDate ? format(endDate, 'yyyy-MM-dd') : '',//'YYYY-MM-DD' this is also how it is saved in DB for DateOnly data type
                ownerId: userId,
                participantsId: foundIds,
                isVotingOpen: true
                
            }


            if (mode==='add')
                {
                    const tripId = await AddTripReturnTripId(trip,getToken())
  
                    if(tripId){
                  
                        setSelectedTripId(tripId);
                        router.push("/Trip/TripList");
                      }else{
                        alert("Something went wrong. Trip details were not saved. Please try again.");
                      }
                }
                else{
        
                    const success= await EditTrip(trip,getToken())
                    
                        if (success)
                            {
                                router.push("/Trip/TripList");
                            }
                            else
                            {
                                alert("Something went wrong. Trip details were not edited. Please try again");
                            }
                    
                }// end of else if not in add mode

         
                    
                
        }; // end if all validations are true clause
    
        
       
        
      
    }

   

    //for getting IDs based on email on add or edit mode to save
        const transformParticipantsEmailToId = async(emails:string)=>{
            const tempParticipantsEmailList = emails.split(',').map(email => email.trim()).filter(email => email.length > 0); //Split to array and remove white spaces and empty entries
            const results = await Promise.all(
                tempParticipantsEmailList.map(async email => {
                  const id = await GetParticipantsId(email);

                  return { email, id };
                })
              );
            // const tempParticipantsIdList = await Promise.all(tempParticipantsEmailList.map(email => GetParticipantsId(email)));
            const foundIds = results
            .filter((entry): entry is { email: string; id: number } => entry.id != null)
            .map(entry => entry.id);
             
            const emailsNotFound = results
             .filter(entry => entry.id == null)
             .map(entry => entry.email);

              console.log("FOUND ID"+foundIds);
              console.log("emails not found"+emailsNotFound )
            return { foundIds, emailsNotFound };
        }
        

// for getting emails based of ID when it's on edit mode and displaying the emails on the fields
     useEffect(()=>{
        if (mode!='add'){
            const transformParticipantsIdToEmails = async()=>{
                
                const participantEmailList = await Promise.all(selectedParticipantsIdList.map(id => GetParticipantEmail(id)));
              
       
               // to remove nulls and undefined
               const filteredEmailList = participantEmailList.filter( (email): email is string => email !== null && email !== undefined);
               setParticipantsEmailList (filteredEmailList.join(','));
                 
           }
           transformParticipantsIdToEmails();
        }
         
    },[selectedParticipantsIdList])

    // useEffect(()=>{
        
    //     console.log("PARTICIPANTS"+participantIds);
    //     console.log("USERID"+userId);
    //     console.log("START", startDate);
    //     console.log("End"+ endDate);
    //     console.log("SEARCH PARAMS MODE" +mode);
    // },[userId,participantIds,startDate,endDate,])

   
    useEffect(()=>{
       console.log("participantIds"+participantIds);
       console.log("participantsEmailList"+ participantsEmailList);
       console.log("notFoundEmails) +length"+notFoundEmails + "COUNT"+ notFoundEmails.length);

    },[participantIds,participantsEmailList,notFoundEmails])

     
  return (
    //for mobile
    <div className="block">
  
    <div  id="add" className="flex flex-col h-full max-h-[90vh] bg-[#ECF0F1] rounded-2xl min-h-[28rem] min-w-[20rem] lg:min-h-[25rem] lg:max-w-[20rem] mx-4 px-4 relative mb-40">

        <div className='p-2 pt-8'>
                <p className={` text-sm text-red-500 ${(submitted &&( !destination || !startDate || !endDate || !participantsEmailList)) ? 'block':'hidden'}`}>Field with * is required </p>
           
           
            <div className='flex justify-start my-4'>
          
                <div className=" mr-2"> 
                    <img src="/assets/Icons/Orion_globe.svg" alt="Destination " className="w-8" />
                </div>

                <input disabled={isDisabled} type="text" value={destination} placeholder='*Destination'  className={`${isDisabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-black'} rounded-md py-1 px-2 w-full ${submitted && !destination ? 'border-2 border-red-500' : ''} `}   onChange={(e) => setDestination(e.target.value)}/>
            </div>
            <div> {/*date error checking*/}
                {startDateGreaterThanEndDateError && <p className="text-red-500 text-sm mt-1">Start Date must be before the End Date</p>}
                 {startDateNotInFutureError && <p className="text-red-500 text-sm mt-1">Start Date must be in the future</p>}
       
                </div>
            <div className='flex  justify-start my-4'>
                
            
            <div className=" mr-2"> 
                    <img src="/assets/Icons/Orion_meeting-geotag.svg" alt="Start Date" className="w-8" />
                    
                </div>
             
                
    <DatePicker
 
      selected={ startDate}
      onChange={(newDate: Date | null) => setStartDate(newDate)}
      placeholderText="*Start Date"
      dateFormat="MM/dd/yyyy"  className={`${isDisabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-black'} rounded-md py-1 px-2 w-full ${submitted &&( !startDate || startDateGreaterThanEndDateError || startDateNotInFutureError) ? 'border-2 border-red-500' : ''} `}
    />
                
         </div>
         {endDateNotInFutureError && <p className="text-red-500 text-sm mt-1">End Date must be in the future</p>}
       
            <div className='flex justify-start my-4'>
                <div className=" mr-2"> 
                    <img src="/assets/Icons/Orion_meeting-geotag.svg" alt="End Date" className='w-8' />
                </div>                
<DatePicker
      selected={endDate}
      onChange={(newDate: Date | null) => setEndDate(newDate)}
      placeholderText="*End  Date"
      dateFormat="MM/dd/yyyy"  className={`${isDisabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-black'}  rounded-md py-1 px-2 w-full ${submitted && (!endDate ||startDateNotInFutureError) ? 'border-2 border-red-500' : ''} `}
    />
                
            </div>
            {notFoundEmails.length>0 && (
                <div className="text-red-500 text-sm  ">
                    <p >The following users were not found:</p>
                    <p className='font-semibold'>{notFoundEmails.join(', ')}</p>
                    <p>Please remove them from the list and add them later once signed up.</p>
                    
                </div>
            )}
            <div className='flex justify-start mt-4 mb-15'>
                <div className=" mr-2"> 
                    <img src="/assets/Icons/Orion_people.svg" alt="Participants" className="w-8" />
                </div>


                <textarea value ={participantsEmailList} placeholder='*Participants e-mail address  (separate with comma)' className={`${isDisabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-black'}  rounded-md py-1 px-2 pb-36 w-full resize-none ${submitted && (!participantsEmailList) ? 'border-2 border-red-500' : ''} `} onChange ={(e)=>setParticipantsEmailList(e.target.value)}></textarea>
            </div>
            
        </div>
     
    
        { !isDisabled && (   <div className="flex justify-center absolute -bottom-7 left-1/2 transform -translate-x-1/2">
            <button  onClick={SaveTripDetails} className="bg-[#E67E22] hover:bg-[#d56b0f] border-4 border-white text-xl text-white rounded-[2.5rem] p-3 cursor-pointer" >
            <img src="/assets/Icons/Orion_aircraft-climb_white.svg" className="w-10" alt="add" 
            />
            </button>
        </div>)
        }
   
    </div>
  

</div>
  )
}

export default AddTripComponent