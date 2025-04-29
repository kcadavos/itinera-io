import { IUndecidedData } from '@/lib/Interfaces'
import React from 'react'

const UndecidedCardComponent = ({ activities }:{activities:IUndecidedData[] | null}) => {
  const bgColors = ["bg-[#1A89BC]","bg-[#4AAAE2]","bg-[#F4B400]","bg-[#E67E22]","bg-[#4A90E2]"];

  
  return (
    activities?.map((activity: IUndecidedData, idx: number) => (
      <div key={idx} className={`${bgColors[idx % bgColors.length]} p-4 my-2 mb-10 mx-8 rounded-bl-2xl rounded-tr-2xl relative`}>
        <div className='text-white'>
          <h3 className='text-2xl mb-1'>{activity.activity}</h3>
          <p className='text-md my-1'>{activity.address}</p>
          <p className='text-sm my-2'>{activity.details}</p>
        </div>

        <div className="flex justify-center mt-18 absolute -bottom-7 left-50 transform -translate-x-1/2">
          <button className="bg-[#E67E22] hover:bg-[#d56b0f] border-2 border-white text-xl text-white rounded-[2.5rem] p-2 cursor-pointer" >
            <img
              src="/assets/Icons/Orion_add-place 1.svg"
              className="w-8"
              alt="add"
            />
          </button>
        </div>

        <div className="flex justify-center mt-18 absolute -bottom-7 left-65 transform -translate-x-1/2">
          <button className="bg-[#E67E22] hover:bg-[#d56b0f] border-2 border-white text-xl text-white rounded-[2.5rem] p-2 cursor-pointer" >
            <img
              src="/assets/Icons/Orion_delete-place 1.svg"
              className="w-8"
              alt="add"
            />
          </button>
        </div>
      </div>
    ))
  )
}

export default UndecidedCardComponent