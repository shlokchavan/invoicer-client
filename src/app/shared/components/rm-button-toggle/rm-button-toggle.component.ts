import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'rm-button-toggle',
    templateUrl: './rm-button-toggle.component.html',
    styleUrls: ['./rm-button-toggle.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RMButtonToggleComponent {
    //Params
    @Input() buttons!: any[];
    @Output() onToggle: EventEmitter<any> = new EventEmitter();

    constructor() {
        
    }

    toggleBtn(button: any) {
        this.onToggle.emit(button)
    }

}
