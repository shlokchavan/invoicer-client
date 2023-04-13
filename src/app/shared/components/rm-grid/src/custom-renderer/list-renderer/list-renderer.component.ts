import { Component } from "@angular/core";
@Component({
  selector: "list-renderer",
  templateUrl: "./list-renderer.component.html",
})
export class ListRenderer {
  // Config
  params: any;
  agInit(params: any): void {
    this.params = params;
    this.params.options = params.options;
    this.params.fallBackText = params.fallBackText;
    
  }

  get checkAllDataExists() {
    return true
  }
}
