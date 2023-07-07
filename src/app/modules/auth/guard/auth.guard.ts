import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  let authService=inject(AuthService)
  let  router =inject(Router)

  let isLoggedin = authService.isLoggedIn()
  authService.redirectUrl= state.url? state.url : '/app'
  
  if (isLoggedin) {
    return true
  } else {
    router.navigateByUrl('/auth/login')
  }
  return true;
};
