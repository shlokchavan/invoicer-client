import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { GlobalConfig } from 'src/app/configs/global-config';
import { EncryptedStorage } from '../utils/encrypted-storage';

@Injectable()
export class LoginRouteGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (
      (new EncryptedStorage().getItem(
        new GlobalConfig().authTokenLSName,
        false
      ) ||
        new EncryptedStorage().getItem(
          new GlobalConfig().authTokenLSName,
          true
        )) &&
      (new EncryptedStorage().getItem(
        new GlobalConfig().userAllDetailsLSName,
        false
      ) ||
        new EncryptedStorage().getItem(
          new GlobalConfig().userAllDetailsLSName,
          true
        ))
    ) {
      // logged in so go to dashboard
      this.router.navigate([new GlobalConfig().dashboardRoute]);
      return false;
    } else {
      // if not logged in
      return true;
    }
  }
}
