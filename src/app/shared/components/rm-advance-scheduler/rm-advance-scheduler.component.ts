import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IResponseSchema } from "src/app/configs/api-config";
import { TimeZoneService } from "../../_http/timezone.service";
import { _SchedulerConfig } from "./config/rm-advance-scheduler.config";
import { RMAdvanceSchedulerModel } from "./model/rm-advance-scheduler.model";

@Component({
  selector: "rm-advance-scheduler",
  templateUrl: "./rm-advance-scheduler.component.html",
  styleUrls: ["./rm-advance-scheduler.component.scss"],
})
export class RMAdvanceSchedulerComponent implements OnInit {
  //Params
  @Input() cronJobExp: string;
  @Output() onCronJobExpChange: EventEmitter<any> = new EventEmitter();

  @Input() dataModel: RMAdvanceSchedulerModel;

  // Variables
  baseConfig = new _SchedulerConfig();
  week = this.baseConfig.week;
  workingDays = this.baseConfig.workingDays;

  // Time (Variables)
  hour: number = 1;
  minute: number = 0;
  isPm: boolean; // False: AM | True: PM

  // Config
  schedulerConfig = {
    // Scheduler
    jobFrequency: this.baseConfig.jobFrequency,
    timeZone: this.baseConfig.timeZone,
    startDate: this.baseConfig.startDateConfig,
    endDate: this.baseConfig.endDateConfig,
    endType: this.baseConfig.endType,
    scheduleRecurrence: this.baseConfig.scheduleRecurrence,
    scheduleRecurrenceMonToFri: this.baseConfig.scheduleRecurrenceMonToFri,
    scheduleRecurrenceQuaterly: this.baseConfig.scheduleRecurrenceQuaterly,
    recurrenceDate: this.baseConfig.recurrenceDateConfig,
    everyXMinutes: this.baseConfig.everyXMinutes,
    everyXHours: this.baseConfig.everyXHours,
    everyXDays: this.baseConfig.everyXDays,
    everyXMonths: this.baseConfig.everyXMonths,
  };
  constructor( private timeZoneService: TimeZoneService) {
    // Set Hours Data
    for (let index = 1; index <= 24; index++) {
      this.schedulerConfig.everyXHours.options.push({
        name: index,
        value: index,
      });
    }
    // Set Days Data
    for (let index = 1; index < 32; index++) {
      this.schedulerConfig.everyXDays.options.push({
        name: index,
        value: index,
      });
    }
    // Set Days Data
    for (let index = 1; index < 13; index++) {
      this.schedulerConfig.everyXMonths.options.push({
        name: index,
        value: index,
      });
    }

    this.dataModel = new RMAdvanceSchedulerModel();
    this.dataModel.scheduleRecurrence = "";
    this.dataModel.scheduleType = 1;
  }

  ngOnInit() {
    this.getAllTimeZones()
    if (this.cronJobExp) {
      const cronUnitArray = this.cronJobExp.split(" ");
      const seconds = cronUnitArray[0]; // Seconds Unit
      const miuntes = cronUnitArray[1]; // Minute Unit
      const hours = cronUnitArray[2]; // Hour Unit
      const dayOfMonth = cronUnitArray[3]; // DayOfMonth Unit
      const month = cronUnitArray[4]; // month Unit
      const dayOfWeek = cronUnitArray[5]; // DayOfWeek Unit
      // Handle Minutes
      this.minute = parseInt(miuntes);
      // Handle Hours
      if (hours.includes("/")) {
        this.dataModel.scheduleRecurrence = "hourly";
        const hoursPart = hours.split("/");
        let startHour = parseInt(hoursPart[0]);
        const everyXHour = parseInt(hoursPart[1]);
        this.hour = startHour >= 12 ? startHour - 12 : startHour;
        this.dataModel.everyXHours = everyXHour;
      } else {
        let startHour = parseInt(hours);
        this.hour = startHour >= 12 ? startHour - 12 : startHour;
      }
      // Handle DayOfMonth
      if (dayOfMonth.includes("/")) {
        this.dataModel.scheduleRecurrence = "daily";
        this.dataModel.onWeekdays = false;
        this.dataModel.everyXDays = parseInt(dayOfMonth.split("/")[1]);
      }
      // Handle Month
      if (month.includes("/")) {
        this.dataModel.scheduleRecurrence = "monthly";
        this.dataModel.everyXMonths = parseInt(month.split("/")[1]);
        if (dayOfMonth == "1") this.dataModel.onFirstDayOfMonth = true;
        else this.dataModel.onFirstDayOfMonth = false;
      }
      // Handle dayOfWeek
      if (dayOfWeek == "1-5") {
        this.dataModel.scheduleRecurrence = "daily";
        this.dataModel.onWeekdays = true;
      } else if (dayOfWeek != "*") {
        this.dataModel.scheduleRecurrence = "weekly";
        this.week.forEach((item) => {
          if (dayOfWeek.includes(`${item.value}`)) item.isChecked = true;
        });
      }
    }
  }

