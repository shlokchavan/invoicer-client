import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared-modules/material.module';
import { RMNavComponent } from './rm-nav.component';
import { RMIconModule } from '../rm-icon/package.module';
import { RMButtonModule } from '../rm-button/package.module';


@NgModule({
  exports: [RMNavComponent],
  declarations: [RMNavComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    RMIconModule,
    RMButtonModule,
  ]
})
export class RMNavModule { }
