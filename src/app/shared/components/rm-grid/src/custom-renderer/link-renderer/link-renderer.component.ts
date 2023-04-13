import { Component } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { RMGridComponent } from "../../rm-grid.component";
@Component({
  selector: "link-renderer",
  templateUrl: "./link-renderer.component.html",
})
export class LinkRenderer {
  params: any;
  value: any;
  isEmail!: boolean;
  isPhone!: boolean;
  href: any;
  isGroupRow!: boolean;
  agInit(params: any): void {
    this.params = params;
    this.isGroupRow = params.node.group
    this.value = params.valueFormatted ? params.valueFormatted : params.value;
    this.isEmail = params.isEmail;
    this.isPhone = params.isPhone;

    if (this.isEmail) {
      this.href = `mailto: ${this.value}`;
    } else if (this.isPhone) {
      this.href = `tel: ${this.value}`;
    }
  }

  constructor(private sanitizer: DomSanitizer) {}

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url || "javascript:void(0);");
  }

  handleClick() {
    const gridComponent: RMGridComponent = this.params.context.componentParent;
    gridComponent.onLinkClicked(this.params);
  }
}
