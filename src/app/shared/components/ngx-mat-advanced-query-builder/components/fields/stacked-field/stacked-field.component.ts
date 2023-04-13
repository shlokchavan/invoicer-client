import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {QueryItem} from '../../../models';
import {QuerySearchService} from '../../../query-search.service';
import {ConditionOperator} from '../../../enums';
import {getEnumKeyByEnumValue} from '../../../helpers/general.helpers';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {isArray} from 'rxjs/internal-compatibility';
import {AutocompleteFieldComponent} from '../autocomplete-field/autocomplete-field.component';
import {DateFieldComponent} from '../date-field/date-field.component';
import * as moment from 'moment';

@Component({
  selector: 'stacked-field',
  templateUrl: './stacked-field.component.html',
  styleUrls: ['./stacked-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('bottomField', [
      state('in', style({ height: 'auto' })),
      transition('void => *', [
        style({ height: 0 }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ height: 0 }))
      ])
    ]),
  ]
})
export class StackedFieldComponent implements AfterViewInit {

  @Input() readonly: boolean;

  @Input()
  set item(newValue: QueryItem) {
    if (!!newValue) {
      this.querySearchService.log('StackedFieldComponent - Item Updated', newValue);
      this._item = newValue;
      this.itemUpdated(false);
    }
  }

  get item() {
    return this._item;
  }

  @Output()
  itemChange: EventEmitter<QueryItem> = new EventEmitter<QueryItem>();

  @Output()
  valueChange: EventEmitter<any> = new EventEmitter();

  @ViewChildren(AutocompleteFieldComponent)
  autocompleteFields: QueryList<AutocompleteFieldComponent>;

  @ViewChildren(DateFieldComponent)
  dateFields: QueryList<DateFieldComponent>;

  @ViewChild('leftDate') leftDateComponent: DateFieldComponent;
  @ViewChild('rightDate') rightDateComponent: DateFieldComponent;


  leftValue: any;
  rightValue: any;

  maxLength: number | undefined;
  operator: ConditionOperator;
  type = 'string';
  hasValues = false;

  private _item: QueryItem;

  constructor(private querySearchService: QuerySearchService,
              public changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    // this.rightDateComponent.dateConfig.attributes.disable = true;
  }


  get formFieldAppearance() {
    return this.querySearchService.formFieldAppearance;
  }

  leftValueChanged(value: any) {
      this.leftValue = value;
      if(this.isDate) {
        // this.rightDateComponent.dateConfig.attributes.disable = false;
        // this.rightValue = null;
        this.rightDateComponent.dateConfig.attributes.minDate = moment(this.leftValue).add(1, 'day').toDate();
      }
      this.updateValues();
  }

  rightValueChanged(value: any) {
    this.rightValue = value;
    if(this.isDate)
    this.leftDateComponent.dateConfig.attributes.maxDate = moment(this.rightValue).subtract(1,'day').toDate();
    this.updateValues();
  }

  get isString() {
    return this.item.type.toLowerCase() || 'string' === 'string';
  }

  get isNumber() {
    return this.item.type.toLowerCase() === 'integer';
  }

  get isBoolean() {
    return this.item.type.toLowerCase() === 'boolean';
  }

  get isDate() {
    return this.item.type.toLowerCase() === 'date';
  }

  get showAutocompleteField() {
    return this.isBoolean || this.hasValues;
  }

  get showPlainValueField() {
    return (this.isNumber || this.isString) && !this.hasValues && !this.isDate && !this.isBoolean;
  }

  get showDateField() {
    return this.isDate && !this.hasValues;
  }

  public itemUpdated(emit: boolean = true) {
    this.setType();
    this.setOperator();
    this.setHasValues();
    this.setMaxLength();
    this.setValues();
    this.updateValues(emit);
    this.changeDetectorRef.detectChanges();
    this.updateFields();
  }

  private setType() {
    this.type = this._item.type || 'string';
    this.querySearchService.log('StackedFieldComponent - Set Type:', this.type);
  }

  private setOperator() {
    this.operator = getEnumKeyByEnumValue(ConditionOperator, this._item.condition) as ConditionOperator;
  }

  private setHasValues() {
    if (!!this._item && !!this._item.fieldName) {
      this.hasValues = this.querySearchService.checkForValues(this._item.fieldName);
    } else {
      this.hasValues = false;
    }
  }

  private setValues() {
    if (!!this._item.value && isArray(this._item.value)) {
      this.leftValue = this.isDate ? new Date(this._item.value[0]) : this._item.value[0];
      this.rightValue = this.isDate ? new Date(this._item.value[1]) : this._item.value[1];
    } else {
      this.leftValue = null;
      this.rightValue = null;
    }
  }

  private setMaxLength() {
    if (!!this.item && !!this._item.fieldName) {
      this.maxLength = this.querySearchService.getFieldMaxLength(this._item.fieldName);
    }
  }

  private updateValues(emit: boolean = true) {
    this.querySearchService.log('StackedField - Update Values:', [this.leftValue, this.rightValue]);

    if (this.leftValue === null && this.rightValue === null) {
      this._item.value = null;
    } else {
      this._item.value = [this.leftValue, this.rightValue];
    }

    this.itemChange.emit(this._item);

    if (emit) {
      this.valueChange.emit(this._item.value);
    }

    this.changeDetectorRef.detectChanges();
  }

  private updateFields() {
    (this.autocompleteFields || []).forEach(field => {
        field.item = this.item;
    });
  }
}
