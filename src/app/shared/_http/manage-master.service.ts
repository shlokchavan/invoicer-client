import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { EncryptedStorage } from "../utils/encrypted-storage";
import { MasterTypeModel } from "src/app/modules/administrator/manage-master/model/manage-master.model";
import { currentOrg } from "../utils/current-org";
import { getActionMapping } from "../utils/get-action-by-key";
import {
  MANAGE_MASTER_KEYS,
  SYSTEM_MASTER_ACTION_MAPPING,
} from "src/app/modules/administrator/manage-master/extra/system-master-action.mapping";
import { GlobalConfig } from "src/app/configs/global-config";

@Injectable()
export class ManageMasterService {
  baseUrl: string;
  localUrl = "../../../assets/json/theme-collection.json";
  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  // System
  getAllSystemMaster(): Observable<any> {
    // orgId: number;
    const userDetails = JSON.parse(new EncryptedStorage().getItem(new GlobalConfig().userAllDetailsLSName)!);
    const orgId = userDetails?.organizationId;
    // Get User Details
    return this.httpClient.get(
      // `${this.baseUrl}/subscription-service/sub/sysMaster`
      './../../../assets/json/manage-master/system-master.json'
      
    );
  }

  getSystemMasterDetailByMasterId(masterId: any): Observable<any> {
    // Get System Master Details
    return this.httpClient.get(
      // `${this.baseUrl}/subscription-service/sub/sysMaster/getMasterDetail/${masterId}`
      './../../../assets/json/manage-master/system-master-detail-by-id.json'
    );
  }

  getSystemMasterDetailForDesignationByMasterId(masterId: any): Observable<any> {
    // Get Current Org Id
    const userDetails = JSON.parse(new GlobalConfig().userAllDetailsLSName);
    const orgId = userDetails?.organizationId;
    // Get System Master Details
    return this.httpClient.get(
      `${this.baseUrl}/subscription-service/sub/masterInOrg/${orgId}/${masterId}`
    );
    // /subscription-service/sub/masterInOrg/{​​​​​orgId}​​​​​​​​​​​​/8
  }
  getMasterInOrg(
    masterId: number | any,
    orgId?: number | any
  ): Observable<any> {
    // Get Current Org Id
    const currentOrgId = currentOrg().organizationId;
    // Get System Master Details
    return this.httpClient.get(
      `${this.baseUrl}/subscription-service/sub/masterInOrg/${
        orgId || currentOrgId
      }/${masterId}`
    );
    // /subscription-service/sub/masterInOrg/{​​​​​orgId}​​​​​​​​​​​​/8
  }

  getSystemMasterType(masterId: any): Observable<any> {
    // orgId: number;
    const userDetails = JSON.parse(new GlobalConfig().userAllDetailsLSName);
    const orgId = userDetails?.organizationId;
    // Get User Details
    return this.httpClient.get(
      `${this.baseUrl}/subscription-service/sub/sysMaster`
    );
  }

  updateSystemMasterItem(
    sysMasterId: any,
    recordId: any,
    payload: any
  ): Observable<any> {
    const { sysActionId, actionId } = getActionMapping(
      "edit_item_save", //actionKey,
      MANAGE_MASTER_KEYS.SYS_MODULE_ID,
      MANAGE_MASTER_KEYS.SYS_SUB_MODULE_ID,
      SYSTEM_MASTER_ACTION_MAPPING
    );
    return this.httpClient.put(
      `${this.baseUrl}/subscription-service/sub/sysMaster/getMasterDetail/${sysMasterId}/${recordId}?sysActionId=${sysActionId}&actionId=${actionId}`,
      payload
    );
  }

  deleteSystemMasterItem(sysMasterId: any, recordId: any): Observable<any> {
    const { sysActionId, actionId } = getActionMapping(
      "delete_master_item", //actionKey,
      MANAGE_MASTER_KEYS.SYS_MODULE_ID,
      MANAGE_MASTER_KEYS.SYS_SUB_MODULE_ID,
      SYSTEM_MASTER_ACTION_MAPPING
    );
    return this.httpClient.delete(
      `${this.baseUrl}/subscription-service/sub/sysMaster/getMasterDetail/${sysMasterId}/${recordId}?sysActionId=${sysActionId}&actionId=${actionId}`
    );
  }

