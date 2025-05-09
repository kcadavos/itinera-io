"use client"
import AccountDetailsComponent from '@/components/AccountDetailsComponent'
import PasswordDetailsComponent from '@/components/PasswordDetailsComponent'
import { useAccountStatusContext } from '@/context/DataContext'
import React from 'react'
const AccountDetails = () => {
  const {accountStatus} = useAccountStatusContext();
  
  return (
    <>
   {(accountStatus === 'account'|| accountStatus==="successAcc"|| accountStatus==='failAcc') && <AccountDetailsComponent />}
   {(accountStatus === 'password'|| accountStatus ==='mustmatch'||accountStatus==='failed'||accountStatus==="successPass") && <PasswordDetailsComponent />}
    </>
  )
}

export default AccountDetails