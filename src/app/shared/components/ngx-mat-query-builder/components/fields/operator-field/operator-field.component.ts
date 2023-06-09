import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { QuerySearchService } from "../../../query-search.service";
import { QueryItem } from "../../../models";
import { OperatorPipe } from "../../../pipes/operator.pipe";

@Component({
  selector: "operator-field",
  templateUrl: "./operator-field.component.html",
  styleUrls: ["./operator-field.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
})
export class OperatorFieldComponent {
  @Input() readonly: boolean;
  @Input() disableField?: 'parameter-disabled' | 'value-disabled' | undefined;
  @Input()
  set item(newValue: QueryItem) {
    if (!!newValue) {
      this._item = newValue;
      if (!!this._item.condition) {
        this.fieldChanged(this._item.condition, false);
      }
    }
  }

  get item() {
    return this._item;
  }

  @Output()
  itemChange: EventEmitter<QueryItem> = new EventEmitter<QueryItem>();

  @Output()
  operatorChange: EventEmitter<string> = new EventEmitter<string>();

  operatorFieldTrigger: string;
  operators: string[];
  @Input() filteredOperators: any[];
  operatorStyle = `
  position: absolute;
   right: 1em;
   color: gray
   `;

  private _item: QueryItem;

  constructor(
    private querySearchService: QuerySearchService,
    private operatorPipe: OperatorPipe
  ) {
    // this.operators = this.querySearchService.operators;
    // this.operators = this.operatorList;
    // this.filteredOperators = this.operators;
  }

  
  fieldChanged(event: string, emit = true) {
    if (emit) {
      this.itemChange.emit(this.item);
    }

    this.querySearchService.log("Operator Field Changed", event);

    const displayOperator = this.operatorPipe.transform(event);
    const displaySignOperator = this.operatorPipe.transform(event, true);

    if (this.querySearchService.showOperatorSuffix) {
      this.operatorFieldTrigger = `
        <span class="field-name">${displayOperator}</span>
    `;
    } else {
      this.operatorFieldTrigger = `
        <span class="field-name">${displayOperator}</span>
    `;
    }

    if (emit) {
      this.operatorChange.emit(event);
    }
  }

  attributeDisplay(attribute1,attribute2){
    if (attribute1?.operatorId == attribute2?.operatorId) {
      return attribute1.operatorKey;
    } else {
      return "";
    }
  }

  searchValueChanged(searchValue: string) {
    if (!!searchValue && searchValue.trim().length > 0) {
      this.filteredOperators = this.operators.filter((o) =>
        this.operatorPipe.transform(o)?.toLowerCase().includes(searchValue)
      );
    } else {
      this.filteredOperators = this.operators;
    }
  }

  get padDividers(): boolean {
    return this.querySearchService.formFieldAppearance !== "outline";
  }

  get formFieldAppearance() {
    return this.querySearchService.formFieldAppearance;
  }
}
