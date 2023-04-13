import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IChipConfig } from './rm-chip.model';

@Component({
  selector: 'rm-chip',
  templateUrl: './rm-chip.component.html',
  styleUrls: ['./rm-chip.component.scss']
})
export class RMChipComponent implements OnInit {
  // Parameters
  @Input() config: IChipConfig | any;
  @Input() value!: string | number;
  @Input() secondaryValue!: string | number;
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
