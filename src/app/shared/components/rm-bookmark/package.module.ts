import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared-modules/material.module';
import { RMBookmarkComponent } from './rm-bookmark.component';
import { RMChipsModule } from '../rm-chip/package.module';
import { RMIconModule } from '../rm-icon/package.module';
import { SortByPipe } from '../../pipes/sortby.pipe';
import { RMButtonModule } from '../rm-button/package.module';


@NgModule({
  exports: [RMBookmarkComponent],
  declarations: [
    RMBookmarkComponent,
    SortByPipe
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    RMChipsModule,
    RMIconModule,
    RMButtonModule
  ]
})
export class RMBookmarkModule { }
