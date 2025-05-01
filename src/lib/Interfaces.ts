export interface IUserInfoCreate {
    email: string
    password: string
    name: string
}


export interface IUserDataLogin {
    password: string
    email: string
   
}


// to use for getting userid and user's name from db
export interface IUserInfo{ 
    id:number
    email: string,
    name:string
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

export interface IActivityData {
    tripId: number,
    activity: string,
    category: string,
    address: string,
    details: string,
}

export interface IActivityListData {
    id: number,
    tripId: number,
    activity: string,
    category: string,
    address: string,
    details: string
}

export interface IVotedata {
    activityId: number,
    userId: number,
    voteType: string
}
