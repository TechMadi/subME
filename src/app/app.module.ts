
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { environment } from './environments/environments';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(()=>getFirestore()),
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
   
   
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
