import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared-modules/material.module';
import { OwlNativeDateTimeModule } from './date-time/adapter/native-date-time.module';
import { RMDateTimeModule } from './date-time/date-time.module';
import { RMDateTimePickerComponent } from './rm-datetime-picker.component';
@NgModule({
    exports: [RMDateTimePickerComponent],
    declarations: [RMDateTimePickerComponent],
    imports: [
        MaterialModule,
        OwlNativeDateTimeModule,
        RMDateTimeModule,
    ]
})
export class RMDateTimePickerModule { }
