import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { EncryptedStorage } from "../utils/encrypted-storage";
import { GlobalConfig } from "src/app/configs/global-config";

@Injectable()
export class UserProfileService {
  baseUrl: string;
  userDetails: any; // All Details
  orgId: any; //OrgId
  userId: any; //UserId
  logginId: any; //UserId
  userName: any; //User Name

  constructor(private httpClient: HttpClient) {
    // this.baseUrl = environment.apiUrl.replace(':8080', ':9200');
    this.baseUrl = environment.apiUrl;
    this.updateStorage();
  }

  updateStorage() {
    this.userDetails = JSON.parse(new EncryptedStorage().getItem(new GlobalConfig().userAllDetailsLSName)!); // All Details
    this.orgId = this.userDetails?.organizationId; //OrgId
    this.userId = this.userDetails?.userId; //UserId
    this.logginId = this.userDetails?.userLoginId; //UserId
    this.userName = this.userDetails?.userName; //User Name
  }

  getLoggedInUserDetails = (usernameOrEmail: string) => {
    return this.httpClient.get(`${this.baseUrl}/subscription-service/sub/userProfile/getUserProfileByUserName`);
    // return this.httpClient.get(
    //   `${this.baseUrl}/subscription-service/sub/userProfile/getUserProfileByUserName/${usernameOrEmail}/`
    // );
  };

  getUserProfileDetails(): Observable<any> {
    // userId: any
    this.updateStorage();
    // Get User Details
    return this.httpClient.get(
      `${this.baseUrl}/subscription-service/sub/userProfile/getUserProfileByUserId/${this.userId}`
    );
  }

  getUserProfileByUserName = () => {
    // usernameOrEmail: string
    this.updateStorage();
    return this.httpClient.get(
      // `${this.baseUrl}/subscription-service/sub/userProfile/getUserProfileByUserName/${this.userName}/`
      // `${this.baseUrl}/subscription-service/sub/userProfile/getUserProfileByUserName`
      `./../../../assets/json/my-account/user-profile-by-username.json`
    );
  };

  getSessionHistory = () => {
    this.updateStorage();
    return this.httpClient.get(
      // `${this.baseUrl}/subscription-service/sub/userProfile/getUserProfileSessionHistory/${this.userId}/`
      // `${this.baseUrl}/subscription-service/sub/userProfile/getUserProfileSessionHistory`
      './../../../assets/json/my-account/user-session-history.json'
    );
  };

  public saveAddressDetails(addressForm: any): Observable<any> {
    this.updateStorage();
    // API Call for Update/ Add
    const saveObject = {
      ...addressForm,
      organizationId: Number(this.orgId),
      userId: Number(this.userId),
      userLoginId: Number(this.logginId),
      userName: this.userName,
    };

    // Return status code
    return this.httpClient.post(
      `${this.baseUrl}/subscription-service/sub/userProfile/userProfileAddress`,
      saveObject
    );
  }

  public savePersonalInformation(personalInfo: any): Observable<any> {
    this.updateStorage();
    // API Call for Update/ Add
    const saveObject = {
      ...personalInfo,
      organizationId: Number(this.orgId),
      userId: Number(this.userId),
      userLoginId: Number(this.logginId),
      userName: this.userName,
    };
    
    // Return status code
    return this.httpClient.post(
      `${this.baseUrl}/subscription-service/sub/userProfile/userProfilePersonalInfo`,
      saveObject
    );
  }

  public saveSettings(settingDetails: any): Observable<any> {
    this.updateStorage();
    // API Call for Update/ Add
    const saveObject = {
      ...settingDetails,
      organizationId: Number(this.orgId),
      userId: Number(this.userId),
    };
    
    // Return status code
    return this.httpClient.post(
      `${this.baseUrl}/subscription-service/sub/userProfile/userProfileSettings`,
      saveObject
    );
  }

  public saveAccountSecurity(passwordDetails: any): Observable<any> {
    this.updateStorage();
    // API Call for Update/ Add
    const saveObject = {
      password: passwordDetails,
      organizationId: Number(this.orgId),
      userId: Number(this.userId),
    };
    
    // Return status code
    return this.httpClient.post(
      `${this.baseUrl}/subscription-service/sub/userProfile/userProfileAccountSecurity`,
      saveObject
    );
  }

  public savePassword(passwordDetails: any): Observable<any> {
    this.updateStorage();
    // API Call for Update/ Add
    const saveObject = {
      password: passwordDetails,
      organizationId: Number(this.orgId),
      userId: Number(this.userId),
    };
    
    // Return status code
    return this.httpClient.post(
      `${this.baseUrl}/subscription-service/sub/userProfile/userProfileSettings`,
      saveObject
    );
  }
}