  getSystemMasterItemByName(sysMasterId: any, name: any): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/subscription-service/sub/sysMaster/getMasterDetail/getByName/${sysMasterId}?name=${name}`
    );
  }

  addNewSystemMasterItem(sysMasterId: any, payload: any): Observable<any> {
    const { sysActionId, actionId } = getActionMapping(
      "new_item_save", //actionKey,
      MANAGE_MASTER_KEYS.SYS_MODULE_ID,
      MANAGE_MASTER_KEYS.SYS_SUB_MODULE_ID,
      SYSTEM_MASTER_ACTION_MAPPING
    );
    if (sysMasterId == 5) {
      payload.isActive = 1
    }
    return this.httpClient.post(
      `${this.baseUrl}/subscription-service/sub/sysMaster/getMasterDetail/${sysMasterId}?sysActionId=${sysActionId}&actionId=${actionId}`,
      payload
    );
  }

  updateSystemMasterType(
    masterId: any,
    masterTypeData: MasterTypeModel
  ): Observable<any> {
    const { sysActionId, actionId } = getActionMapping(
      "edit_master_save", //actionKey,
      MANAGE_MASTER_KEYS.SYS_MODULE_ID,
      MANAGE_MASTER_KEYS.SYS_SUB_MODULE_ID,
      SYSTEM_MASTER_ACTION_MAPPING
    );
    // orgId: number;
    const userDetails = JSON.parse(new GlobalConfig().userAllDetailsLSName);
    const orgId = userDetails?.organizationId;
    // Get User Details
    return this.httpClient.put(
      `${this.baseUrl}/subscription-service/sub/sysMaster/${masterId}?sysActionId=${sysActionId}&actionId=${actionId}`,
      masterTypeData
    );
  }

  updateSystemMasterSequence(mastersInSeq: any[]): Observable<any> {
    const { sysActionId, actionId } =
      getActionMapping(
        "update_order", // "default_action", //actionKey,
        MANAGE_MASTER_KEYS.SYS_MODULE_ID,
        MANAGE_MASTER_KEYS.SYS_SUB_MODULE_ID,
        SYSTEM_MASTER_ACTION_MAPPING
      ) || {};
    // orgId: number;
    const userDetails = JSON.parse(new GlobalConfig().userAllDetailsLSName);
    const orgId = userDetails?.organizationId;
    let submitURL =
      sysActionId && actionId
        ? `${this.baseUrl}/subscription-service/sub/sysMaster/updateSequence?sysActionId=${sysActionId}&actionId=${actionId}`
        : `${this.baseUrl}/subscription-service/sub/sysMaster/updateSequence`;
    // Get User Details
    return this.httpClient.post(submitURL, mastersInSeq);
  }

  // Client
  getAllClientMaster(): Observable<any> {
    // orgId: number;
    const userDetails = JSON.parse(new GlobalConfig().userAllDetailsLSName);
    const orgId = userDetails?.organizationId;
    // Get User Details
    return this.httpClient.get(
      `${this.baseUrl}/client-admin-service/client/clientMaster`
    );
  }

  // Theme Color Card
  getThemeColor(): Observable<any> {
    return this.httpClient.get(this.localUrl);
  }

  // Get Complete System Master List with childs
  getMasterListwithChildForCreateOrg(orgId: any): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/subscription-service/sub/masterInOrg/${orgId}`
    );
  }

  getMasterListwithChildForMyOrg(orgId: any): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/subscription-service/sub/masterInOrg/${orgId}/myOrgView`
    );
  }

  // Bulk Upload
  bulkUploadSystemMaster(masterId: any, payload: any) {
    const { sysActionId, actionId } = getActionMapping(
      "bulk_upload_item", //actionKey,
      MANAGE_MASTER_KEYS.SYS_MODULE_ID,
      MANAGE_MASTER_KEYS.SYS_SUB_MODULE_ID,
      SYSTEM_MASTER_ACTION_MAPPING
    );
    return this.httpClient.post(
      `${this.baseUrl}/subscription-service/sub/sysMaster/bulkUpload/${masterId}?sysActionId=${sysActionId}&actionId=${actionId}`,
      payload
    );
  }
}
