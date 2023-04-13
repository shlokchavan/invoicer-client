import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";
import { GlobalConfig } from "src/app/configs/global-config";
import { currentUser } from "../../utils/current-user";
import { EncryptedStorage } from "../../utils/encrypted-storage";
import { IHeaderActionConfig, IHeaderConfig } from "./rm-header.model";

@Component({
  selector: "rm-header",
  templateUrl: "./rm-header.component.html",
  styleUrls: ["./rm-header.component.scss"],
})
export class RMHeaderComponent implements OnInit, AfterViewInit {
  // Parameters
  @Input() config!: IHeaderConfig;
  @Output()
  onActionClick: EventEmitter<IHeaderActionConfig> = new EventEmitter();
  @Output()
  onBookmarkSettingTrigger: EventEmitter<IHeaderActionConfig> = new EventEmitter();
  @Output()
  onNavTrigger: EventEmitter<IHeaderActionConfig> = new EventEmitter();

  //variables
  loggedInUserOrgLogo!: string;
  loading = false;
  userFullName!: string;

  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  // Current User (Local Storage)
  // get currentUser() {
  //   return currentUser();
  // }

  // Initials
  getInitials() {
    // string = 'Clark Hogan'
    const string = `${currentUser()?.firstName} ${currentUser()?.lastName}`;
    let names = string.split(" "),
      initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    // return initials;
    this.userFullName = initials;
  }

  backPage() {
    history.back();
  }

  ngOnInit() {
    this.changeBreadcrumb();
    this.getProfileOrgLogo();
    this.getInitials();
  }

  getProfileOrgLogo() {
    this.loggedInUserOrgLogo = currentUser()?.secondaryLogo;
  }

  actionBtnClick(action: IHeaderActionConfig) {
    this.onActionClick.emit(action);
  }

  openBookmarkSettings() {
    this.onBookmarkSettingTrigger.emit();
  }

  openDrawer(type: any) {
    this.onNavTrigger.emit(type);
  }

  changeBreadcrumb() {
    // this.config.subHeaderConfig.breadcrumb[1].route = this.router.url;
    // this.config.subHeaderConfig.breadcrumb[1].label = this.router.url.replace('/', ' ').replace('-', ' ').toUpperCase();
  }

  ngAfterViewInit() {}
}
