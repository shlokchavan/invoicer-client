import { userModuleSubModuleActions } from "./user-module-submodule-actions";
export const availableActions = (
  SYS_MODULE_ID: number | any,
  SYS_SUB_MODULE_ID: number | any
) => {
  const availableModules = userModuleSubModuleActions();
  const selectedModule = availableModules.find(
    (module: any) => module.sysModuleId == SYS_MODULE_ID
  );
  const selectedSubModule = selectedModule["subModuleList"].find(
    (module: any) => module.sysSubModuleId == SYS_SUB_MODULE_ID
  );
  const availableItems = selectedSubModule["moduleActionList"];
  return availableItems;
};
