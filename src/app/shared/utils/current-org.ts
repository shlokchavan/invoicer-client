import { GlobalConfig } from "src/app/configs/global-config";
import { EncryptedStorage } from "./encrypted-storage";

export const currentOrg = () => {
    const userOrg = JSON.parse(new EncryptedStorage().getItem(
        new GlobalConfig().userOrgTypeLSName!
    )!); // User Org Details
    return userOrg;
}