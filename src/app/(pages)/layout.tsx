"use client"
import FooterComponent from '@/components/FooterComponent'
// import HeaderComponent from '@/components/HeaderComponent'
import { usePathname } from 'next/navigation'
import React, { useEffect , useState } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) =>  {
  const route = usePathname();
  const [isHidden, setIsHidden] = useState(false);
  useEffect(()=>{
    setIsHidden(route.startsWith('/ItinerarySuggestionPages'));
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