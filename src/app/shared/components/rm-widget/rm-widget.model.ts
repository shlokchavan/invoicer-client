import { TemplateRef } from "@angular/core";

export const defaultWidgetActions: IRMWidgetAction[] = [
  {
    icon: "refresh",
    event: "refresh",
    tooltip: "Refresh",
  },
  {
    icon: "maximise",
    event: "maximise",
    tooltip: "Maximize",
  },
  {
    icon: "download",
    event: "download",
    tooltip: "Download",
  },
];

export interface ICustomChartConfig {
  customChartConfig?: {
    rawData: any[];
    filterVal?: any;
    viewType: "chart" | "grid";
    rawDataConverter: (data: any[], configData, filterVal?: any, overAllConfig?: IRMWidgetConfig) => any;
  },
  type?: any;
  data?: any;
  options?: any;
  gridConfig?: any;
  gridRows?: any;
  dataConfig?: ICustomChartConfig;
}

export interface IRMWidgetConfig {
  widgetId?: string | any;
  title?: string | any;
  exportTitle?: string | any;
  additionalActionTemplate?: TemplateRef<any> | any;
  // Actions
  actions?: IRMWidgetAction[];
  dataConfig?: ICustomChartConfig; // Chart Config
  breadcrumbs?: any[];
  maxLevel?: number;
  // Filters
  filterType?: "viewBy" | "template"; //sort |
  filterObject?: any;
  filterOptions?: any;
  selectedOption?: any;

  // Custom lengend
  customLegend?: string | any;
  customLegendTemplateRef?: TemplateRef<any>;
}

export interface IRMWidgetAction {
  icon: string;
  event: string | any;
  isCallBack?: string | any | boolean;
  tooltip?: any;
}
