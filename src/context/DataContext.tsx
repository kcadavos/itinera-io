'use client'

import { createContext, useContext, useState } from "react";


type LoginStatus = 'idle' | 'success' | 'failed'| "create";
type CreateStatus = 'idle'|'success'| 'failed' | 'exists';
type AccountStatus = 'idle'| 'password'| 'account'

interface AccountStatusInterFace{
    accountStatus: AccountStatus;
    setAccountStatus: (status: AccountStatus)=> void;
}
interface CreateStatusInterFace{
    createStatus: CreateStatus;
    setCreateStatus: (status: CreateStatus)=> void;
}
interface LoginStatusInterface {
  loginStatus: LoginStatus;
  setLoginStatus: (status: LoginStatus) => void;
}
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

interface selectedParticipantsListIdInterface{
    selectedParticipantsIdList: number[],
    setSelectedParticipantsIdList:(participantsIdList:number[])=>void
}
interface selectedTripOwnerIdInterface{
    selectedTripOwnerId: number,
    setSelectedTripOwnerId:(ownerId:number)=>void
}




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

const SelectedParticipantsListIdContext  = createContext<selectedParticipantsListIdInterface>({
    selectedParticipantsIdList :[],
    setSelectedParticipantsIdList: selectedPartcipantsIdList => selectedPartcipantsIdList
})

const SelectedTripOwnerIdContext = createContext<selectedTripOwnerIdInterface>({
    selectedTripOwnerId:0,
    setSelectedTripOwnerId: ownerId=>ownerId
})
const LoginStatusContext = createContext<LoginStatusInterface>({
    loginStatus: 'idle',
    setLoginStatus: () => {},
  });
const CreateStatusContext = createContext<CreateStatusInterFace>({
  createStatus: 'idle',
 setCreateStatus: ()=>{}
});

const AccountStatusContext = createContext<AccountStatusInterFace>({
    accountStatus: 'idle',
    setAccountStatus:()=>{}
})

export function AppWrapper({ children }: { children: React.ReactNode }){
   
    const [name,setName] = useState<string>('');
    const[userId,setUserId] = useState<number> (0);
    const[selectedTripId,setSelectedTripId]=useState<number>(0);
    const[selectedTripDestination,setSelectedTripDestination]=useState<string>('');
    const[selectedTripStartDate,setSelectedTripStartDate]=useState<string>('');
    const[selectedTripEndDate,setSelectedTripEndDate]=useState<string>('');
    const[selectedParticipantsIdList,setSelectedParticipantsIdList]=useState<number[]>([]);
    const[selectedTripOwnerId,setSelectedTripOwnerId]=useState<number>(0);
    const [loginStatus, setLoginStatus] = useState<LoginStatus>('idle');
    const [createStatus, setCreateStatus] = useState<CreateStatus>('idle');
    const [accountStatus, setAccountStatus] = useState<AccountStatus>('idle');

    return(
        <AccountStatusContext.Provider value={{ accountStatus, setAccountStatus}}>
        <CreateStatusContext.Provider value={{ createStatus, setCreateStatus}}>
        <LoginStatusContext.Provider value={{ loginStatus, setLoginStatus }}>
        <NameContext.Provider value ={{name,setName}}>
            <UserIdContext.Provider  value = {{userId,setUserId}}>
            <SelectedTripIdContext.Provider value={{selectedTripId,setSelectedTripId}}>
            <SelectedTripDestinationContext.Provider value={{selectedTripDestination,setSelectedTripDestination}}>
            <SelectedTripStartDateContext.Provider value = {{selectedTripStartDate,setSelectedTripStartDate}}>
            <SelectedTripEndDateContext.Provider value ={{selectedTripEndDate,setSelectedTripEndDate}}>
            <SelectedParticipantsListIdContext.Provider value ={{selectedParticipantsIdList,setSelectedParticipantsIdList}}>
            <SelectedTripOwnerIdContext.Provider value={{selectedTripOwnerId,setSelectedTripOwnerId}}>
             {children}
            </SelectedTripOwnerIdContext.Provider>
            </SelectedParticipantsListIdContext.Provider>
            </SelectedTripEndDateContext.Provider>
            </SelectedTripStartDateContext.Provider>
            </SelectedTripDestinationContext.Provider>
            </SelectedTripIdContext.Provider>
            </UserIdContext.Provider>
        </NameContext.Provider>
        </LoginStatusContext.Provider>
        </CreateStatusContext.Provider>
        </AccountStatusContext.Provider>
    )
}

// Function to allow acces to data


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

export function useSelectedTripParticipantsIdListContext(){
    return useContext(SelectedParticipantsListIdContext);
}

export function useSelectedTripOwnerIdContext(){
    return useContext(SelectedTripOwnerIdContext);
}
export function useLoginStatusContext() {
    return useContext(LoginStatusContext);
  }

  export function useCreateStatusContext(){
    return useContext(CreateStatusContext);
  }

  export function useAccountStatusContext(){
    return useContext(AccountStatusContext);
  }