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

interface selectedTripStartDateInterface {
    selectedTripStartDate: string;
    setSelectedTripStartDate: (startDate:string)=>void;
}

interface selectedTripEndDateInterface {
    selectedTripEndDate: string;
    setSelectedTripEndDate: (endDate:string)=>void;
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


const SelectedTripStartDateContext = createContext<selectedTripStartDateInterface> ({
    selectedTripStartDate:'',
    setSelectedTripStartDate: startDate=>startDate
})
const SelectedTripEndDateContext = createContext<selectedTripEndDateInterface> ({
    selectedTripEndDate:'',
    setSelectedTripEndDate: endDate=>endDate
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
    const[selectedTripStartDate,setSelectedTripStartDate]=useState<string>('');
    const[selectedTripEndDate,setSelectedTripEndDate]=useState<string>('');
    return(
        // <SwitchBoolContext.Provider value={ { switchBool, setSwitchBool } }>
        //     {children}
        // </SwitchBoolContext.Provider>
        <NameContext.Provider value ={{name,setName}}>
            <UserIdContext.Provider  value = {{userId,setUserId}}>
            <SelectedTripIdContext.Provider value={{selectedTripId,setSelectedTripId}}>
            <SelectedTripDestinationContext.Provider value={{selectedTripDestination,setSelectedTripDestination}}>
            <SelectedTripStartDateContext.Provider value = {{selectedTripStartDate,setSelectedTripStartDate}}>
            <SelectedTripEndDateContext.Provider value ={{selectedTripEndDate,setSelectedTripEndDate}}>
             {children}
            </SelectedTripEndDateContext.Provider>
            </SelectedTripStartDateContext.Provider>
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
export function useSelectedTripStartDateContext(){
    return useContext(SelectedTripStartDateContext);
}

export function useSelectedTripEndDateContext(){
    return useContext(SelectedTripEndDateContext)
}
export function useUserIdContext(){
    return useContext(UserIdContext);
}