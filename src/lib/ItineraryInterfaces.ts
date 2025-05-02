export interface IItineraryRequest {
    tripId:number,
    numberOfActivitiesPerDay:number

}

export interface IItineraryData {
    id:number,
    tripId:number,
    dayNumber:number,
    activityIds:number[],
}
