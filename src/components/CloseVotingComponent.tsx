  import { useSelectedTripIdContext, useSelectedTripIsVotingOpenContext, useSelectedTripOwnerIdContext, useSelectedTripParticipantsIdListContext, useUserIdContext } from '@/context/DataContext';
  import { NotificationTypeEnum } from '@/lib/NotificationInterfaces';
  import { getToken } from '@/lib/services/DataServices';
  import { GenerateAndSaveItinerary } from '@/lib/services/ItineraryServices';
  import { AddGroupNotification } from '@/lib/services/NotificationService';
  import  {useState} from 'react'
  import { useRefreshDesktopsideContext } from '@/context/DataContext';


  const CloseVotingComponent = () => {
    const { refreshDesktopside,setRefreshDesktopside } = useRefreshDesktopsideContext();
    const [schedIntensity, setSchedIntensity] = useState<number>(2);
    const {setSelectedTripIsVotingOpen}=useSelectedTripIsVotingOpenContext();
    const{selectedTripId}= useSelectedTripIdContext();
    const {selectedParticipantsIdList}=useSelectedTripParticipantsIdListContext();
    const {selectedTripOwnerId} =useSelectedTripOwnerIdContext();
    const {userId} = useUserIdContext();
    const [notEnoughActivitiesToGenerate, setNotEnoughActivitiesToGenerate]=useState<boolean>(false); // onpage load it is not generated
    

    const GenerateItinerary =async()=>{
      setNotEnoughActivitiesToGenerate(false); // reset everytime user clicks on generate itinerary button
      const request ={
        tripId : selectedTripId,
        numberOfActivitiesPerDay: schedIntensity
      }

      const result = await GenerateAndSaveItinerary(request, getToken());


      if (result.success) {
        setSelectedTripIsVotingOpen(false);
        setRefreshDesktopside(!refreshDesktopside); // Toggle to trigger refresh
        //send itinerary generated for the participants
        const notificationToAdd={
          userId:selectedParticipantsIdList, // send notifications to all the partificipants that were found
          type: NotificationTypeEnum.ItineraryGenerated,
          referenceId:selectedTripId, // referencing the recently generated itinerary by TripId
          referenceTable:"itinerary"
        }
      
        const addItineraryNotificationSuccess= await  AddGroupNotification(notificationToAdd,getToken())
      
        if (addItineraryNotificationSuccess) {
          console.log("Notification for generated itinerary  successfully added.");
        } else {
          console.log("Failed to add notifications to generated itinerary");
        }

      } else {
        switch (result.status) {
          case 400:
            setNotEnoughActivitiesToGenerate(true);
            break;
          case 500:
            alert(" Server Error (500): " + result.message +" Try again later.");
            break;
          default:
            alert("Unexpected Error: " + result.message+ " Try again later.");
            break;
        }
      }
    }

    

    return (
      <div >

      {/*display if itinerary generation failed*/}
      {     notEnoughActivitiesToGenerate && 
        (
          <div className="mx-10 p-5 bg-red-50 border border-red-300 rounded-lg text-red-700">
            <p className="text-lg font-semibold mb-2">
              Uh-oh! We couldn&apos;t generate the itinerary with the selected intensity.
            </p>
            <p className="mb-3">
              Try one of the following to help us build a better itinerary:
            </p>
            <ul className="list-disc list-inside space-y-1 ps-4">
              <li>Select a lighter schedule option.</li>
              <li>Ask your travel buddies to add more activities.</li>
              <li>Consider shortening the duration of your trip.</li>
            </ul>
          </div>
        )
          
        }

      {/*display before generating the itinerary*/}
      <div className=' mx-10 py-10  relative'>
        <div className='flex px-5 justify-between p-3 border rounded-t-2xl bg-[#1ABC9C]'>
          <img src="/assets/Icons/itineraIcon.svg" className='w-3 h-auto'/>
          <p className='text-white text-xl'>Voting In Progress</p>
        </div>
        {   /*display generate itinerary if owner else display awaiting for ownner to generate itinerary */}
        <div className='bg-white p-3 space-y-4 rounded-b-2xl'>
          { (selectedTripOwnerId===userId) ? (
          <div> 
            <p className='text-lg'>
              Ready to wrap up the voting and create your itinerary?
              Just a heads-up: once the itinerary is generated, you won&apos;t be able to make changes to the trip or activity details. <br />
              <br/>
              How packed would you like the schedule to be?
            </p>
            <div className='flex flex-col space-y-2 mb-10'>
              <label > <input value="1" type="radio" className='mr-2' checked={schedIntensity===1} onChange={(e) => setSchedIntensity(Number(e.target.value))}/> 1 - Light</label>
              <label > <input value="2" type="radio" className='mr-2' checked={schedIntensity===2} onChange={(e) => setSchedIntensity(Number(e.target.value))}/> 2 - Moderate</label>
              <label > <input value="3" type="radio" className='mr-2' checked={schedIntensity===3} onChange={(e) => setSchedIntensity(Number(e.target.value))}/> 3 - Busy</label>
            </div>
            {/*mobile view only button*/}
            <div className=" lg:hidden  flex justify-center absolute -bottom-0 left-1/2 transform -translate-x-1/2 ">
              <button  onClick={GenerateItinerary} className="bg-[#E67E22] hover:bg-[#d56b0f] border-4 border-white text-xl text-white rounded-[2.5rem] p-3.5 cursor-pointer" >
                <img src="/assets/Icons/Orion_travel-map 1.svg" className="w-10" alt="Generate Itinerary" 
                  />
              </button>
              </div>
              {/*for desktop view button*/}
              <div className="hidden lg:flex  justify-center absolute -bottom-0 left-1/2 transform -translate-x-1/2 ">
                  <button  onClick={GenerateItinerary} className="bg-[#E67E22] hover:bg-[#d56b0f] border-4 border-white text-xl text-white rounded-[2.5rem] p-2 px-4 cursor-pointer flex justify-center items-center">
                    <p className="mr-4">Generate Itinerary</p>
                    <img
                      src="/assets/Icons/Orion_travel-map 1.svg"
                      className="w-8"
                      alt="add"
                    
                    />
                  </button>
              
            </div> 
          </div>
          ) :(<p className='text-xl p-5 font-medium'>Hang tight! The itinerary will be ready once you have voted on all suggested activities and the trip owner ends the voting phase.</p>)}

        </div>
  
      </div>

      
      
      </div>
    )
  }

  export default CloseVotingComponent