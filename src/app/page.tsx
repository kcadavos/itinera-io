'use client'

export default function Home() {
  return (
    <div className="">
      <div className='bg-[#E1ECFF] rounded-2xl py-10 pb-56 relative max-w-screen'>
        <p className="mx-8 font-inter text-[#1ABC9C]">Itinera-IO</p>
      </div>
      
      <div className="bg-[#ECF0F1] rounded-2xl absolute bottom-30 min-h-[28rem] min-w-[20rem] my-10 m-6 px-4">

        <div className="flex justify-start my-3">
          <div className="py-1 mr-4"> 
            <img src="/assets/Icons/Orion_user-address.svg" alt="user address" className="w-10" />
          </div>
          
          <input type="text" placeholder="Email Address" className="bg-white rounded-lg p-3 px-6" />
        </div>
        
        <div className="flex justify-start my-3">
          <div className="py-1 mr-4"> 
            <img src="/assets/Icons/Orion_keyhole.svg" alt="user address" className="w-10" />
          </div>
          
          <input type="text" placeholder="Password" className="bg-white rounded-lg p-3 px-6" />
        </div>

        <div className="flex justify-center my-3">
          <button className="bg-[#E67E22] text-xl text-white rounded-xl p-[.6rem] px-14">Log In</button>
        </div>

      </div>

      <div>
        <p></p>
      </div>
    </div>
  );
}
