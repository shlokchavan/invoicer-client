import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { RMInputModule } from 'src/app/shared/components/rm-input/package.module';
import { RMButtonModule } from 'src/app/shared/components/rm-button/package.module';
import { RMCheckboxModule } from 'src/app/shared/components/rm-checkbox/package.module';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { RMOtpInputModule } from 'src/app/shared/components/rm-otp-input/rm-otp-input.module';
import { RMToastyModule } from 'src/app/shared/components/rm-toasty/rm-toasty/package.module';
import { ToastContainerModule } from 'src/app/shared/components/rm-toasty/rm-toasty/rm-toasty.directive';
import { RMNotificationComponent } from 'src/app/shared/components/rm-notifications/rm-notifications.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthService } from 'src/app/shared/_http/auth.service';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RMInputModule,
    RMButtonModule,
    RMCheckboxModule,
    RMOtpInputModule,
    RMToastyModule.forRoot(),
    ToastContainerModule,
    RouterModule.forChild([
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'forget-password', component: ForgetPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ]),
  ],
  declarations: [
    LoginComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
  ],
  entryComponents: [RMNotificationComponent],
  providers: [AuthService],
})
export class LoginModule {
  constructor() {}
}
