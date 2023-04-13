import { Component } from "@angular/core";
import { ICheckboxConfig } from "src/app/shared/components/rm-checkbox/rm-checkbox.model";

@Component({
    selector: 'radio-button-renderer',
    styleUrls: ['radio-button-renderer.component.scss'],
    templateUrl: './radio-button-renderer.component.html'
})
export class RadioButtonRenderer {
    // Config
    isDisabled!: boolean;
    params: any;
    value: any;
    key: any;
    agInit(params: any): void {
        // 
        this.params = params;
        this.isDisabled = params.isDisabled
        this.value = params.value == 1
        this.key = params.key;
    }

    checkedHandler(event: any) {
        let checked = (event.source.checked ? 1 : 0);
        let colId = this.params.column.colId;
        this.params.node.setDataValue(colId, checked);
    }

}