  padZero(num: number) {
    return num < 9 ? `0${num}` : `${num}`;
  }

  onDateChange(dateType,event) {
    // 
    if (dateType == "start-date") {
      this.schedulerConfig.endDate.attributes.minDate = event
      this.schedulerConfig.endDate.attributes.disable = false
    } else {
      setTimeout(() => {
        const event = {
          cronString: this.createCronExp(),
          data: this.dataModel,
          allFieldValid: this.dataModel.jobFrequency && this.dataModel.timeZone && this.dataModel.startDate && this.dataModel.endDate && this.dataModel.endType ? true : false
        }
        this.onCronJobExpChange.emit(event);
      }, 100);
      
    }
    
    // this.schedulerConfig.endDate.attributes.readonly = false
  }

  onRecurrencTypeChange(event: any) {
    switch (event.value) {
      case "hourly":
        // 
        this.dataModel.everyXHours = 1;
        this.dataModel.everyXMonths = null;
        this.dataModel.everyXDays = null;
        break;
      case "daily":
        this.dataModel.everyXHours = null;
        this.dataModel.everyXMonths = null;
        this.dataModel.everyXDays = 1;
        this.dataModel.onWeekdays = false;
        break;
      case "weekly":
        this.week[0].isChecked = true;
        this.dataModel.everyXHours = null;
        this.dataModel.everyXDays = null;
        this.dataModel.everyXMonths = null;
        break;
      case "monthly":
        this.dataModel.everyXHours = null;
        this.dataModel.everyXDays = null;
        this.dataModel.everyXMonths = 1;
        this.dataModel.onFirstDayOfMonth = true;
        break;

      default:
        break;
    }
    this.updateCronString();
  }

  onDailyRecurrencTypeChange(event: any) {
    
  }

  onWeeklyRecurrencTypeChange(event: any) {
    
  }

  onQuaterlyRecurrencTypeChange(event: any) {
    
  }

  onTimeZoneChange(event: any) {
    
  }

  onEndTypeChange(event: any) {
    
  }

  get cronDayOfMonthUnit() {
    if (this.dataModel.scheduleRecurrence == "daily") {
      if (this.dataModel.onWeekdays) {
        return "*";
      } else return `*/${this.dataModel.everyXDays}`;
    } else if (this.dataModel.scheduleRecurrence == "monthly") {
      if (this.dataModel.onFirstDayOfMonth) return `1`;
      else return `L`;
    } else {
      return "*";
    }
  }

  get cronMonthUnit() {
    if (this.dataModel.scheduleRecurrence == "monthly") {
      return `*/${this.dataModel.everyXMonths}`;
    } else {
      return "*";
    }
  }

  get cronDayOfWeekUnit() {
    if (this.dataModel.scheduleRecurrence == "daily") {
      if (this.dataModel.onWeekdays) {
        return `1-5`;
      } else {
        return "*";
      }
    } else if (this.dataModel.scheduleRecurrence == "weekly") {
      var weekStringArrary = [];
      this.week.map((item, index) => {
        if (item.isChecked) {
          weekStringArrary.push(item.value);
        }
      });
      const weekString =
        weekStringArrary.length > 0 ? weekStringArrary.toString() : "*";
      return weekString;
    } else {
      return "*";
    }
  }

