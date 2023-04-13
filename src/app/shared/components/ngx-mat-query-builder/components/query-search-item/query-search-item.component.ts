import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import {QueryField, QueryItem} from '../../models';
import {QuerySearchService} from '../../query-search.service';
import {Observable} from 'rxjs';
import {DateAdapter} from '@angular/material/core';
import {CustomDateAdapter} from '../../adapters';
import {isBetweenOperator, isNullOperator} from '../../helpers/condition.helper';
import {StackedFieldComponent} from '../fields/stacked-field/stacked-field.component';
import {SingleFieldComponent} from '../fields/single-field/single-field.component';
import * as _ from 'lodash';

@Component({
  selector: 'query-search-item',
  templateUrl: './query-search-item.component.html',
  styleUrls: ['./query-search-item.component.scss'],
  viewProviders: [
    {provide: DateAdapter, useClass: CustomDateAdapter}
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuerySearchItemComponent {
  @Input() readonly: boolean;
  @Input() disableField?: 'parameter-disabled' | 'value-disabled' | undefined;
  @Input() filteredOperators: any[];
  typedOperators = [];
  visibleOperators: any[]
  @Output()
  markChanged = new EventEmitter<QueryItem>();

  @Input()
  set item(newValue: QueryItem) {
    this._item = newValue;
    // this.querySearchService.log('QuerySearchItem - Set Item', newValue);
    // 
    this.loadFieldFromItem();
    if(newValue?.condition?.operatorKey)
    this.doubleHeight = isBetweenOperator(newValue.condition.operatorKey);
    if(this.item.operator) {
      this.loadOperators();
    }
    if(this.item.value) {
      this.itemChange.emit(this._item)
    }
    this.changeDetectorRef.detectChanges();
  }

  get item(): QueryItem {
    return this._item;
  }

  @Input()
  disableDelete = false;

  @Output()
  removed = new EventEmitter<string>();

  @Output()
  itemChange: EventEmitter<QueryItem> = new EventEmitter<QueryItem>();

  @ViewChildren(StackedFieldComponent)
  stackedFields: QueryList<StackedFieldComponent>;

  @ViewChildren(SingleFieldComponent)
  singleFields: QueryList<SingleFieldComponent>;

  @HostBinding('class.double-height')
  doubleHeight = false;

  operators: string[];
  parameters: any[];
  fields: Observable<QueryField[]>;

  private _currentField: QueryField;
  private _item: QueryItem;

  constructor(private querySearchService: QuerySearchService,
              private changeDetectorRef: ChangeDetectorRef,
              private dateAdapter: DateAdapter<any>) {
    this.operators = querySearchService.operators;
    this.fields = querySearchService.fields;
    this.fields.subscribe(res => {
      if(res.length > 0) {
        this.parameters = res[0]['parameterList'];
        this.visibleOperators = res[0]['operators'];
      }
    })
  }

  remove(emit: boolean = true) {
    this.querySearchService.log('QuerySearchItem - Removing Self', this);
    if (emit) {
      this.removed.emit(this.item.id);
    }
  }

  get showValueField(): boolean {
    if (!!this.item) {
      return !!this._item.condition && !isNullOperator(this._item.condition.operatorKey) && !!this._item.fieldName;
    }

    return false;
  }

  get isStackedField() {
    if (!!this.item) {
      return isBetweenOperator(this.item.condition.operatorKey);
    }

    return false;
  }

  get showOperatorField(): boolean {
    if (!!this.item) {
      return !!this.item.fieldName;
    }

    return false;
  }


  get formFieldAppearance() {
    return this.querySearchService.formFieldAppearance;
  }

  get padDividers(): boolean {
    return this.querySearchService.formFieldAppearance !== 'outline';
  }

  get flagType() {
    return this.item.active ? 'flag' : 'outlined_flag';
  }

  get flagTooltip() {
    return this.item.active ? 'Active' : 'Inactive';
  }

  fieldChanged(isNameChange?) {
    if(isNameChange) {
      this.loadOperators()
      this.item.condition = null;
      this.item.value = null;
    } 
    this.markChanged.emit(this._item);
  }

  operatorChange() {
    if(this.item.value && !this.item.value.includes("#")) {
      this.item.value = null;
      this.item = _.cloneDeep(this.item);
    }
    this.markChanged.emit(this._item);
  }

  loadOperators() {
    this.item.parameters = this.parameters;
    const listOperatorsIds = [100,101,106,107] 
    if(this.visibleOperators)
    this.typedOperators = this.visibleOperators.filter(data => {
      return (this.item.type == data.fieldType) || 
      (this.item.type == "List" && listOperatorsIds.includes(data.operatorId));
      // (this.item.type == data.fieldSubtype && data.fieldType == "String");
    });
  }

  private loadFieldFromItem() {
    if (!!this.item && !!this.item.fieldName) {
      this.querySearchService.fields.subscribe(fields => {
        // if(typeof this.item.fieldName == "number")
        // fields = fields.map(field => {
        //   field['name'] = field['parameterList'].find(f => f.paramId == this.item.fieldName).paramDisplayName || "unknown";
        //   return field
        // })
        const field = fields.find(f => f.name === this.item.fieldName);
        // 
        if (!!field) {
        // if (!!field && this._currentField !== field) {
          this._currentField = field;

          this.item.type = field.type;
          this.item.fieldName = field.name;

          this.querySearchService.log('QuerySearchItem - Field Loaded:', field);
          this.updateDateFormat(field.format);
          this.updateFields(false);
        } else {
          // I know I'm using console here, but its for a good reason
          console.warn(`Could not find field with fieldName '${this.item.fieldName}'`, this);
        }
      });
    }
  }

  private updateDateFormat(format: string | undefined) {
    if (!!format) {
      (this.dateAdapter as CustomDateAdapter).setFormat(format);
    }

    this.changeDetectorRef.detectChanges();
  }

  private updateFields(emit: boolean = true) {
    [...(this.singleFields || []), ...(this.stackedFields || [])].forEach(field => {
      if (field.item !== this.item || field.item.fieldName !== this.item.fieldName || field.item.type !== this.item.type) {
        field.item = this.item;
      }

      field.itemUpdated(emit);
    });
  }
}
