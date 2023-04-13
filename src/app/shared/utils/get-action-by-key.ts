import { availableActions } from "./available-actions";

export const getActionMapping = (
  actionKey: string,
  SYS_MODULE_ID: number | any,
  SYS_SUB_MODULE_ID: number | any,
  MAPPING_OBJECT: any
): any => {
  const actions = availableActions(SYS_MODULE_ID, SYS_SUB_MODULE_ID);
  let matchedAction: any;
  for (const key in MAPPING_OBJECT) {
    if (key == actionKey) {
      const sysActionId = MAPPING_OBJECT[key].id;
      matchedAction = actions.find(
        (action: any) => action.sysActionId == sysActionId
        );
    }
  }
  return matchedAction;
};
