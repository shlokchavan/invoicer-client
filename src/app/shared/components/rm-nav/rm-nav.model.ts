import { ISubHeaderConfig } from "../rm-header/rm-header.model";

export interface IRMNavConfig {
    NavItems: IRMNavItemConfig[];
    BookmarkSelections?: IRMBookMarkConfig[];
    // BookmarkSelections?: IRMNavItemConfig[];
}

export interface IRMNavItemConfig {
    moduleId?: any;
    sysModuleId?: any;
    label?: string;
    icon?: string;
    isWIP?: boolean;
    route?: string;
    showSubHeader?: boolean;
    SubHeaderOptions?: ISubHeaderConfig;
    isSelected?: boolean;
    children?: IRMNavItemConfig[];
    subModuleList?: any[]
}

export interface IRMBookMarkConfig {
    userBookMarkId: number; //28
    moduleId: number; //10001
    subModuleId?: number; //10001
    sysSubModuleId?: number;
    subModuleName: string; //"Dashboard"
    subModuleDescription: string; //"Dashboard"
    subModuleDisplayName: string; //"Dashboard (SP)"
    bookMarkOrder: number; //4
    route?: string;
}