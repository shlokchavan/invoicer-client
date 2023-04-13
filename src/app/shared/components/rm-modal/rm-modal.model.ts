import { ISplitButtonConfig } from "../rm-button/rm-button.model";

export class IRMModalConfig {
  heading!: string;
  size?: string;
  padding?: string;
  showExpand?: boolean;
  disableClose?: boolean;
  autoFocus?: boolean;
  height?: any;
  width?: any;
  footerActions?: IRMModalFooterConfigAction[];
}

export class IRMModalFooterConfigAction {
  value!: string;
  type?: string;
  role?: string;
  customColor?: string;
  icon?: string;
  disabled?: boolean;
  loading?: boolean;
  methodCallback?: string;
  splitButtonConfig?: ISplitButtonConfig;
}
