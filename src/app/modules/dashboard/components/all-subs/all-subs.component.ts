import { Component, OnInit, inject } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';
import { map, Observable } from 'rxjs';
import {
  Firestore,
  collectionData,
  doc,
  Unsubscribe,
  onSnapshot,
  collection,
  getDocs,
  getDoc,
} from '@angular/fire/firestore';
import {
  IAlert,
  ISubscription,
} from 'src/app/models/subscription.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { IUser } from 'src/app/models/user.model';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-all-subs',
  templateUrl: './all-subs.component.html',
  styleUrls: ['./all-subs.component.scss'],
})
export class AllSubsComponent implements OnInit {
  fireStore: Firestore = inject(Firestore);
  dbPath: string = '/subs';
  allSubscription: ISubscription[] = [];
  myWallet!: any;
  userDetails!: IUser;
  message!: IAlert;
  subsForm: FormGroup;

  constructor(
    private firestore: Firestore,
    private subService: SubscriptionService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.subsForm = fb.group({
      productName: ['', [Validators.required]],
      productLevel: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getUserDetails();
  }

  // Get Product Name
  get productName() {
    return this.subsForm.get('productName');
  }
  // Get User Details
  getUserDetails() {
    this.authService.getUserDetails().then((res) => {
      this.userDetails = res;
      this.getAllSubscriptions(this.userDetails.susbcriptions);
      return this.userDetails;
    });
  }

  // Update  User Subscriptions

  addSubscription() {
    let subToAdd = this.allSubscription.find(
      (x) => x.productName === this.productName?.value
    );

    this.userDetails = {
      ...this.userDetails,
      susbcriptions: subToAdd
        ? this.userDetails.susbcriptions
          ? this.userDetails.susbcriptions.concat(subToAdd)
          : [subToAdd]
        : this.userDetails.susbcriptions,
      myWalletBalance:
        this.getSubValue(
          this.productName?.value,
          this.userDetails.myWalletBalance
        ) || this.userDetails.myWalletBalance,
    };

    this.subService
      .addSubscription(this.userDetails)
      .then((res) => {
        this.modalService.dismissAll();
      })
      .catch((err) => {
        this.message = {
          message: 'Error Adding Subscription',
          type: 'danger',
        };
      });
  }

  // Get All Subscriptions
  async getAllSubscriptions(userSubs: ISubscription[]) {
    this.subService.getSubscriptions(userSubs).then((res) => {
      this.allSubscription = res;
      return this.allSubscription;
    });
  }

  // Calculate  Subscription Value
  getSubValue(subName: string, walletAmount: number) {
    let subSelected = this.allSubscription.find(
      (x) => x.productName === subName
    );
    let wallet = 0;

    if (subSelected) {
      // Check if greater than Wallet Amount
      if (subSelected.productSubValue > walletAmount) {
        this.message = {
          message: `Your Wallet balance is below ${subSelected.productSubValue}`,
          type: 'danger',
        };
      } else {
        wallet = walletAmount - subSelected.productSubValue;
      }
    } else {
      wallet = walletAmount;
    }

    return wallet;
  }

  open(content: any) {
    this.modalService.open(content, { centered: true, animation: true });
  }
}
