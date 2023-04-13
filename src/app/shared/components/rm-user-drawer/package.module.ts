import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared-modules/material.module';
import { RMIconModule } from '../rm-icon/package.module';
import { RMUserDrawerComponent } from './rm-user-drawer.component';
import { RMButtonModule } from '../rm-button/package.module';
import { RMThemeSelectorModule } from '../rm-theme-selector/package.module';

@NgModule({
  exports: [RMUserDrawerComponent],
  declarations: [RMUserDrawerComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    RMIconModule,
    RMButtonModule,
    RMThemeSelectorModule
  ]
})
export class RMUserDrawerModule { }
