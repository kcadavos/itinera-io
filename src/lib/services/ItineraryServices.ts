import { IItineraryRequest } from "../ItineraryInterfaces";


const url = 'https://itineraioapi-cqapgsgcbschc7hu.westus-01.azurewebsites.net/';

export const GenerateAndSaveItinerary = async (request:IItineraryRequest,token:string)=>{
    try {
        const response = await fetch(url+'/Itinerary/GenerateAndSaveItinerary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(request),
        });
    
        const message = await response.text(); //  backend sends plain text 
    
        return { //format return to json
          success: response.ok,          // true if status is 200–299 else fails for everything elese
          status: response.status,       // numeric status code
          message: message.trim(),       // ensure clean response
        };
    
      } catch (error) {
        console.error("API call failed:", error);
        return {
          success: false,
          status: 0,
          message: 'Network error or server unreachable.',
        };
      }
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