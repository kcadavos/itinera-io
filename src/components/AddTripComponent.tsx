import React from 'react'

const AddTripComponent = () => {
  return (
    //for mobile
    <div className="block md:hidden">
  
    <div className="bg-[#ECF0F1] rounded-2xl min-h-[28rem] min-w-[20rem] lg:min-h-[25rem] lg:max-w-[20rem] mx-4 px-4 relative mb-40">

        <div className='p-2 pt-8'>

            <div className='flex justify-start my-4'>
                <div className=" mr-2"> 
                    <img src="/assets/Icons/Orion_globe.svg" alt="Destination" className="w-8" />
                </div>

                <input type="text" placeholder='Destination' className='bg-white rounded-md py-1 px-2 w-full' />
            </div>

            <div className='flex justify-start my-4'>
                <div className=" mr-2"> 
                    <img src="/assets/Icons/Orion_meeting-geotag.svg" alt="Arrival Date" className="w-8" />
                </div>

                <input type="text" placeholder='Arrival Date' className='bg-white rounded-md py-1 px-2 w-full' />
            </div>

            <div className='flex justify-start my-4'>
                <div className=" mr-2"> 
                    <img src="/assets/Icons/Orion_meeting-geotag.svg" alt="Departure Date" className="w-8" />
                </div>

                <input type="text" placeholder='Departure Date' className='bg-white rounded-md py-1 px-2 w-full'/>
            </div>

            <div className='flex justify-start my-4'>
                <div className=" mr-2"> 
                    <img src="/assets/Icons/Orion_people.svg" alt="Participants" className="w-8" />
                </div>

                <textarea placeholder='Participants e-mail address    (separate with comma)' className='bg-white rounded-md py-1 px-2 pb-36 w-full resize-none'></textarea>
            </div>
        </div>

        <div className="flex justify-center absolute -bottom-7 left-1/2 transform -translate-x-1/2">
            <button className="bg-[#E67E22] hover:bg-[#d56b0f] border-4 border-white text-xl text-white rounded-[2.5rem] p-3 cursor-pointer" >
            <img src="/assets/Icons/Orion_aircraft-climb_white.svg" className="w-10" alt="add" />
            </button>
        </div>
        
    </div>

</div>
  )
}

export default AddTripComponent