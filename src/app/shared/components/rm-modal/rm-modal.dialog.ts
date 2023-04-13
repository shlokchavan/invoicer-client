import { Component, Input, Output, EventEmitter, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
  
@Component ({
    selector: 'rm-modal-dialog',
    templateUrl: './rm-modal.dialog.html',
    styleUrls: ['./rm-modal.dialog.scss']
})

export class RMModalDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<RMModalDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
          // 
        }
    
      onNoClick(returnValue: any): void {
        this.dialogRef.close(returnValue);
      }

      // openDialog(): any {
      //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
      //     width: '620px',
      //     height: '326px',
      //   });
    
      //   dialogRef.afterClosed().subscribe(result => {
      //     
      //   });
      // }
    
}