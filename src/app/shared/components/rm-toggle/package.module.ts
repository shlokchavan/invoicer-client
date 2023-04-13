
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared-modules/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RMToggleComponent } from './rm-toggle.component';

@NgModule({
    exports: [RMToggleComponent],
    declarations: [RMToggleComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule
    ]
})
export class RMToggleModule { }
