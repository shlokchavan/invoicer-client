import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALIDATORS } from '@angular/forms';
import { RMInputComponent } from './rm-input.component';
import { MaterialModule } from '../../shared-modules/material.module';
import { RMIconModule } from '../rm-icon/package.module';
import { RMDateTimePickerModule } from '../rm-datetime-picker/package.module';
import { RMDateTimeModule } from '../rm-datetime-picker/date-time/date-time.module';
import { OwlNativeDateTimeModule } from '../rm-datetime-picker/date-time/adapter/native-date-time.module';
import { OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS } from "../rm-datetime-picker/date-time/adapter/moment-adapter/moment-date-time-adapter.class";
import { RMRecipientSelectorComponent } from "./recipient-selector/recipient-selector.component";

@NgModule({
  imports: [
    CommonModule,
    RMIconModule,
    RMDateTimeModule,
    OwlNativeDateTimeModule,

    RMDateTimePickerModule,
    MaterialModule,
    FormsModule],
  declarations: [RMInputComponent, RMRecipientSelectorComponent],
  exports: [RMInputComponent, RMRecipientSelectorComponent],
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: RMInputComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: RMRecipientSelectorComponent,
      multi: true
    }
  ]
})

export class RMInputModule { }