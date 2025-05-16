import React from 'react'
import MenuComponent from './MenuComponent'
import { useNameContext } from '@/context/DataContext';

const DesktopSideComponent = () => {
    const { name } = useNameContext();
    

  return (
    <div className="hidden lg:block">

        <div>
            <div className="bg-[#E1ECFF] min-h-[12rem]  lg:max-h-[12rem] pt-2 pb-10 relative w-full mb-6">
                <div className="mx-6 mt-10 font-inter">
                    <img
                        className="h-10 absolute top-5 "
                        src="/assets/Icons/itineraLogo.svg"
                        alt=""
                    />

                    <div className='pb-2'>
                        <MenuComponent />
                    </div>
                    
                    <div className='ml-2 ' >
                        <p className="font-medium text-[#34495E] ">
                            Hi <span className="text-[#4A90E2] ">{name}</span>,
                        </p>
                        
                        <p className="text-lg text-[#34495E]">Looking forward to these trips?</p>
                    </div>
                </div>
            </div>
        </div>

        <div className='text-center'>
            <p>trip cards</p>
        </div>

        <div className="fixed bottom-0 ">
            <div className=" bg-[#1ABC9C] py-3 rounded-t-4xl min-w-[25rem] ">
                <div className="text-white flex justify-center text-4xl font-medium ">        
                
                    <p>Initiate a Trip</p>
                    <img src="/assets/Icons/Orion_aircraft 1.svg" alt="" className='w-12 h-12' />
                    
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default DesktopSideComponent