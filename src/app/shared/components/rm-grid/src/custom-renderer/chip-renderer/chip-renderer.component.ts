import { ENTER, COMMA } from "@angular/cdk/keycodes";
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { ICellEditorAngularComp } from "ag-grid-angular";
import { ICellRendererParams, RowNode } from "ag-grid-community";
import * as _ from "lodash";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { IResponseSchema } from "src/app/configs/api-config";
import { threadId } from "worker_threads";
import { ChipRendererService } from "./chip-renderer.service";

@Component({
  selector: "chip-renderer",
  templateUrl: "./chip-renderer.component.html",
  styleUrls: ["./chip-renderer.component.scss"],
})
export class ChipRendererComponent implements ICellEditorAngularComp {
  public params: any;
  public node: any;
  readonlyMode!: boolean;
  selectable = true;
  removable = true;
  labelKey!: string | any;
  returnKey!: string | any;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  chipsCtrl: FormControl = new FormControl();
  optionValues: any = [];
  allChips: any = [];
  allValues: any[] = [];

  @ViewChild("chipInput") chipInput!: ElementRef<HTMLInputElement> | any;
  value: any;
  tempAllValues: any;

  constructor(private chipRendererService: ChipRendererService) {
    window.addEventListener("resize", () => {
      this.changeHeight();
    });
  }

  agInit(params: any): void {
    this.params = params;
    this.node = params.node;
    this.value = this.params.value;
    this.readonlyMode = params.readonly;
    if (this.params.value) {
      this.allValues = this.params.getter(this.params.value);
      this.tempAllValues = this.params.getter(this.params.value);
    }
    this.labelKey = params.labelKey;
    this.returnKey = params.returnKey;
    // this.allValues = this.params.value
    // if (params.viewType == "facility") {
    //   this.params.value &&
    //     this.params.value.forEach((element) => {
    //       const auditor = params.users.find(
    //         (row: any) => row.userName == element.userId
    //       );
    //       if (auditor) {
    //         this.allValues.push(` ${auditor.firstName} ${auditor.lastName}`);
    //       } else {
    //         this.allValues.push(" " + element.userId);
    //       }
    //     });
    // } else {
    //   this.params.value &&
    //     this.params.value.forEach((element) => {
    //       this.allValues.push(" " + element.facilityName);
    //     });
    // }

    if (this.readonlyMode != false)
      this.chipRendererService.isEditMode.subscribe((toggle) => {
        this.readonlyMode = toggle == "cancel" || toggle == "save";
        if (toggle == "edit") {
          this.initEditMode();
        } else if (toggle == "save") {
          // this.saveEditedData();
          this.changeHeight();
        } else {
          this.changeHeight();
        }
      });

    // 
    this.chipRendererService.optionsData.subscribe((data) => {
      this.optionValues = data;
    });
  }

  getValue(): any {
    return this.allValues;
    // this.chipRendererService.optionsData.subscribe((data) => {
    //   this.optionValues = data.filter(
    //     (item) => !this.allValues.includes(" " + item)
    //   );
    // });
  }

  onTextInput(event: any) {
    // const elements: any[] = event.path;
    // const requiredHeight = (elements[1] as HTMLElement).offsetHeight;
    // this.node.setRowHeight(requiredHeight ? requiredHeight + 4 : 50);
    // this.params.api.onRowHeightChanged();
  }

  initEditMode() {
    this.allChips = _.cloneDeep(this.allValues);
    this.changeHeight();
  }

  saveEditedData() {
    this.node.setRowHeight(40);
    this.params.api.onRowHeightChanged();
    // this.allValues?.length > 0 &&
    if (this.allChips) {
      // if (this.allChips?.length > 0) {
      // const value = this.allChips.toString();
      this.allValues = _.cloneDeep(this.allChips);
      this.node.setDataValue(
        this.params.colDef.field,
        this.params.setter(this.allChips)
      );
    }
  }

  refresh(params: ICellRendererParams) {}

  checkDisabled(value: any) {
    let isAlreadyAdded = false;
    this.allChips.forEach((chip: any) => {
      if (chip[this.returnKey] == value[this.returnKey]) {
        isAlreadyAdded = true;
      }
    });
    return isAlreadyAdded;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();
    // this.optionValues.forEach((item) => {
    //   if (item == value) {
    //     this.allChips.push(value);
    //     this.optionValues = this.optionValues.filter(
    //       (item: any) => item != value
    //     );
    //   }
    // });
    // Add our chip
    if (value && this.optionValues.includes(value)) {
      this.allChips.push(value);
    }

    // Clear the input value
    this.chipInput.nativeElement.value = "";

    this.chipsCtrl.setValue(null);
    this.changeHeight();
    this.saveEditedData();
  }

  remove(chip: string): void {
    this.allChips = this.allChips.filter(
      (item: any) => item[this.returnKey] != chip[this.returnKey]
    );
    // this.optionValues.push(chip);
    this.changeHeight();
    this.saveEditedData();
  }

  changeHeight() {
    setTimeout(() => {
      if (this.chipInput) {
        const requiredHeight =
          this.chipInput.nativeElement.parentElement.offsetHeight;
        this.node.setRowHeight(requiredHeight < 50 ? 50 : requiredHeight + 8);
        this.params.api.onRowHeightChanged();
      }
    }, 100);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.allChips.push(event.option.value);
    this.chipInput.nativeElement.value = "";
    // this.optionValues = this.optionValues.filter((element) => {
    //   if (element != event.option.value) return element;
    // });
    this.chipsCtrl.setValue(null);

    this.changeHeight();
    this.saveEditedData();
  }

  _filter(): string[] {
    const filterValue = this.chipInput
      ? this.chipInput.nativeElement.value.toLowerCase()
      : "";
    return this.filterByValue(
      this.optionValues.filter((item: any) => !this.checkDisabled(item)),
      filterValue
    );
  }

  filterByValue(array: any, string: any) {
    return array.filter((o: any) =>
      Object.keys(o).some((k) =>
        `${o[k]}`.toLowerCase().includes(string.toLowerCase())
      )
    );
  }
}
