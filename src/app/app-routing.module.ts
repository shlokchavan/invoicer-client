import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/AuthLayout/auth-layout.component';
import { LoginRouteGuard } from './shared/guard/login-route.guard';
import { AuthRouteGuard } from './shared/guard/auth-route.guard';
import { NavigationLayoutComponent } from './core/layouts/NavigationLayout/navigation.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    // redirectTo: '/auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [LoginRouteGuard],
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: "my-account",
    component: NavigationLayoutComponent,
    canActivate: [AuthRouteGuard],
    loadChildren: () =>
      import("./modules/my-account/my-account.module").then(
        (m) => m.MyAccountModule
      ),
  },
  {
    path: "manage-master",
    component: NavigationLayoutComponent,
    canActivate: [AuthRouteGuard],
    loadChildren: () =>
      import("./modules/administrator/manage-master/manage-master.module").then(
        (m) => m.ManageMasterModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
