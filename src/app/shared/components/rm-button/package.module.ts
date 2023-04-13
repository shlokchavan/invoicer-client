import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared-modules/material.module';
import { RMIconModule } from '../rm-icon/package.module';
import { RMButtonComponent } from './rm-button.component';
import { CommonModule } from '@angular/common';


@NgModule({
  exports: [RMButtonComponent],
  declarations: [RMButtonComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RMIconModule
  ]
})
export class RMButtonModule { }
