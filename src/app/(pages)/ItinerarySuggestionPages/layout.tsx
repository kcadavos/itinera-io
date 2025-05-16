"use client"
import NavbarComponent from '@/components/NavbarComponent'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) =>  {
  return (
    <div>

      {children}
      <div className='block lg:hidden'>
        <NavbarComponent/>
      </div>
     
    </div>
  )
}

export default Layout