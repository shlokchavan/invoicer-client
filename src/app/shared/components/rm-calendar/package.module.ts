import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RMCalendarComponent } from './rm-calendar.component';
import { RMIconModule } from '../rm-icon/package.module';
import { RMButtonModule } from '../rm-button/package.module';
import { MaterialModule } from '../../shared-modules/material.module';
import { RMDateTimePickerModule } from '../rm-datetime-picker/package.module';
import { RMDateTimeModule } from '../rm-datetime-picker/date-time/date-time.module';
import { FormsModule } from '@angular/forms';
import { RMLoaderModule } from '../rm-loader/package.module';



@NgModule({
  declarations: [
    RMCalendarComponent
  ],
  exports: [
    RMCalendarComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    // Charts
    RMIconModule,
    RMButtonModule,
    RMDateTimeModule,
    

    RMDateTimePickerModule,
    MaterialModule,
    RMLoaderModule
  ]
})
export class RMCalendarModule { }
