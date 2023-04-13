import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared-modules/material.module';
import { RMChipComponent } from './rm-chip.component';
import { RMIconModule } from '../rm-icon/package.module';
import { CommonModule } from '@angular/common';
import { RMTooltipModule } from '../rm-tooltip';

@NgModule({
  exports: [RMChipComponent],
  declarations: [RMChipComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RMIconModule,
    RMTooltipModule
  ]
})
export class RMChipsModule { }
