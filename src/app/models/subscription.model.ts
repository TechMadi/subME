import { Timestamp } from "firebase/firestore";

export interface ISubscription {
	productName: string,
	productLogo: string,
	productSubValue: number,
	productLevel: string,
	timeCreated?: Timestamp,
	expiryDate?:Date
}


export interface IAlert {
	type: string;
	message: string;
}
