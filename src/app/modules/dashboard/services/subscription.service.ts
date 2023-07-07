import { Observable, from } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection, CollectionReference, DocumentData,Query, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Auth, UserCredential } from '@angular/fire/auth';
import { ISubscription } from '../../common/models/subscription.model';
import { AuthService } from '../../auth/services/auth.service';

// import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private alSubs!: CollectionReference<DocumentData>;
  loggedin_user:UserCredential=this.authService.user
  userRef = doc(this.firestore, `users/${this.loggedin_user.user.uid}`);
  
  // subRef= collection(this.firestore,'subs')

  constructor(private readonly firestore:Firestore,private readonly auth:Auth,private authService:AuthService) {
    
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


async addSubscription(subToAdd: ISubscription) {
    
  await setDoc(this.userRef, subToAdd, { merge: true })
  
  return this.loggedin_user
}
  
  
  
  async getSubscriptions() {
    let subRef= collection(this.firestore,'subs')
    await  collectionData(subRef)
  }
}
