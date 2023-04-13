import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../../environments/environment"
import { EncryptedStorage } from '../../utils/encrypted-storage';


@Injectable()
export class RMComparisionTableService {
  baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  getComparisionOfPackages(apiEndPoint: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}${apiEndPoint}`); 
  }

  getAllClientPackages(clientId: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/subscription-service/sub/subscriptionPlan/${clientId}`); 
  }

}
