import { Component } from "@angular/core";
import * as _ from "lodash";
import { RMGridComponent } from "../../rm-grid.component";
@Component({
  selector: "icon-text-link-renderer",
  templateUrl: "./icon-text-link-renderer.component.html",
  styleUrls: ["./icon-text-link-renderer.component.scss"],
})
export class IconTextLinkRenderer {
  // Config
  params: any;
  options: any[] = []
  agInit(params: any): void {
    this.options = _.uniqBy(params.context.componentParent.scope.removedSheets, 'worksheetName')    
    this.params = params;
    this.params.icon = params.icon;
    this.params.text = params.text;
    this.params.iconColor = params.iconColor;
  }

  handleClick(eventData: any) {
    const gridComponent: RMGridComponent = this.params.context.componentParent;
    const event = {
        params: this.params,
        event: eventData
    }
    gridComponent.onLinkClicked(event);
  }
}
