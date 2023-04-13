import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpEvent,
} from '@angular/common/http';
import { ApiConfig } from 'src/app/configs/api-config';
import { environment } from './../../../environments/environment';
import { EncryptedStorage } from '../utils/encrypted-storage';
import { currentUser } from '../utils/current-user';
import { getAuthToken } from '../utils/auth-token';
import { map } from 'rxjs/internal/operators/map';
import { GlobalConfig } from 'src/app/configs/global-config';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CLoginModel } from 'src/app/modules/login/login.model';
@Injectable()
export class LoginService {
  // Variables
  baseUrl: string;
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private deviceService: DeviceDetectorService
  ) {
    this.baseUrl = environment.apiUrl;
    this.userSubject = new BehaviorSubject<any>(null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): any {
    return this.userSubject.value;
  }

  oldLoginUser(userModel: any): Observable<any> {
    // Return Auth Token if success
    return this.httpClient.post(
      this.baseUrl + '/login-service/api/login',
      userModel,
      { responseType: 'text' }
    );
    // Need to Fix (Refresh Token Logic)
    // .pipe(
    //   map((token) => {
    //     // this.userSubject.next(token);
    //     this.startRefreshTokenTimer();
    //     return token;
    //   })
    // );
  }

  loginUser(userModel: CLoginModel | any): Observable<any> {
    // Return Auth Token if success
    userModel['deviceInfo'] = {
      deviceId: this.deviceService.getDeviceInfo().browser,
      deviceType: this.deviceService.getDeviceInfo().device,
    };
    // Actual Logic
    // return this.httpClient.post(
    //   this.baseUrl + "/ak-login-service/api/login",
    //   userModel,
    // );
    if (
      userModel?.userName == environment.loginAdmin.userName &&
      userModel?.password == environment.loginAdmin.password
    ) {
      return of({
        message: 'Logged In Successfully!',
        error: null,
        data: {
          accessToken:
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjbGFyay5ob2dhbiIsImF1ZCI6IjEiLCJyb2xlSWQiOjEwMDAxLCJzeXNSb2xlSWQiOjEwMCwicm9sZU5hbWUiOiJTUCBBZG1pbiIsInVzZXJJZCI6MTAxLCJvcmdJZCI6MSwicGFyZW50T3JnSWQiOjAsIm9yZ1R5cGVJZCI6MSwianRpIjoiMTAxIiwiaWF0IjoxNjgwMjUwNjY5LCJpc3MiOiJRbnVRYmxRV244SDlnZ2l3ZkdiQ3hwUEEzZ2RZMW9BZSIsImV4cCI6MTY4MDI1MTg2OX0.3_DYPTKiTag1d1fDlVLrwSjY6CTsIlA6obja-qJrMUJGNXQzkS57aBqMGoshZ1N8VZrcd6wsdSPhFtpKfyDbmg',
          refreshToken: '99b70ec7-ad4b-4cd6-a089-7d982287fed4',
          tokenType: 'Bearer:',
          expiryDuration: 1200000,
        },
        status: 'success',
      });
    }
    return of({
      message: 'Invalid Credentials!',
      error:
        'AuthenticationException: Invalid Credentials!',
      data: null,
      status: 'error',
    });
  }

  getNavigationModulesAndSubmodules = () => {
    const userData = JSON.parse(new EncryptedStorage().getItem(new GlobalConfig().userAllDetailsLSName)!);
    const orgId = userData.organizationId;
    const roleId = userData.roleId;
    return this.httpClient.get(
      `${this.baseUrl}/subscription-service/sub/roleModuleMapping/${orgId}/${roleId}`
    );
  };

  getNavigationModulesAndSubmodulesByUserAuth = () => {
    return this.httpClient.get(
      `${this.baseUrl}/subscription-service/sub/roleModuleMapping/user`
    );
  };

  getNavigationBookmarks = () => {
    return this.httpClient.get(
      `${this.baseUrl}/subscription-service/sub/roleModuleMapping/getUserBookMark`
      // `${this.baseUrl}/subscription-service/sub/roleModuleMapping/getUserBookMark/${orgId}/${userId}`
    );
  };

  getAllOrgType(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/subscription-service/sub/sysOrgType`
    );
  }

  getAllUserListUsingOrgId(userId: any): Observable<any> {
    // return this.httpClient.get(
    //   `${this.baseUrl}/subscription-service/sub/user/${userId}/findAllUser`
    // );
    return this.httpClient.get(
      `${this.baseUrl}/subscription-service/sub/user/${userId}/findClientSupervisorAndAuditor`
    );
  }

  // Get Client Report Master
  getAllResponseCodes(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/client-admin-service/client/mstTypeLookup/RESPONSE`
    );
  }

  // Logout
  logoutUser(): Observable<any> {
    const payload = {
      deviceInfo: {
        deviceId: this.deviceService.getDeviceInfo().browser,
        deviceType: this.deviceService.getDeviceInfo().device,
      },
    };
    return this.httpClient.put(
      `${this.baseUrl}/ak-login-service/api/logout`,
      payload
    );
  }

  generateNewAuthTokenUsingRefreshToken(
    baseUrl: string,
    token: string
  ): Observable<any> {
    let payLoad = {
      refreshToken: token,
    };
    return this.httpClient.post(
      `${baseUrl}/ak-login-service/api/refresh`,
      payLoad
    );
  }

  confirmUserToken(token: string) {
    return this.httpClient.get<any>(
      `${this.baseUrl}/subscription-service/auth/confirmUser?token=${token}`
    );
  }

  createNewPassword(payload: any) {
    return this.httpClient.post<any>(
      `${this.baseUrl}/subscription-service/auth/savePassword`,
      payload
    );
  }

  // Refresh Token
  // refreshToken() {
  //   return this.httpClient
  //     .get<any>(`${this.baseUrl}/login-service/api/tokenRefresh`);
  // }

  // refreshTokenTimeout: NodeJS.Timeout;

  // startTimer(time: number): Promise<Observable<any>> {
  //   return new Promise<Observable<any>>((resolve, reject) => {
  //     this.refreshTokenTimeout = setTimeout(() => {
  //     resolve(this.refreshToken());
  //     }, time);
  //   })
  // }

  // setupTimer(isRememberMe) {
  //   const jwtToken = JSON.parse(atob(new EncryptedStorage().getItem(new GlobalConfig().authTokenLSName).split(".")[1]));
  //   const expiresTimed = new Date(jwtToken.exp * 1000);
  //   // Set Expiry 2 minutes before token expiry
  //   const timeOut = new Date(expiresTimed.getTime() - (1000 * 120));
  //   new EncryptedStorage().setItem(
  //     new GlobalConfig().tokenTimeToReset,
  //     timeOut.getTime() - new Date().getTime(),!isRememberMe as boolean
  //   )
  // }

  // private stopRefreshTokenTimer() {
  //   clearTimeout(this.refreshTokenTimeout);
  // }
}
