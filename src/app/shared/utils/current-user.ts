import { GlobalConfig } from "src/app/configs/global-config";
import { EncryptedStorage } from "./encrypted-storage";

export const currentUser = () => {
  return JSON.parse(
    new EncryptedStorage().getItem(new GlobalConfig().userAllDetailsLSName)!
  ); // User Details
};
