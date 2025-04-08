"use client"
import NavbarComponent from '@/components/NavbarComponent'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) =>  {
  return (
    <div>

      {children}
     <NavbarComponent/>
    </div>
  )
}

export default Layout