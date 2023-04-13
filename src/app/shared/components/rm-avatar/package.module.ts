import { NgModule } from "@angular/core";
import { MaterialModule } from "../../shared-modules/material.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RMAvatarComponent } from "./rm-avatar.component";

@NgModule({
  exports: [RMAvatarComponent],
  declarations: [RMAvatarComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
})
export class RMAvatarModule {}
