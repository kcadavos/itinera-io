import { IUndecidedData } from '@/lib/Interfaces'
import React from 'react'

const UndecidedCardComponent = ({ activities }:{activities:IUndecidedData[] | null}) => {

  
  return (
    activities?.map((activity: IUndecidedData, idx: number) => (
      <div key={idx} className='bg-blue-300 p-4 my-2 mb-10 mx-8 rounded-bl-2xl rounded-tr-2xl'>
        <div className='text-white'>
          <h3 className='text-2xl mb-1'>{activity.activity}</h3>
          <p className='text-md my-1'>{activity.address}</p>
          <p className='text-sm my-2'>{activity.details}</p>
        </div>
      </div>
    ))
  )
}

export default UndecidedCardComponent