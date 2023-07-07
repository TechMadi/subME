import { IUser } from './../../common/models/user.model';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import  {Auth, GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup,createUserWithEmailAndPassword, UserCredential,browserLocalPersistence}   from '@angular/fire/auth';
import { Injectable, inject } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  redirectUrl: string = ""
  user!: UserCredential;

  constructor(private readonly auth: Auth, private firestore: Firestore) {
    this.auth = getAuth()
    this.firestore = getFirestore();

    this.auth.setPersistence(browserLocalPersistence);
    this.getAuthStatus()
  }


  // Sign In with  EmailAndPassword
  async signInWithEmailAndPassword(loginDetails: { email: string, password: string }){
    return await  signInWithEmailAndPassword(this.auth, loginDetails.email, loginDetails.password)
  }  

  // SignUpwithEmailAndPassword
  async signUpWithEmailAndPassword(signUpDetails: any ) {
    return  await  createUserWithEmailAndPassword
      (this.auth,signUpDetails.email,signUpDetails.password).then(
        (res) => {
  
          let  newUser: IUser = {
            uid: res.user.uid,
            displayName: res.user.displayName,
            email: res.user.email,
            myWalletBalance: 0,
            authType:'email and Password'    
          }
          this.user=res
   this.createUser(newUser)
        })
  }


  // Social Auth 
  signInWithGoogle() {
    let provider = new GoogleAuthProvider()
    return signInWithPopup(this.auth, provider).then(
      (res) => {

        let  newUser: IUser = {
          uid: res.user.uid,
          displayName: res.user.displayName,
          email: res.user.email,
          myWalletBalance: 0,
          authType:'google'    
        }

        this.user=res
        this.createUser(newUser)
      }).catch(err => {
        
      })
  
  }


 

  createUser(userToAdd: IUser) {
    // Select the document
    let newUser = doc(this.firestore, `users/${userToAdd.uid}`);
    // Update document
    setDoc(newUser, userToAdd, { merge: true })
  
  }


  updateCurrentUser(user: IUser) {
     
  }

 async  getAuthStatus(){
   await  onAuthStateChanged(this.auth,(user) => {
      if (user) {
         return true
      }
      else {
        return false
      }
     })
    
  }

  async getCurrentUser() {
    onAuthStateChanged(this.auth, (user:any) => {
      if (user) {
       
        return  user
      } else {
           return  null
        }
     })
  }


  isLoggedIn(): boolean{
   return !!this.auth.currentUser
  
  }


  // Sign Out
  signOutUser() {
      signOut(this.auth)
  }
}
