import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserCredential } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { IUser } from 'src/app/modules/common/models/user.model';
import { Router } from '@angular/router';
import {
  IAlert,
  ISubscription,
} from 'src/app/modules/common/models/subscription.model';
import { SubscriptionService } from 'src/app/modules/dashboard/services/subscription.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  firestore!: Firestore;
  allSubs: ISubscription[] = [];
  loginForm: FormGroup;
  message!: IAlert;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = fb.group({
      displayName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  get displayName() {
    return this.loginForm.get('displayName');
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {}

  loginUser() {
    let newUser = this.loginForm.value;

    this.authService
      .signInWithEmailAndPassword(newUser)
      .then(() => {
        this.router.navigate(['/app']);
      })
      .catch((error) => {
        this.message = {
          type: 'danger',
          message: 'Please use the correct details',
        };
      });
  }

  signInWithGoogle() {
    this.authService
      .signInWithGoogle()
      .then((res) => {
        this.message = {
          type: 'success',
          message: 'Login Successfully',
        };
        this.router.navigate(['/app']);
      })
      .catch((err) => {
        this.message = {
          type: 'danger',
          message: 'Error!Try again kindly',
        };
      });
  }
}
