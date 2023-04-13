import { E } from "@angular/cdk/keycodes";
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import * as _ from "lodash";
import * as moment from "moment";

@Component({
  selector: "rm-timeline",
  templateUrl: "./rm-timeline.component.html",
  styleUrls: ["./rm-timeline.component.scss"],
})
export class RmTimelineComponent implements OnInit, AfterViewInit {
  // Input variable
  @Input() timelineData: any[];
  @Output() onBtnClick: EventEmitter<any> = new EventEmitter();
  keys: any;

  constructor() {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngOnChanges() {
    if (this.timelineData) {
      this.keys = Object.keys(this.timelineData);
    }
  }

  filteredTimeLineData(key?: any) {
    return this.timelineData[key];
  }

  statusChip(status) {
    let chipClass;
    switch (status) {
      case "In Progress":
        chipClass = "yellowTheme";
        break;
      case "Error":
        chipClass = "redTheme";
        break;
      case "Completed":
        chipClass = "greenTheme";
        break;
      default:
        chipClass = "defaultTheme";
        break;
    }
    return chipClass;
  }

  durationCalculator(startDate, endDate) {
    let a = moment(startDate);
    let b = moment(endDate);
    let z = b.diff(a, "seconds");
    let seconds = Number(z);
    let d = Math.floor(seconds / (3600 * 24));
    let h = Math.floor((seconds % (3600 * 24)) / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = Math.floor(seconds % 60);
    if (d >= 0 && h >= 0 && m >= 0 && s >= 0) {
      return `${d}D ${h}H ${m}M ${s}S`;
    } else {
      return "----";
    }
  }

  hasValue(obj, key, value) {
    if (obj.hasOwnProperty(key) && obj[key] === value) {
      return value;
    }
  }

  statusChecker(item: any, status) {
    let data = this.timelineData[item].map((obj: any) => obj.eventStatus);
    return data.includes(status);
  }
  completedStatusChecker(item: any, status: any) {
    let data = this.timelineData[item].map((obj: any) => obj.eventStatus);
    return data.every((val: any, index: number, arr) => val === status);
  }

  formateDate(date: any, formateString) {
    return moment(date).format(formateString);
  }

  downloadData(data: any) {
    this.onBtnClick.emit(data);
  }
}
