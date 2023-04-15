import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { IResponseSchema } from "src/app/configs/api-config";
import { EncryptedStorage } from "src/app/shared/utils/encrypted-storage";
import { UserProfileService } from 'src/app/shared/_http/user-profile.service';
import { GlobalConfig } from "src/app/configs/global-config";

@Component({
    selector: 'my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class MyAccountComponent implements OnInit {
    userProfile: any;
    selectedTab: any;
    //Temp
    tabs = [
        {
            title: "Personal Information",
            icon: "PersonelInfo",
            route: '/my-account/personal-info',
            isActive: false
        },
        {
            title: "Address",
            icon: "userAddress",
            route: '/my-account/address-details',
            isActive: false
        },
        {
            title: "Settings",
            icon: "AccountSecurity",
            route: '/my-account/settings',
            isActive: false
        },
        {
            title: "Account Security",
            icon: "security",
            route: '/my-account/account-security',
            isActive: false
        },
        {
            title: "Session History",
            icon: "SessionHistory",
            route: '/my-account/session-history',
            isActive: false
        },
    ];
    timeZone: any;
    language: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userProfileService: UserProfileService
    ) {
        this.userProfile = JSON.parse(new EncryptedStorage().getItem(new GlobalConfig().userAllDetailsLSName)!);
        // 
        const timezoneRes: IResponseSchema = this.route.snapshot.data['timeZone'];
        const languageRes: IResponseSchema = this.route.snapshot.data['language'];
        if (timezoneRes.status === 'success') this.timeZone = this.route.snapshot.data['timeZone']?.data;
        
        if (languageRes.status === 'success') this.language = this.route.snapshot.data['language']?.data;

        const currentRoute = this.router.url;
        // const activeTab = this.tabs.filter((tab) => (tab.route === currentRoute))[0];
        const activeTab = this.tabs[0];
        activeTab ? this.selectedTab = activeTab?.title : '';
    }

    ngOnInit() {
        this.refreshData();
    }

    changeRoute(tab: any) {
        

        this.router.navigateByUrl(tab.route);
    }

    btnClicked(type: any, e: any) {
        switch (type) {
            case 'address-details':

                break;
            case 'personal-information':
                break;
            case 'session-history':

                break;
            default:
                break;
        }
        this.refreshData();
    }

    refreshData = () => {
        this.userProfileService.getUserProfileByUserName().subscribe(
            (res: IResponseSchema) => {
                const data = res.data;
                if (res.status === 'success') {
                    this.userProfile = data;
                    new EncryptedStorage().setItem(new GlobalConfig().userAllDetailsLSName, JSON.stringify(data), !new EncryptedStorage().IsLocalStorage);
                    // console.table(data);                
                }

            }
        )
    }


}