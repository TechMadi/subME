import { Observable, from, map } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection, CollectionReference, DocumentData,Query, doc, getDocs,getDoc, setDoc } from '@angular/fire/firestore';
import { Auth, Unsubscribe, UserCredential, user } from '@angular/fire/auth';
import { ISubscription } from '../../common/models/subscription.model';
import { AuthService } from '../../auth/services/auth.service';
import { onSnapshot, where } from 'firebase/firestore';
import { IUser } from '../../common/models/user.model';


// import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  loggedin_user: UserCredential = this.authService.user
  userRef = doc(this.firestore, `users/${this.loggedin_user.user.uid}`);
 

  subscriptions: ISubscription[] = [
    {
      productName: "Spotify",
      productLevel: "Annual",
      productLogo: "https://firebasestorage.googleapis.com/v0/b/subme-m.appspot.com/o/subImages%2Fproduct_spotify.png?alt=media&token=68826636-c15d-41c4-a0f8-d6d02e74678b",
      productSubValue: 300,
      
    },
    {
      productName: "Google Photos",
      productLevel: "Annual",
      productLogo: "https://firebasestorage.googleapis.com/v0/b/subme-m.appspot.com/o/subImages%2Fproduct_photos.png?alt=media&token=2400e76b-1763-474b-8895-118807d54d45",
      productSubValue:500
    },
    {
      productName: "Prime Video",
      productLevel: "Annual",
      productLogo: "https://firebasestorage.googleapis.com/v0/b/subme-m.appspot.com/o/subImages%2Fproduct_prime.png?alt=media&token=6c8f7b59-929c-4958-a985-2959e5bb54dc",
      productSubValue:700
  }
]

  

  constructor(private readonly firestore:Firestore,private readonly auth:Auth,private authService:AuthService,) {
  
  }

 async getMyWallet(userID:string) {

  // Get doc Ref
   let userColRef = doc(this.firestore, "users", userID) 
  //  display the data
  return   await getDoc(userColRef)
  }
 
async  updateUserWallet(walletUpdate: any, user: UserCredential) {
    // get ref
  await setDoc(this.userRef, walletUpdate, { merge: true })
  return user
  }


  async addSubscription(subToAdd: IUser) {

  await setDoc(this.userRef, subToAdd, { merge: true })
  
  return this.loggedin_user
}
  
  
  
  
  async getSubscriptions(userSubscriptions: ISubscription[]) {
    
    if (userSubscriptions) {
      this.subscriptions = this.subscriptions.filter(x => { return !userSubscriptions.includes(x) }
      )
  }
   

 
    return this.subscriptions;
  }
}
