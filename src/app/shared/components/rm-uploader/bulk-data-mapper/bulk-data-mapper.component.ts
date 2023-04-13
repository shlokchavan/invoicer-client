import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import {
  RMAttachmentFile,
  RMBulkDataImporterModel,
} from "../rm-bulk-importer/rm-uploader.model";
import { BulkUploaderService } from "./bulk-data-mapper.service";
import * as XLSX from "xlsx";

@Component({
  selector: "bulk-data-mapper",
  templateUrl: "./bulk-data-mapper.component.html",
  styleUrls: ["./bulk-data-mapper.component.scss"],
  providers: [BulkUploaderService],
})
export class BulkDataMapperComponent implements OnInit, OnChanges {
  @Input() File!: RMAttachmentFile | any;
  @Output() FileChange: EventEmitter<RMAttachmentFile> = new EventEmitter();
  @Input() Model: RMBulkDataImporterModel[] = [];
  // @Input() UploadTo: string;

  @Output() BulkDataOutput: EventEmitter<any> = new EventEmitter();

  UploadRecords: any[] = [];
  processingDataLoader = null;
  availableFieldCheckLoader = null;
  requiredFieldCheckLoader = null;
  foreignFieldCheckLoader = null;
  typeOfValidators: any = [];
  finalProcessedData: any = []; // Processed Data

  uploadStatus: any = {
    checkFields: {
      error: false,
      msg: [],
    },
    requiredFields: {
      error: false,
      msg: [],
    },
    validateForeignKey: {
      error: false,
      msg: [],
    },
  };

  inProgress(): boolean {
    return (
      this.availableFieldCheckLoader == null ||
      this.availableFieldCheckLoader ||
      this.requiredFieldCheckLoader == null ||
      this.requiredFieldCheckLoader ||
      this.foreignFieldCheckLoader == null ||
      this.foreignFieldCheckLoader
    );
  }

  isFailed(): boolean {
    return (
      this.uploadStatus.checkFields.error ||
      this.uploadStatus.requiredFields.error ||
      this.uploadStatus.validateForeignKey.error
    );
  }

  updateTypeOfValidators() {
    this.typeOfValidators = [
      {
        typeName: "Mapping Columns...",
        status: this.uploadStatus.checkFields,
        loader: this.availableFieldCheckLoader,
        onSuccessMsg: "Mapped",
        onFailMsg:
          this.uploadStatus.checkFields.msg.length +
          " Column" +
          (this.uploadStatus.checkFields.msg.length > 1 ? "'s are" : " is") +
          " missing",
      },
      {
        typeName: "Checking for any Empty Cell",
        status: this.uploadStatus.requiredFields,
        loader: this.requiredFieldCheckLoader,
        onSuccessMsg: "Didn't found any Empty Cell",
        onFailMsg: "Empty Cell Found",
      },
      {
        typeName: "Mapping Foreign Column",
        status: this.uploadStatus.validateForeignKey,
        loader: this.foreignFieldCheckLoader,
        onSuccessMsg: "Mapped",
        onFailMsg: "Found Unknown Data on Master Column",
      },
    ];
  }

  constructor(private bulkUploader: BulkUploaderService) {}
  ngOnInit() {
    this.updateTypeOfValidators();
  }

  ngOnChanges(e: any) {
    if (this.File) {
      this.readData();
    }
  }

  updateFileChange() {
    this.FileChange.emit(this.File);
  }

