import { useSelectedTripIsVotingOpenContext } from '@/context/DataContext';
import Image from 'next/image'
import  { useState} from 'react'


const CloseVotingComponent = () => {

  const [schedIntensity, setSchedIntensity] = useState<string>('1');
  const {selectedTripIsVotingOpen,setSelectedTripIsVotingOpen}=useSelectedTripIsVotingOpenContext();

const GenerateItinerary =()=>{
  
}

  return (
    <>
    <div className=' mx-10 py-10  relative'>
    <div className='flex px-5  justify-between p-3 border rounded-t-2xl bg-[#1ABC9C]'>
      <img src="/assets/Icons/itineraIcon.svg" className='w-3 h-auto'/>
      <p className='text-white text-xl'>Voting In Progress</p>
    </div>
    <div className='bg-white p-3 space-y-4 rounded-b-2xl'>
      <p className='text-lg'>
      Would you like to end the voting phase and generate the itinerary?  How intense would you like the schedule to be?
      </p>
      <div className='flex flex-col space-y-2 mb-10'>
      <label > <input value="1" type="radio" className='mr-2' checked={schedIntensity==='1'} onChange={(e) => setSchedIntensity(e.target.value)}/> 1 - Light</label>
      <label > <input value="2" type="radio" className='mr-2' checked={schedIntensity==='2'} onChange={(e) => setSchedIntensity(e.target.value)}/> 2 - Moderate</label>
      <label > <input value="3" type="radio" className='mr-2' checked={schedIntensity==='3'} onChange={(e) => setSchedIntensity(e.target.value)}/> 3 - Busy</label>
      </div>
      <div className="flex justify-center absolute -bottom-0 left-1/2 transform -translate-x-1/2">
      <button  onClick={GenerateItinerary} className="bg-[#E67E22] hover:bg-[#d56b0f] border-4 border-white text-xl text-white rounded-[2.5rem] p-3.5 cursor-pointer" >
            <img src="/assets/Icons/Orion_travel-map 1.svg" className="w-10" alt="Generate Itinerary" 
            />
            </button>
      </div>
      
    </div>
 
    </div>
    
    
    </>
  )
}

export default CloseVotingComponent