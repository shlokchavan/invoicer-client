export class RMAdvanceSchedulerModel {
  everyXHours: string | number;
  everyXDays: string | number;
  everyXMonths: string | number;
  onWeekdays: boolean;
  onFirstDayOfMonth: boolean;
  scheduleRecurrence: string;
  scheduleWeeklyRecurrence: any = 1;
  scheduleRecurrenceMonth: any = 1;
  scheduleType: number; // 1: Scheduled - 0: RealTime
  jobFrequency: string = 'daily';
  timeZone: string;
  startDate: any;
  endDate: any;
  endType: any = 'end-by';
}