  readData() {
    this.File.uploadingStatusText = "Processing File....";
    this.File.uploadingPercentage = null;
    this.updateFileChange();
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const arrayBuffer = fileReader.result;
      var data = new Uint8Array(arrayBuffer as any);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary", cellDates: true });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      const records = XLSX.utils.sheet_to_json(worksheet, {
        blankrows: false,
        raw: true,
      });
      this.UploadRecords = remove_outside_blanks(records);
      this.File.uploadingPercentage = 0;
      this.File.uploadingStatusText = "Mapping Columns....";
      this.updateProgressBarByFewSteps();
      // const uniqueFields: UArray = new UArray();
      const uniqueFields: any = UArray();
      this.UploadRecords.forEach((element) => {
        uniqueFields.set(Object.keys(element));
      });
      this.updateFileChange();
      this.checkFields(this.Model, uniqueFields.get());
    };
    setTimeout(() => {
      fileReader.readAsArrayBuffer(this.File.fileDetails as Blob);
    }, 2000);
  }

  checkFields(requiredFields: any[], availableFields: string[]) {

    setTimeout(() => {
      this.bulkUploader
        .checkAvailableFields(requiredFields, availableFields)
        .subscribe((availableFieldsResponse) => {
          this.uploadStatus.checkFields = availableFieldsResponse;
          if (!this.uploadStatus.checkFields.error) {
            this.File.uploadingPercentage = 34;
            this.updateProgressBarByFewSteps();
            this.File.uploadingStatusText = "Checking for Empty Fields...";

            this.requiredDataValidator(this.Model, this.UploadRecords);
          } else {
            this.File.foundError = true;

            this.File.errorMsgs = [];
            this.File.errorMsgs.concat(this.uploadStatus.checkFields.msg);
          }
          this.updateFileChange();
        });
    }, 800);
  }

  requiredDataValidator(requiredFields: any[], availableFields: any[]) {
    setTimeout(() => {
      this.bulkUploader
        .checkRequiredFields(requiredFields, availableFields)
        .subscribe((requiredFieldResponse) => {
          this.uploadStatus.requiredFields = requiredFieldResponse;
          if (!this.uploadStatus.requiredFields.error) {
            this.File.uploadingPercentage = 67;
            this.updateProgressBarByFewSteps();
            this.File.uploadingStatusText = "Foreign Key Data Mapping...";
            this.ForeignKeyValidator(this.Model, this.UploadRecords);
          } else {
            this.File.foundError = true;
            this.File.errorMsgs.concat(this.uploadStatus.requiredFields.msg);
          }
          this.updateFileChange();
        });
    }, 800);
  }

  ForeignKeyValidator(requiredFields: any[], records: any[]) {
    this.bulkUploader
      .mapForeignKeyData(requiredFields, records)
      .subscribe((foreignFieldResponse) => {
        this.uploadStatus.validateForeignKey = foreignFieldResponse;
        if (!this.uploadStatus.validateForeignKey.error) {
          this.File.uploadingPercentage = 100;
          this.File.uploadingStatusText = "Data is ready to submit.";
          this.finalProcessedData = foreignFieldResponse.records;
          this.File = this.mapFieldByOutputFieldName(
            foreignFieldResponse.records!,
            this.Model,
            this.File
          );
          
          this.File.isUploaded = true;
          this.BulkDataOutput.emit(this.File);
        } else {
          this.File.foundError = true;
          this.File.errorMsgs.concat(this.uploadStatus.validateForeignKey.msg);
        }
        this.updateFileChange();
      });
  }

  submit() {
    // this.btnClick.emit(this.finalProcessedData);
  }

  mapFieldByOutputFieldName(
    data: any[],
    schema: RMBulkDataImporterModel[],
    file: RMAttachmentFile
  ) {
    const outputFile = file;
    outputFile.extractedData = data.map((value) => {
      const newValue: any = {};
      schema.forEach((model) => {
        newValue[model.outputFieldName] = value[model.fieldName];
      });
      return newValue;
    });
    return outputFile;
  }

  getFinalStatus(): boolean {
    return this.inProgress() || this.isFailed();
  }

  updateProgressBarByFewSteps() {
    [1, 2, 3, 4].forEach((element) => {
      setTimeout(() => {
        this.File.uploadingPercentage += 2;
      }, 1000);
      this.updateFileChange();
    });
  }
}

// Utilities

function UArray(val?: any) {
  // this.values = []; [Commented]
  if (typeof val !== "undefined") {
    // this.set(val); [Commented]
  
  }
}
UArray.prototype.set = function (values: any) {
  this.values = this.values.concat(values).filter(function (el: any, i: any, arr: any) {
    return arr.indexOf(el) === i;
  });
};
UArray.prototype.get = function () {
  return this.values;
};

function remove_outside_blanks(aoa: any) {
  /* Loop backwards by row */
  const filtered: any = []
  aoa.forEach((row: any) => {
    const newRow : any = {}
    Object.keys(row).forEach(col => {
      const data = row[col].toString().trim();
      if(data != "") newRow[col] = data;
    })
    if(Object.keys(newRow).length > 0) filtered.push(newRow)
  });


  return filtered;
}


