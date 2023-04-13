import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ICheckboxConfig } from './rm-checkbox.model';

@Component({
    selector: 'rm-checkbox',
    templateUrl: './rm-checkbox.component.html',
    styleUrls: ['./rm-checkbox.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RMCheckboxComponent {
    @Input() config!: ICheckboxConfig;
    @Output() onChange: EventEmitter<ICheckboxConfig> = new EventEmitter();

    constructor() {

    }

    changeChecked(e: any) {
        this.onChange.emit(this.config);
    }
}
