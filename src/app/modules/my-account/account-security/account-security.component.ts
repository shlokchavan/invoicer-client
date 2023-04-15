import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { IResponseSchema } from "src/app/configs/api-config";
import { RmToastyService } from "src/app/shared/components/rm-toasty/rm-toasty/rm-toasty.service";
import { AuthService } from "src/app/shared/_http/auth.service";
import { UserProfileService } from "src/app/shared/_http/user-profile.service";
import {
  PasswordInput,
  OTPInput,
  ResetNewPasswordInput,
  ResetConfirmPasswordInput,
} from ".././../../configs/plugin-components/my-account.config";
import {
  ForgetPasswordModel,
  ResetPasswordModel,
  StaticPasswordModel,
} from "../my-account.model";
@Component({
  selector: "account-security",
  templateUrl: "./account-security.component.html",
  styleUrls: ["./account-security.component.scss"],
})
export class AccountSecurityComponent implements OnInit {
  editMode!: boolean;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  accountSecurityForm = new FormGroup({
    password: new FormControl(""),
  });

  resetPasswordForm = new FormGroup({
    newPassword: new FormControl(""),
    confirmPassword: new FormControl(""),
  });
  isLoading!: boolean;
  constructor(
    private userProfileService: UserProfileService,
    private toastyService: RmToastyService,
    private authService: AuthService
  ) {}
  changePasswordSteps = {
    otp: false,
    newPassword: false,
  };

  public passwordConfig = {
    PasswordInput,
  };

  public forgetPasswordConfig = {
    OTPInput,
  };
  public resetPasswordFormConfig = {
    ResetNewPasswordInput,
    ResetConfirmPasswordInput,
  };

  staticPasswordModel: StaticPasswordModel = new StaticPasswordModel();
  forgetPasswordModel: ForgetPasswordModel = new ForgetPasswordModel();
  resetPasswordModel: ResetPasswordModel = new ResetPasswordModel();

  ngOnInit(): void {
    this.staticPasswordModel.password = "**********";
    this.initResetConfirm();
  }

  onOtpChange(event: any) {
    this.forgetPasswordModel.otp = event;
  }

  onOTPSubmit() {
    //
  }

  initResetConfirm() {
    this.resetPasswordFormConfig.ResetConfirmPasswordInput.attributes.disable =
      true;
  }

  updateConfirmPasswordField() {
    this.resetPasswordFormConfig.ResetConfirmPasswordInput = {
      fieldKey: "confirmPassword",
      attributes: {
        label: "Verify your new Password",
        isMandatory: true,
        type: "password",
        togglePassword: true,
        disable: false,
        pattern: this.resetPasswordModel.newPassword,
        customPatternMessage: "Password Doesn't Match",
      },
    };
  }

  btnClicked(type: any, e: any) {
    e["btnType"] = type;
    if (type === "edit") {
      // Generate OTP
      this.generateOtpChangePassword(e);
    }
    if (this.editMode) {
      if (type === "submit-otp") {
        // Service Call for OTP Submit
        this.validateOtp(e);
      }
    }
    if (type === "save") {
      // this.saveEdit(e);
      this.changeUserPassword(e);
    }
    if (type === "cancel") {
      this.editMode = false;
      this.onClick.emit(e);
    }
  }

  saveEdit(e: any) {
    // API Call for Update/ Add
    
    this.userProfileService
      .saveAccountSecurity(this.resetPasswordModel.newPassword)
      .subscribe((res: IResponseSchema) => {
        if (res.status === "success") {
          this.isLoading = false;
          this.editMode = false;
          this.onClick.emit(e);
          
          this.toastyService.success(res.message, null!, {
            positionClass: "toast-top-right",
          });
        } else {
          this.toastyService.error(res.message, null!, {
            positionClass: "toast-top-right",
          });
        }
      });
  }

  // API Calls
  generateOtpChangePassword(e: any) {
    this.isLoading = true;
    this.authService
      .generateOtpChangePassword()
      .subscribe((res: IResponseSchema) => {
        if (res.error) {
          this.toastyService.error(res.message);
        } else {
          // OTP sent successfully
          this.toastyService.success(res.message);

          this.changePasswordSteps["otp"] = true;
          this.changePasswordSteps["newPassword"] = false;
        }
        this.editMode = !this.editMode;
        this.isLoading = false;
        this.onClick.emit(e);
      });
  }

  validateOtp(e: any) {
    this.isLoading = true;
    this.authService
      .validateOtp(Number(this.forgetPasswordModel.otp))
      .subscribe((res: IResponseSchema) => {
        if (res.error) {
          this.toastyService.error(res.message);
        } else {
          // Entered Valid OTP
          this.toastyService.success(res.message);

          this.changePasswordSteps["otp"] = false;
          this.changePasswordSteps["newPassword"] = true;
        }
        this.isLoading = false;
        this.onClick.emit(e);
      });
  }

  changeUserPassword(e: any) {
    this.isLoading = true;
    this.authService
      .changeUserPassword(this.resetPasswordModel.newPassword)
      .subscribe((res: IResponseSchema) => {
        if (res.error) {
          this.toastyService.error(res.message);
        } else {
          // Changed Password
          this.toastyService.success(res.message);
          this.changePasswordSteps["otp"] = false;
          this.changePasswordSteps["newPassword"] = false;
        }
        this.editMode = !this.editMode;
        this.isLoading = false;
        this.onClick.emit(e);
      });
  }
}
