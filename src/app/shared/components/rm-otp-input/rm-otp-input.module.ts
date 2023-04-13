import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { KeysPipe } from './pipes/keys.pipe';
import { NumberOnlyDirective } from './directive/rm-otp-input.directive';
import { RMOtpInputComponent } from './rm-otp-input.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        RMOtpInputComponent,
        KeysPipe,
        NumberOnlyDirective
    ],
    exports: [RMOtpInputComponent],
    providers: [KeysPipe]
})
export class RMOtpInputModule { }
