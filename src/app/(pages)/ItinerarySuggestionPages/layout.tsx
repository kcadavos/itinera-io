"use client"
import NavbarComponent from '@/components/NavbarComponent'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) =>  {
  return (
    <div>

      {children}
      <div>
        <NavbarComponent/>
      </div>
     
    </div>
  )
}

export default Layout