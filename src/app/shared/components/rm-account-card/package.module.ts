import { NgModule } from "@angular/core";
import { MaterialModule } from "../../shared-modules/material.module";
import { RMIconModule } from "../rm-icon/package.module";
import { RMAccountCardComponent } from "./rm-account-card.component";
import { CommonModule } from "@angular/common";
import { RMCheckboxModule } from "../rm-checkbox/package.module";
import { RMToggleModule } from "../rm-toggle/package.module";
import { RMChipsModule } from "../rm-chip/package.module";

@NgModule({
  exports: [RMAccountCardComponent],
  declarations: [RMAccountCardComponent],
  imports: [
    CommonModule, 
    MaterialModule, 
    RMIconModule,
    RMCheckboxModule,
    RMToggleModule,
    RMChipsModule
  ],
})
export class RMAccountCardModule {}
