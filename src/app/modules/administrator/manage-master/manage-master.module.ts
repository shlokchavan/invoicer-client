import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RMDrawerLayoutModule } from 'src/app/shared/components/rm-drawer-layout/package.module';
import { ManageMasterSPComponent } from './manage-master-sp/manage-master-sp.component';
import { ManageMasterSystemResolverService } from 'src/app/shared/resolvers/manage-master-resolver.service';
import { ManageMasterService } from 'src/app/shared/_http/manage-master.service';
import { RMButtonModule } from 'src/app/shared/components/rm-button/package.module';
import { RMInputModule } from 'src/app/shared/components/rm-input/package.module';
import { RMDrawerPanelModule } from 'src/app/shared/components/rm-drawer-panel/src/package.module';
import { RMUploaderModule } from 'src/app/shared/components/rm-uploader/package.module';
import { RMTextareaModule } from 'src/app/shared/components/rm-textarea/package.module';
import { RMGridModule } from 'src/app/shared/components/rm-grid/src/rm-grid.module';
import { ColorCardComponent } from './color-card/color-card.component';
import { RMIconModule } from 'src/app/shared/components/rm-icon/package.module';
import { MatMenuModule } from '@angular/material/menu';
import { ColorCardItemComponent } from './color-card/color-card-item/color-card-item.component';
import { RMNotificationComponent } from 'src/app/shared/components/rm-notifications/rm-notifications.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RMSelectBoxModule } from 'src/app/shared/components/rm-select-box/package.module';
import { RMLoaderModule } from 'src/app/shared/components/rm-loader/package.module';

@NgModule({
  imports: [
    CommonModule,
    RMDrawerLayoutModule,
    RMButtonModule,
    RMInputModule,
    RMTextareaModule,
    RMSelectBoxModule,
    RMDrawerPanelModule,
    RMUploaderModule,
    RMGridModule,
    RMIconModule,
    RMLoaderModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'sp',
        component: ManageMasterSPComponent,
        resolve: { allMasterTypes: ManageMasterSystemResolverService },
      },
      // { path: 'sp', component: ManageMasterSPComponent, resolve: { allMasterTypes: ManageMasterSystemResolverService } },
      {
        path: 'sr',
        component: ManageMasterSPComponent,
        resolve: { allMasterTypes: ManageMasterSystemResolverService },
      },
      // { path: 'client', component: ManageMasterClientComponent, resolve: { allMasterTypes: ManageMasterClientResolverService } }
    ]),
  ],
  declarations: [
    ManageMasterSPComponent,
    ColorCardComponent,
    ColorCardItemComponent,
  ],
  providers: [ManageMasterService, ManageMasterSystemResolverService],
  entryComponents: [RMNotificationComponent],
})
export class ManageMasterModule {
  constructor() {}
}
