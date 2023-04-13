import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { GlobalConfig } from 'src/app/configs/global-config';
import { EncryptedStorage } from '../utils/encrypted-storage';

@Injectable()
export class AuthRouteGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (
      ( 
        new EncryptedStorage().getItem(new GlobalConfig().authTokenLSName, false) 
        || 
        new EncryptedStorage().getItem(new GlobalConfig().authTokenLSName, true)
      ) && 
      ( 
        new EncryptedStorage().getItem(new GlobalConfig().userAllDetailsLSName, false) 
        || 
        new EncryptedStorage().getItem(new GlobalConfig().userAllDetailsLSName, true)
      )
        ) {
      // logged in so return true
      return true;
    } else {
      // not logged in so redirect to login page
      this.router.navigate([new GlobalConfig().loginRoute]);
      return false;
    }
  }
}
