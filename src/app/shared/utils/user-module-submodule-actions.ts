import { GlobalConfig } from "src/app/configs/global-config";
import { EncryptedStorage } from "./encrypted-storage";

export const userModuleSubModuleActions = (): any[] => {
  return (
    JSON.parse(
      new EncryptedStorage().getItem(
        new GlobalConfig().userModulesSubmodulesLSName!
      )!
    ) || []
  );
};
