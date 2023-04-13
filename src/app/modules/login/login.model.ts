export class CLoginModel {
    userName!: string;
    password!: string;
}
export class CForgetPasswordModel {
    EmailId!: string;
    ResetCode!: string;
}
export class CResetPasswordModel {
    EmailId!: string;
    NewPassword!: string;
    ConfirmPassword!: string;
}