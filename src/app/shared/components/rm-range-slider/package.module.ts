import { NgModule } from "@angular/core";
import { MaterialModule } from "../../shared-modules/material.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RMRangeSliderComponent } from "./rm-range-slider.component";

@NgModule({
  exports: [RMRangeSliderComponent],
  declarations: [RMRangeSliderComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
})
export class RMRangeSliderModule {}
