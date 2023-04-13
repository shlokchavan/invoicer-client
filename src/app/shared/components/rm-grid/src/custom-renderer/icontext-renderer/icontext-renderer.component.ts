import { Component } from "@angular/core";
@Component({
  selector: "icontext-renderer",
  templateUrl: "./icontext-renderer.component.html",
  styleUrls: ["./icontext-renderer.component.scss"],
})
export class IconTextRenderer {
  params: any;
  value: any;
  icon: string | any;
  href: any;
  agInit(params: any): void {
    this.params = params;
    this.value = params.value;
    this.icon = params.icon;
  }

  constructor() {}
}
