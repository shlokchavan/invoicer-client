import { Component } from "@angular/core";
@Component({
  selector: "bold-text-renderer",
  templateUrl: "./bold-text-renderer.component.html",
  styleUrls: ["./bold-text-renderer.component.scss"],
})
export class BoldTextRenderer {
  params: any;
  agInit(params: any): void {
    this.params = params;
  }
}
