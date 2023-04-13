import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { IDateTimeConfig } from './rm-datetime-picker.model';
@Component({
  selector: 'rm-datetime-picker',
  templateUrl: './rm-datetime-picker.component.html',
  styleUrls: ['./rm-datetime-picker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RMDateTimePickerComponent implements OnInit {
  @Input() config: IDateTimeConfig;
  @Output() onChange: EventEmitter<IDateTimeConfig> = new EventEmitter();
  constructor() {
    this.config = {
      disabled: false,
      // pickerType: 'calendar',
      // selectMode: 'range',
      // hour12Timer: true
    }
  }
  
  ngOnInit() {

  }
}
