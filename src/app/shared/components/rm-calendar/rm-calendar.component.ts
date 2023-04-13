import { formatDate } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
  DateAdapter,
} from "@angular/material/core";
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from "@angular/material-moment-adapter";
import * as _moment from "moment";
import { Moment } from "moment";
import { getDaysInAMonth } from "../../utils/calendar";
import { MatDatepicker } from "@angular/material/datepicker";

// const moment = (_moment as any).default ? (_moment as any).default : _moment;
const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: "MM/YYYY",
  },
  display: {
    dateInput: "MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

@Component({
  selector: "rm-calendar",
  templateUrl: "./rm-calendar.component.html",
  styleUrls: ["./rm-calendar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class RMCalendarComponent implements OnInit {
  // Input
  @Input() calendarData: any;
  @Output() onPrevNextClick: EventEmitter<any> = new EventEmitter();
  @Output() onTodayClick: EventEmitter<any> = new EventEmitter();
  @Output() DateClick: EventEmitter<any> = new EventEmitter();
  @ContentChild(TemplateRef) calendarCellRenderer: TemplateRef<any>;

  // Variables
  isDisable: boolean;
  selectedMonth = new Date().getMonth();
  selectedYear = new Date().getFullYear();
  currentDate = this.formateDate(new Date());
  selectedDate: any;
  public date = new FormControl(moment());

  // MOdel
  dateTime: string = "";
  tempYear: number;

  constructor() {}

  ngOnInit(): void {
    

    if (!this.selectedDate) {
      this.selectedDate = this.currentDate;
    }
  }

  ngAfterViewInit() {
    const getCurrentMonth = new Date().getMonth();
    this.setDisableDate(getCurrentMonth);
  }

  setDisableDate(getCurrentMonth) {
    for (let i = 0; i < this.calendarData.length; i++) {
      const element = this.calendarData[i];
      for (let j = 0; j < element.length; j++) {
        const dates = element[j];
        // const getMonth = formatDate(dates._d, "MM", "en-US");
        const getMonth = new Date(dates._d).getMonth();
        if (getMonth !== getCurrentMonth) {
          this.isDisable = true;
        } else {
          this.isDisable = false;
        }
      }
    }
  }

  // Format Date
  formateDate(date: any) {
    return moment(date).format("MM-DD-YYYY");
  }

  getMonth(date: any) {
    return new Date(date).getMonth();
  }

  // on prev next click
  prevClick() {
    this.calendarData = [];
    this.selectedMonth -= 1;
    if (this.selectedMonth < 0) {
      this.selectedYear -= 1;
      this.selectedMonth = 11;
    }
    this.calendarData = getDaysInAMonth(this.selectedYear, this.selectedMonth);
    this.setDisableDate(this.selectedMonth);
    const event = {
      event: "prev",
      month: this.selectedMonth,
      year: this.selectedYear,
      data: this.calendarData
    };
    this.onPrevNextClick.emit(event);
  }
  nextClick() {
    this.calendarData = [];
    this.selectedMonth += 1;
    if (this.selectedMonth > 11) {
      this.selectedYear += 1;
      this.selectedMonth = 0;
    }
    this.calendarData = getDaysInAMonth(this.selectedYear, this.selectedMonth);
    this.setDisableDate(this.selectedMonth);
    const event = {
      event: "next",
      month: this.selectedMonth,
      year: this.selectedYear,
      data: this.calendarData
    };
    

    this.onPrevNextClick.emit(event);
  }

  // on today click
  onTodayDateClick() {
    this.selectedMonth = new Date().getMonth();
    this.selectedYear = new Date().getFullYear();
    this.calendarData = getDaysInAMonth(this.selectedYear, this.selectedMonth);
    this.currentDate = this.formateDate(new Date());
    this.selectedDate = this.currentDate;
    const event = {
      event: "today",
      month: this.selectedMonth,
      year: this.selectedYear,
      data: this.calendarData
    };
    this.onTodayClick.emit(event);
  }

  // on date clicked
  onDateClick(date: any) {
    this.selectedDate = this.formateDate(date);
    this.DateClick.emit(this.selectedDate);

  }

  monthNameByNumber(monthNo: number) {
    switch (monthNo) {
      case 0:
        return "JANUARY";
        break;
      case 1:
        return "FEBRUARY";
        break;
      case 2:
        return "MARCH";
        break;
      case 3:
        return "APRIL";
        break;
      case 4:
        return "MAY";
        break;
      case 5:
        return "JUNE";
        break;
      case 6:
        return "JULY";
        break;
      case 7:
        return "AUGUST";
        break;
      case 8:
        return "SEPTEMBER";
        break;
      case 9:
        return "OCTOBER";
        break;
      case 10:
        return "NOVEMBER";
        break;
      case 11:
        return "DECEMBER";
        break;

      default:
        break;
    }
  }

  chosenYearHandler(normalizedYear: Moment) {
    // const ctrlValue = this.date.value;
    this.tempYear = normalizedYear.year();
    // ctrlValue.year(normalizedYear.year());
    // this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    // const ctrlValue = this.date.value;
    // ctrlValue.month(normalizedMonth.month());
    // this.date.setValue(ctrlValue);
    if (normalizedMonth.month()) {
      this.selectedYear = this.tempYear;
      this.selectedMonth = normalizedMonth.month();
      this.calendarData = getDaysInAMonth(
        this.selectedYear,
        this.selectedMonth
      );
      this.setDisableDate(this.selectedMonth);
      const event = {
        event: "dateChooseFromPicker",
        month: this.selectedMonth,
        year: this.selectedYear,
        data: this.calendarData
      };
      this.onPrevNextClick.emit(event);
    }
    datepicker.close();
  }
}
