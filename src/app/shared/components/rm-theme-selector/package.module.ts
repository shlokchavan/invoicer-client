import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared-modules/material.module';
import { RMThemeSelectorComponent } from './rm-theme-selector.component';


@NgModule({
  exports: [RMThemeSelectorComponent],
  declarations: [RMThemeSelectorComponent],
  imports: [
    BrowserModule,
    MaterialModule
  ]
})
export class RMThemeSelectorModule { }
