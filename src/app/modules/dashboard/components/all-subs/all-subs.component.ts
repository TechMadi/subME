import { Component, OnInit, inject } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';
import { map, Observable } from 'rxjs';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';

@Component({
  selector: 'app-all-subs',
  templateUrl: './all-subs.component.html',
  styleUrls: ['./all-subs.component.scss']
})
export class AllSubsComponent implements OnInit {
  fireStore: Firestore = inject(Firestore)
  dbPath:string="/subs"
  allSubscription$ !: any[];
  myWallet!:any;

  constructor( private firestore:Firestore) {   
  }



  ngOnInit(): void {
   
  }


//  getAllSubscriptions() : Observable<any> {
//      return this.allSubscription$
//  }
  
  
  // getWallet() {
   
  // }
  
}