import React from 'react'

const AccountCreationComponent = () => {
  return (
    <div className='my-6'>
        <div className="flex justify-start my-4 pt-10">
            <div className="mr-4"> 
                <img src="/assets/Icons/Orion_user-address.svg" alt="user address" className="w-10 p-1" />
            </div>
            
            <input type="text" placeholder="Email Address" required className="bg-white rounded-lg p-1 px-6" />
        </div>
          
        <div className="flex justify-start my-4">
            <div className="mr-4"> 
              <img src="/assets/Icons/Orion_keyhole.svg" alt="password" className="w-10 p-1" />
            </div>
            
            <input type="text" placeholder="Password" required className="bg-white rounded-lg p-1 px-6" />
        </div>

        <div className="flex justify-start my-4 ">
            <div className="mr-4"> 
                <img src="/assets/Icons/Orion_key.svg" alt="conferm password" className="w-10 p-1" />
            </div>
            
            <input type="text" placeholder="Confirm Password" required className="bg-white rounded-lg p-1 px-6" />
        </div>
          
        <div className="flex justify-start my-4">
            <div className="mr-4"> 
              <img src="/assets/Icons/Orion_profile-picture.svg" alt="name" className="w-10 p-1" />
            </div>
            
            <input type="text" placeholder="Name" required className="bg-white rounded-lg p-1 px-6" />
        </div>


        <div className="flex justify-center mt-18" >
            <button className="bg-[#E67E22] border-4 border-white text-xl text-white rounded-4xl p-4"></button>
        </div>

    </div>
  )
}

export default AccountCreationComponent