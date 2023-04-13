import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthRouteGuard } from './shared/guard/auth-route.guard';
import { LoginRouteGuard } from './shared/guard/login-route.guard';
import { AuthLayoutComponent } from './core/layouts/AuthLayout/auth-layout.component';
import { EmptyLayoutComponent } from './core/layouts/EmptyLayout/empty-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { RMToastyModule } from './shared/components/rm-toasty/rm-toasty/package.module';
import { RmToastyService } from './shared/components/rm-toasty/rm-toasty/rm-toasty.service';
import { RMLoaderModule } from './shared/components/rm-loader/package.module';
import { MaterialModule } from './shared/shared-modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RMNavModule } from './shared/components/rm-nav/package.module';
import { RMDrawerPanelModule } from './shared/components/rm-drawer-panel/src/package.module';
import { RMUserDrawerModule } from './shared/components/rm-user-drawer/package.module';
import { NavigationLayoutComponent } from './core/layouts/NavigationLayout/navigation.component';
import { LoginService } from './shared/_http/login.service';
import { AppHeaderModule } from './core/header/header.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    EmptyLayoutComponent,
    NavigationLayoutComponent,
  ],
  providers: [
    AuthRouteGuard,
    LoginRouteGuard,
    // UserProfileService,
    RmToastyService,
    LoginService,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RMNavModule,
    AppHeaderModule,
    RMNavModule,
    RMLoaderModule,
    // Drawer Panel
    RMDrawerPanelModule,
    RMUserDrawerModule,
    RMToastyModule.forRoot(),
  ],
})
export class AppModule {}