  createCronExp() {
    const seconds = 0;
    let minute = this.minute;
    let tempHour: number | string;
    if (this.isPm) {
      // 12 - 23
      tempHour = this.hour + 12;
      if (this.hour == 12) {
        // Can only be 12:00 PM
        tempHour = 12;
      }
    } else {
      // 0 - 11 (AM)
      tempHour = this.hour;
      if (this.hour == 12) {
        // Can only be 0 AM
        tempHour = 0;
      }
    }
    let hour =
      this.dataModel.scheduleRecurrence == "hourly"
        ? `${tempHour}/${this.dataModel.everyXHours}`
        : `${tempHour}`;
    let dayOfMonth = this.cronDayOfMonthUnit;
    let month = this.cronMonthUnit;
    let dayOfWeek = this.cronDayOfWeekUnit;
    const expString = `${seconds} ${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
    return expString;
  }

  updateCronString() {
    setTimeout(() => {
      let cronString: string = this.createCronExp();
      // 
      const event = {
        cronString: cronString,
        data: this.dataModel,
        allFieldValid: this.dataModel.jobFrequency && this.dataModel.timeZone && this.dataModel.startDate && this.dataModel.endDate && this.dataModel.endType ? true : false
      }
      if (event.allFieldValid) {
        this.onCronJobExpChange.emit(event);  
      }
      
    }, 100);
  }

  selectionChange(type: string, event: any) {
    let cronString: string = this.createCronExp();
    // switch (type) {
    //   // Scheduler
    //   case "recurrence":
    //     if (event == "daily") {
    //       this.dataModel.onWeekdays = false;
    //     }
    //     break;
    //   case "hour":
    //     cronString = `0 ${this.minute} ${this.hour}/${this.dataModel.everyXHours} 1/1 * ? *`;
    //     
    //     break;
    //   case "daily":
    //     if (this.dataModel.onWeekdays) {
    //       cronString = `0 ${this.minute} ${this.hour} ? * ${this.workingDays} *`;
    //     } else {
    //       cronString = `0 ${this.minute} ${this.hour} 1/${this.dataModel.everyXDays} * ? *`;
    //     }
    //     break;
    //   case "weekly":
    //     var weekString = "";
    //     this.week.map((item) => {
    //       if (item.isChecked) {
    //         weekString += item.value + ",";
    //       }
    //     });
    //     var lastCommaOccurence = weekString.lastIndexOf(
    //       ",",
    //       weekString.length - 1
    //     );
    //     lastCommaOccurence !== -1
    //       ? (weekString = weekString.slice(0, lastCommaOccurence))
    //       : weekString;
    //     weekString += " *";
    //     cronString = `0 0 ${this.dataModel.everyXHours} ? * ${weekString}`;
    //     
    //     break;

    //   case "monthly":
    //     cronString = `0 ${this.minute} ${this.hour} ${
    //       this.dataModel.onFirstDayOfMonth ? 1 : 31
    //     } ${this.dataModel.everyXMonths} ?`;
    //     
    //     break;
    //   default:
    //     break;
    // }

    // this.onCronJobExpChange.emit(cronString);
    this.updateCronString();
  }

  // Timer Events
  updateTime(type: string, increament: boolean) {
    switch (type) {
      case "hour":
        if (increament) {
          if (this.hour < 11) {
            this.hour += 1;
          }
        } else {
          if (this.hour > 0) {
            this.hour -= 1;
          }
        }
        break;
      case "minute":
        if (increament) {
          if (this.minute < 59) {
            this.minute += 1;
          }
        } else {
          if (this.minute > 0) {
            this.minute -= 1;
          }
        }
        break;
      default:
        break;
    }
    this.updateCronString();
  }

  updateTimeCheck(type) {
    setTimeout(() => {
      if (type == "minute") {
        if (this.minute > 59) {
          this.minute = 59;
        } else if (this.minute < 0) {
          this.minute = 0;
        }
      } else {
        if (this.hour >= 12) {
          this.hour = 12;
        } else if (this.hour < 1) {
          this.hour = 1;
        }
      }
      this.updateCronString();
    }, 100);
  }

  onJobFrequencyChange(event: any) {

  }

  getAllTimeZones() {
    this.timeZoneService.getAllTimeZones().subscribe(
      (res: IResponseSchema) => {
        if (res.data) {
          this.baseConfig.timeZone.options = res.data.map((row: any) => {
            return {
              ...row,
              name: `(${row.offset}) ${row.description}`
            }
          })
        }
      }
    )
  }
}
