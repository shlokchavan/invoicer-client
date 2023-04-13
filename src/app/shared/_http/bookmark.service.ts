import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../../environments/environment";
import { EncryptedStorage } from "../utils/encrypted-storage";
import { GlobalConfig } from "src/app/configs/global-config";
@Injectable()
export class BookmarkService {
  baseUrl: string;
  userData: any;
  orgId: any;
  userId: any;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.apiUrl;
    this.updateStorage();
  }

  updateStorage() {
    this.userData = JSON.parse(new EncryptedStorage().getItem(new GlobalConfig().userAllDetailsLSName)!); // All Details
    this.orgId = this.userData.organizationId;
    this.userId = this.userData.userId;
  }

  saveBookmarks(list: any): Observable<any> {
    this.updateStorage();
    // return this.httpClient.post(`${this.baseUrl}/subscription-service/sub/roleModuleMapping/getUserBookMark/${this.orgId}/${this.userId}`, list);
    return this.httpClient.post(
      `${this.baseUrl}/subscription-service/sub/roleModuleMapping/getUserBookMark`,
      list
    );
  }

  getNavigationBookmarks = () => {
    this.updateStorage();
    // return this.httpClient.get(`${this.baseUrl}/subscription-service/sub/roleModuleMapping/getUserBookMark/${this.orgId}/${this.userId}`);
    return this.httpClient.get(
      `${this.baseUrl}/subscription-service/sub/roleModuleMapping/getUserBookMark`
    );
  };
}
