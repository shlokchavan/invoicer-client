import { Component } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { RMGridComponent } from "../../rm-grid.component";
@Component({
  selector: "validation-status-renderer",
  templateUrl: "./validation-status-renderer.component.html",
  styleUrls: ["./validation-status-renderer.component.scss"],
})
export class ValidationStatusRenderer {
  // variables
  href: any
  params: any;
  data: any;
  constructor(private sanitizer: DomSanitizer) {}
  agInit(params: any): void {
    this.params = params;
    this.data = params.data;
  }

  statusColor(status: any) {
    let colorClass;
    switch (status) {
      case "Passed":
        colorClass = "greenTheme";
        break;
      case "Failed":
        colorClass = "redTheme";
        break;
      case "In Progress":
        colorClass = "yellowTheme";
        break;

      default:
        colorClass = "defaultTheme";
        break;
    }
    return colorClass;
  }
  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url || "javascript:void(0);");
  }

  handleClick() {
    const gridComponent: RMGridComponent = this.params.context.componentParent;
    gridComponent.onLinkClicked(this.params);
  }
}
