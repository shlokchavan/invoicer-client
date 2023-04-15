export class PersonalInfoModel {
    userImage?: string; 
    firstName?: string;
    lastName?: string;
    gender?: string;
    anniversaryDate?: Date;
    birthDate?: Date;
    timeZone?: string;
    emailId?: string;
    mobile?: string;
    phoneNo?: string;

    linkedinUrl?: string;
    facebookUrl?: string;
    twitterUrl?: string;
}

export class AddressDetailsModel {
    address?: string;
    countryId?: string;
    stateId?: string;
    cityId?: string;
    zipCode?: string;
}


export class SettingsModel {
    languageId?: number;
    timezoneId?: number;
    isEmailSecurity?: number;
    isMobileSecurity?: number;
}

export class ForgetPasswordModel {
    otp?: string;
}
export class StaticPasswordModel {
    password?: string;
}
export class ResetPasswordModel {
    newPassword!: string;
    confirmPassword!: string;
}