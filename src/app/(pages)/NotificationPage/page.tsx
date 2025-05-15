'use client'
import NotificationComponent from '@/components/NotificationComponent';
import { useUserIdContext } from '@/context/DataContext'
import { INotificationData } from '@/lib/NotificationInterfaces';
import { getToken } from '@/lib/services/DataServices';
import { GetUnreadNotifactionsByUser } from '@/lib/services/NotificationService';
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

const NotificationPage = () => {
  const {userId}=useUserIdContext();
  const [notificationList,setNotificationList] = useState<INotificationData[]>([]);
  const router = useRouter();

  useEffect(()=>{
    const getNotifications=async()=>{
       const notificationListData = await GetUnreadNotifactionsByUser(userId,getToken());
       if (!notificationListData || notificationListData.length === 0)
        router.push("/Trip/TripList");
      else
       setNotificationList(notificationListData);
    }
      getNotifications();
  },[userId])


  return (
    <div className='pb-20'>
      { (notificationList.length>0) && (
        notificationList.map((notification, index)=>(
    
          <NotificationComponent notification={notification} key={index}/>
      )
        
        ))

      }
    </div>
  )
}

export default NotificationPage
