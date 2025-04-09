'use client'
import React from 'react'

const AddSuggestionPage = () => {
  return (
    <div className='font-roboto m-0 p-0 max-w-screen'>
        {/* mobile */}
        <div className="block md:hidden">
           
            

            <div className="bg-[#ECF0F1] rounded-2xl min-h-[30rem] min-w-[20rem] lg:min-h-[25rem] lg:max-w-[20rem] mx-4 px-4 relative mb-35">
                <div className='p-2'>
                    <div className='my-4'>
                        <input type="text" placeholder='Activity' className='bg-white rounded-md py-1 px-2' />
                    </div>
                    <div className='my-4'>
                        <input type="text" placeholder='Catagory' className='bg-white rounded-md py-1 px-2' />
                    </div>
                    <div className='my-4'>
                        <input type="text" placeholder='Address' className='bg-white rounded-md py-1 px-2'/>
                    </div>
                    <div className='my-4'>
                        <input type="text" placeholder='Details' className='bg-white rounded-md py-1 px-2 pb-30'/>
                    </div>
                </div>
                
            </div>

        </div>


    </div>
  )
}

export default AddSuggestionPage
