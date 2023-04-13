import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationDialogModel } from './rm-notifications.model';
// import { ITextConfig } from './dn-form-text.model';

@Component({
  selector: 'rm-notification',
  templateUrl: './rm-notifications.component.html',
  styleUrls: ['./rm-notifications.component.scss'],
})
export class RMNotificationComponent {
  constructor(
    public dialogRef: MatDialogRef<RMNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public notificationModel: NotificationDialogModel
  ) {}

  actionClick(actionCase: any) {
    if (this.notificationModel?.extraOptions) {
      actionCase = {
        primaryAction: actionCase,
        secondaryAction: this.notificationModel.extraOptions?.dataModel!,
      };
    }
    this.dialogRef.close(actionCase);
  }
}
