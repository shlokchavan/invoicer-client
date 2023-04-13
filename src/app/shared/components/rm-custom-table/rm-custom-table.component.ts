import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import * as _ from "lodash";
import { IRMCustomTable } from "./rm-custom-table.model";

@Component({
  selector: "rm-custom-table",
  templateUrl: "./rm-custom-table.component.html",
  styleUrls: ["./rm-custom-table.component.scss"],
})
export class RMCustomTableComponent {
  @Input() rowData: any[];
  @Input() config: IRMCustomTable;
  @Input() isEditable: boolean;
  @Output() onShowMoreClick: EventEmitter<any> = new EventEmitter();
  @Output() onEditClick: EventEmitter<any> = new EventEmitter();

  // Variables
  tempRowData: any[];
  showMore: boolean;
  rowDataIsLess: boolean;

  constructor() {}

  setShowMore(isShowMore: boolean) {
    if (this.config && this.config.showMoreCount) {
      this.showMore = isShowMore;
      this.rowData = isShowMore
        ? _.cloneDeep(this.tempRowData) // All Records
        : _.cloneDeep(this.tempRowData).splice(0, this.config.showMoreCount); //Filtered Records
    }
  }

  get diffCount() {
    if (this.tempRowData && this.tempRowData.length > 0) {
      // Handle Negative Count
      this.rowDataIsLess = this.tempRowData.length < this.config.showMoreCount;
      //
      return (
        Number(this.tempRowData.length) - Number(this.config.showMoreCount)
      );
    }
  }

  sumOfField(field: string) {
    if (this.tempRowData && this.tempRowData.length > 0) {
      return this.tempRowData
        .map((row: any) => row[field])
        .reduce((sum, value) => sum + value);
    }
    return 0;
  }

  // Events
  moreClick(data: any) {
    const event = {
      type: "more",
      data: data,
    };
    this.onShowMoreClick.emit(event);
  }

  editClick() {
    const event = {
      type: "edit",
    };
    this.onEditClick.emit(event);
  }

  ngOnInit(): void {
    this.tempRowData = _.cloneDeep(this.rowData);
    if (
      this.rowData &&
      this.rowData.length > 0 &&
      this.config &&
      this.config.showMoreCount
    )
      this.setShowMore(false);
  }
}
