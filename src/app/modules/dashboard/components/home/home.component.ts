import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { IUser } from 'src/app/models/user.model';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  userDetails!: IUser;

  loggedIn_user = this.authService.user
  walletForm: FormGroup = new FormGroup({
    myWalletBalance: new FormControl(0, [Validators.required, Validators.min(10)]),
    myMpesaNumber: new FormControl("",[Validators.required])
  })

  isLoading: boolean = false
  constructor(private authService: AuthService, private router: Router,private  modalService:NgbModal,private subService:SubscriptionService) {
    
  }
  
  ngOnInit(): void {
    this.getUserDetails()
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

  addWallet() {
    let newUser: IUser = {
      ...this.userDetails,
      myWalletBalance:this.userDetails.myWalletBalance?this.userDetails.myWalletBalance+this.myWalletBalance?.value : this.myWalletBalance?.value 
    }

    console.log(newUser)
    this.subService.updateUserWallet(newUser, this.loggedIn_user).then(
      (res) => {

        setTimeout(() => {
          this.isLoading = true
      
        }, 1000)



        this.modalService.dismissAll()
        
     }
   )
  }

  get myWalletBalance() {
    return this.walletForm.get('myWalletBalance')
  }

  get myMpesaNumber() {
    return this.walletForm.get('myMpesaNumber')
  }


  open( content:any) {
    this.modalService.open(content,{ centered: true ,animation:true})
 }

}
