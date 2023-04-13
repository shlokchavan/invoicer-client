import { NgModule } from "@angular/core";
import { MaterialModule } from "../../shared-modules/material.module";
import { RMIconModule } from "../rm-icon/package.module";
import { RMOrgCardComponent } from "./rm-org-card.component";
import { CommonModule } from "@angular/common";
import { RMCheckboxModule } from "../rm-checkbox/package.module";
import { RMToggleModule } from "../rm-toggle/package.module";
import { RMChipsModule } from "../rm-chip/package.module";

@NgModule({
  exports: [RMOrgCardComponent],
  declarations: [RMOrgCardComponent],
  imports: [
    CommonModule, 
    MaterialModule, 
    RMIconModule,
    RMCheckboxModule,
    RMToggleModule,
    RMChipsModule
  ],
})
export class RMOrgCardModule {}
