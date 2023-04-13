
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared-modules/material.module';
import { CommonModule } from '@angular/common';
import { RMCheckboxComponent } from './rm-checkbox.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    exports: [RMCheckboxComponent],
    declarations: [RMCheckboxComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule
    ]
})
export class RMCheckboxModule { }
