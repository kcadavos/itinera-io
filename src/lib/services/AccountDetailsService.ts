import { IUserInfo, IUserDataLogin } from "../Interfaces";

const url = 'https://itineraioapi-cqapgsgcbschc7hu.westus-01.azurewebsites.net/';

export const LoginDetailsUser = async (user:IUserInfo, token:string) => {
    const res = await fetch(url + 'User/EditUser', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`
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
export const LoginDetailsPassword = async (user:IUserDataLogin, token:string) => {
    const res = await fetch(url + 'User/EditPassword', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer "+token,
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