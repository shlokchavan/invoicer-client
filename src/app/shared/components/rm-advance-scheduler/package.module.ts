import { NgModule } from "@angular/core";
import { MaterialModule } from "../../shared-modules/material.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RMAdvanceSchedulerComponent } from "./rm-advance-scheduler.component";
import { RMSelectBoxModule } from "../rm-select-box/package.module";
import { RMIconModule } from "../rm-icon/package.module";
import { RMButtonModule } from "../rm-button/package.module";
import { TimeZoneService } from "../../_http/timezone.service";
import { RMInputModule } from "../rm-input/package.module";

@NgModule({
  exports: [RMAdvanceSchedulerComponent],
  declarations: [RMAdvanceSchedulerComponent],
  imports: [
    CommonModule, 
    MaterialModule, 
    FormsModule,
    RMSelectBoxModule,
    RMIconModule,
    RMButtonModule,
    RMInputModule
  ],
  providers: [TimeZoneService]
})
export class RMAdvanceSchedulerModule {}
