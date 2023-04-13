import { NgModule } from "@angular/core";
import { MaterialModule } from "../../shared-modules/material.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RMSchedulerComponent } from "./rm-scheduler.component";
import { RMSelectBoxModule } from "../rm-select-box/package.module";
import { RMIconModule } from "../rm-icon/package.module";
import { RMButtonModule } from "../rm-button/package.module";

@NgModule({
  exports: [RMSchedulerComponent],
  declarations: [RMSchedulerComponent],
  imports: [
    CommonModule, 
    MaterialModule, 
    FormsModule,
    RMSelectBoxModule,
    RMIconModule,
    RMButtonModule
  ],
})
export class RMSchedulerModule {}
