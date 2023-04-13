
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared-modules/material.module';
import { CommonModule } from '@angular/common';

import { FormsModule, NG_VALIDATORS } from '@angular/forms';
import { RMTextareaComponent } from './rm-textarea.component';

@NgModule({
    exports: [RMTextareaComponent],
    declarations: [RMTextareaComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule
    ],
    providers: [
      {
        provide: NG_VALIDATORS,
        useExisting: RMTextareaComponent,
        multi: true
      }
    ]
})
export class RMTextareaModule { }
