import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

@Injectable()
class statusModel {
  error!: boolean;
  msg!: any[];
  records?: any[];
}
export class BulkUploaderService {
  constructor() {}

  checkAvailableFields(
    requiredFields: any[],
    availableFields: string[]
  ): Observable<statusModel> {
    let checkFields: Observable<statusModel> = new Observable((observer) => {
      let msgs: any[] = [];
      let error = false;
      requiredFields = requiredFields.filter((field) => field.isRequired);
      requiredFields.forEach((field) => {
        const isError = availableFields.some(
          (data) => field.fieldName.toLowerCase() == data.toLowerCase()
        );
        if (!isError) {
          error = !isError;
          msgs.push(field.fieldName + " column is missing");
        }
      });
      setTimeout(() => {
        observer.next({
          error: error,
          msg: msgs,
        });
      }, 1000);
    });

    return checkFields;
  }
  checkRequiredFields(
    requiredFields: any[],
    availableFields: any[]
  ): Observable<statusModel> {
    let checkFields: Observable<statusModel> = new Observable((observer) => {
      let msgs: any[] = [];
      let error = false;
      const fields: string[] = requiredFields
        .filter((reqField) => reqField.isRequired)
        .map((newData) => newData.fieldName);
      availableFields.map((data, dataIndex) => {
        fields.map((checkField) => {
          if (!Object.keys(data).some((key) => key == checkField)) {
            error = true;

            msgs.push(
              "Column '" +
                checkField.toUpperCase() +
                "' cannot have empty data. Please check row no. " +
                (dataIndex + 2)
            );
          } 
          // else {
          //   if (data[checkField] == "") {
          //     error = true;
          //     msgs.push(
          //       "Column '" +
          //         checkField.toUpperCase() +
          //         "' cannot have empty data. Please check row no. " +
          //         (dataIndex + 2)
          //     );
          //   }
          //   // 
            
          // }
        });
      });
      setTimeout(() => {
        observer.next({
          error: error,
          msg: msgs,
        });
      }, 1000);
    });

    return checkFields;
  }
  mapForeignKeyData(
    requiredFields: any[],
    records: any[]
  ): Observable<statusModel> {
    let checkFields: Observable<statusModel> = new Observable((observer) => {
      let msgs: any[] = [];
      let error = false;
      // 
      
      const foreignField: any[] = requiredFields
        .filter((reqField) => reqField.foreignKeyData != undefined)
        .map((newData) => {
          return {
            field: newData.fieldName,
            master: newData.foreignKeyData,
            key: newData.foreignKey,
            dataKey: newData.dataKey,
          };
        });
      records.forEach((data, dataIndex) => {
        foreignField.forEach((field) => {
          let getMasterRecords = field.master.filter((map: any) => {
            return (
              map[field.dataKey].toLowerCase() ==
              data[field.field].toLowerCase()
            );
          });
          if (getMasterRecords.length == 1) {
            data[field.field] = getMasterRecords[0][field.key];
          } else {
            error = true;
            msgs.push(
              "Didnt found foreign data ->" +
                data[field.field] +
                " on row " +
                (dataIndex + 1)
            );
          }
        });
      });
      setTimeout(() => {
        observer.next({
          error: error,
          msg: msgs,
          records: records,
        });
      }, 1000);
    });

    return checkFields;
  }
}
