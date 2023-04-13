export class IRMPickListConfig {
  dataKey?: string;
  returnKey?: string;
  title?: IRMPickListTitleConfig;
  maxSelectionCount?: number;
  showSetting?: boolean
}

export class IRMPickListTitleConfig {
  available?: string;
  selected?: string;
}
