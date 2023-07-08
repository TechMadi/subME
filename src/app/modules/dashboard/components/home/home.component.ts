import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { IUser } from 'src/app/modules/common/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit{
  
  userDetails!: IUser;
  collapsed = true;

  constructor(private  authService:AuthService) {
    
  }
  
  ngOnInit(): void {
      this.getUserDetails()
  }
  getUserDetails() {
    this.authService.getUserDetails().then(
      (res) => {
        this.userDetails=res
    }
  )
}
}
