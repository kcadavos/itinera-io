import React from 'react'

const LogInComponent = () => {
  return (
    <div className=''>
        <div className="flex justify-start my-4 pt-24">
            <div className="py-2 mr-4"> 
                <img src="/assets/Icons/Orion_user-address.svg" alt="user address" className="w-10" />
            </div>
            
            <input type="text" placeholder="Email Address" required className="bg-white rounded-lg p-4 px-6" />
        </div>
          
        <div className="flex justify-start my-4">
            <div className="py-2 mr-4"> 
              <img src="/assets/Icons/Orion_keyhole.svg" alt="user address" className="w-10" />
            </div>
            
            <input type="text" placeholder="Password" required className="bg-white rounded-lg p-4 px-6" />
        </div>

        <div className="flex justify-center my-4">
            <button className="bg-[#E67E22] text-xl text-white rounded-xl p-[.6rem] px-14">Log In</button>
        </div>

        
    </div>
  )
}

export default LogInComponent