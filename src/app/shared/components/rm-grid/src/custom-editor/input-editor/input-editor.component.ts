import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatInput } from "@angular/material/input";

import { ICellEditorAngularComp } from "ag-grid-angular";
import { RMGridComponent } from "../../rm-grid.component";

@Component({
  selector: "input-editor",
  styleUrls: ["input-editor.component.scss"],
  templateUrl: "input-editor.component.html",
})
export class InputEditor implements ICellEditorAngularComp, AfterViewInit {
  @ViewChild("input") input!: MatInput;

  private params: any;
  public value: any;
  public model: any;
  public inputType!: string;
  public isRequired!: boolean;
  public placeholderLabel!: string;
  public autoUpdate!: boolean;
  setAutoFocus!: boolean;
  grid!: RMGridComponent;

  agInit(params: any): void {
    this.params = params;
    this.value = this.params.value;
    this.autoUpdate = this.params?.autoUpdate;
    this.isRequired = params?.isRequired;
    this.placeholderLabel = params?.placeholder;
    this.inputType = params?.inputType;
    this.grid = this.params.context.componentParent;
    this.setAutoFocus = params?.autoFocus;
  }

  getValue(): any {
    if (this.inputType == "number") this.value = Number(this.value);
    return this.value;
  }

  updateValue() {
    if (this.autoUpdate) {
      const updateData = this.params.node.data;
      updateData[this.params.colDef.field] = this.getValue();
      this.params.api.applyTransaction({ update: [updateData] });
      this.params.node.setDataValue(this.params.colDef.field, this.getValue());
    } else {
      this.params.node.data[this.params.colDef.field] = this.getValue();
      this.grid.onCellValueChanged(this.params)
    }
  }

  get getEditor() {
    return {
      rowIndex: this.params.rowIndex,
      colId: this.params.column.getId(),
    };
  }

  onKeyDown(event: any) {
    // if(event.key == "TAB") {
    //   
    //   this.params.api.tabToNextCell()
    // } else {
      
    // }
  }

  focusIn() {
    
    setTimeout(() => {
      this.input.focus();
    }, 0);
  }

  ngAfterViewInit() {
    if (this.setAutoFocus) {
      setTimeout(() => {
        this.input.focus();
      }, 0);
    }
  }
}
