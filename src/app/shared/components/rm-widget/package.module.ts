import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RmWidgetComponent } from "./rm-widget.component";
import { RMIconModule } from "../rm-icon/package.module";
import { RMLoaderModule } from "../rm-loader/package.module";
import { RMChartModule } from "../rm-chart/package.module";
import { RMGridModule } from "../rm-grid/src/rm-grid.module";
import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { GenerateWidgetConfigPipe } from "./rm-widget-config.pipe";
import { MatMenuModule } from "@angular/material/menu";

@NgModule({
  declarations: [RmWidgetComponent, GenerateWidgetConfigPipe],
  exports: [RmWidgetComponent],
  imports: [CommonModule, MatMenuModule, RMIconModule, RMLoaderModule, RMChartModule, RMGridModule, OverlayModule, PortalModule],
})
export class RmWidgetModule {}
