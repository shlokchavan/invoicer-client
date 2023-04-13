import { ICheckboxConfig } from 'src/app/shared/components/rm-checkbox/rm-checkbox.model'
import { ITextConfig } from 'src/app/shared/components/rm-input/rm-input.model'
import { OtpInputConfig } from '../../shared/components/rm-otp-input/rm-otp-input.model';

export const LoginIdInput: ITextConfig = {
    fieldKey: 'userName',
    attributes: {
        label: 'Username or Email',
        isMandatory: true
    }
}
export const LoginPasswordInput: ITextConfig = {
    fieldKey: 'password',
    attributes: {
        label: 'Password',
        isMandatory: true,
        type: 'password',
        togglePassword: true
    }
}

export const RememberMeCheckbox: ICheckboxConfig = {
    isChecked: false,
    attributes: {
        label: 'Remember me'
    }
}

export const ForgetPasswordEmailInput: ITextConfig = {
    fieldKey: 'EmailId',
    attributes: {
        label: 'Email Id',
        isMandatory: true,
        type: 'email',
        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        customPatternMessage: 'Please enter a valid email id'
    }
}

export const otpResetConfig: OtpInputConfig = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    label: 'Enter Code: ',
    inputStyles: {
        'width': '88px',
        'height': '45px'
    }
};

export const ResetPasswordEmailInput: ITextConfig = {
    fieldKey: 'EmailId',
    attributes: {
        label: 'Email Id',
        disable: true,
        type: 'email'
    }
}
export const ResetNewPasswordInput: ITextConfig = {
    fieldKey: 'NewPassword',
    attributes: {
        label: 'New Password',
        isMandatory: true,
        type: 'password',
        togglePassword: true
    }
}
export const ResetConfirmPasswordInput: ITextConfig = {
    fieldKey: 'ConfirmPassword',
    attributes: {
        label: 'Confirm Password',
        isMandatory: true,
        type: 'password',
        togglePassword: true,
        customPatternMessage: "Confirm Password Doesn't Match"
    }
}