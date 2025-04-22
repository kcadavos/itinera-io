import { IUserInfo } from "../Interfaces";
import { ITripData } from "../TripInterfaces";


const url = 'https://itineraioapi-cqapgsgcbschc7hu.westus-01.azurewebsites.net/';
// const url ='https://localhost:5054/';

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

export const AddTrip = async (trip:ITripData, token:string)=>{
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