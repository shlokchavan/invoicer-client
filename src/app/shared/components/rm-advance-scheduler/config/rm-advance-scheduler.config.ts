import { ITextConfig } from "../../rm-input/rm-input.model";
import { ISelectConfig } from "../../rm-select-box/rm-select-box.model";

export class _SchedulerConfig {
  week = [
    {
      label: "Monday",
      value: 1,
      isChecked: false,
    },
    {
      label: "Tuesday",
      value: 2,
      isChecked: false,
    },
    {
      label: "Wednesday",
      value: 3,
      isChecked: false,
    },
    {
      label: "Thursday",
      value: 4,
      isChecked: false,
    },
    {
      label: "Friday",
      value: 5,
      isChecked: false,
    },
    {
      label: "Saturday",
      value: 6,
      isChecked: false,
    },
    {
      label: "Sunday",
      value: 7,
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
      { name: "Weekdays only", value: "weekdays-only" },
      { name: "Daily", value: "daily" },
    ],
    attributes: {
      label: "Recurrence On",
      isMandatory: true,
      disable: false,
    },
  };

  // Schedule Recurrence
  scheduleRecurrenceMonToFri: ISelectConfig = {
    fieldKey: "scheduleWeeklyRecurrence",
    dataKey: "label",
    returnKey: "value",
    options: [
      {
        label: "Monday",
        value: 1,
      },
      {
        label: "Tuesday",
        value: 2,
      },
      {
        label: "Wednesday",
        value: 3,
      },
      {
        label: "Thursday",
        value: 4,
      },
      {
        label: "Friday",
        value: 5,
      },
      {
        label: "Saturday",
        value: 6,
      },
      {
        label: "Sunday",
        value: 7,
      },
    ],
    attributes: {
      label: "Recurrence On Every",
      isMandatory: true,
      disable: false,
    },
  };

  scheduleRecurrenceQuaterly: ISelectConfig = {
    fieldKey: "scheduleRecurrenceMonth",
    dataKey: "name",
    returnKey: "value",
    options: [
      { name: "1st Month", value: "first-month" },
      { name: "2nd Month", value: "second-month" },
      { name: "3rd Month", value: "third-month" },
    ],
    attributes: {
      label: "of Month",
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

  // Job Frequency
  jobFrequency: ISelectConfig = {
    fieldKey: "jobFrequency",
    attributes: {
      label: "Job Frequency",
      isMandatory: true,
    },
    dataKey: "label",
    returnKey: "value",
    options: [
      {
        label: "Daily",
        value: "daily"
      },
      {
        label: "Weekly",
        value: "weekly"
      },
      {
        label: "Monthly",
        value: "monthly"
      },
      {
        label: "Quaterly",
        value: "quaterly"
      },
    ],
  };

  // Time Zone
  timeZone: ISelectConfig = {
    fieldKey: "timeZone",
    attributes: {
      label: "Time Zone",
      isMandatory: true,
    },
    dataKey: "name",
    returnKey: "timezoneId",
    options: [],
  };


  // Start date
  startDateConfig: ITextConfig = {
    fieldKey: "startDate",
    attributes: {
      label: "Start Date",
      type: "datepicker",
    },
    pickerConfig: {
      selectMode: "single",
    },
  };

  // End Date
  endDateConfig: ITextConfig = {
    fieldKey: "endDate",
    attributes: {
      label: "End Date",
      type: "datepicker",
      disable: true,
      // readonly: true,
    },
    pickerConfig: {
      selectMode: "single",
    },
  };

  // End Date
  recurrenceDateConfig: ITextConfig = {
    fieldKey: "scheduleRecurrenceMonth",
    attributes: {
      label: "Recurrence on date of Every Month",
    },
  };

  // End Type
  endType: ISelectConfig = {
    fieldKey: "endType",
    attributes: {
      label: "End Type",
      isMandatory: true,
    },
    dataKey: "label",
    returnKey: "value",
    options: [
      {
        label: "End by",
        value: "end-by",
      },
      {
        label: "End after",
        value: "end-after",
      },
    ],
  };
}
