import { IItineraryRequest } from "../ItineraryInterfaces";


const url = 'https://itineraioapi-cqapgsgcbschc7hu.westus-01.azurewebsites.net/';

export const GenerateAndSaveItinerary = async (request:IItineraryRequest)=>{
  
    const res = await fetch(url+"Itinerary/GenerateAndSaveItinerary",{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        //     // "Authorization":"Bearer "+token,
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
