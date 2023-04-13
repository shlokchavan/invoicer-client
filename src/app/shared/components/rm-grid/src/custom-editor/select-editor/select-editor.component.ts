import { A, Z, ZERO, NINE, SPACE } from "@angular/cdk/keycodes";
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { MatSelect } from "@angular/material/select";

import { ICellEditorAngularComp } from "ag-grid-angular";

@Component({
  selector: "select-editor",
  styleUrls: ["select-editor.component.scss"],
  templateUrl: "select-editor.component.html",
})
export class SelectEditor implements ICellEditorAngularComp {
  @ViewChild("select") select!: MatSelect;
  @ViewChild("selectSearchRef") selectSearchRef!: ElementRef<HTMLInputElement>;

  public params: any;
  public value!: number;
  public model: any;
  public isRequired!: boolean;
  public placeholderLabel!: string;
  public query: any;
  options: any;
  labelKey!: string;
  returnKey!: string;
  node: any;
  disabled: any;

  agInit(params: any): void {
    this.params = params;
    this.node = params.node;
    this.value = this.params.value;
    this.labelKey = params.labelKey
    this.returnKey = params.returnKey
    
    // if(this.params.value && (params.key == "facilityView" || params.key == "auditorView")) {
    //   this.options = this.params.getter(this.params.value);
    // } else {
    //   this.options = params.options;
    // }
    // if (params.key == "facilityView") {
    //   this.options = params.options.map((row: any) => {
    //     return {
    //       ...row,
    //       value: row.facilityId
    //     }
    //   });
    // } else if(params.key == "auditorView")  {
    //   this.options = params.options.map((row: any) => {
    //     return {
    //       ...row,
    //       value: row.userName,
    //       name: `${row.firstName} ${row.lastName}`
    //     }
    //   });
    // }
    this.options = params.options;
    this.isRequired = params?.isRequired;
    this.disabled = params?.disabled;
    this.placeholderLabel = params?.placeholder;
    // setInterval(() => {
    //   if (this.selectSearchRef) this.selectSearchRef.nativeElement.focus();
    // }, 500);
    if(params.openOnInit) {
      const openPanelInt = setInterval(() => {
        if(this.select) {
          this.select.open();
          clearInterval(openPanelInt)
        }
      }, 10);
    }
  }

  // isPopup(): any {
  //   return true;
  // }

  getIsDisabledOption(option: any) {
    if(this.params.checkDisabled) {
      return this.params.checkDisabled(option)
    } else {
      return false
    }
  }

  getValue(): any {
    return this.value;
  }

  focusIn() {
    setTimeout(() => {
      this.select.focus();
    }, 0);
  }

  updateValue(event: any) {
    const updateData = this.params.node.data;
    updateData[this.params.colDef.field] = this.getValue();
    this.params.api.applyTransaction({ update: [updateData] });
    this.params.node.setDataValue(this.params.colDef.field, this.getValue());
    // if(this.params.autoClose) {
    //   this.params.stopEditing();
    // }
  }

  // Search cum autocomplete in select
  _handleKeydown(event: any) {
    // Prevent propagation for all alphanumeric characters in order to avoid selection issues
    if (
      (event.key && event.key.length === 1) ||
      (event.keyCode >= A && event.keyCode <= Z) ||
      (event.keyCode >= ZERO && event.keyCode <= NINE) ||
      event.keyCode === SPACE
    ) {
      event.stopPropagation();
    }
  }
}
