import { IUserInfoCreate, IUserDataLogin, IUserInfo } from "../Interfaces";


const url = 'https://itineraioapi-cqapgsgcbschc7hu.westus-01.azurewebsites.net/';


//--------Create Account Fetch ------------
export const CreateAccount = async (user: IUserInfoCreate) => {
    const res = await fetch(url + 'User/CreateUser', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(user)
    });
    if(!res.ok){
        const data = await res.json();
        const message = data.message;
        console.log(message);
        return data.success;
    }

    const data = await res.json();
    return data.success;
}

//----------------Login fetch---------------------
export const Login = async (user:IUserDataLogin) => {
    const res = await fetch(url + 'User/Login', {
        method: "POST",
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


export const GetLoggedInUserData = async (email:string) => {
    const res = await fetch(url + `User/GetUserInfoByEmail/${email}`);

    if(!res.ok){
        const data = await res.json();
        const message = data.message;
        console.log(message);
        return null;
    }

        const userData: IUserInfo = await res.json();
        return userData;
    

}

export const getToken =()=>{
    return localStorage.getItem("ItineraToken") ?? ""; // return a empty string if the local storage is null
}


