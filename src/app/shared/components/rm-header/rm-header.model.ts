import { EventEmitter, TemplateRef } from '@angular/core';


//Properties
export interface IHeaderConfig {
    logoURL: string;
    humbergerIcon: string;
    actions?: IHeaderActionConfig[];
    profileInitial?: string;
    subHeaderConfig?: ISubHeaderConfig;
}

export interface ISubHeaderConfig {
    title: string;
    isBackOption?: boolean;
    subheaderTemplate?: TemplateRef<any>;
    breadcrumb?: IHeaderBreadCrumb[];
}

export interface IHeaderBreadCrumb {
    label: string;
    isActive: boolean;
    route?: string;
    queryRoute?: any;
}

export interface IProfileDrawerConfig {
    isActive: boolean,
    isRightToleft?: boolean,
};


export interface IHeaderActionConfig {
    icon: string;
    label: string;
    action: string;
}


//Methods & EventEmitters
export interface IHeaderEvents {
    onActionClick: EventEmitter<any>;
    onMenuClick: EventEmitter<any>;
    onProfileClick: EventEmitter<any>;
}