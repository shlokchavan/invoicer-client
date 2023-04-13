import { GlobalConfig } from "src/app/configs/global-config";
import { EncryptedStorage } from "./encrypted-storage";

export const getAllOrgType = () => {
    // GET ALL ORG TYPE FROM LS
    const orgTypeLSName = new GlobalConfig().organisationTypeLSName;
    const allOrgType: any[] = JSON.parse(new EncryptedStorage().getItem(orgTypeLSName)!);
    return allOrgType;
}