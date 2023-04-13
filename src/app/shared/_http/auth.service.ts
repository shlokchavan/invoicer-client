import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable()
export class AuthService {
  baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = `${environment.apiUrl}/subscription-service/auth`;
  }

  // Change Password

  generateOtpChangePassword(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/generateOtpChangePassword/`);
  }

  validateOtp(otp: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/validateOtp?otpnum=${otp}`);
  }

  changeUserPassword(newPassword: string): Observable<any> {
    const payload = {
      newPassword: newPassword,
    };
    return this.httpClient.post(
      `${this.baseUrl}/updatePassword?newPassword=${newPassword}`,
      payload
    );
  }

  // Forget Password

  generateOtpForgetPassword(email: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/generateOtpForgetPassword?emailId=${email}`
    );
  }

  validateOtpForgetPassword(otp: number, email: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/validateOtpForgetPassword?otpnum=${otp}&emailId=${email}`
    );
  }

  savePassword(userId: any, newPassword: string): Observable<any> {
    const payload = {
      userId: userId,
      newPassword: newPassword,
    };
    return this.httpClient.post(
      `${this.baseUrl}/savePassword?userId=${userId}&newPassword=${newPassword}`,
      payload
    );
  }

  // resetPassword(newPassword: string): Observable<any> {
  //   const payload = {
  //     newPassword: newPassword,
  //   };
  //   return this.httpClient.post(
  //     `${this.baseUrl}/updatePassword?newPassword=${newPassword}`,
  //     payload
  //   );
  // }

  // saveAddressListByOrgId(
  //   orgId,
  //   addressModelList: OrgAddressDetails[]
  // ): Observable<any> {
  //   return this.httpClient.post(
  //     `${this.baseUrl}/subscription-service/sub/address/${orgId}`,
  //     addressModelList
  //   );
  // }
}
