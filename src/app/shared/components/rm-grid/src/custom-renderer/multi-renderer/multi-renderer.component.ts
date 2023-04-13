import { Component } from "@angular/core";
import { RMGridComponent } from "../../rm-grid.component";
@Component({
  selector: "multi-renderer",
  templateUrl: "./multi-renderer.component.html",
  styleUrls: ["./multi-renderer.component.scss"],
})
export class MultiRenderer {
  params: any;
  orgData: any;
  centerAlign!: boolean;
  cellStyle: any;
  advQueue: any = [];
  auditorFullName: any;
  agInit(params: any): void {
    this.params = params;
    this.cellStyle = params?.cellStyle;
    this.advQueue = params?.options[0]?.advQueue;
    if (params.options.some((item: any) => item.icon == "icard")) {
      this.orgData = params.options.filter(
        (option: any) => option.icon === "icard"
      )[0]["data"];
    }
    this.centerAlign = params.center;
    // Invalid Implementation, Specific Logic on Generic Component.
    // if (this.params?.options[0]?.advQueue) {
    //   this.params.options[0].advQueue.forEach((element) => {
    //     if (params.users) {
    //       const auditor = params.users.find(
    //         (row: any) =>
    //           row.userName ==
    //           element.userId
    //       );
    //       if (auditor) {
    //         this.advQueue.push(` ${auditor.firstName} ${auditor.lastName}`);
    //       } else {
    //         this.advQueue.push(" "+element.userId);
    //       }
    //     } else {
    //       this.advQueue.push(" "+element.facilityName);
    //     }
    //   });
    //   // Invalid Implementation, Specific Logic on Generic Component.
    // } else if(params.auditorView) {
    //   const auditor = params.users.find(
    //     (row: any) =>
    //       row.userName ==
    //       params.value
    //   );
    //   if (auditor) {
    //     this.auditorFullName = `${auditor.firstName} ${auditor.lastName}`
    //   } else {
    //     this.auditorFullName = params.value
    //   }
    // }
  }

  handleClick() {
    const gridComponent: RMGridComponent = this.params.context.componentParent;
    gridComponent.onLinkClicked(this.params);
  }

  toggleHandler(event: any, config: any) {
    let checked = event.isActive ? 1 : 0;
    let colId = this.params.column.colId;
    this.params.node.setDataValue(colId, checked);
    config.isActive = checked;
  }
}
