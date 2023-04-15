import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment"
import { EncryptedStorage } from '../utils/encrypted-storage';
import { GlobalConfig } from 'src/app/configs/global-config';
@Injectable()
export class LanguageService {
  baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  getAllLanguages(): Observable<any> {
    // orgId: number;
    const userDetails = JSON.parse(new EncryptedStorage().getItem(new GlobalConfig().userAllDetailsLSName)!);
    const orgId = userDetails?.organizationId;
    // Get User Details
    // return this.httpClient.get(`${this.baseUrl}/subscription-service/sub/langugaeInOrg/${orgId}`);
    return this.httpClient.get(`./../../../assets/json/my-account/language-in-org.json`);

  }

  

}
