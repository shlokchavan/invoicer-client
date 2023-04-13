import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../shared-modules/material.module';
import { RMLoaderComponent } from "./rm-loader.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [RMLoaderComponent],
  exports: [RMLoaderComponent],
})

export class RMLoaderModule { }