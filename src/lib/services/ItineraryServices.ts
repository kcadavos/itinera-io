import { IItineraryRequest } from "../ItineraryInterfaces";


const url = 'https://itineraioapi-cqapgsgcbschc7hu.westus-01.azurewebsites.net/';

export const GenerateAndSaveItinerary = async (request:IItineraryRequest,token:string)=>{
  
    const res = await fetch(url+"Itinerary/GenerateAndSaveItinerary",{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer "+token
        },
        body: JSON.stringify(request)
    });
    if (!res.ok){
        const errorData = await res.json();
        const errorMsg = errorData.message;
        console.log ("Error on Generate Itinerary fetch"+ errorMsg);
        return false;
    }
    const data = await res.json();
    return data.success;
}

export const GetItineraryListByTripId = async (tripId: number,token:string)=>{
    const res = await fetch (url+"/Itinerary/GetItinerariesByTripId/"+tripId,{
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
        console.log("Error on Get Activities by activity Id fetch: " +errorMsg);
        return [] // return empty array 
    }

    const data = await res.json();
    console.log("FETCH DATA"+data);
    return data;
}

//get activities by ID
export const GetActivityDetailsByActivityId= async (activityId: number,token:string)=>{
    const res = await fetch (url+"/Activity/GetActivityDetails/"+activityId,{
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
        console.log("Error on GetActivityDetailsByActivityId fetch: " +errorMsg);
        return [] // return empty array 
    }

    const data = await res.json();
    console.log("FETCH DATA"+data);
    return data;

}