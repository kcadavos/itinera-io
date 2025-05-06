import { IUserInfo } from "../Interfaces";

const url = 'https://itineraioapi-cqapgsgcbschc7hu.westus-01.azurewebsites.net/';

export const LoginDetails = async (user:IUserInfo) => {
    const res = await fetch(url + 'User/EditUser', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(user)
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