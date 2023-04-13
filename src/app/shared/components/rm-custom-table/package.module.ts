import { NgModule } from "@angular/core";
import { MaterialModule } from "../../shared-modules/material.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RMIconModule } from "../rm-icon/package.module";
import { RMCustomTableComponent } from "./rm-custom-table.component";
import { RMAvatarGroupModule } from "../rm-avatar-group/package.module";
import { RMAvatarModule } from "../rm-avatar/package.module";
import { RMChipsModule } from "../rm-chip/package.module";

@NgModule({
  exports: [RMCustomTableComponent],
  declarations: [RMCustomTableComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RMIconModule,
    RMAvatarGroupModule,
    RMAvatarModule,
    RMChipsModule
  ],
})
export class RMCustomTableModule {}
