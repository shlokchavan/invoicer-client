import { HttpEventType } from "@angular/common/http";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { formatBytes } from "../../../utils/fileSize-converter";
import { GenerateDialog } from "../../rm-notifications/dialog-method.util";
import { NotificationDialogModel } from "../../rm-notifications/rm-notifications.model";
import { RMAttachmentFile } from "./rm-file-uploader.model";
import { RMFileUploaderService } from "./rm-file-uploader.service";

@Component({
  selector: "rm-file-uploader",
  templateUrl: "./rm-file-uploader.component.html",
  styleUrls: ["./rm-file-uploader.component.scss"],
  providers: [RMFileUploaderService],
})
export class RMFileUploaderComponent implements OnInit {
  // Parameters
  @Input() Allowedfiles: any = "";
  @Input() MultipleUpload: boolean;
  @Input() showDownloadButton?: boolean;
  @Input() FilesNumberLimit: number;
  @Input() FilesSizeLimit: number; // in bytes
  @Input() fileList: RMAttachmentFile[] | any[] = [];
  @Input() uploadAPIEndPoint!: string;
  @Output() fileListChange: EventEmitter<RMAttachmentFile[]> =
    new EventEmitter();

  //Variables
  @ViewChild("fileSelector") fileSelector!: ElementRef;
  //Temp

  constructor(
    private changeDetector: ChangeDetectorRef,
    private uploaderService: RMFileUploaderService,
    public dialog: MatDialog
  ) {
    // Initialize Default Properties
    this.MultipleUpload = false;
    this.FilesNumberLimit = 1;
    // this.FilesSizeLimit = 524288000000; // ...Bytes = 5 MB
    this.FilesSizeLimit = 5242880; // ...Bytes = 5 MB
    // this.FilesSizeLimit = 5242880; // ...Bytes = 5 MB
  }

  ngOnInit() {}

  download(data: any) {
    var link = document.createElement("a");
    link.setAttribute("download", data.fileName);
    link.href = data.fileSource;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  fileChangeEvent(e: any) {
    console.log(e);
    
    let selectedFileList: File[] = [];
    Object.keys(e).forEach((key) => {
      if (key != "length") {
        selectedFileList.push(e[key]);
      }
    });

    const changedFileList: RMAttachmentFile[] | any[] = selectedFileList
      .map((value) => {
        return {
          fileId: null,
          fileDetails: value,
          isUploaded: false,
          uploadingPercentage: null,
          fileName: value.name,
          fileSize: value.size,
          extension: value.name,
          extractedData: null,
          error: null,
          fileBinary: null,
        };
      })
      .filter((blockFileValidations: any) => {
        return this.blockOverSizeLimitFile(blockFileValidations);
      });
    this.fileList.push(...changedFileList);
    if (this.fileList.length > this.FilesNumberLimit) {
      this.warningDialog(
        `You have uploaded more than ${this.FilesNumberLimit} files. Please upload less than or equal to ${this.FilesNumberLimit} files.`
      );
      this.fileList = [];
    } else {
      this.fakeloader();
      this.getBinaryDetails();
      // this.fileUploader();
    }
  }

  // Warning function
  warningDialog(msg: string) {
    const notificationConfig: NotificationDialogModel = {
      notificationType: "warning",
      disableClose: true,
      message: msg,
      actions: [{ label: "ok", actionCase: "ok" }],
    };
    const dialogRef = GenerateDialog(this.dialog, notificationConfig);
  }

  fakeloader() {
    for (const key in this.fileList) {
      if (
        this.fileList[key].uploadingPercentage == null ||
        this.fileList[key].uploadingPercentage == undefined
      )
        this.fileList[key].uploadingPercentage = 0;
      // this.changeDetector.detach();
      let interval = setInterval(() => {
        if (!this.fileList[key]) clearInterval(interval);
        if (this.fileList[key].uploadingPercentage < 100) {
          this.fileList[key].uploadingPercentage =
            this.fileList[key].uploadingPercentage + 10;
        } else {
          clearInterval(interval);
        }
        this.changeDetector.detectChanges();
      }, 2);
    }
  }

  getUploadedFileSize(file: RMAttachmentFile) {
    return this.fileSizeFormaterByBytes(
      ((file.uploadingPercentage ? file.uploadingPercentage : 0) *
        file.fileSize!) /
        100
    );
  }

  fileUploader() {
    this.fileList.forEach((file) => {
      this.uploaderService
        .uploadFile(this.getFormData(file))
        .subscribe((resp) => {
          if (resp.type === HttpEventType.Response) {
            file.isUploaded = true;
          }
          if (resp.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round((100 * resp.loaded) / resp.total);

            file.uploadingPercentage = percentDone;
          }
        });
    });
  }

  cancelAndRemoveFile(index: any) {
    this.fileList.splice(index, 1);
    this.fileSelector.nativeElement.value = "";
    //
    this.fileListChange.emit(this.fileList);
    this.changeDetector.detectChanges();
  }

  getFormData(object: any) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    return formData;
  }

  blockOverSizeLimitFile(file: RMAttachmentFile) {
    return file.fileSize! <= this.FilesSizeLimit;
  }

  fileSizeFormaterByBytes(bytes: number) {
    return formatBytes(bytes);
  }

  // get binary details
  getBinaryDetails() {
    for (let index = 0; index < this.fileList.length; index++) {
      const element = this.fileList[index];
      if (element.fileDetails) {
        var reader = new FileReader();

        reader.readAsDataURL(element.fileDetails as Blob); // read file as data url

        reader.onload = (event: any) => {
          // called once readAsDataURL is completed
          //   this.user.userImage = event.target.result.toString();
          //
          this.fileList[index].fileBinary = (event.target as FileReader | any).result.toString();
          this.fileListChange.emit(this.fileList);
        };
      }
    }
  }

  onFileDropped(event: any) {
    this.prepareFilesList(event);
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.fileList.push({
        fileId: null || '',
        fileDetails: item,
        isUploaded: false,
        uploadingPercentage: 0,
        fileName: item.name,
        fileSize: item.size,
        extension: item.name,
        extractedData: null || undefined,
        error: null || undefined,
        fileBinary: null || undefined,
      });
    }
    this.fakeloader();
    this.getBinaryDetails();
  }
}
