import { ISubscription } from "./subscription.model";

export interface IUser {
    uid: string,
   displayName:string | null,
    email: string | null,
    authType: string,
    myWalletBalance:number,
    susbcriptions: ISubscription[];
 



}
