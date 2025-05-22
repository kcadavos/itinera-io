"use client"

import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) =>  {
  return (
    <div>

      {children}
      <div className='block lg:hidden'>
        
      </div>
     
    </div>
  )
}

export default Layout