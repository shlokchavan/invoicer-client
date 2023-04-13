import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RmPicklistComponent } from "./rm-picklist.component";
import { MaterialModule } from "../../shared-modules/material.module";
import { RMButtonModule } from "../rm-button/package.module";
import { PickListSearchPipe } from "./pipe/picklist-search.pipe";
import { FormsModule } from "@angular/forms";
import { RMIconModule } from "../rm-icon/package.module";

@NgModule({
  declarations: [RmPicklistComponent, PickListSearchPipe],
  exports: [RmPicklistComponent],
  imports: [CommonModule, FormsModule, MaterialModule, RMButtonModule,RMIconModule],
})
export class RmPicklistModule {}
