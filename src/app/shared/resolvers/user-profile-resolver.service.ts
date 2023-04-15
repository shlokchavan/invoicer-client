import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserProfileService } from '../_http/user-profile.service';

@Injectable()
export class UserProfileResolverService implements Resolve<any> {
    constructor(
        private userProfileService: UserProfileService
    ) {

    }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.userProfileService.getUserProfileDetails();
    }
}