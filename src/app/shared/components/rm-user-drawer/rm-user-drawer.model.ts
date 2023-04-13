import { EventEmitter } from '@angular/core';
export interface IUserAction {
    type?: string; // Submit
    role?: string; // Primary
    customColor?: string; // Code
    title: string; // My Account
    action: string; // 'profile'
}
export interface IUserSocialAction {
    url: string,
    icon: string
}
export interface IUserDrawerConfig {
    image?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
    socialIcons: Array<IUserSocialAction>;
    actions: Array<IUserAction>;
    profileActivity: {
        modifiedOn: string; //'15th Sep 2019 05:23PM'
        lastLogin: string; //'13th May 2019 03:45PM'
    };
    // theme,
    support: {
        email: {
            icon: string; //email
            title: string; // 'Contact Support'
            action: string; //mailto: xyz@as.com
        }
    }
}


//Methods & EventEmitters
export interface IUserDrawerEvents {
    onClick: EventEmitter<any>;
}