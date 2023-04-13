import { NgModule } from "@angular/core";
import { MaterialModule } from "../../shared-modules/material.module";
import { CommonModule } from "@angular/common";

import { FormsModule, NG_VALIDATORS } from "@angular/forms";
import { RmTimelineComponent } from "./rm-timeline.component";
import { RMChipsModule } from "../rm-chip/package.module";
import { RMIconModule } from "../rm-icon/package.module";

@NgModule({
  exports: [RmTimelineComponent],
  declarations: [RmTimelineComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RMChipsModule,
    RMIconModule,
  ],
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: RmTimelineComponent,
      multi: true,
    },
  ],
})
export class RMTimelineModule {}
