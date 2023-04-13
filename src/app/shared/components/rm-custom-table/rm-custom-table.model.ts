import { IChipConfig } from "../rm-chip/rm-chip.model";

export interface IRMCustomTable {
  colDefs: IRMCustomTableColumn[];
  showMoreCount?: number;
  gridTitle?: string;
  showTotalRecords?: boolean;
}

export interface IRMCustomTableColumn {
  headerName?: string;
  field?: string;
  aggFunc?: string;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  type?: string;
  multiRenderer?: IRMCustomTableRenderer[];
}

export interface IRMCustomTableRenderer {
  component?: IRMCustomTableChip | any;
}

export interface IRMCustomTableChip {
  type?: string;
  config?: IChipConfig;
  conditionField?: string;
  condition?: string | boolean;
  value?: string | number;
}
