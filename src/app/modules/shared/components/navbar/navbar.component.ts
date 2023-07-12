import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../../models/user.model';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  implements OnInit{
  userDetails!: IUser;
  loggedIn_user = this.authService.user
  collapsed = true;
  constructor(private authService: AuthService,private router:Router){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  getUserDetails() {
    this.authService.getUserDetails().then(
      (res) => {
        this.userDetails = res
        this.loggedIn_user.user.photoURL
      }
    )
  }



  logOut() {
    this.authService.signOutUser().then((res) => {
  
      this.router.navigate(['/auth'])
    })
  }
  
}



