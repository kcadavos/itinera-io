
const url = 'https://itineraioapi-cqapgsgcbschc7hu.westus-01.azurewebsites.net/';
// const url ='http://localhost:5054/';

export const getTripListByUserId = async (userId: number)=>{
    const promise = await fetch (url+"/Trip/GetTripsByUserId/"+userId);
    const data = await promise.json();
    console.log("FETCH DATA"+data);
    return data;

}