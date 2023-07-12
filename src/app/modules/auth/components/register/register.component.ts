import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IAlert } from 'src/app/models/subscription.model';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;
  message!: IAlert;

  constructor(private authService: AuthService,private router:Router, private  fb:FormBuilder) {
    
    this. registerForm = fb.group({
      displayName: ['', [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.email, Validators.required]],
      password:["",[Validators.required,Validators.minLength(3)]]
    })
  }

  get displayName() {
    return  this. registerForm.get('displayName')
  }
  get email() {
    return  this. registerForm.get('email')
  }
  get password() {
    return  this. registerForm.get('password')
  }


  registerUser() {

    let newUser = this.registerForm.value
    
    this.authService.signUpWithEmailAndPassword(newUser).then(
      (res) => {
        this.router.navigate(['/auth/login'])
      }
    ).catch(err => {
      
      this.message = {
        type: "danger",
        message:"Error!Try again kindly"
      }
    })
  }

  signInWithGoogle() {

    this.authService.signInWithGoogle().then(
      (res) => {

        this.message = {
          type: "success",
          message:"Login Successfully"
        }
        this.router.navigate(['/app'])

      }
     
    ).catch((err) => {
      this.message = {
        type: "danger",
        message:"Error!Try again kindly"
      }
      
    })
   
  }



}
