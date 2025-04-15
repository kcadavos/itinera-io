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



interface selectedTripIdInterface {
    selectedTripId: number;
    setSelectedTripId: (tripId:number)=>void;
}

interface selectedTripDestinationInterface {
    selectedTripDestination: string;
    setSelectedTripDestination: (destination:string)=>void;
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

const SelectedTripIdContext = createContext<selectedTripIdInterface> ({
    selectedTripId:0,
    setSelectedTripId: tripId=>tripId
})

const SelectedTripDestinationContext = createContext<selectedTripDestinationInterface> ({
    selectedTripDestination:'',
    setSelectedTripDestination: destination=>destination
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
    const[selectedTripId,setSelectedTripId]=useState<number>(0);
    const[selectedTripDestination,setSelectedTripDestination]=useState<string>('');

    return(
        // <SwitchBoolContext.Provider value={ { switchBool, setSwitchBool } }>
        //     {children}
        // </SwitchBoolContext.Provider>
        <NameContext.Provider value ={{name,setName}}>
            <UserIdContext.Provider  value = {{userId,setUserId}}>
            <SelectedTripIdContext.Provider value={{selectedTripId,setSelectedTripId}}>
            <SelectedTripDestinationContext.Provider value={{selectedTripDestination,setSelectedTripDestination}}>

             {children}
            </SelectedTripDestinationContext.Provider>
            </SelectedTripIdContext.Provider>
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
export function useSelectedTripIdContext(){
    return useContext(SelectedTripIdContext);
}

export function useSelectedTripDestinationContext(){
    return useContext(SelectedTripDestinationContext);
}
export function useUserIdContext(){
    return useContext(UserIdContext);
}