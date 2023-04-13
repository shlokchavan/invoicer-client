import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../shared-modules/material.module";
import { RMIconModule } from "../rm-icon/package.module";
import { RMRadioComponent } from "./rm-radio.component";

@NgModule({
  declarations: [RMRadioComponent],
  exports: [RMRadioComponent],
  imports: [CommonModule, MaterialModule, FormsModule, RMIconModule],
})
export class RMRadioModule {}
