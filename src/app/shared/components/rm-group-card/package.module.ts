import { NgModule } from "@angular/core";
import { MaterialModule } from "../../shared-modules/material.module";
import { RMIconModule } from "../rm-icon/package.module";
import { CommonModule } from "@angular/common";
import { RMCheckboxModule } from "../rm-checkbox/package.module";
import { RMToggleModule } from "../rm-toggle/package.module";
import { RMChipsModule } from "../rm-chip/package.module";
import { RMGroupCardComponent } from "./rm-group-card.component";
import { RMAvatarGroupModule } from "../rm-avatar-group/package.module";

@NgModule({
  exports: [RMGroupCardComponent],
  declarations: [RMGroupCardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RMIconModule,
    RMCheckboxModule,
    RMToggleModule,
    RMChipsModule,
    RMAvatarGroupModule
  ],
})
export class RMGroupCardModule {}
