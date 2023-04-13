import { Component } from "@angular/core";
import { RMGridComponent } from "../../rm-grid.component";
@Component({
  selector: "count-renderer",
  templateUrl: "./count-renderer.component.html",
  styleUrls: ["./count-renderer.component.scss"],
})
export class CountRenderer {
  // variables
  params: any;
  data: any;
  count!: number;
  agInit(params: any): void {
    this.params = params;
    this.count = this.params.value.length;
    // this.params = this.params.value;
    this.data = this.params.value
      .map((row: any) => row.tableName)
      .join(", ");
  }
}
