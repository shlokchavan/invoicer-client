import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared-modules/material.module';
import { RMDrawerLayoutComponent } from './rm-drawer-layout.component';
import { RMIconModule } from '../rm-icon/package.module';
import { RMButtonModule } from '../rm-button/package.module';
import { CommonModule } from '@angular/common';
import { LeftDrawerTabExtraTemplate } from './rm-drawer-tab.template';

@NgModule({
  exports: [RMDrawerLayoutComponent],
  declarations: [RMDrawerLayoutComponent, LeftDrawerTabExtraTemplate],
  imports: [
    CommonModule,
    MaterialModule,
    RMIconModule,
    RMButtonModule
  ]
})
export class RMDrawerLayoutModule { }
