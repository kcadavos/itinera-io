'use client'

import React from 'react'
import UndecidedCardComponent from '../UndecidedCardComponent'

const UndecidedListComponent = () => {
  return (
    <div>
        <p className='text-center text-[#2C3E50] mb-2'>What do you think about these activities?</p>
        <UndecidedCardComponent />
    </div>
  )
}

export default UndecidedListComponent