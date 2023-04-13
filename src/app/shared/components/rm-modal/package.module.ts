import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared-modules/material.module';
import { RMIconModule } from '../rm-icon/package.module';
import { RMModalComponent } from './rm-modal.component';
import { CommonModule } from '@angular/common';
import { RMButtonModule } from '../rm-button/package.module';
import { RMModalDialogComponent } from './rm-modal.dialog';


@NgModule({
  exports: [RMModalComponent],
  declarations: [RMModalComponent, RMModalDialogComponent],
  entryComponents: [RMModalDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RMIconModule,
    RMButtonModule
  ]
})
export class RMModalModule { }
