
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared-modules/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RMSelectionListComponent } from './rm-selection-list.component';
import { RMInputModule } from '../rm-input/package.module';
import { RMToggleModule } from '../rm-toggle/package.module';

@NgModule({
    exports: [RMSelectionListComponent],
    declarations: [RMSelectionListComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        RMInputModule,
        RMToggleModule
    ]
})
export class RMSelectionListModule { }
