import { Component } from "@angular/core";
import { ICellEditorAngularComp } from "ag-grid-angular";
import { ICheckboxConfig } from "src/app/shared/components/rm-checkbox/rm-checkbox.model";
@Component({
    selector: 'checkbox-editor',
    styleUrls: ["checkbox-editor.component.scss"],
    templateUrl: './checkbox-editor.component.html'
})
export class CheckboxEditor implements ICellEditorAngularComp {
    // Config
    checkboxConfig: ICheckboxConfig = {
        isChecked: false,
        attributes: {
            disable: false
        }
    }

    // Variables
    value: any;
    params: any;

    agInit(params: any): void {
        this.params = params;
        this.value = params.value;
        this.checkboxConfig.isChecked = this.params.value; //Current Value
        this.checkboxConfig.attributes.disable = this.params.isDisabled; //Current Value
    }

    checkedHandler(event: any) {
        let checked = (event.isChecked ? 1 : 0);
        let colId = this.params.column.colId;
        this.params.node.setDataValue(colId, checked);
        this.checkboxConfig.isChecked = checked;
    }

    getValue(): any {
        return this.value = (this.checkboxConfig.isChecked ? 1 : 0);
    }

}
