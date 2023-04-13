import { MatDialog } from "@angular/material/dialog";
import { RMNotificationComponent } from "./rm-notifications.component";
import { NotificationDialogModel } from "./rm-notifications.model";

export function GenerateDialog(dialog: MatDialog, dialogConfig: NotificationDialogModel) {
    
    return dialog.open<RMNotificationComponent, NotificationDialogModel>(RMNotificationComponent, {
        width: '444px',
        height: '226px',
        autoFocus: false,
        disableClose: dialogConfig.disableClose,
        panelClass: 'notification_overlay',
        data: dialogConfig
      })
} 