import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../../shared-modules/material.module";
import { RMComparisionTableComponent } from "./rm-comparision-table.component";
import { CommonModule } from "@angular/common";
import { RMTooltipModule } from "../rm-tooltip";
import { RMIconModule } from "../rm-icon/package.module";
import { RMButtonModule } from "../rm-button/package.module";
import { RMComparisionTableService } from "./rm-comparision-table.service";
import { RMSelectBoxModule } from "../rm-select-box/package.module";
import { RMToggleModule } from "../rm-toggle/package.module";
import { RMLoaderModule } from "../rm-loader/package.module";

@NgModule({
  exports: [RMComparisionTableComponent],
  declarations: [RMComparisionTableComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RMTooltipModule,
    RMIconModule,
    RMButtonModule,
    RMSelectBoxModule,
    RMToggleModule,
    RMLoaderModule,
  ],
  providers: [RMComparisionTableService],
})
export class RMComparisionTableModule {}
