'use client'
import NotificationComponent from '@/components/NotificationComponent';
import { useAccountStatusContext, useUserIdContext } from '@/context/DataContext'
import { INotificationData } from '@/lib/NotificationInterfaces';
import { getToken } from '@/lib/services/DataServices';
import { GetUnreadNotifactionsByUser } from '@/lib/services/NotificationService';
import React, { useEffect, useState } from 'react'


const NotificationPage = () => {
  const {userId}=useUserIdContext();
  const [notificationList,setNotificationList] = useState<INotificationData[]>([]);
  const { setAccountStatus } = useAccountStatusContext();
  useEffect(()=>{
    setAccountStatus("idle");

    const getNotifications=async()=>{
       const notificationListData = await GetUnreadNotifactionsByUser(userId,getToken());
       if (notificationListData || notificationListData.length> 0)
         setNotificationList(notificationListData);
    }
      getNotifications();
  },[userId, setAccountStatus])


  return (
   
   <div className='pb-20'>
      { (notificationList.length>0) ? (
        notificationList.map((notification, index)=>(
          
          <NotificationComponent notification={notification} key={notification.id} index={index}/>
       
      ))):(
      <div className="text-center text-gray-600 mt-10 p-10 ">
        <p className="text-xl font-semibold">You are all caught up! ✨</p>
      <p className="text-sm text-gray-400 mt-1">No new updates — time to sit back and enjoy the journey. </p>
{/*   
      <button
        onClick={() => router.push('/Trip/TripList')}
        className="mt-6 px-5 py-2 bg-[#E67E22] hover:bg-[#d56b0f] text-white rounded-full shadow"
      >
        Back to Trips Dashboard
      </button> */}
      </div>
      )

      }
    </div>
  
  )
}
export default NotificationPage
