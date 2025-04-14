export interface IUserInfoCreate {
    email: string
    password: string
    name: string
}
export interface IUserTrips{
    
}

export interface IUserDataLogin {
    password: string
    email: string
    name: string
}

export interface IToken {
    token: string
}

export interface ITripData {
    id:number,
    destination:string,
    startDate: string,// 'YYYY-MM-DD'  this is also how it is saved in DB for DateOnly data type
    endDate: string, //'YYYY-MM-DD' this is also how it is saved in DB for DateOnly data type
    ownerId: number,
    setTripListData: number[],
    isVotingOpen: boolean,
}
