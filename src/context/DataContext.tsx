'use client'

import { createContext, useContext, useState } from "react";

interface Context {
    switchBool: boolean,
    setSwitchBool: (switchBool: boolean) => void;
}

// Creating the context
const SwitchBoolContext = createContext<Context>({
    switchBool: true ,
    setSwitchBool: (switchBool: boolean) => switchBool
});

// Creating the wrapper
export function AppWrapper({ children }: { children: React.ReactNode }){
    const [switchBool, setSwitchBool] = useState<boolean>(true);

    return(
        <SwitchBoolContext.Provider value={ { switchBool, setSwitchBool } }>
            {children}
        </SwitchBoolContext.Provider>
    )
}

// Function to allow acces to data
export function useAppcontext() {
    return useContext(SwitchBoolContext);
}