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
import { formatBytes } from "../../../utils/fileSize-converter";
import { RMAttachmentFile, RMBulkDataImporterModel } from "./rm-uploader.model";
import { RMUploaderService } from "./rm-uploader.service";
import * as xlsx from "xlsx";

@Component({
  selector: "rm-bulk-importer",
  templateUrl: "./rm-bulk-importer.component.html",
  styleUrls: ["./rm-bulk-importer.component.scss"],
  providers: [RMUploaderService],
})
export class RMBulkImporterComponent implements OnInit {
  // Parameters
  @Input() fileName?: string;
  @Input() Allowedfiles = "";
  @Input() MultipleUpload: boolean;
  @Input() showDownloadButton: boolean;
  @Input() FilesNumberLimit: number;
  @Input() FilesSizeLimit: number; // in bytes
  @Input() fileList: RMAttachmentFile[] = [];
  @Input() uploadAPIEndPoint!: string;
  @Input() bulkDataSchema: RMBulkDataImporterModel[] = [];
  @Output() onDataReady: EventEmitter<any> = new EventEmitter();
  @Output() fileListChange: EventEmitter<RMAttachmentFile> = new EventEmitter();

  //Variables
  @ViewChild("fileSelector") fileSelector!: ElementRef;
  //Temp

  constructor(
    private changeDetector: ChangeDetectorRef,
    private uploaderService: RMUploaderService
  ) {
    // Initialize Default Properties
    this.MultipleUpload = false;
    this.FilesNumberLimit = 1;
    this.FilesSizeLimit = 5242880; // ...Bytes = 5 MB
    this.Allowedfiles = ".xlsx";
    this.showDownloadButton = true;
  }

  ngOnInit() {}

  fileChangeEvent(e: any) {
    let selectedFileList: File[] = [];

    Object.keys(e).forEach((key) => {
      if (key != "length") {
        if (
          e[key].type !=
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          
        } else {
          selectedFileList.push(e[key]);
        }
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
        };
      })
      .filter((blockFileValidations: any) => {
        return this.blockOverSizeLimitFile(blockFileValidations);
      });
    this.fileList = [...changedFileList];
    // this.fakeloader();
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
        if (this.fileList[key].uploadingPercentage! < 100) {
          this.fileList[key].uploadingPercentage!++;
        } else {
          clearInterval(interval);
        }
        this.changeDetector.detectChanges();
      }, 30);
    }
  }

  cancelAndRemoveFile(index: any) {
    this.fileList.splice(index, 1);
    this.fileSelector.nativeElement.value = "";
  }

  getFormData(object: any) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    return formData;
  }

  getConvertedData(event: any) {
    this.onDataReady.emit(event);
  }

  blockOverSizeLimitFile(file: RMAttachmentFile) {
    return file.fileSize! <= this.FilesSizeLimit;
  }

  fileSizeFormaterByBytes(bytes: number) {
    return formatBytes(bytes);
  }

  downloadTemplate() {
    const ws: xlsx.WorkSheet = xlsx.utils.aoa_to_sheet([
      this.bulkDataSchema.map((val) => {
        return val.fieldName;
      }),
    ]);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "template");
    xlsx.writeFile(wb, `${this.fileName || "bulk_upload_template"}.xlsx`);
    // xlsx.writeFile(wb, `bulk_upload_${this.fileName || "template"}.xlsx`);
    // const excel = xlsx.writeFile(wb, 'bulk_upload_template.xlsx');
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
      });
    }
    this.fakeloader();
    
  }
}
