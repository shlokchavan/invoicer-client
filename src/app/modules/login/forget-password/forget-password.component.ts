import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IResponseSchema } from 'src/app/configs/api-config';
import { Toast } from 'src/app/shared/components/rm-toasty/rm-toasty/rm-toasty.component';
import { RmToastyService } from 'src/app/shared/components/rm-toasty/rm-toasty/rm-toasty.service';
import { AuthService } from 'src/app/shared/_http/auth.service';

//Config Imports
import {
  ForgetPasswordEmailInput,
  otpResetConfig,
  ResetNewPasswordInput,
  ResetPasswordEmailInput,
  ResetConfirmPasswordInput,
} from '../../../configs/plugin-components/login-form.config';
import { CForgetPasswordModel, CResetPasswordModel } from '../login.model';

@Component({
  selector: 'forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  // Variables
  loading!: boolean;
  isOTPView: boolean;
  isForgetPasswordView: boolean;

  // Configs
  forgetPasswordForm = new FormGroup({
    emailId: new FormControl(''),
  });
  resetPasswordForm = new FormGroup({
    emailId: new FormControl(''),
    newPassword: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  public forgetPasswordFormConfig = {
    ForgetPasswordEmailInput,
    otpResetConfig,
  };
  public resetPasswordFormConfig = {
    ResetPasswordEmailInput,
    ResetNewPasswordInput,
    ResetConfirmPasswordInput,
  };

  // Models
  forgetPasswordModel: CForgetPasswordModel = new CForgetPasswordModel();
  resetPasswordModel: CResetPasswordModel = new CResetPasswordModel();
  userId: any;

  constructor(
    private toastyService: RmToastyService,
    private router: Router,
    private authService: AuthService
  ) {
    this.isOTPView = false;
    this.isForgetPasswordView = true;
  }

  ngOnInit() {}

  onOtpChange(event: any) {
    this.forgetPasswordModel.ResetCode = event;
  }

  sendResetPassword() {
    // API CALl
    this.generateOtpForgetPassword();
  }
  test() {}
  continue() {
    this.validateOtpForgetPassword();
  }

  get checkOTPLength(): boolean {
    return this.forgetPasswordModel.ResetCode?.length != 4;
  }

  updateConfirmPasswordField() {
    this.resetPasswordFormConfig.ResetConfirmPasswordInput = {
      fieldKey: 'ConfirmPassword',
      attributes: {
        label: 'Confirm Password',
        isMandatory: true,
        type: 'password',
        togglePassword: true,
        disable: false,
        pattern: this.resetPasswordModel.NewPassword,
        customPatternMessage: "Confirm Password Doesn't Match",
      },
    };
  }

  resetPassword() {
    this.savePassword();
  }

  // API Calls
  generateOtpForgetPassword() {
    this.loading = true;
    // this.authService
    //   .generateOtpForgetPassword(this.forgetPasswordModel.EmailId)
    //   .subscribe((res: IResponseSchema) => {
    //     if (res.error) {
    //       this.toastyService.error(res.message);
    //     } else {
    //       // OTP sent successfully
    //       this.toastyService.success(res.message);
    //     }
        this.isOTPView = true;
        this.loading = false;
    //   });
  }

  validateOtpForgetPassword() {
    this.loading = true;  
    // this.authService
    //   .validateOtpForgetPassword(
    //     Number(this.forgetPasswordModel.ResetCode),
    //     this.forgetPasswordModel.EmailId
    //   )
    //   .subscribe((res: IResponseSchema) => {
    //     if (res.error) {
    //       this.toastyService.error(res.message);
    //     } else {
    //       // Entered Valid OTP

    //       if (res?.data) {
    //         this.userId = res?.data?.userId;
    //       }

    //       this.toastyService.success(res.message);
    //     }

        this.resetPasswordModel.EmailId = this.forgetPasswordModel.EmailId;
        this.isForgetPasswordView = false;
        this.resetPasswordFormConfig.ResetConfirmPasswordInput.attributes.disable =
          true;
        this.loading = false;
    //   });
  }

  savePassword() {
    this.loading = true;
    // this.authService
    //   .savePassword(this.userId, this.resetPasswordModel.NewPassword)
    //   .subscribe(
    //     (res: IResponseSchema) => {
    //       if (res.error) {
    //         this.toastyService.error(res.message);
    //       } else {
    //         // Changed Password
    //         this.toastyService.success(res.message);
              this.router.navigate(['/auth']);
    //       }
          this.loading = false;
    //     },
    //     (err: HttpErrorResponse) => {
    //       this.toastyService.error(err.message);
    //       this.loading = false;
    //     }
    //   );
  }
}
