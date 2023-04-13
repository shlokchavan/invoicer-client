import { ISelectConfig } from "../../rm-select-box/rm-select-box.model";

export class _SchedulerConfig {
  week = [
    {
      label: "Monday",
      value: 1,
      secondaryValue: "MON",
      isChecked: false,
    },
    {
      label: "Tuesday",
      value: 2,
      secondaryValue: "TUE",
      isChecked: false,
    },
    {
      label: "Wednesday",
      value: 3,
      secondaryValue: "WED",
      isChecked: false,
    },
    {
      label: "Thursday",
      value: 4,
      secondaryValue: "THU",
      isChecked: false,
    },
    {
      label: "Friday",
      value: 5,
      secondaryValue: "FRI",
      isChecked: false,
    },
    {
      label: "Saturday",
      value: 6,
      secondaryValue: "SAT",
      isChecked: false,
    },
    {
      label: "Sunday",
      value: 7,
      secondaryValue: "SUN",
      isChecked: false,
    },
  ];
  workingDays = "MON-FRI";
  // Schedule Recurrence
  scheduleRecurrence: ISelectConfig = {
    fieldKey: "scheduleRecurrence",
    dataKey: "name",
    returnKey: "value",
    options: [
      { name: "Hourly", value: "hourly" },
      { name: "Daily", value: "daily" },
      { name: "Weekly", value: "weekly" },
      { name: "Monthly", value: "monthly" },
    ],
    attributes: {
      label: "Select Recurrence",
      isMandatory: true,
      disable: false,
    },
  };
  // RecurHourly
  everyXMinutes: ISelectConfig = {
    fieldKey: "everyXMinutes",
    dataKey: "name",
    returnKey: "value",
    options: [],
    attributes: {
      isMandatory: false,
      disable: false,
    },
  };
  everyXHours: ISelectConfig = {
    fieldKey: "everyXHours",
    dataKey: "name",
    returnKey: "value",
    options: [],
    attributes: {
      isMandatory: false,
      disable: false,
    },
  };
  // Recur Daily
  everyXDays: ISelectConfig = {
    fieldKey: "everyXDays",
    dataKey: "name",
    returnKey: "value",
    options: [],
    attributes: {
      isMandatory: false,
      disable: false,
    },
  };
  // Recur Daily
  everyXMonths: ISelectConfig = {
    fieldKey: "everyXMonths",
    dataKey: "name",
    returnKey: "value",
    options: [],
    attributes: {
      isMandatory: false,
      disable: false,
    },
  };
}
