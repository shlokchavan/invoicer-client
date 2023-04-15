import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { IResponseSchema } from "src/app/configs/api-config";
import { ToastContainerDirective } from "src/app/shared/components/rm-toasty/rm-toasty/rm-toasty.directive";
import { RmToastyService } from "src/app/shared/components/rm-toasty/rm-toasty/rm-toasty.service";
import { toggleEdit } from "src/app/shared/utils/readonly-toggle";
import { EncryptSensitiveInfo } from "src/app/shared/utils/string-encryption";
import { UserProfileService } from "src/app/shared/_http/user-profile.service";
import {
  LanguageSelect,
  TimeZoneSelect,
  EmailCheckbox,
  MobileNumberCheckbox,
} from "../../../configs/plugin-components/my-account.config";
import { SettingsModel } from "../my-account.model";
@Component({
  selector: "settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
  providers: [RmToastyService],
})
export class SettingsComponent implements OnInit, OnDestroy {
  editMode!: boolean;
  @Input() userProfile: any;
  @Input() language: any;
  @Input() timeZone: any;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer!: ToastContainerDirective;
  settingsForm: any = new FormGroup({
    languageId: new FormControl(""),
    timezoneId: new FormControl(""),
    isEmailSecurity: new FormControl(),
    isMobileSecurity: new FormControl(),
  });

  public settingsConfig = {
    LanguageSelect,
    TimeZoneSelect,
    EmailCheckbox,
    MobileNumberCheckbox,
  };

  settingsModel: SettingsModel = new SettingsModel();
  tempModel: SettingsModel = new SettingsModel();
  emailId: any;
  phoneNo: any;
  isLoading!: boolean;

  constructor(
    private toasty: RmToastyService,
    private userProfileService: UserProfileService
  ) {}

  confirmSend() {
    this.toasty.overlayContainer = this.toastContainer;
    this.patchFormModel();
    this.toasty.toastyConfig.preventDuplicates = true;
    this.toasty.success(
      "Security code sent to email and mobile Number",
      "Success",
      {
        positionClass: "inline",
        closeButton: true,
        toastWidth: "200px",
      }
    );
  }

  ngOnInit(): void {
    
    this.valueInit();
  }
  onSubmit() {}

  editInit() {
    this.tempModel = { ...this.settingsModel };
  }

  ngOnDestroy() {
    toggleEdit(this.settingsConfig, true);
  }

  selectionChange(type: any, e: any) {}
  cancelEdit() {
    this.settingsModel = { ...this.tempModel };
  }

  patchFormModel() {
    this.settingsForm
      .get("isMobileSecurity")!
      .patchValue(this.settingsConfig.MobileNumberCheckbox.isChecked ? 1 : 0);
    this.settingsForm
      .get("isEmailSecurity")!
      .patchValue(this.settingsConfig.EmailCheckbox.isChecked ? 1 : 0);
    this.settingsForm
      .get("languageId")!
      .patchValue(this.settingsModel.languageId);
    this.settingsForm
      .get("timezoneId")!
      .patchValue(this.settingsModel.timezoneId);
  }

  saveEdit(e: any) {
    this.toasty.overlayContainer = null!;
    // API Call for Update/ Add
    this.patchFormModel();
    this.isLoading = true;
    this.userProfileService
      .saveSettings(this.settingsForm.value)
      .subscribe((res: IResponseSchema) => {
        if (res.error) {
          this.toasty.error(res.message);
        } else {
          this.isLoading = false;
          this.editMode = false;
          this.onClick.emit(e);
          toggleEdit(this.settingsConfig,false);
          this.toasty.success(res.message);
        } 
      });
  }

  valueInit() {
    this.settingsModel = { ...this.userProfile };
    this.emailId = EncryptSensitiveInfo(this.userProfile.emailId);
    this.phoneNo = EncryptSensitiveInfo(this.userProfile.phoneNo);
    this.settingsConfig.LanguageSelect.options = this.language;
    this.settingsConfig.TimeZoneSelect.options = this.timeZone.map((data:any) => {
      data["combinationDisplay"] = `${data.displayName} - ${data.offset}`;
      return data;
    });

    // CALL API
    this.editInit();
  }

  btnClicked(type: any, e: any) {
    this.editMode = !this.editMode;
    // if (type === 'edit' || type === 'cancel') toggleEdit(this.settingsConfig);
    toggleEdit(this.settingsConfig);

    e["btnType"] = type;
    // Cancel
    if (type === "cancel") {
      this.cancelEdit();
      this.onClick.emit(e);
      
    } else if (type === "edit") {
      this.onClick.emit(e);
    } else if (type === "save") {
      this.saveEdit(e);
    }
  }
}
