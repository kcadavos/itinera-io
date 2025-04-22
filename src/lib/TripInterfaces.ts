export interface ITripData {
    id:number,
    destination:string,
    startDate: string,// 'YYYY-MM-DD'  this is also how it is saved in DB for DateOnly data type
    endDate: string, //'YYYY-MM-DD' this is also how it is saved in DB for DateOnly data type
    ownerId: number,
    participantsId: number[],
    isVotingOpen: boolean,
}
