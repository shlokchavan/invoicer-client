import { GlobalConfig } from "src/app/configs/global-config";
import { EncryptedStorage } from "./encrypted-storage";

export const getAuthToken = () => {
  return JSON.parse(
    new EncryptedStorage().getItem(new GlobalConfig().authTokenLSName)!
  ); // Auth Token
};
