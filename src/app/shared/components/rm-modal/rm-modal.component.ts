import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { IRMModalConfig, IRMModalFooterConfigAction } from "./rm-modal.model";

@Component({
  selector: "rm-modal",
  templateUrl: "./rm-modal.dialog.html",
  styleUrls: ["./rm-modal.dialog.scss"],
})
export class RMModalComponent implements OnInit {
  // Parameters
  @Input() config!: IRMModalConfig;
  @ViewChild("content") content!: TemplateRef<any>;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Output() onActionClick: EventEmitter<any> = new EventEmitter();
  @Output() afterClosed: EventEmitter<any> = new EventEmitter();

  //Variables
  dialogRef!: MatDialogRef<any>;

  //Temp

  constructor(private dialog: MatDialog) {
    // Initialize Default Properties
  }

  clickBtn(button: any) {
    this.onClick.emit(button);
  }

  ngOnInit() {}

  openDialog(): any {
    let modalWidth = "620px";
    let modalHeight = "326px";

    if (this.config.size == "sm") {
      modalWidth = "300px";
      modalHeight = "262px";
    } else if (this.config.size == "md") {
      modalWidth = "500px";
      modalHeight = "358px";
    } else if (this.config.size == "lg") {
      modalWidth = "800px";
      modalHeight = "550px";
    } else if (this.config.size == "xl") {
      modalWidth = "1140px";
      modalHeight = "550px";
    } else if (this.config.size == "xxl") {
      modalWidth = "1440px";
      modalHeight = "550px";
    } else if (this.config.size == "full") {
      modalWidth = "100vw";
      modalHeight = "100vh";
    }

    this.dialogRef = this.dialog.open(this.content, {
      // minWidth: this.config.size == "full" ? modalWidth : "auto",
      // width: this.config.size == "full" ? "auto" : modalWidth,
      // height: modalHeight,
      width: this.config.width || modalWidth,
      height: this.config.height || modalHeight,
      autoFocus: this.config.autoFocus,
      disableClose: this.config.disableClose,
      panelClass: "rm-modal",
      data: {
        config: null,
        content: this.content.elementRef.nativeElement,
      },
    });
    this.dialogRef.afterClosed().subscribe((result) => {
      this.afterClosed.emit()
      switch (result) {
        default:
          break;
      }
    });
  }

  actionBtnClick(actionEvent: IRMModalFooterConfigAction) {
    switch (actionEvent.methodCallback) {
      case 'close': 
        this.closeModal()
        break;
      default:
        this.onActionClick.emit(actionEvent)
        break;
    }
  }

  closeModal() {
    this.dialogRef.close()
  }

  expandToggle() {}
}
