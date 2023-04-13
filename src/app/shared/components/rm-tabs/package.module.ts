
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared-modules/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RMTabsComponent } from './rm-tabs.component';
import { RMIconModule } from '../rm-icon/package.module';
import { RMButtonModule } from '../rm-button/package.module';

@NgModule({
    exports: [RMTabsComponent],
    declarations: [RMTabsComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        RMIconModule,
        RMButtonModule
    ]
})
export class RMTabsModule { }
