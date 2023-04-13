
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared-modules/material.module';
import { CommonModule } from '@angular/common';
import { RMStagingConfigurationComponent } from './rm-staging-configuration.component';

@NgModule({
    exports: [RMStagingConfigurationComponent],
    declarations: [RMStagingConfigurationComponent],
    imports: [
        CommonModule,
        MaterialModule
    ]
})
export class RMStagingConfigurationModule { }
