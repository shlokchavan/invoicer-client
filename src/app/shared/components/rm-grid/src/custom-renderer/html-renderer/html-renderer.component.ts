import { Component } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { RMGridComponent } from "../../rm-grid.component";
@Component({
  selector: "html-renderer",
  styleUrls: ["./html-renderer.component.scss"],
  templateUrl: "./html-renderer.component.html",
})
export class HtmlRenderer {
  params: any;
  htmlBody: any;
  agInit(params: any): void {
    this.params = params;
    this.htmlBody = params.html;
  }

  constructor() {}
}
