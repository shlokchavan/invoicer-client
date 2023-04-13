import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppHeaderComponent } from './header.component';
import { RMHeaderModule } from 'src/app/shared/components/rm-header/package.module';
import { RMBookmarkModule } from 'src/app/shared/components/rm-bookmark/package.module';
import { RMChipsModule } from 'src/app/shared/components/rm-chip/package.module';
import { RMIconModule } from 'src/app/shared/components/rm-icon/package.module';


@NgModule({
  exports: [AppHeaderComponent],
  declarations: [AppHeaderComponent],
  imports: [
    BrowserModule,
    RMHeaderModule,
    RMChipsModule,
    RMIconModule,
    RMBookmarkModule
  ]
})
export class AppHeaderModule { }
