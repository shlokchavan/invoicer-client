import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ManageMasterService } from '../_http/manage-master.service';

@Injectable()
export class ManageMasterSystemResolverService implements Resolve<any> {
    constructor(
        private manageMasterService: ManageMasterService
    ) {

    }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.manageMasterService.getAllSystemMaster();
    }
}
