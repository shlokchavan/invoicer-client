import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IResponseSchema } from "src/app/configs/api-config";
import { RmToastyService } from "src/app/shared/components/rm-toasty/rm-toasty/rm-toasty.service";
import { LoginService } from "src/app/shared/_http/login.service";

//Config Imports
import { 
    ForgetPasswordEmailInput, 
    otpResetConfig, 
    ResetNewPasswordInput, 
    ResetPasswordEmailInput,
    ResetConfirmPasswordInput 
    } from '../../../configs/plugin-components/login-form.config'
import { CForgetPasswordModel, CResetPasswordModel } from '../login.model';


@Component({
    selector: 'reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    providers: [LoginService]
})

export class ResetPasswordComponent implements OnInit{

    // Variables
    isOTPView: boolean;
    isForgetPasswordView: boolean;
    tokenParams: string;
    userId!: string;

    // Configs
    forgetPasswordForm = new FormGroup({
        emailId: new FormControl('')
    });
    resetPasswordForm = new FormGroup({
        emailId: new FormControl(''),
        newPassword: new FormControl(''),
        confirmPassword: new FormControl('')
    })
    public forgetPasswordFormConfig = {
        ForgetPasswordEmailInput,
        otpResetConfig
    }
    public resetPasswordFormConfig = {
        ResetPasswordEmailInput,
        ResetNewPasswordInput,
        ResetConfirmPasswordInput,
    }

    // Models
    forgetPasswordModel: CForgetPasswordModel = new CForgetPasswordModel();
    resetPasswordModel: CResetPasswordModel = new CResetPasswordModel();

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private loginService: LoginService,
        private toasty: RmToastyService
        ){ 
            this.isOTPView = false;
            this.isForgetPasswordView = true;
            this.tokenParams = this.activatedRoute.snapshot.queryParamMap.get('token')!;
        }

    ngOnInit() {
        if(this.tokenParams) {
            this.confirmUser()
        }
        
    }

    onOtpChange(event: any) {
        this.forgetPasswordModel.ResetCode = event;
    }

    sendResetPassword() {
        this.isOTPView = true;
    }

    test() {
        
    }
    continue() {
        this.resetPasswordModel.EmailId = this.forgetPasswordModel.EmailId;
        this.isForgetPasswordView = false;
        this.resetPasswordFormConfig.ResetConfirmPasswordInput.attributes.disable = true;
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
                customPatternMessage: "Confirm Password Doesn't Match"
            }
        }
    }

    resetPassword() {
        this.resetPasswordAPICall()
    }

    // API calls
    confirmUser() {
        this.loginService.confirmUserToken(this.tokenParams).subscribe(
            (res: IResponseSchema) => {
                if(res.status == "error") {
                    this.toasty.error(res.message)
                } else {
                    this.toasty.success(res.message);
                    const data = res.data;
                    this.resetPasswordModel.EmailId = data.emailId;
                    this.userId = data.userid;
                }
            }
        );
    }

    resetPasswordAPICall() {
        const payload = {
            newPassword: this.resetPasswordModel.NewPassword,
            userId: this.userId
          }
        this.loginService.createNewPassword(payload).subscribe(
            (res: IResponseSchema) => {
                if(res.status == "success") {
                    this.toasty.success(res.message)
                }
                this.router.navigate(['/auth']);
            }
        );
    }

}