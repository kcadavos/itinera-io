
const url = 'https://itineraioapi-cqapgsgcbschc7hu.westus-01.azurewebsites.net/';
// const url ='https://localhost:5054/';

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
        const errorMsg = "ERROR";
        console.log("ERROR " +errorMsg);
        return [] // return empty array 
    }

    const data = await res.json();
    console.log("FETCH DATA"+data);
    return data;

}