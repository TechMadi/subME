import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MyWalletComponent } from './components/my-wallet/my-wallet.component';
import { AllSubsComponent } from './components/all-subs/all-subs.component';
import { NgbAlert, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HomeComponent,
    MyWalletComponent,
    AllSubsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAlert,
    SharedModule
  ]
})
export class DashboardModule { }
