import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';
import * as _ from 'lodash';
import { IResponseSchema } from 'src/app/configs/api-config';
import { GlobalConfig } from 'src/app/configs/global-config';
import { _NavigationConfig } from 'src/app/configs/plugin-components/navigation-config';
import { RMUserDrawerConfig, _UserProfileConfig } from 'src/app/configs/plugin-components/user-profile.config';
import { ISubHeaderConfig } from 'src/app/shared/components/rm-header/rm-header.model';
import { IRMBookMarkConfig, IRMNavConfig, IRMNavItemConfig } from 'src/app/shared/components/rm-nav/rm-nav.model';
import { EncryptedStorage } from 'src/app/shared/utils/encrypted-storage';
import { BookmarkService } from 'src/app/shared/_http/bookmark.service';
import { Location } from '@angular/common';
import { getModuleNavConfigById, getSubModuleNavConfigById, NavRouteConfig } from 'src/app/configs/nav-config';
import { DrawerPanelService } from 'src/app/shared/components/rm-drawer-panel/src/rm-drawer.service';
import { DrawerPanelCONFIG } from 'src/app/configs/drawer-config';
import { ChangeSubheaderParameterService } from 'src/app/shared/_global/subheader.service';
import { currentOrg } from 'src/app/shared/utils/current-org';
import { LoginService } from 'src/app/shared/_http/login.service';

@Component({
  selector: 'navigation-layout',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  providers: [BookmarkService, Location, DrawerPanelService, ChangeSubheaderParameterService, LoginService]
})
export class NavigationLayoutComponent implements OnInit {
  // Template Variable
  @ViewChild('sidenav') sidenav!: MatSidenav;

  // Config Varialbles
  currentSubHeader!: ISubHeaderConfig;
  navigationConfig!: IRMNavConfig;
  profileDrawerConfig!: RMUserDrawerConfig;
  profileConfig!: _UserProfileConfig;
  drawerConfig: any = {
    enableBookmarkSideNav: false,
    enableNav: false,
    enableProfile: false,
  };


  // Variables
  bookmarkLSName!: string;
  enableBookmarkSideNav!: boolean;
  // selectedBookmarks: IRMNavItemConfig[] = [];
  selectedBookmarks: IRMBookMarkConfig[] | any = [];
  muLOGO: string;
  drawerWidth!: string;
  userProfile: any;
  drawerPanelConfig = new DrawerPanelCONFIG()
  loading = false;

