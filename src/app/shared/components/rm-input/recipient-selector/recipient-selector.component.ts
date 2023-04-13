import {
  Component,
  Input,
  Output,
  EventEmitter,
  Self,
  Optional,
  OnChanges,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { ControlValueAccessor, NgControl, Validators } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import * as _ from "lodash";
import { ITextConfig } from "../rm-input.model";

@Component({
  selector: "recipient-selector",
  templateUrl: "./recipient-selector.component.html",
  styleUrls: ["./recipient-selector.component.scss"],
})
export class RMRecipientSelectorComponent implements OnChanges, AfterViewInit {
  @Input() config!: ITextConfig;
  @Input() dataModel!: any;
  @Output() onBlur: EventEmitter<any> = new EventEmitter();
  @Output() onSelectionChange: EventEmitter<any> = new EventEmitter();
  public data!: string;
  public searchedText!: string;
  disabled!: boolean;
  @ViewChild("input") input!: ElementRef<HTMLInputElement>;

  // Autocomplete Related
  filterUserGroups!: any[];
  tempList: any[] = [];

  constructor() {}

  ngAfterViewInit() {}

  ngOnChanges() {
    if (this.config.attributes.autoCompleteOptions)
      // this.filterUserGroups = _.cloneDeep(this.config.attributes.autoCompleteOptions)
      setInterval(() => {
        this.tempList = _.cloneDeep(this.config.attributes.autoCompleteOptions) || [];
      }, 100);
  }

  checkIsInclude(item: any) {
    let isIncludes = false;
    (this.dataModel[this.config.fieldKey] as any[]).forEach((recipient) => {
      if (item.id == recipient.id && item.type == recipient.type)
        isIncludes = true;
    });
    return isIncludes;
  }

  onAutocompleteInput(event: any) {
    this.filterUserGroups = this.filterAutoComplete(event.target.value);
  }

  filterAutoComplete(value: string): any[] {
    const filterValue = value.toLowerCase();
    if (value != "")
      return this.tempList.filter((data) =>
        data.name.toLowerCase().includes(filterValue)
      );
    else return [];
  }

  selectUserGroup(event: MatAutocompleteSelectedEvent): void {
    if (!this.dataModel[this.config.fieldKey])
      this.dataModel[this.config.fieldKey] = [];
    (this.dataModel[this.config.fieldKey] as any[]).push(event.option.value);
    this.searchedText = "";
    this.input.nativeElement.value = "";
    this.filterUserGroups = [];
    // 
    this.onSelectionChange.emit(this.dataModel[this.config.fieldKey]);
  }

  removeUserGroup(item: any): void {
    const index = this.dataModel[this.config.fieldKey]?.indexOf(item);

    if (index >= 0) {
      this.dataModel[this.config.fieldKey].splice(index, 1);
    }
    this.onSelectionChange.emit(this.dataModel[this.config.fieldKey]);
  }
}
