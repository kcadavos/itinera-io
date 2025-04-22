
const url = 'https://itineraioapi-cqapgsgcbschc7hu.westus-01.azurewebsites.net/';


export const getTripListByUserId = async (userId: number,token:string)=>{
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
        console.log("Error on fetch: " + errorMsg);
        return [] // return empty array 
    }

    const data = await res.json();
    console.log("FETCH DATA"+data);
    return data;

}