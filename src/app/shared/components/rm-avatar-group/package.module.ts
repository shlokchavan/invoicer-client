import { NgModule } from "@angular/core";
import { MaterialModule } from "../../shared-modules/material.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RMAvatarGroupComponent } from "./rm-avatar-group.component";
import { RMAvatarModule } from "../rm-avatar/package.module";

@NgModule({
  exports: [RMAvatarGroupComponent],
  declarations: [RMAvatarGroupComponent],
  imports: [CommonModule, MaterialModule, FormsModule, RMAvatarModule],
})
export class RMAvatarGroupModule {}
