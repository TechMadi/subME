import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserCredential } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { IUser } from 'src/app/modules/common/models/user.model';
import { Router } from '@angular/router';
import { ISubscription } from 'src/app/modules/common/models/subscription.model';
import { SubscriptionService } from 'src/app/modules/dashboard/services/subscription.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  firestore!: Firestore;
  allSubs: ISubscription[]=[]
  loginForm = {
    email: 'demo@subme.co',
    password: "quikk@23"
  }

  constructor(private authService: AuthService,private router:Router) {
    
  }

  ngOnInit(): void {


   
   
// this.loginUser(this.loginForm)
  }

  loginUser(param: any) {
    this.authService.signInWithEmailAndPassword(param).then(
      () => {
        this.router.navigate(['/app'])
    }
    ).catch((error => {
    
  }))
  }


  registerUser() {
    this.authService.signUpWithEmailAndPassword({
      email: "winnieamandela@gmail.com",
      password: "winnie@23"
    }).pipe(
      

    )
  }


  signInWithGoogle() {

    this.authService.signInWithGoogle().then(
      (res) => {

        this.router.navigate(['/app'])

      }
     
    ).catch((err) => {
      
    })
   
  }



  


}