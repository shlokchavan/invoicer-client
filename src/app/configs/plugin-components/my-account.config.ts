// import { ICheckboxConfig } from 'src/app/shared/components/rm-checkbox/rm-checkbox.model'
import { ICheckboxConfig } from 'src/app/shared/components/rm-checkbox/rm-checkbox.model'
import { ITextConfig } from 'src/app/shared/components/rm-input/rm-input.model'
import { OtpInputConfig } from 'src/app/shared/components/rm-otp-input/rm-otp-input.model'
import { ISelectConfig } from 'src/app/shared/components/rm-select-box/rm-select-box.model'
// import { OtpInputConfig } from '../../shared/components/rm-otp-input/rm-otp-input.model';

export const FirstNameInput: ITextConfig = {
    fieldKey: 'firstName',
    attributes: {
        label: 'First Name',
        isMandatory: true,
        readonly: true
    }
}
export const LastNameInput: ITextConfig = {
    fieldKey: 'lastName',
    attributes: {
        label: 'Last Name',
        isMandatory: true,
        readonly: true
    }
}


export const EmailInput: ITextConfig = {
    fieldKey: 'emailId',
    attributes: {
        label: 'Email',
        isMandatory: true,
        readonly: true,
        type: 'email',
        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        customPatternMessage: 'Please enter a valid email id'
    }
}

export const MobileInput: ITextConfig = {
    fieldKey: 'mobileNo',
    attributes: {
        label: 'Mobile',
        isMandatory: true,
        readonly: true
    }
}
export const PhoneInput: ITextConfig = {
    fieldKey: 'phoneNo',
    attributes: {
        label: 'Phone',
        isMandatory: true,
        readonly: true
    }
}
export const SocialLinkedInInput: ITextConfig = {
    fieldKey: 'linkedInUrl',
    attributes: {
        // isMandatory: false,
    }
}
export const SocialFacebookInput: ITextConfig = {
    fieldKey: 'facebookUrl',
    attributes: {
        // isMandatory: false,
    }
}
export const SocialTwitterInput: ITextConfig = {
    fieldKey: 'twitterUrl',
    attributes: {
        // isMandatory: false,
    }
}

export const GenderSelect: ISelectConfig = {
    fieldKey: 'gender',
    attributes: {
        type: 'text',
        label: 'Gender',
        readonly: true,
        isMandatory: true
    },
    dataKey: 'name',
    returnKey: 'value',
    options: [
        {
            name: 'Male',
            value: 'm'
        },
        {
            name: 'Female',
            value: 'f'
        },
        {
            name: 'Others',
            value: 'o'
        }
    ]
}

export const DateOfAnniversaryInput: ITextConfig = {
    fieldKey: 'anniversaryDate',
    attributes: {
        label: 'Anniversary Date',
        isMandatory: true,
        readonly: true,
        type: 'datepicker'
    },
    pickerConfig: true
}
export const DateOfBirthInput: ITextConfig = {
    fieldKey: 'birthDate',
    attributes: {
        label: 'Date of Birth',
        isMandatory: true,
        readonly: true,
        type: 'datepicker'
    },
    pickerConfig: true
}

export const TimeZoneSelect: ISelectConfig = {
    fieldKey: 'timezoneId',
    attributes: {
        type: 'text',
        label: 'Time Zone',
        readonly: true,
        isMandatory: true
    },
    dataKey: 'combinationDisplay',
    returnKey: 'timezoneId',
    options: [
        // {
        //     offset: 'Eastern Standard Time (GMT -4:00)',
        //     timezoneId: '-4:00'
        // },
        // {
        //     offset: 'Pacific Standard Time (GMT -8:00)',
        //     timezoneId: '-8:00'
        // }
    ]
}

export const APICalledAccount = {
    firstName: 'Clark',
    lastName: 'Hogan',
    emailId: 'clark.hogan@arkedge.com',
    mobileNo: '(317) 949-2074',
    phoneNo: '(317) 949-2074',
    gender: 'male',
    timeZone: 1,
    // timeZone: '-4:00',
    // dateOfAnniversary: '1605784253'
    anniversaryDate: '11/10/2020',
    birthDate: '09/24/1997'
}
export const APICalledAddresss = {
    address: '8500 Beverly 6692 Blvd', // Text Area Input
    countryId: '231', //United States 
    stateId: '3924', //California
    cityId: '43070', // Los Angeles
    zipCode: '90007' //Text Input
}
export const APICalledSettings = {
    languageId: 100,
    timezoneId: 1
}
/*
Address Config
*/

export const AddressInput: ITextConfig = {
    fieldKey: 'address',
    attributes: {
        label: 'Address',
        isMandatory: true,
        readonly: true
    }
}
export const CountrySelect: ISelectConfig = {
    fieldKey: 'countryId',
    attributes: {
        type: 'text',
        label: 'Country',
        readonly: true,
        isMandatory: true
    },
    dataKey: 'name',
    returnKey: 'id',
    options: []
}
export const StateSelect: ISelectConfig = {
    fieldKey: 'stateId',
    attributes: {
        type: 'text',
        label: 'State',
        readonly: true,
        isMandatory: true
    },
    dataKey: 'name',
    returnKey: 'id',
    options: []
}
export const CitySelect: ISelectConfig = {
    fieldKey: 'cityId',
    attributes: {
        type: 'text',
        label: 'City',
        readonly: true,
        isMandatory: true
    },
    dataKey: 'name',
    returnKey: 'id',
    options: []
}

export const PostalCodeInput: ITextConfig = {
    fieldKey: 'zipCode',
    attributes: {
        label: 'Postal Code',
        isMandatory: true,
        readonly: true
    }
}

/*
Settings
*/
export const LanguageSelect: ISelectConfig = {
    fieldKey: 'languageId',
    attributes: {
        type: 'text',
        label: 'Language',
        readonly: true,
        isMandatory: true
    },
    dataKey: 'name',
    returnKey: 'languageId',
    options: [
        {
            name: 'English',
            languageId: 100
        },
        {
            name: 'Spanish',
            languageId: 101
        },
    ]
}



export const EmailCheckbox: ICheckboxConfig = {
    isChecked: true,
    attributes: {
        label: 'Email',
        disable: true
    }
}
export const MobileNumberCheckbox: ICheckboxConfig = {
    isChecked: true,
    attributes: {
        label: 'Mobile Number',
        disable: true
    }
}

// Account Security
export const PasswordInput: ITextConfig = {
    fieldKey: 'password',
    attributes: {
        label: 'Password',
        isMandatory: true,
        type: 'password',

        readonly: true
    }
}
export const OTPInput: OtpInputConfig = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    label: 'Enter security code: ',
    inputStyles: {
        'width': '55px',
        'height': '35px'
    }
};
export const ResetNewPasswordInput: ITextConfig = {
    fieldKey: 'newPassword',
    attributes: {
        label: 'Choose a new Password',
        isMandatory: true,
        type: 'password',
        togglePassword: true
    }
}
export const ResetConfirmPasswordInput: ITextConfig = {
    fieldKey: 'confirmPassword',
    attributes: {
        label: 'Verify your new password',
        isMandatory: true,
        type: 'password',
        togglePassword: true,
        customPatternMessage: "Confirm Password Doesn't Match"
    }
}