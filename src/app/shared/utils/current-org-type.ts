import { GlobalConfig } from "src/app/configs/global-config";
import { EncryptedStorage } from "./encrypted-storage";

export const currentOrgType = () => {
  const userOrg = JSON.parse(
    new EncryptedStorage().getItem(new GlobalConfig().userOrgTypeLSName)!
  ); // User Org Details
  let userType = ""; // sp |sr | client | vendor
  if(userOrg)
  switch (userOrg?.orgTypeId) {
    case 1:
      userType = "sp";
      break;
    case 2:
      userType = "sr";
      break;
    case 3:
      userType = "client";
      break;
    case 4:
      userType = "vendor";
      break;

    default:
      break;
  }
  return userType;
};
