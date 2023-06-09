import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {QuerySearchService} from '../../../query-search.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {QueryField, QueryItem} from '../../../models';
import {map, startWith, switchMap} from 'rxjs/operators';
import {filterFieldNames, getFieldType} from '../../../helpers/general.helpers';
import * as _ from 'lodash';

@Component({
  selector: 'name-field',
  templateUrl: './name-field.component.html',
  styleUrls: ['./name-field.component.scss']
})
export class NameFieldComponent {

  @Input() readonly: boolean;

  @Input()
  set item(newValue: QueryItem) {
    if (!!newValue) {
      this._item = newValue;
      if (!!this._item.fieldName) {
        this.fieldChanged(this._item.fieldName, false);
      }
    }
  }

  get item() {
    return this._item;
  }

  @Output()
  itemChange: EventEmitter<QueryItem> = new EventEmitter<QueryItem>();

  @Output()
  nameChange: EventEmitter<string> = new EventEmitter<string>();

  allFields: Observable<QueryField[]>;
  visibleFields: Observable<QueryField[]>;
  groupedFields: any[] = []
  searchValue: BehaviorSubject<string> = new BehaviorSubject<string>('');
  nameFieldTrigger: string;

  private _item: QueryItem;

  constructor(private querySearchService: QuerySearchService,
              public changeDetectorRef: ChangeDetectorRef) {
    this.allFields = querySearchService.fields;
    this.visibleFields = this.searchValue.pipe(
      startWith(null),
      switchMap(searchValue => this.allFields.pipe(
        map(fields => filterFieldNames(searchValue, fields))
      ))
    );
    this.visibleFields.subscribe(
      res => {
        if(Array.isArray(res)) {
          const groupedItems = _.groupBy(res,'type');
          const groupedArray = Object.keys(groupedItems).map(key => {
            return {
              group: key,
              items: groupedItems[key]
            }
          });
          this.groupedFields = groupedArray
        }
      }
    );
  }

  get formFieldAppearance() {
    return this.querySearchService.formFieldAppearance;
  }

  searchValueChanged(searchValue: string) {
    this.searchValue.next(searchValue);
  }

  fieldChanged(event: string, emit = true) {
    const field = this.querySearchService.getField(event);

    if (!!field) {
      if (this.item.type !== field.type || this.item.fieldName !== field.name) {
        this.item.value = null;
      }

      this.item.type = field.type;
      this.item.fieldName = field.name;

      if (emit) {
        this.querySearchService.log('NameFieldComponent - Emitting Change:', field);
        this.itemChange.emit(this.item);
        this.nameChange.emit(field.name);
      } else {
        this.querySearchService.log('NameFieldComponent - Not Emitting Change:', field);
      }

      if (this.querySearchService.showFieldNameSuffix) {
        this.nameFieldTrigger = `<span class="field-name">${field.label || field.name}</span>`;
      } else {
        this.nameFieldTrigger = `<span class="field-name">${field.label || field.name}</span>`;
      }

      this.changeDetectorRef.detectChanges();
    }
  }
}
