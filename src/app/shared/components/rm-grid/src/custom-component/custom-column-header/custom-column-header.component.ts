import { Component, ElementRef, ViewChild } from "@angular/core";
import { IHeaderAngularComp } from "ag-grid-angular";
import { IHeaderParams } from "ag-grid-community";

@Component({
  selector: "custom-column-header",
  templateUrl: "./custom-column-header.component.html",
  styleUrls: ["./custom-column-header.component.scss"],
  styles: [`
    :host {
      width: 100%;
    }
  `],
})
export class CustomColumnHeader implements IHeaderAngularComp {
  params: any;
  isReseted = true;
  customModel: any = {
    auditorId: "",
  };
  selectConfig: any;
  agInit(params: IHeaderParams): void {
    this.params = params;
    if (this.params && this.params.config) {
      this.selectConfig = this.params.config;
      this.customModel = {
        [this.selectConfig.fieldKey]: "", // Set Default Value
      };
      this.updateDropdown();
    }
  }

  refresh(params: IHeaderParams): boolean {
    return true;
  }

  onDeleteColumn() {
    const columnKey = this.params.column.getColId();
    this.params.columnApi.setColumnVisible(columnKey, false);
    this.params.api.refreshHeader();
    // Custom Trigger
    this.updateDropdown();
    const selectorColumnState = this.params.columnApi.getColumn("auditorSelector")
    if(selectorColumnState && !selectorColumnState.visible) {
      this.params.columnApi.setColumnVisible("auditorSelector", true);
    }
    // this.params.context.componentParent.scope.updateAuditorDropdown();
  }

  onActionTriggered(type: string, event: any) {    
    switch (type) {
      case "selection-change":
        // Temp (Switch Auditor)
        // Show Auditor
        this.isReseted = false;
        this.params.columnApi.setColumnVisible(event.value, true);
        this.customModel = {
          auditorId: null, //Reset Form
        };
        setTimeout(() => {
          this.isReseted = true;
          this.updateDropdown();
        }, 0);
        setTimeout(() => {
          if(this.selectConfig && this.selectConfig.options.length == 0) {
            this.params.columnApi.setColumnVisible("auditorSelector", false);
          }
        }, 100);
        break;

      default:
        break;
    }
  }

  updateDropdown() {
    if(this.selectConfig)
    setTimeout(() => {
      const options = this.params.api.getColumnDefs()
      .filter((col: any) => col.hide)
      this.selectConfig.options = options
      .map((value: any) => {
        return {
          auditorId: value["field"],
          displayName: value["headerName"],
        };
      });
      if(this.selectConfig && this.selectConfig.options.length == 0) {
        this.params.columnApi.setColumnVisible("auditorSelector", false);
      } else {
        this.params.columnApi.setColumnVisible("auditorSelector", true);
      }
      this.params.api.redrawRows();
    }, 20);
  }
}
