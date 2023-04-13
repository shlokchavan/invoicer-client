import { Component } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { RMGridComponent } from "../../rm-grid.component";
@Component({
  selector: "validation-issue-renderer",
  templateUrl: "./validation-issue-renderer.component.html",
  styleUrls: ["./validation-issue-renderer.component.scss"],
})
export class ValidationIssueRenderer {
  // variables
  href: any;
  params: any;
  constructor(private sanitizer: DomSanitizer) {}
  agInit(params: any): void {
    this.params = params;
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
