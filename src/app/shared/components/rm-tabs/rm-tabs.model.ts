import { EventEmitter, TemplateRef } from "@angular/core";

export interface ITabsAttribute {
  labelPosition?: string;
  disable?: boolean;
  isMandatory?: boolean;
  class?: string;
  padding?: any;
}

export interface ITabItemAttribute {
  disable?: boolean;
  icon?: string;
  color?: string;
  iconPosition?: string;
  padding?: any;
}

export interface ITabItemConfig {
  value?: any;
  viewId?: any;
  template?: TemplateRef<any>;
  label: string;
  attributes?: ITabItemAttribute;
  isDropDown?: boolean
}

export interface ITabsConfig {
  selectedTabIndex?: number;
  tabs?: Array<ITabItemConfig>;
  attributes?: ITabsAttribute;
}

export interface ITabsEvents {
  onChange: EventEmitter<any>;
}
