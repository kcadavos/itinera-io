"use client"
import FooterComponent from '@/components/FooterComponent'

import { usePathname } from 'next/navigation'
import React, { useEffect , useState } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) =>  {
  const route = usePathname();
  const [isHidden, setIsHidden] = useState(false);
  useEffect(()=>{
    const mobileScreen = window.innerWidth < 1024;
    if(mobileScreen){
      setIsHidden(route.startsWith('/ItinerarySuggestionPages'));
    };
  },[route])

  
  return (

    <div>
     
 

      {children}
      <div className='block lg:hidden'>
        {!isHidden && <FooterComponent/>}
      </div>
      
    </div>
  )
}

export default Layout