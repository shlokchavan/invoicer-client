export class RMSchedulerModel {
  everyXHours: string | number;
  everyXDays: string | number;
  everyXMonths: string | number;
  onWeekdays: boolean;
  onFirstDayOfMonth: boolean;
  scheduleRecurrence: string;
  scheduleType: number; // 1: Scheduled - 0: RealTime
}
