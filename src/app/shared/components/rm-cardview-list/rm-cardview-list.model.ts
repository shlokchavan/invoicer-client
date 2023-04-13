import { EventEmitter } from '@angular/core';

export interface ICheckboxAttribute {
    disable?: boolean;
    isMandatory?: boolean;
    indeterminate?: boolean;
    label?: string;
    class?: string;
    labelPosition?: string;
}

export interface ICheckboxConfig {
    isChecked?: boolean | number;
    attributes: ICheckboxAttribute;
}

export interface ICheckboxEvents {
    onChange: EventEmitter<any>;
    onIndeterminateChange: EventEmitter<any>;
}