  constructor(
    private bookmarkService: BookmarkService,
    public router: Router,
    private location: Location,
    public activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private subheaderService: ChangeSubheaderParameterService,
    private draweControllerService: DrawerPanelService) {
    // this.muLOGO = '../../../../assets/img/logo-mu_greeb.png';
    this.muLOGO = '../../../../assets/img/dummyLogo_color.png';
    this.getNavigationConfig();
    router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart:
          // Turn on Page Loading
          this.loading = true;
          break;
        case event instanceof NavigationError:
        case event instanceof NavigationCancel:
        case event instanceof NavigationEnd:
          // Turn off Page Loading
          this.loading = false;
          this.setupSubHeaderForNav(this.router.url.split('?')[0]);
          this.subheaderChangeDetection();
          break;
        default:
          break;
      }
    })
  }

  ngOnInit() {
    this.userProfile = new EncryptedStorage().getItem('_rm-sad');
    const localBookmarks = (new EncryptedStorage().getItem(this.bookmarkLSName));
    if (localBookmarks) {
      this.navigationConfig.BookmarkSelections = JSON.parse(localBookmarks);
      this.selectedBookmarks = this.navigationConfig.BookmarkSelections;
      // 
    } else {
      this.navigationConfig.BookmarkSelections = [];
      this.selectedBookmarks = [];
    }
    this.setupDrawerControllers();
    // this.storeRequiredDataSets() NOT REQUIRED
    this.checkStorageEvent()
  }

  checkStorageEvent() {
    window.addEventListener('storage', (event: any)=> {
      if(event.storageArea.length == 0) {
        location.reload()
      }
    });
  }

  storeRequiredDataSets() {
    const orgDetails = currentOrg()
    if(orgDetails.orgTypeId == 3 && !new EncryptedStorage().getItem(new GlobalConfig().responseCodesClientMaster)) {
      this.getAllResponsesCodes()
    }
  }

  subheaderChangeDetection() {
    this.subheaderService.titleObservable().subscribe(
      response => {
        this.currentSubHeader.title = response;
      }
    );
    this.subheaderService.customBreadCrumbObservable().subscribe(
      response => {
        this.currentSubHeader.breadcrumb = response;
      }
    );
    this.subheaderService.templateObservable().subscribe(
      response => this.currentSubHeader.subheaderTemplate = response
    );
  }

  setupDrawerControllers() {
    this.draweControllerService.isActive$.subscribe(response => { this.drawerPanelConfig.isActive = response })
    this.draweControllerService.hasBackdrop$.subscribe(response => this.drawerPanelConfig.hasBackdrop = response)
    this.draweControllerService.drawerMode$.subscribe(response => this.drawerPanelConfig.drawerMode = response)
    this.draweControllerService.drawerSize$.subscribe(response => this.drawerPanelConfig.drawerSize = response)
    this.draweControllerService.drawerContainer$.subscribe(response => this.drawerPanelConfig.drawerContainer = response)
    this.draweControllerService.escClose$.subscribe(response => this.drawerPanelConfig.escClose = response)
    this.draweControllerService.isRightSide$.subscribe(response => this.drawerPanelConfig.isRightSide = response)
    this.draweControllerService.drawerTitle$.subscribe(response => this.drawerPanelConfig.drawerTitle = response)
    this.draweControllerService.showCloseButton$.subscribe(response => this.drawerPanelConfig.showCloseButton = response)
    this.draweControllerService.useCustomTemplate$.subscribe(response => this.drawerPanelConfig.useCustomTemplate = response)
    this.draweControllerService.footerTemplate$.subscribe(response => this.drawerPanelConfig.footerTemplate = response)
  }

  drawerActiveChange(isActive: any) {
    // This function is used to change active state of drawer on escape
    // Function has been removed from usage, it was creating drawer loop
    // Escape close feature is set has disabled
    this.drawerPanelConfig.isActive = isActive;
    this.draweControllerService.toggleDrawer(isActive);
  }

  //Intialize All Config
  getNavigationConfig() {
    // Set Bookmark LS
    this.bookmarkLSName = new GlobalConfig().bookmarkLSName;
    // Navigation Config
    this.navigationConfig = new _NavigationConfig();
    this.profileConfig = new _UserProfileConfig();
    this.profileDrawerConfig = new RMUserDrawerConfig();

    // Get All NavItems
    const localNav = JSON.parse(new EncryptedStorage().getItem(new GlobalConfig().userModulesSubmodulesLSName)!);
    console.log('localNav: ', localNav);
    
    // 
    this.navigationConfig.NavItems = localNav;

    // Setup Icon and Routes
    this.navigationConfig.NavItems.forEach((nav: any) => {
      console.log('nav: ', nav);
      
      // Icon Assignment to modules by Modulle Id
      const moduleNavConfig = getModuleNavConfigById(nav.sysModuleId);
      nav.icon = moduleNavConfig ? moduleNavConfig.icon : null;
      nav.subModuleList.forEach((subNav: any) => {
        const subModuleNavConfig = getSubModuleNavConfigById(nav.sysModuleId, subNav.sysSubModuleId);
        subNav["route"] = subModuleNavConfig ? subModuleNavConfig.route : null;
        subNav["isWIP"] = subModuleNavConfig == null;
      });
      // if (nav.moduleId == 10001 || nav.moduleId == 10032 || nav.moduleId == 10063) nav.icon = "Module-Dashboard";
      // else if (nav.moduleId == 10002 || nav.moduleId == 10033 || nav.moduleId == 10064) nav.icon = "administrator";
      // else if (nav.moduleId == 10003 || nav.moduleId == 10034) nav.icon = "Client-Management";
      // else if (nav.moduleId == 10004 || nav.moduleId == 10035 || nav.moduleId == 10065) nav.icon = "insights";
      // else if (nav.moduleId == 10005 || nav.moduleId == 10036 || nav.moduleId == 10067) nav.icon = "settings";
      // else if (nav.moduleId == 10006 || nav.moduleId == 10037 || nav.moduleId == 10068) nav.icon = "manageNotification";
      // else if (nav.moduleId == 10007) nav.icon = "System-Monitoring";
      // else if (nav.moduleId == 10069) nav.icon = "Supervision-Tools";
      // else if (nav.moduleId == 10072) nav.icon = "Account-View";
      // else if (nav.moduleId == 10066) nav.icon = "report";
    });
  }

  getSubHeader(subHeaderData: any) {
    this.currentSubHeader = _.cloneDeep(subHeaderData);
  }

  closeSideNav(event: IRMNavConfig) {
    if (event) {
      // Apply Bookmark
      this.updateBookmark(event);
    }
    this.sidenav.close();
  }

  updateBookmark(navConfig: IRMNavConfig) {
    
    // API CALL
    this.bookmarkService.saveBookmarks(navConfig?.BookmarkSelections).subscribe(
      (res: IResponseSchema) => {
        const data = res.data;
        if (res.status === 'success') {
          this.navigationConfig = _.cloneDeep(navConfig)
          // this.selectedBookmarks = _.cloneDeep(this.navigationConfig.BookmarkSelections)
          this.selectedBookmarks = _.cloneDeep(data); // Save Response Data
          new EncryptedStorage().setItem(this.bookmarkLSName, JSON.stringify(this.navigationConfig.BookmarkSelections), !new EncryptedStorage().IsLocalStorage)
        }
        else {
          // Toast Message for error
        }

      },
      (err) => {
        // Error
      }
    )
  }

  drawerTest(event: any) {
    
  }

  setupSubHeaderForNav(currentRoute: any) {
    const routesConfig = NavRouteConfig;
    routesConfig.forEach(nav => {
      if (currentRoute.includes(nav.route)) {
        this.getSubHeader(nav.SubHeaderOptions);
      } else {
        if (nav.children)
          nav.children.forEach(childNav => {
            if (currentRoute.includes(childNav.route)) {
              this.getSubHeader(childNav.SubHeaderOptions);
            }
          });
      }
    })
  }

  activateDrawer(which: any) {
    this.sidenav.position = 'start';
    this.drawerWidth = '300px';
    Object.keys(this.drawerConfig).forEach((item: any) => {
      this.drawerConfig[item] = false;
    });
    this.drawerConfig[which] = true;
  }

  eventCallBack(event: any) {
    // 
    switch (event.type) {
      case 'navigation':
        this.sidenav.toggle();
        this.activateDrawer('enableNav');
        break;
      case 'profile':
        this.sidenav.toggle();
        this.activateDrawer('enableProfile');
        this.sidenav.position = 'end';
        this.drawerWidth = this.profileDrawerConfig.width;
        break;
      case 'bookmark-setting':
        this.sidenav.open();
        this.activateDrawer('enableBookmarkSideNav');
        break;
      case 'bookmark-route':
        const routeAccess = getSubModuleNavConfigById(event.response.sysModuleId, event.response.sysSubModuleId);
        
        if (routeAccess)
          this.router.navigate([routeAccess.route]);
        break;
      case 'bookmark-drag':
        this.updateBookmark({ NavItems: this.navigationConfig.NavItems, BookmarkSelections: event.response });
        break;
      default:
        break;
    }
  }

  // API Calls
  getAllResponsesCodes() {
    this.loginService.getAllResponseCodes().subscribe(
      res => {
        new EncryptedStorage().setItem(
        new GlobalConfig().responseCodesClientMaster,
        JSON.stringify(res?.data), !new EncryptedStorage().IsLocalStorage);
      }
    )
  }
}
