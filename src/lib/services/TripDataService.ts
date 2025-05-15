import { IUserInfo } from "../Interfaces";
import { ITripData } from "../TripInterfaces";


const url = 'https://itineraioapi-cqapgsgcbschc7hu.westus-01.azurewebsites.net/';


export const GetTripListByUserId = async (userId: number,token:string)=>{
    const res = await fetch (url+"/Trip/GetTripsByUserId/"+userId,{
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
        console.log("Error on GetTripsByUserID fetch: " +errorMsg);
        return [] // return empty array 
    }

    const data = await res.json();
    console.log("FETCH DATA"+data);
    return data;

}

export const GetTripDetails = async (tripId: number,token:string)=>{
    const res = await fetch (url+"/Trip/GetTripDetails/"+tripId,{
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
        console.log("Error on Get Trip Details fetch: " +errorMsg);
        return null;
    }

    const data = await res.json();
    console.log("FETCH DATA"+data);
    return data;

}

export const AddTrip = async (trip:ITripData, token:string)=>{
    console.log("TRIP"+ trip)
    const res = await fetch(url+"/Trip/AddTrip",{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer "+token,
        },
        body: JSON.stringify(trip)
    });
    if (!res.ok){
        const errorData = await res.json();
        const errorMsg = errorData.message;
        console.log ("Error on Add Trip fetch"+ errorMsg);
        return false;
    }
    const data = await res.json();
    return data.success;
}

export const EditTrip = async (trip:ITripData, token:string)=>{
    console.log("TRIP"+JSON.stringify(trip));
    console.log("TOKEN" +token);
    const res = await fetch(url+"/Trip/EditTrip",{
        method: "PUT",
        headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer "+token,
        },
        body: JSON.stringify(trip)
    });
    if (!res.ok){
        const errorData = await res.json();
        const errorMsg = errorData.message;
        console.log ("Error on Edit Trip "+ errorMsg);
        return false;
    }
    const data = await res.json();
    return data.success;
}
export const AddTripReturnTripId = async (trip:ITripData, token:string)=>{
    console.log("TRIP"+ trip)
    const res = await fetch(url+"/Trip/AddTripReturnTripId",{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer "+token,
        },
        body: JSON.stringify(trip)
    });
    if (!res.ok){
        const errorData = await res.json();
        const errorMsg = errorData.message;
        console.log ("Error on Add Trip "+ errorMsg);
        return 0;
    }
    const data = await res.json();
    return data;
}


export const GetParticipantsId = async (email:string) => {
    const res = await fetch(url + `User/GetUserInfoByEmail/${email}`);

    if(!res.ok){
        const data = await res.json();
        const message = data.message;
        console.log(message);
        return null;
    }

        const userData: IUserInfo = await res.json();
        return userData.id;

}

export const GetParticipantName = async (id:number) => {
    const res = await fetch(url + `User/GetUserInfoById/${id}`);

    if(!res.ok){
        const data = await res.json();
        const message = data.message;
        console.log(message);
        return null;
    }

        const userData: IUserInfo = await res.json();
        return userData.name;
    

}

export const GetParticipantEmail = async (id:number) => {
    const res = await fetch(url + `User/GetUserInfoById/${id}`);

    if(!res.ok){
        const data = await res.json();
        const message = data.message;
        console.log(message);
        return "";
    }

        const userData: IUserInfo = await res.json();
        return userData.email;
    

}

export const GetParticipantInfoById = async (id:number) => {
    const res = await fetch(url + `User/GetUserInfoById/${id}`);

    if(!res.ok){
        const data = await res.json();
        const message = data.message;
        console.log(message);
        return null;
    }

        const userData: IUserInfo = await res.json();
        return userData;
    

}