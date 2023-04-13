import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RMSelectBoxComponent } from './rm-select-box.component';
import { FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared-modules/material.module';
import { RMIconModule } from "../rm-icon/package.module";
import { SelectSearchPipe } from "./pipe/select-search.pipe";
import {ScrollingModule} from '@angular/cdk/scrolling';
import { SelectCheckAllComponent } from './select-check-all.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RMIconModule,
    ScrollingModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
  ],
  declarations: [RMSelectBoxComponent, SelectSearchPipe, SelectCheckAllComponent],
  exports: [RMSelectBoxComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RMSelectBoxComponent,
      multi: true
    }
  ]
})

export class RMSelectBoxModule { }