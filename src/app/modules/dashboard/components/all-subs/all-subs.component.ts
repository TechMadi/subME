import { Component, OnInit, inject } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';
import { map, Observable } from 'rxjs';
import { Firestore, collectionData, doc,Unsubscribe, onSnapshot ,collection, getDocs, getDoc} from '@angular/fire/firestore';
import { IAlert, ISubscription } from 'src/app/modules/common/models/subscription.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { IUser } from 'src/app/modules/common/models/user.model';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-all-subs',
  templateUrl: './all-subs.component.html',
  styleUrls: ['./all-subs.component.scss']
})
export class AllSubsComponent implements OnInit {
  fireStore: Firestore = inject(Firestore)
  dbPath: string = "/subs"
  allSubscription: ISubscription[] = []
  myWallet!: any;
  userDetails!: IUser;
  message!: IAlert;
  subsForm: FormGroup;

  constructor(private firestore: Firestore, private subService: SubscriptionService,private  modalService:NgbModal,private  fb:FormBuilder,private authService:AuthService) {
  
    this.subsForm = fb.group({
      productName: ['', [Validators.required]],
      productLevel:['',[Validators.required]]
  })
  }



  ngOnInit(): void {
    this.getUserDetails()

   
  }


// Get User Details
  getUserDetails() {
    this.authService.getUserDetails().then(
      (res) => {
        this.userDetails = res
        this.getAllSubscriptions(this.userDetails.susbcriptions)
        return    this.userDetails
        }
      )
  }
 
  get productName() {
    return this.subsForm.get('productName')
  }
 
 
  addSubscription() {
   


  //  Wallet Balance is More
    
   

   this.userDetails = {
     ...this.userDetails,
     susbcriptions: this.userDetails.susbcriptions ? this.userDetails.susbcriptions?.concat(this.subsForm.value) : [this.subsForm.value], 
     myWalletBalance: this.getSubValue(this.productName?.value,this.userDetails.myWalletBalance) ?  this.getSubValue(this.productName?.value,this.userDetails.myWalletBalance) : this.userDetails.myWalletBalance
   }
   
  
  // this.userDetails.susbcriptions?.push(this.subsForm.value)
    
    this.subService.addSubscription(this.userDetails).then((res) => {
        this.modalService.dismissAll()
    }).catch((err) => {
      this.message = {
        message: "Error Adding Subscription",
        type:"danger"
       }
    })
   
  }

  async getAllSubscriptions(userSubs:ISubscription[]) {
    this.subService.getSubscriptions(userSubs).then(
      (res) => {


        this.allSubscription = res
     return  this.allSubscription
   }
 )
    // console.log(this.onSnapshotSubscription)
  }

  
  getSubValue(subName: string, walletAmount: number) {
    
    // Get Subsrciption Product 
    let subSelected = this.allSubscription.find(x => x.productName === subName)  
    let wallet=0

    if (subSelected) {
      // Check if greater than Wallet Amount
      if (subSelected.productSubValue > walletAmount) {
        this.message = {
          message: `Your Wallet balance is below ${subSelected.productSubValue}`,
          type: 'danger'
        };
      } else {
        wallet= walletAmount - subSelected.productSubValue;
      }
    } else {
      wallet= walletAmount;
    }
    
  return  wallet
  }

  open( content:any) {
   this.modalService.open(content,{ centered: true ,animation:true})
}

  
}