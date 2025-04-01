'use client'

export default function Home() {
  return (
    <div className="">
      <div className='bg-[#E1ECFF] rounded-2xl py-10 pb-56 relative'>
        <p className="mx-8 font-inter text-[#1ABC9C]">Itinera-IO</p>
      </div>
      
      <div className="bg-[#ECF0F1] rounded-2xl my-10 m-6 p-5 py-20 absolute bottom-50">

        <div className="flex justify-evenly my-3">
          <div className="py-1"> 
            <img src="/assets/Icons/Orion_user-address.svg" alt="user address" className="w-10" />
          </div>
          
          <input type="text" placeholder="Email Address" className="bg-white rounded-lg p-3 px-6" />
        </div>
        
        <div className="flex justify-evenly my-3">
          <div className="py-1"> 
            <img src="/assets/Icons/Orion_keyhole.svg" alt="user address" className="w-10" />
          </div>
          
          <input type="text" placeholder="Password" className="bg-white rounded-lg p-3 px-6" />
        </div>

        <div className="flex justify-center my-3">
          <button className="bg-[#E67E22] text-xl text-white rounded-xl p-3 px-14">Log In</button>
        </div>

      </div>
    </div>
  );
}
