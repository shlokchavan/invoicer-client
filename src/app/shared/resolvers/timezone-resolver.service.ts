import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TimeZoneService } from '../_http/timezone.service';

@Injectable()
export class TimeZoneResolverService implements Resolve<any> {
    constructor(
        private timeZoneService: TimeZoneService
    ) {

    }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.timeZoneService.getAllTimeZones(); //ORGID
    }
}