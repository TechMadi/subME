import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MyWalletComponent } from './components/my-wallet/my-wallet.component';
import { AllSubsComponent } from './components/all-subs/all-subs.component';



@NgModule({
  declarations: [
    HomeComponent,
    MyWalletComponent,
    AllSubsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
