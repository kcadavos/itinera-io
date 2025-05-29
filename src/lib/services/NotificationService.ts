import { IAddGroupNotification, IAddNotification } from "../NotificationInterfaces";


const url = 'https://itineraioapi-cqapgsgcbschc7hu.westus-01.azurewebsites.net/';

export const AddNotification = async (notification:IAddNotification, token:string)=>{

    const res = await fetch(url+"/Notification/AddNotification",{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer "+token,
        },
        body: JSON.stringify(notification)
    });
    if (!res.ok){
        const errorData = await res.json();
        const errorMsg = errorData.message;
        console.log ("Error on Add Notification fetch"+ errorMsg);
        return false;
    }
    const data = await res.json();
    return data.success;
}



export const AddGroupNotification = async (notification:IAddGroupNotification, token:string)=>{

    const res = await fetch(url+"/Notification/AddGroupNotification",{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer "+token,
        },
        body: JSON.stringify(notification)
    });
    if (!res.ok){
        const errorData = await res.json();
        const errorMsg = errorData.message;
        console.log ("Error on Add Group Notification fetch"+ errorMsg);
        return false;
    }
    console.log("notification added");
    const data = await res.json();
    return data.success;
}



export const GetUnreadNotifactionsByUser = async (userId: number,token:string)=>{
    const res = await fetch (url+"/Notification/GetUnreadNotificationsByUserId/"+userId,{
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            "Authorization": "Bearer "+ token 
        }
    });
    
    //if promise is not ok
    if (!res.ok){
        const errorData = await res.json();
        const errorMsg = errorData.message;
        console.log("Error on GetUnreadNotifications fetch: " +errorMsg);
        return [] // return empty array 
    }

    const data = await res.json();
    console.log("FETCH DATA"+data);
    return data;

}