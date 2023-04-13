import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared-modules/material.module';
import { RMIconModule } from '../rm-icon/package.module';
import { CommonModule } from '@angular/common';
import { RMButtonModule } from '../rm-button/package.module';
import { RMNotificationComponent } from './rm-notifications.component';
import { RMRadioModule } from '../rm-radio/package.module';


@NgModule({
  exports: [RMNotificationComponent],
  declarations: [RMNotificationComponent],
  entryComponents: [RMNotificationComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RMIconModule,
    RMButtonModule,
    RMRadioModule
  ]
})
export class RMNotificationModule { }
