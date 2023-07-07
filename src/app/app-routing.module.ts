import { DashboardModule } from './modules/dashboard/dashboard.module';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guard/auth.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: 'app',
    pathMatch:"full"
  },
  
  {
    path: "auth",
   
  loadChildren: async()=>(await import('./modules/auth/auth.module')).AuthModule
  },
  {
    path: "app",
    canActivate:[AuthGuard],
    loadChildren: async()=>(await import ('./modules/dashboard/dashboard.module')).DashboardModule
  }
 


  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
