import { IActivityData } from "../Interfaces";


const url = 'https://itineraioapi-cqapgsgcbschc7hu.westus-01.azurewebsites.net/';

export const AddActivity = async (activity: IActivityData) => {
    const res = await fetch(url + 'Activity/AddActivity', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(activity)
    });

    if(!res.ok){
        const data = await res.json();
        const message = data.message;
        console.log(message);
        return null;
    }

    const data = await res.json();
    return data;
}