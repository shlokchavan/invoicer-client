import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../shared-modules/material.module';
import { RMInfoBoxComponent } from "./rm-info-box.component";
import { RMIconModule } from "../rm-icon/package.module";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RMIconModule,
  ],
  declarations: [RMInfoBoxComponent],
  exports: [RMInfoBoxComponent],
})

export class RMInfoBoxModule { }