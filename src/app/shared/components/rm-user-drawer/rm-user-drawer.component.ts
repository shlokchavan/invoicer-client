import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { IResponseSchema } from "src/app/configs/api-config";
import { GlobalConfig } from "src/app/configs/global-config";
import { _UserProfileConfig } from "src/app/configs/plugin-components/user-profile.config";
import { EncryptedStorage } from "../../utils/encrypted-storage";
import { ThemeService } from "../../_global/theme.service";
import { LoginService } from "../../_http/login.service";
import { RMThemeSelectorComponent } from "../rm-theme-selector/rm-theme-selector.component";
import { RmToastyService } from "../rm-toasty/rm-toasty/rm-toasty.service";
import { IUserDrawerConfig } from "./rm-user-drawer.model";

@Component({
  selector: "rm-user-drawer",
  templateUrl: "./rm-user-drawer.component.html",
  styleUrls: ["./rm-user-drawer.component.scss"],
  providers: [ThemeService, LoginService],
})
export class RMUserDrawerComponent implements OnInit, AfterViewInit {
  // Parameters
  userProfile: any;
  @Input() config: IUserDrawerConfig;
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  // Reference Child Element
  @ViewChild("themeSelector", { static: false })
  themeSelector!: RMThemeSelectorComponent;

  // Variables
  logingOutUser!: boolean;
  currentTheme: any;

  constructor(
    private router: Router,
    private toasty: RmToastyService,
    private themeService: ThemeService,
    private loginService: LoginService
  ) {
    // Initialize Default Properties
    this.config = new _UserProfileConfig();
  }

  ngOnInit() {
    // this.currentTheme = "theme1";
    // this.currentTheme = getComputedStyle(document.documentElement).getPropertyValue("--global-theme-id");
    this.userProfile = JSON.parse(new EncryptedStorage().getItem(new GlobalConfig().userAllDetailsLSName)!);
    const themeId = this.userProfile.colourThemeId;
    this.currentTheme = themeId;
  }

  ngAfterViewInit() {
    // Get All Data
    this.themeSelector.loadAvailableThemes();
    // setTimeout(() => {
    //   const selectedTheme = this.themeSelector.themeCollection.filter(
    //     (theme) => (theme['theme-id'] == themeId)
    //   )[0];
    //   this.themeSelector.changeTheme(selectedTheme['theme-id'], selectedTheme);
    // }, 1000);
  }

  themeChange(e: any) {
    
    // Save Theme Color (POST)
    this.themeService.saveTheme(e).subscribe(
      (res: IResponseSchema) => {
        // Saved
      },
      (err) => {
        // Error
      }
    );
  }

  buttonClicked(type: any, e: any, action?: any) {
    e["eventType"] = type;
    switch (action) {
      case "profile":
        this.router.navigate([new GlobalConfig().profileRoute]);
        this.onClick.emit(e);
        break;
      case "logout":
        // Logout API
        this.logoutUser();
        break;
      default:
        this.onClick.emit(e);
        break;
    }
    // if (type === 'My Account' || type === 'Sign Out') this.router.navigateByUrl(route);
  }

  logoutUser() {
    this.logingOutUser = true;
    // this.loginService.logoutUser().subscribe(
    //   response => {
        setTimeout(() => {
          this.logingOutUser = false;
          new EncryptedStorage().clearAll();
          this.router.navigate([new GlobalConfig().loginRoute]);
        }, 300);
        
    //   }, err => {
    //     this.logingOutUser = false;
    //   }
    // );
  }
}
