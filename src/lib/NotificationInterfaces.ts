export enum NotificationTypeEnum {
    TripAdded = 0,
    TripUpdated = 1,
    ActivityAdded = 2,
    ActivityVoted = 3,
    ActivityUpdated = 4,
    ItineraryGenerated = 5,
  }
export interface IAddNotification {
    userId: number;
    type: NotificationTypeEnum;  // Using the enum above
    referenceId: number;
    referenceTable: string;
}

export interface IAddGroupNotification {
    userId: number[],
    type: NotificationTypeEnum;  // Using the enum above
    referenceId: number;
    referenceTable: string;
}

export interface   INotificationData{
    id:number,
    userId:number
    type:NotificationTypeEnum 
    referenceId:number
    referenceTable:string
    isRead:boolean
    createdDate:Date
}