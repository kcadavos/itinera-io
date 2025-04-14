'use client'

import { createContext, useContext, useState } from "react";

// interface Context {
//     switchBool: boolean,
//     setSwitchBool: (switchBool: boolean) => void;
// }

interface nameInterface {
    name: string;
    setName : (name: string)=>void;
}

interface userIdInterface{
    userId: number;
    setUserId: (userId:number)=>void;
}



interface tripIdInterface {
    tripId: number;
    setTripId: (tripId:number)=>void;
}
// Creating the context
// const SwitchBoolContext = createContext<Context>({
//     switchBool: true ,
//     setSwitchBool: (switchBool: boolean) => switchBool
// });

const NameContext = createContext<nameInterface>({
    name:'',
    setName: name => name
});

const TripIdContext = createContext<tripIdInterface> ({
    tripId:0,
    setTripId: tripId=>tripId
})

const UserIdContext = createContext<userIdInterface> ({
    userId : 0,
    setUserId : userId=> userId
})

// Creating the wrapper
export function AppWrapper({ children }: { children: React.ReactNode }){
    // const [switchBool, setSwitchBool] = useState<boolean>(true);
    const [name,setName] = useState<string>('');
    const[userId,setUserId] = useState<number> (0);
    const[tripId,setTripId]=useState<number>(0);

    return(
        // <SwitchBoolContext.Provider value={ { switchBool, setSwitchBool } }>
        //     {children}
        // </SwitchBoolContext.Provider>
        <NameContext.Provider value ={{name,setName}}>
            <UserIdContext.Provider  value = {{userId,setUserId}}>
            <TripIdContext.Provider value={{tripId,setTripId}}>
             {children}
            </TripIdContext.Provider>
            </UserIdContext.Provider>
        </NameContext.Provider>
    )
}

// Function to allow acces to data

// export function useAppcontext() {
//     return useContext(SwitchBoolContext);
// }

export function useNameContext(){
    return useContext(NameContext);
}
export function useTripIdContext(){
    return useContext(TripIdContext);
}
export function useUserIdContext(){
    return useContext(UserIdContext);
}