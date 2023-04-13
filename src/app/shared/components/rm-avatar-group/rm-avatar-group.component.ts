import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import * as _ from "lodash";

@Component({
  selector: "rm-avatar-group",
  templateUrl: "./rm-avatar-group.component.html",
  styleUrls: ["./rm-avatar-group.component.scss"],
})
export class RMAvatarGroupComponent implements OnInit {
  //Params
  @Input() rowData!: any[];
  @Input() showImg?: boolean;
  showMore!: boolean;
  tempRowData: any;
  showMoreCount: number | any = 5;
  rowDataIsLess!: boolean;

  @Output() onMoreClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  setShowMore(isShowMore: boolean) {
    this.showMore = isShowMore;
    this.rowData = isShowMore
      ? _.cloneDeep(this.tempRowData) // All Records
      : _.cloneDeep(this.tempRowData).splice(0, this.showMoreCount); //Filtered Records
  }

  get diffCount() {
    if (this.tempRowData && this.tempRowData.length > 0) {
      // Handle Negative Count
      this.rowDataIsLess = this.tempRowData.length < this.showMoreCount;
      //
      return Number(this.tempRowData.length) - Number(this.showMoreCount);
    }
    return
  }

  actionEvent() {
    this.onMoreClick.emit();
  }

  ngOnInit() {
    this.tempRowData = _.cloneDeep(this.rowData);
    if (this.rowData && this.rowData.length > 0) this.setShowMore(false);
  }
}
