import { IActivityData, IActivityListData, IVotedata } from "../Interfaces";


const url = 'https://itineraioapi-cqapgsgcbschc7hu.westus-01.azurewebsites.net/';

// --------------------------adding acivity
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

// --------------------------get the list for the undecided acivities
export const GetUndecidedActivities = async (userId: number, tripId: number) => {
    const res = await fetch(url + `Activity/GetUndecidedActivities/${userId}/${tripId}`);

    if(!res.ok){
        const data = await res.json();
        const message = data.message;
        console.log(message);
        return null;
    }

    const userData = await res.json();
    return userData;

}

//------------------------- add to liked/disliked list
export const AddVote = async (vote: IVotedata) => {
    const res = await fetch(url + 'Activity/AddVote', {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(vote)
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

//------------------remove from liked/dislied list


//------------------------------get liked activities list
export const GetLikedActivities = async (userId: number, tripId: number) => {
    const res = await fetch(url + `Activity/GetLikedActivities/${userId}/${tripId}`);

    if(!res.ok){
        const data = await res.json();
        const message = data.message;
        console.log(message);
        return null;
    }
    const userData = await res.json();
    return userData;
}

//----------------------------get disliked list
export const GetDislikedActivities = async (userId: number, tripId: number) => {
    const res = await fetch(url + `Activity/GetDislikedActivities/${userId}/${tripId}`);

    if(!res.ok){
        const data = await res.json();
        const message = data.message;
        console.log(message);
        return null;
    }

    const userData = await res.json();
    return userData;

}