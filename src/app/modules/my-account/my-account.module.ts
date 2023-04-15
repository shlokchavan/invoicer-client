import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MyAccountComponent } from './my-account.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { RMIconModule } from 'src/app/shared/components/rm-icon/package.module';
import { RMButtonModule } from 'src/app/shared/components/rm-button/package.module';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { SettingsComponent } from './settings/settings.component';
import { AccountSecurityComponent } from './account-security/account-security.component';
import { SessionHistoryComponent } from './session-history/session-history.component';
import { RMInputModule } from 'src/app/shared/components/rm-input/package.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RMSelectBoxModule } from 'src/app/shared/components/rm-select-box/package.module';
import { RMDateTimePickerModule } from 'src/app/shared/components/rm-datetime-picker/package.module';
import { RMCheckboxModule } from 'src/app/shared/components/rm-checkbox/package.module';
import { ToastContainerModule } from 'src/app/shared/components/rm-toasty/rm-toasty/rm-toasty.directive';
import { RMToastyModule } from 'src/app/shared/components/rm-toasty/rm-toasty/package.module';
import { RMOtpInputModule } from 'src/app/shared/components/rm-otp-input/rm-otp-input.module';
import { UserProfileService } from 'src/app/shared/_http/user-profile.service';
import { TimeZoneService } from 'src/app/shared/_http/timezone.service';
import { LanguageService } from 'src/app/shared/_http/language.service';
import { UserProfileResolverService } from 'src/app/shared/resolvers/user-profile-resolver.service';
import { TimeZoneResolverService } from 'src/app/shared/resolvers/timezone-resolver.service';
import { LanguageResolverService } from 'src/app/shared/resolvers/language-resolver.service';
import { RMTooltipModule } from "src/app/shared/components/rm-tooltip";
import { RMGridModule } from "src/app/shared/components/rm-grid/src/rm-grid.module";
import { AuthService } from "src/app/shared/_http/auth.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RMIconModule,
        RMButtonModule,
        RMInputModule,
        RMSelectBoxModule,
        RMDateTimePickerModule,
        RMCheckboxModule,
        ToastContainerModule,
        RMToastyModule.forRoot(),
        RMOtpInputModule,
        RMGridModule,
        RouterModule.forChild([
            {
                path: '',
                component: MyAccountComponent,
                resolve: {
                    // userProfile: UserProfileResolverService,
                    timeZone: TimeZoneResolverService,
                    language: LanguageResolverService,
                },
                // children: [
                // {
                // path: '',
                // component: MyAccountComponent
                // redirectTo: '/my-account/personal-info',
                // pathMatch: 'full'
                // },
                // { path: 'personal-info', component: PersonalInformationComponent },
                // { path: 'address-details', component: AddressDetailsComponent },
                // { path: 'settings', component: SettingsComponent },
                // { path: 'account-security', component: AccountSecurityComponent },
                // { path: 'session-history', component: SessionHistoryComponent },
                // ]
            }
            // { path: '', component: MyAccountComponent },

        ])
    ],
    declarations: [
        MyAccountComponent,
        PersonalInformationComponent,
        AddressDetailsComponent,
        SettingsComponent,
        AccountSecurityComponent,
        SessionHistoryComponent
    ],
    providers: [
        // UserProfileResolverService,
        UserProfileService,
        TimeZoneResolverService,
        TimeZoneService,
        LanguageResolverService,
        LanguageService,
        AuthService
    ]
})

export class MyAccountModule {
    constructor() { }
}