import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../../shared-modules/material.module";

import { RMIconModule } from "../rm-icon/package.module";
import { RMButtonModule } from "../rm-button/package.module";
import { CommonModule } from "@angular/common";
import { RMMessageLayoutComponent } from "./rm-message-layout.component";
import { LeftDrawerTabExtraTemplate } from "./rm-message-tab.template";
import { RMInputModule } from "../rm-input/package.module";
import { RMSelectBoxModule } from "../rm-select-box/package.module";
import { FilterPipe } from "./filter.pipe";

@NgModule({
  exports: [RMMessageLayoutComponent, FilterPipe],
  declarations: [RMMessageLayoutComponent, LeftDrawerTabExtraTemplate, FilterPipe],
  imports: [CommonModule, MaterialModule, RMIconModule, RMButtonModule, RMInputModule, RMSelectBoxModule],
})
export class RMMessageLayoutModule {}
