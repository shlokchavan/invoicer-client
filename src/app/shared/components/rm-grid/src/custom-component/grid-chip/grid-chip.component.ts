import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IChipConfig } from 'src/app/shared/components/rm-chip/rm-chip.model';

@Component({
    selector: 'rm-grid-chip',
    templateUrl: './grid-chip.component.html',
    styleUrls: ['./grid-chip.component.scss']
})
export class GridChipComponent implements OnInit {
    // Parameters
    @Input() config: IChipConfig;
    @Input() value!: string | number;
    @Output() onClick: EventEmitter<IChipConfig> = new EventEmitter();
    @Output() onRemove: EventEmitter<IChipConfig> = new EventEmitter();

    constructor() {
        // Initialize Default Properties
        this.config = {
            colorClass: 'defaultTheme',
            clickable: false,
            isLargeChip: false,
            removable: false,
            draggable: false,
            isBadge: false
        }
    }

    ngOnInit() {

    }
    clickChip() {
        this.onClick.emit(this.config);
    }
    removeChip() {
        this.onRemove.emit(this.config)
    }
}
