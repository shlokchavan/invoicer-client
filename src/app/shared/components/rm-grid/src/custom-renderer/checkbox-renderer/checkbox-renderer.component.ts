import { Component } from "@angular/core";
import { ICheckboxConfig } from "src/app/shared/components/rm-checkbox/rm-checkbox.model";
import { IToggleConfig } from "src/app/shared/components/rm-toggle/rm-toggle.model";
@Component({
  selector: "checkbox-renderer",
  templateUrl: "./checkbox-renderer.component.html",
})
export class CheckboxRenderer {
  // Config
  isVisibile = true;
  isToggle = false;
  checkboxConfig: ICheckboxConfig = {
    isChecked: false,
    attributes: {
      disable: false,
    },
  };
  toggleCheckboxConfig: IToggleConfig | any = {
    isActive: false,
    attributes: {
      disable: false,
    },
  };
  params: any;
  agInit(params: any): void {
    // 
    this.params = params;
    // this.checkboxConfig.isChecked = this.params?.isChecked || params?.isChecked;
    this.isToggle = this.params.isToggle;
    this.params.isDisabled = params.isDisabled;
    if (!this.isToggle) {
      this.checkboxConfig.isChecked = this.params.value;
      this.checkboxConfig.attributes.disable = this.params.isDisabled; //Current Value
    } else {
      this.toggleCheckboxConfig.isActive =
        params.value == 1 || params.value == true;
      this.toggleCheckboxConfig.attributes.disable = this.params.isDisabled;
    }
    if (this.params.isVisibile === false) this.isVisibile = false;
  }

  checkedHandler(event: any) {
    let checked = event.isChecked ? 1 : 0;
    let colId = this.params.column.colId;
    this.params.node.setDataValue(colId, checked);
    this.checkboxConfig.isChecked = checked;
  }

  toggleHandler(event: any) {
    let checked = event.isActive ? 1 : 0;
    let colId = this.params.column.colId;
    this.params.node.setDataValue(colId, checked);
    this.toggleCheckboxConfig.isActive = checked;
  }
}
