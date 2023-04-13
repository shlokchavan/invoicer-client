import {AfterViewInit, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import { ITextConfig } from 'src/app/shared/components/rm-input/rm-input.model';
import {QuerySearchService} from '../../../query-search.service';

@Component({
  selector: 'date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss']
})
export class DateFieldComponent implements OnChanges {

  @Input() readonly: boolean;

  @Input()
  value: Date;

  @Output()
  valueChange: EventEmitter<Date> = new EventEmitter<Date>();

  dateModel = {
    value: null
  }

  dateConfig: ITextConfig = {
    fieldKey: 'value',
    attributes: {
        label: 'Select Date',
        isMandatory: true,
        type: 'datepicker'
    },
    pickerConfig: true
  }

  constructor(private querySearchService: QuerySearchService) {
  }

  ngOnChanges(e) {
    if(e.value)
    this.dateModel = {
      value: this.value
    }
    if(e.readonly) 
    {
      // this.dateConfig.attributes.readonly = this.readonly
      this.dateConfig.attributes.disable = this.readonly
      if(this.readonly) {
        this.dateConfig.attributes.label = null;
      } else {
        this.dateConfig.attributes.label = "Select Date";
      }
    }
  }

  get formFieldAppearance() {
    return this.querySearchService.formFieldAppearance;
  }

  onDateChange(event) {
    this.valueChange.emit(this.dateModel.value)
  }
}
