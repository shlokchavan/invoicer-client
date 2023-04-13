
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared-modules/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RMButtonToggleComponent } from './rm-button-toggle.component';
import { RMIconModule } from '../rm-icon/package.module';

@NgModule({
    exports: [RMButtonToggleComponent],
    declarations: [RMButtonToggleComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        RMIconModule
    ]
})
export class RMToggleButtonsModule { }
