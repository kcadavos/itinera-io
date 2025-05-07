import React from 'react'
import MenuComponent from './MenuComponent'

const DesktopSideComponent = () => {
  return (
    <div className="hidden lg:block">

        <div>
            <div className="bg-[#E1ECFF] min-h-[14rem]  lg:min-h-[13.2rem] lg:max-h-[13.2rem] pt-10 pb-10 relative min-w-screen max-w-screen mb-6">
                <div className="mx-8 mt-10 font-inter">
                    <img
                        className="h-10 absolute left-6 top-10"
                        src="/assets/Icons/itineraLogo.svg"
                        alt=""
                    />

                    <MenuComponent />

                    <div className="font-medium text-[#34495E] mt-5"></div>
                    <p className="text-3xl text-[#E67E22]"></p>
                    <div ></div>
                </div>
            </div>
        </div>

        <div>
            
        </div>
    </div>
  )
}

export default DesktopSideComponent