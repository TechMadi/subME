import { Component, OnInit, inject } from '@angular/core';
import { Auth, authState,getAuth,User, onAuthStateChanged, UserCredential,user } from '@angular/fire/auth';
import { Firestore, collectionData,collection, doc, getDoc, getFirestore, query, where, getDocs, setDoc ,updateDoc, onSnapshot} from '@angular/fire/firestore';




import { Observable, map } from 'rxjs';
import { IUser } from 'src/app/models/user.model';
import { SubscriptionService } from '../../services/subscription.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.component.html',
  styleUrls: ['./my-wallet.component.scss']
})
export class MyWalletComponent implements OnInit {
  myWallet!: Observable<number>;
  userDetails!: IUser | any;
  user_uid: any;
  loggedin_user!: any;
  blurBalance:boolean=true
  


  constructor(private db:Firestore,private authService:AuthService,  private subscriptionService:SubscriptionService) {
    db = getFirestore();
    this.loggedin_user=authService.user
  }

ngOnInit(): void {
 this.getMyWallet()
  
   
}


  
  getMyWallet() {
 
    this.subscriptionService.getMyWallet(this.loggedin_user.user.uid).then(
      (res) => {

        this.userDetails = res.data()
          
      }
    )
  }
  
  
  updateMyWallet() {
    let walletUpdate:IUser = {
      ... this.userDetails,
      myWalletBalance:60   
      }
    this.subscriptionService.updateUserWallet(walletUpdate, this.loggedin_user).then(
      (res) => {
        this.getMyWallet()
     }
    )
  }


  async UpdateMyWallet(amount: number) {
    let userToUpdate:IUser = {
      ... this.userDetails,
      myWalletBalance:amount
      } 
    // Collect Refrence
    let userRef = doc(this.db, `users/${this.user_uid}`);
    console.log(this.user_uid)
    
   await  setDoc(userRef, userToUpdate, { merge: true })


//     console.log(this.user_uid)
//     let userQuery=query(userRef, where("uid", "==", this.use))
//     getDocs(userQuery).then(
//       (res) => {
//         this.updateField()
//         console.log(res.docs[0].data())   
//       }
//     )
 
//  this.updateField(userQuery,40)
    // Update Field
    // await updateDoc(userRef, {
    //   myWalletBalance:amount
    // }).then(
    //   (res) => {
    //      console.log(res)
    //   }
    // )
  
  
  }

 async  updateField(userRef:any,amount:number) {
    await updateDoc(userRef, {
      myWalletBalance:amount
    }).then(
      (res) => {
         console.log(res)
      }
    )
  }
      
  }




    
//    // console.log(collectionData(docRef))


//      //  return  doc(collection(this.firestore,'users')).id
//     // let userDocRef =  doc(this.firestore,`users/`)
    
//   }
  

 

  
  
  

