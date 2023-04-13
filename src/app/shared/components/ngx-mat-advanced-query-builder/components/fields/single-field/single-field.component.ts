import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output, QueryList,
  ViewChildren
} from '@angular/core';
import * as _ from 'lodash';
import {QueryItem} from '../../../models';
import {QuerySearchService} from '../../../query-search.service';
import {AutocompleteFieldComponent} from '../autocomplete-field/autocomplete-field.component';

@Component({
  selector: 'single-field',
  templateUrl: './single-field.component.html',
  styleUrls: ['./single-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleFieldComponent {

  @Input() readonly: boolean;

  @Input() disableField?: 'parameter-disabled' | 'value-disabled' | undefined;

  @Input()
  set item(newValue: QueryItem) {
    if (!!newValue) {
      this.querySearchService.log('SingleFieldComponent - Item Changed', newValue);
      this._item = newValue;
      this.itemUpdated();
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

  maxLength: number | undefined;
  operator: string;
  type = 'string';
  hasValues = false;
  multi = false;
  autoValueChangeCount = 0;

  private _item: QueryItem;

  constructor(private querySearchService: QuerySearchService,
              public changeDetectorRef: ChangeDetectorRef) {
  }

  get formFieldAppearance() {
    return this.querySearchService.formFieldAppearance;
  }

  get isString() {
    return (this.item.type && this.item.type.toLowerCase() || 'string') === 'string';
  }

  get isNumber() {
    if(this.disableField == "value-disabled") return false
    return this.item.type && this.item.type.toLowerCase() === 'integer';
  }

  get isBoolean() {
    return this.item.type && this.item.type.toLowerCase() === 'boolean';
  }

  get isDate() {
    return this.item.type && this.item.type.toLowerCase() === 'date';
  }

  get showAutocompleteField() {
    return (this.isBoolean || this.hasValues) && this.disableField != "value-disabled";
  }

  get showPlainValueField() {
    if(this.disableField == "value-disabled") return true;
    return (this.isNumber || this.isString)
    && !this.hasValues && !this.isDate && !this.isBoolean;
  }

  get showDateField() {
    return (this.isDate && !this.hasValues) && this.disableField != "value-disabled";
  }

  valueChanged(value: any) {
    this._item.value = value;
    this.itemChange.emit(this._item);
    this.valueChange.emit(this._item.value);
  }

  public itemUpdated() {
    this.setType();
    this.setOperator();
    this.setHasValues();
    this.setMaxLength();
    if(this.item.parameters && this.autoValueChangeCount == 0) {
      const val = this.item.parameters.find(param => this.item.fieldId == param.paramId);
      const newItem = _.cloneDeep(this.item);
      if(val && this.disableField == 'value-disabled') {
        newItem.value = `#${val.formFieldName}#`
        this._item = newItem;
        this.autoValueChangeCount = 1;
        this.itemChange.emit(this._item)
      }
    }
    this.changeDetectorRef.detectChanges();
    this.updateFields();
  }

  private setType() {
    this.type = this._item.type || 'string';
  }

  private setOperator() {
    const multiValueOperators = [
      'in',
      'not_in',
      'not in'
    ];
    this.operator = this.item.condition.operatorKey;
    this.multi = multiValueOperators.includes(this.operator.toLowerCase());
  }

  private setMaxLength() {
    if (!!this.item && !!this._item.fieldName) {
      this.maxLength = this.querySearchService.getFieldMaxLength(this._item.fieldName);
    }
  }

  private setHasValues() {
    if (!!this._item && !!this._item.fieldName) {
      this.hasValues = this.querySearchService.checkForValues(this._item.fieldName);
    } else {
      this.hasValues = false;
    }

    this.querySearchService.log('SingleFieldComponent - Has Values:', this.hasValues);
  }

  private updateFields() {
    (this.autocompleteFields || []).forEach(field => {
        field.item = this.item;
    });
  }
}
