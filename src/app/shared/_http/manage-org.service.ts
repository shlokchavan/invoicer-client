import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { EncryptedStorage } from "../utils/encrypted-storage";
import { currentOrg } from "../utils/current-org";

import { getActionMapping } from "../utils/get-action-by-key";
import { GlobalConfig } from "src/app/configs/global-config";

@Injectable()
export class ManageOrgService {
  baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  getAllOrganisations(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/subscription-service/sub/organization`
    );
  }
  

  getAllOrganisationsByOrgType(orgTypeId: any): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/subscription-service/sub/organization/organizationByType/${orgTypeId}`
    );
  }

  getAllClientOrganisationBySRId(srOrgId: any): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/subscription-service/sub/organization/clientOrganization/${srOrgId}`
    );
  }

  getClientListBySRId(srOrgId: any): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/subscription-service/sub/organization/childOrganizationByOrgId/${srOrgId}`
    );
  }

  getOrganizationDetails(orgIds: number[]): Observable<any> {
    const orgs = orgIds
      .map((org, index) => {
        const queryString = `orgId=${org}${
          orgIds.length == 1 || index == orgIds.length - 1 ? "" : "&"
        }`;
        return queryString;
      })
      .join("");
    // 
    const apiUrl = `${this.baseUrl}/subscription-service/sub/organization/organizationInfoDetail?${orgs}`;
    return this.httpClient.get(apiUrl);
  }

  getOrgDetailsById(id?: number | any): Observable<any> {
    const userDetails = JSON.parse(new EncryptedStorage().getItem(new GlobalConfig().userAllDetailsLSName)!); // All Details
    const orgId = userDetails?.organizationId;
    const apiUrl = `${this.baseUrl}/subscription-service/sub/organization/${
      id || orgId
    }`;
    return this.httpClient.get(apiUrl);
  }

  getOrgDetailsByUserAuth(): Observable<any> {
    const apiUrl = `${this.baseUrl}/subscription-service/sub/organization/user`;
    return this.httpClient.get(apiUrl);
  }

  getThemesByMyOrg(): Observable<any> {
    const apiUrl = `${this.baseUrl}/subscription-service/sub/userProfile/myOrgColourTheme`;
    return this.httpClient.get(apiUrl);
  }

  // Get All SR Org
  getAllSROrganisation(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/subscription-service/sub/organization/srOrganization`
    );
  }

  // Get All Contact of Org
  getAllOrgContacts(orgId: number | string) {
    return this.httpClient.get(
      `${this.baseUrl}/subscription-service/sub/contact/${orgId}`
    );
  }

  // Get All Address of Org
  getAllOrgAddress(orgId: number | string) {
    return this.httpClient.get(
      `${this.baseUrl}/subscription-service/sub/address/${orgId}`
    );
  }

  addAllMastersInOrg(allMastersData: any[], orgId: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/subscription-service/sub/masterInOrg/${orgId}`,
      allMastersData
    );
  }

  addRolesInSrOrg(rolesData: any[], orgId: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/subscription-service/sub/roleInOrg/${orgId}/mapRoleToSrOrg`,
      rolesData
    );
  }

  addRolesInClientOrg(rolesData: any[], orgId: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/subscription-service/sub/roleInOrg/${orgId}/mapRoleToClientOrg`,
      rolesData
    );
  }


  addPackagesInSrOrg(packagesData: any[], orgId: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/subscription-service/sub/packageInOrg/${orgId}/mapPackageToOrg`,
      packagesData
    );
  }

  changePackageName(packagesData: any[], orgId: any): Observable<any> {
    return this.httpClient.put(
      `${this.baseUrl}/subscription-service/sub/packageInOrg/${orgId}/myOrgDisplayName`,
      packagesData
    );
  }

  changeRoleName(rolesData: any[], orgId: any): Observable<any> {
    return this.httpClient.put(
      `${this.baseUrl}/subscription-service/sub/roleInOrg/${orgId}/myOrgDisplayName`,
      rolesData
    );
  }

  addPackagesInClientOrg(packagesData: any[], orgId: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/subscription-service/sub/packageInOrg/${orgId}/mapPackageToOrg`,
      packagesData
    );
  }
}
