import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LanguageService } from '../_http/language.service';

@Injectable()
export class LanguageResolverService implements Resolve<any> {
    constructor(
        private languageService: LanguageService
    ) {

    }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.languageService.getAllLanguages(); //ORGID
    }
}