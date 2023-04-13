import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/shared-modules/material.module';
import { RMIconModule } from 'src/app/shared/components/rm-icon/package.module';
import { GridChipComponent } from './grid-chip.component';

@NgModule({
    exports: [GridChipComponent],
    declarations: [GridChipComponent],
    imports: [
        CommonModule,
        MaterialModule,
        RMIconModule
    ]
})
export class GridChipModule { }
