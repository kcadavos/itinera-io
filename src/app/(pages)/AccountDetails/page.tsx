"use client"
import AccountDetailsComponent from '@/components/AccountDetailsComponent'
import PasswordDetailsComponent from '@/components/PasswordDetailsComponent'
import { useAccountStatusContext } from '@/context/DataContext'
import React from 'react'
const AccountDetails = () => {
  const {accountStatus} = useAccountStatusContext();
  
  return (
    <>
   {accountStatus === 'account' && <AccountDetailsComponent />}
   {accountStatus === 'password' && <PasswordDetailsComponent />}
    </>
  )
}

export default AccountDetails