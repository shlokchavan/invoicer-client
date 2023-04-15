import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import { map, mergeMap, retry } from 'rxjs/operators';
import { IResponseSchema } from 'src/app/configs/api-config';
import { GlobalConfig } from 'src/app/configs/global-config';
import { GenerateDialog } from 'src/app/shared/components/rm-notifications/dialog-method.util';
import { NotificationDialogModel } from 'src/app/shared/components/rm-notifications/rm-notifications.model';
import { ToastContainerDirective } from 'src/app/shared/components/rm-toasty/rm-toasty/rm-toasty.directive';
import { RmToastyService } from 'src/app/shared/components/rm-toasty/rm-toasty/rm-toasty.service';
import { getAuthToken } from 'src/app/shared/utils/auth-token';
import { currentUser } from 'src/app/shared/utils/current-user';
import { EncryptedStorage } from 'src/app/shared/utils/encrypted-storage';
import { ThemeService } from 'src/app/shared/_global/theme.service';
import { LoginService } from 'src/app/shared/_http/login.service';
import { ManageOrgService } from 'src/app/shared/_http/manage-org.service';
import { UserProfileService } from 'src/app/shared/_http/user-profile.service';

//Config Imports
import {
  LoginIdInput,
  LoginPasswordInput,
  RememberMeCheckbox,
} from '../../configs/plugin-components/login-form.config';
import { CLoginModel } from './login.model';
import { USER_DETAILS, USER_NAVIGATION } from './sample_data';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    LoginService,
    RmToastyService,
    ThemeService,
    UserProfileService,
    ManageOrgService,
  ],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  // Template Ref
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer!: ToastContainerDirective;

  // Configs
  loginForm = new FormGroup({
    loginId: new FormControl('', Validators.required),
    loginPassword: new FormControl('', Validators.required),
  });
  public loginInputConfig = {
    LoginIdInput,
    LoginPasswordInput,
    RememberMeCheckbox,
  };
  toastyConfig: any;

  // Models
  loginModel: CLoginModel = new CLoginModel();

  loginObserver: any;

  constructor(
    public dialog: MatDialog,
    private loginService: LoginService,
    private organizationService: ManageOrgService,
    private userProfileService: UserProfileService,
    private router: Router,
    private toastyService: RmToastyService,
    private themeService: ThemeService
  ) {
    this.loginInputConfig.LoginIdInput.attributes.disable = this.isLoading;
    this.loginInputConfig.LoginPasswordInput.attributes.disable =
      this.isLoading;
  }

  ngOnInit() {
    // Reset Application Storage when user is logged out and page is redirected to login.
    // const bookmarks = new EncryptedStorage().getItem(new GlobalConfig().bookmarkLSName);
    new EncryptedStorage().clearAll();
    this.checkStorageEvent();
    // new EncryptedStorage().setItem(
    //     new GlobalConfig().bookmarkLSName,
    //     bookmarks
    // )
    this.setupToasty();
  }

  checkStorageEvent() {
    window.addEventListener('storage', (event: any) => {
      if (event.storageArea.length >= 2) {
        location.reload();
      }
    });
  }

  setupToasty() {
    this.toastyService.overlayContainer = this.toastContainer;
    this.toastyService.toastyConfig.preventDuplicates = true;
  }

  onSubmit() {
    // Submit login
    const isRememberMe = this.loginInputConfig.RememberMeCheckbox.isChecked;
    this.isLoading = true;
    this.loginService.loginUser(this.loginModel).subscribe(
      (loginResponse) => {
        if (loginResponse.data && !loginResponse.error) {
          new EncryptedStorage().clearAll();
          // Successfull login with send a jwt token as response
          // Store the token, it will let system know the user is logged in now.
          new EncryptedStorage().setItem(
            new GlobalConfig().authTokenLSName,
            loginResponse.data.tokenType + loginResponse.data.accessToken,
            !isRememberMe as boolean
          );
          // Set refresh token
          new EncryptedStorage().setItem(
            new GlobalConfig().authRefreshTokenLSName,
            loginResponse.data.refreshToken,
            !isRememberMe as boolean
          );

          // TEMPORARY LOGIC
          new EncryptedStorage().setItem(
            new GlobalConfig().userAllDetailsLSName,
            JSON.stringify(USER_DETAILS),
            !isRememberMe as boolean
          );
          new EncryptedStorage().setItem(
            new GlobalConfig().userModulesSubmodulesLSName,
            JSON.stringify(USER_NAVIGATION),
            !isRememberMe as boolean
          );
          //
          this.toastyService.success(
            'Login Success, Redirecting....',
            undefined,
            {
              // positionClass: 'inline',
              closeButton: true,
              timeOut: 1300,
              // toastWidth: '300px'
            }
          );
          // Execute and Store Details
          const userDetails = this.userProfileService.getLoggedInUserDetails(
            this.loginModel.userName
          );
          const getNav =
            this.loginService.getNavigationModulesAndSubmodulesByUserAuth();
          const getBookmarks = this.loginService.getNavigationBookmarks();
          const getOrgType = this.loginService.getAllOrgType();
          // // Response Codes for Client Users
          // const getResponseCodes =
          //   this.loginService.getAllResponseCodes();
          const getOrgDetail =
            this.organizationService.getOrgDetailsByUserAuth();
          const getOrgThemes = this.organizationService.getThemesByMyOrg();
          // forkJoin([
          //   userDetails,
          //   getNav,
          //   getBookmarks,
          //   getOrgType,
          //   getOrgDetail,
          //   getOrgThemes
          //   // getResponseCodes,
          // ]).subscribe(
          //   //  NAV ITEMS
          //   (result: any) => {
          //     // Store User Details
          //     const userData = result[0]?.data;
          //     new EncryptedStorage().setItem(
          //       new GlobalConfig().userAllDetailsLSName,
          //       JSON.stringify(userData),
          //       !isRememberMe as boolean
          //     );
          //     document.documentElement.style.setProperty(
          //       "--global-theme-id",
          //       userData["colourThemeId"] ? userData["colourThemeId"] : 1
          //     );
          //     // Store Navigation Items
          //     new EncryptedStorage().setItem(
          //       new GlobalConfig().userModulesSubmodulesLSName,
          //       JSON.stringify(result[1]?.data),
          //       !isRememberMe as boolean
          //     );
          //     // Store Bookmarks Items
          //     new EncryptedStorage().setItem(
          //       new GlobalConfig().bookmarkLSName,
          //       JSON.stringify(result[2]?.data),
          //       !isRememberMe as boolean
          //     ); // .data to access
          //     // Store ORG Type
          //     new EncryptedStorage().setItem(
          //       new GlobalConfig().organisationTypeLSName,
          //       JSON.stringify(result[3]?.data),
          //       !isRememberMe as boolean
          //     ); // .data to access
          //     // Store Org Details
          //     new EncryptedStorage().setItem(
          //       new GlobalConfig().userOrgTypeLSName,
          //       JSON.stringify(result[4]?.data),
          //       !isRememberMe as boolean
          //     );
          //     // Store Org Themes
          //     new EncryptedStorage().setItem(
          //       new GlobalConfig().availableThemesLSName,
          //       JSON.stringify(result[5]?.data),
          //       !isRememberMe as boolean
          //     );
          //     // Store all user data correspond to current user

          //     if (result[4]?.data) {
          //       this.loginService.getAllUserListUsingOrgId(currentUser().userId).subscribe(
          //         (res: IResponseSchema) => {
          //           new EncryptedStorage().setItem(
          //             new GlobalConfig().usersListLSName,
          //             JSON.stringify(res?.data)
          //           );
          //         }
          //       )
          //     }
          //     // .data to access
          //     // // Store Response Codes Details
          //     // new EncryptedStorage().setItem(
          //     // new GlobalConfig().responseCodesClientMaster,
          //     // JSON.stringify(result[5]?.data));

          //     // If All API is success and details are stored in ES, then redirect to dasbhoard

          //     setTimeout(() => {
          //       this.setTheme(
          //         getComputedStyle(document.documentElement).getPropertyValue(
          //           "--global-theme-id"
          //         )
          //       );
          this.isLoading = false;
          this.router.navigate([new GlobalConfig().dashboardRoute]);
          //     }, 500);
          //   },
          //   (err) => {
          //     this.isLoading = false;
          //     new EncryptedStorage().clearAll();
          //     // this.toastyService.error("API Failed, Try to Login Again", null, { positionClass: 'inline', closeButton: true, timeOut: 1300, });
          //     this.openModal("API Failed, Try to Login Again");
          //   }
          // );
        } else {
          const msg = loginResponse.message;
          this.openModal(msg);
          this.isLoading = false;
        }
      },
      (error) => {
        this.isLoading = false;
        if (error.status == 504 || error.status == 400) {
          // IF API gets failed the status is 504
          // this.toastyService.error("API Failed, Try to Login Again", null, { positionClass: 'inline', closeButton: true, timeOut: 1300, });
          this.openModal('API Failed, Try to Login Again');
        } else if (error.status == 401) {
          // IF API get status of 401, means the login credential is invalid.
          const msg = JSON.parse(error.error)['errorMsg'];
          if (msg) {
            // this.toastyService.error(msg, null, { positionClass: 'inline', closeButton: true, timeOut: 1300, });
            this.openModal(msg);
          } else {
            // this.toastyService.error("You are not authorized to login.", null, { positionClass: 'inline', closeButton: true, timeOut: 1300, });
            this.openModal('You are not authorized to login.');
          }
        }
        new EncryptedStorage().clearAll();
      }
    );
  }

  setTheme(themeId: any) {
    this.themeService.getThemes().subscribe((response) => {
      this.themeService.changeTheme(
        themeId,
        document,
        response.find((val: any) => val['theme-id'] == themeId)
      );
    });
  }

  openModal(message: string) {
    const noficationConfig: NotificationDialogModel = {
      notificationType: 'error',
      title: 'Sorry for the inconvenience!',
      disableClose: true,
      message: message,
      actions: [
        { label: 'cancel', actionCase: 'cancel' },
        { label: 'retry', actionCase: 'yes' },
      ],
    };
    const dialogRef = GenerateDialog(this.dialog, noficationConfig);

    dialogRef.afterClosed().subscribe((result) => {
      switch (result) {
        case 'yes':
          // logic for case
          this.onSubmit(); //Retry
          break;
        default:
          break;
      }
    });
  }
}
