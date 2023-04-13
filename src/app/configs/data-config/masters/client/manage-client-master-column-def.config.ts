import * as _ from "lodash";
import { SelectEditor } from "src/app/shared/components/rm-grid/src/custom-editor/select-editor/select-editor.component";
import { ActionRenderer } from "src/app/shared/components/rm-grid/src/custom-renderer/action-renderer/action-renderer.component";
import { getAllOrgType } from "src/app/shared/utils/local-functions";
import { cdmCodes } from "./client-master-columns/cdm-codes";
import { codeClassification } from "./client-master-columns/code-classification";
import { department } from "./client-master-columns/department";
import { diagnosisClassification } from "./client-master-columns/diagnosis-classification";
import { diagnosisCodes } from "./client-master-columns/diagnosis-codes";
import { division } from "./client-master-columns/division";
import { facility } from "./client-master-columns/facility";
import { financialClass } from "./client-master-columns/financial-class";
import { hcpcClassification } from "./client-master-columns/hcpc-classification";
import { hcpcCodes } from "./client-master-columns/hcpc-codes";
import { hcpcModifiers } from "./client-master-columns/hcpc-modifiers";
import { patientSubTypes } from "./client-master-columns/patient-subtypes";
import { patientTypes } from "./client-master-columns/patient-types";
import { procedureClassification } from "./client-master-columns/procedure-classification";
import { procedureCodes } from "./client-master-columns/procedure-codes";
import { responseType } from "./client-master-columns/response-type";
import { responseTypeValues } from "./client-master-columns/response-type-value";
import { revenueClassification } from "./client-master-columns/revenue-classification";
import { revenueCode } from "./client-master-columns/revenue-codes";

export const manageClientMasterColumnDefs = (clientMasterId?: any) => {
  let columnDefs = [];
  switch (clientMasterId) {
    // case "facDiv":
    case 1:
      columnDefs = _.cloneDeep(division);
      break;
    case 2:
      columnDefs = _.cloneDeep(facility);
      break;
    case 3:
      columnDefs = _.cloneDeep(department);
      break;
    case 4:
      columnDefs = _.cloneDeep(hcpcCodes);
      break;
    case 5:
      columnDefs = _.cloneDeep(revenueCode);
      break;
    case 6:
      columnDefs = _.cloneDeep(hcpcModifiers);
      break;
    case 7:
      columnDefs = _.cloneDeep(cdmCodes);
      break;
    case 8:
      columnDefs = _.cloneDeep(diagnosisCodes);
      break;
    case 9:
      columnDefs = _.cloneDeep(procedureCodes);
      break;
    case 10:
      columnDefs = _.cloneDeep(patientTypes);
      break;
    case 11:
      columnDefs = _.cloneDeep(patientSubTypes);
      break;
    case 12:
      columnDefs = _.cloneDeep(financialClass);
      break;
    case 13:
      columnDefs = _.cloneDeep(responseType);
      break;
    case 14:
      columnDefs = _.cloneDeep(responseTypeValues);
      break;
    case 15:
      columnDefs = _.cloneDeep(codeClassification);
      break;
    case 16:
      columnDefs = _.cloneDeep(hcpcClassification);
      break;
    case 17:
      columnDefs = _.cloneDeep(diagnosisClassification);
      break;
    case 18:
      columnDefs = _.cloneDeep(procedureClassification);
      break;
    case 19:
      columnDefs = _.cloneDeep(revenueClassification);
      break;
    default:
      columnDefs = [
        {
          headerName: "Name",
          field: "name",
          width: 40,
          minWidth: 160,
          cellEditorParams: (params: any) => {
            return {
              isRequired: true,
              placeholder: "Name",
            };
          },
        },
        {
          headerName: "Description",
          field: "description",
          width: 100,
          minWidth: 160,
          cellEditorParams: (params: any) => {
            return {
              isRequired: true,
              placeholder: "Type Description",
            };
          },
        },
        {
          headerName: "Actions",
          colId: "action",
          minWidth: 120,
          maxWidth: 120,
          suppressMenu: true,
          cellRendererFramework: ActionRenderer,
          cellRendererParams: function (params: any) {
            const grid = params.context.componentParent;
            // 
            return {
              isEditing: grid.isEditing,
              actions: [
                {
                  icon: "edit",
                  action: "edit",
                  mode: "view",
                  tooltip: "Edit",
                },
                {
                  icon: "trashCan",
                  action: "delete",
                  mode: "view",
                  tooltip: "Delete",
                },
                {
                  icon: "save",
                  action: "save",
                  mode: "editing",
                  tooltip: "Save",
                },
                {
                  icon: "cross",
                  action: "cancel",
                  mode: "editing",
                  tooltip: "Cancel Editing",
                },
              ],
            };
          },
          editable: false,
          sortable: false,
        },
      ];
      break;
  }
  return columnDefs;
};
export const manageClientMasterBulkUploadSchema = (clientMasterId?: any,listObject?: any) => {
  let schemaObject = [];
  switch (clientMasterId) {
    case 1:
      schemaObject = [
        {
          fieldName: "CODE",
          isRequired: true,
          outputFieldName: "code",
        },
        {
          fieldName: "DISPLAY NAME",
          isRequired: true,
          outputFieldName: "displayName",
        },
        {
          fieldName: "NAME",
          isRequired: true,
          outputFieldName: "name",
        },
      ];
      break;

    case 2:
      schemaObject = [
        {
          fieldName: "FACILITY ID",
          isRequired: true,
          outputFieldName: "facilityId",
        },
        {
          fieldName: "FACILITY NAME",
          isRequired: true,
          outputFieldName: "name",
        },
        {
          fieldName: "DISPLAY NAME",
          isRequired: true,
          outputFieldName: "displayName",
        },
        {
          fieldName: "DIVISION NAME",
          isRequired: true,
          outputFieldName: "divisionId",
          foreignKey: "value",
          dataKey: "name",
          foreignKeyData: listObject["divisionData"]
        },
        
      ];
      break;

    case 3:
      schemaObject = [
        {
          fieldName: "DEPT CODE",
          isRequired: true,
          outputFieldName: "deptCode",
        },
        {
          fieldName: "DESCRIPTION",
          isRequired: true,
          outputFieldName: "description",
        },
        // {
        //   fieldName: "FACILITY DISPLAY NAME",
        //   isRequired: true,
        //   outputFieldName: "facilityDisplayName",
        // },
        {
          fieldName: "FACILITY ID",
          isRequired: true,
          outputFieldName: "facilityId",
        },
        // {
        //   fieldName: "FACILITY NAME",
        //   isRequired: true,
        //   outputFieldName: "facilityName",
        // },
      ];
      break;

    case 4:
      schemaObject = [
        {
          fieldName: "CODE",
          isRequired: true,
          outputFieldName: "code",
        },
        {
          fieldName: "DESCRIPTION",
          isRequired: true,
          outputFieldName: "description",
        },
      ];
      break;

    case 5:
      schemaObject = [
        {
          fieldName: "CODE",
          isRequired: true,
          outputFieldName: "code",
        },
        {
          fieldName: "DESCRIPTION",
          isRequired: true,
          outputFieldName: "description",
        },
      ];
      break;

    case 6:
      schemaObject = [
        {
          fieldName: "CODE",
          isRequired: true,
          outputFieldName: "code",
        },
        {
          fieldName: "DESCRIPTION",
          isRequired: true,
          outputFieldName: "description",
        },
        {
          fieldName: "RANK ORDER",
          isRequired: true,
          outputFieldName: "rankOrder",
        },
      ];
      break;

    case 7:
      schemaObject = [
        {
          fieldName: "CHARGE CODE",
          isRequired: true,
          outputFieldName: "chgCode",
        },
        {
          fieldName: "CHARGE DESCRIPTION",
          isRequired: true,
          outputFieldName: "chgDescription",
        },
        {
          fieldName: "FACILITY ID",
          isRequired: true,
          outputFieldName: "facilityId",
        },
        {
          fieldName: "DEPARTMENT",
          isRequired: true,
          outputFieldName: "deptCode",
        },
        {
          fieldName: "HCPC",
          isRequired: true,
          outputFieldName: "hcpc",
        },
        {
          fieldName: "MODIFIER",
          isRequired: false,
          outputFieldName: "modifier",
        },
        {
          fieldName: "REVENUE CODE",
          isRequired: true,
          outputFieldName: "revCode",
        },
        {
          fieldName: "PRICE",
          isRequired: true,
          outputFieldName: "price",
        },
        {
          fieldName: "PRED CODE",
          isRequired: true,
          outputFieldName: "predCode",
        },
        
        {
          fieldName: "PRICE LAST YEAR",
          isRequired: true,
          outputFieldName: "priceLastYear",
        },

        {
          fieldName: "HCPC2",
          isRequired: false,
          outputFieldName: "hcpc2",
        },
        {
          fieldName: "HCPC3",
          isRequired: false,
          outputFieldName: "hcpc3",
        },
        {
          fieldName: "HCPC4",
          isRequired: false,
          outputFieldName: "hcpc4",
        },
        {
          fieldName: "HCPC5",
          isRequired: false,
          outputFieldName: "hcpc5",
        },
        {
          fieldName: "HCPC6",
          isRequired: false,
          outputFieldName: "hcpc6",
        },
        
        {
          fieldName: "MODIFIER2",
          isRequired: false,
          outputFieldName: "modifier2",
        },
        {
          fieldName: "MODIFIER3",
          isRequired: false,
          outputFieldName: "modifier3",
        },
        {
          fieldName: "MODIFIER4",
          isRequired: false,
          outputFieldName: "modifier4",
        },
        {
          fieldName: "MODIFIER5",
          isRequired: false,
          outputFieldName: "modifier5",
        },
        {
          fieldName: "MODIFIER6",
          isRequired: false,
          outputFieldName: "modifier6",
        },
        {
          fieldName: "REVENUE CODE2",
          isRequired: false,
          outputFieldName: "revCode2",
        },
      ];
      break;

    case 8:
      schemaObject = [
        {
          fieldName: "CODE",
          isRequired: true,
          outputFieldName: "code",
        },
        {
          fieldName: "DESCRIPTION",
          isRequired: true,
          outputFieldName: "description",
        },
        {
          fieldName: "ICD10",
          isRequired: true,
          outputFieldName: "icd10",
        },
      ];
      break;

    case 9:
      schemaObject = [
        {
          fieldName: "CODE",
          isRequired: true,
          outputFieldName: "code",
        },
        {
          fieldName: "DESCRIPTION",
          isRequired: true,
          outputFieldName: "description",
        },
        {
          fieldName: "ICD10",
          isRequired: true,
          outputFieldName: "icd10",
        },
      ];
      break;

    case 10:
      schemaObject = [
        {
          fieldName: "CODE",
          isRequired: true,
          outputFieldName: "code",
        },
        {
          fieldName: "DESCRIPTION",
          isRequired: true,
          outputFieldName: "description",
        },
      ];
      break;

    case 11:
      schemaObject = [
        {
          fieldName: "CODE",
          isRequired: true,
          outputFieldName: "code",
        },
        {
          fieldName: "DESCRIPTION",
          isRequired: true,
          outputFieldName: "description",
        },
      ];
      break;

    case 12:
      schemaObject = [
        {
          fieldName: "CODE",
          isRequired: true,
          outputFieldName: "code",
        },
        {
          fieldName: "DESCRIPTION",
          isRequired: true,
          outputFieldName: "description",
        },
      ];
      break;

    case 13:
      schemaObject = [
        {
          fieldName: "TYPE",
          isRequired: true,
          outputFieldName: "type",
        },
        {
          fieldName: "DESCRIPTION",
          isRequired: true,
          outputFieldName: "description",
        },
      ];
      break;

    case 14:
      schemaObject = [
        {
          fieldName: "TYPE",
          isRequired: true,
          outputFieldName: "type",
        },
        {
          fieldName: "CODE",
          isRequired: true,
          outputFieldName: "code",
        },
        {
          fieldName: "DESCRIPTION",
          isRequired: true,
          outputFieldName: "description",
        },
        {
          fieldName: "RANK ORDER",
          isRequired: true,
          outputFieldName: "rankOrder",
        },
        
      ];
      break;

    case 15:
      schemaObject = [
        {
          fieldName: "CODE",
          isRequired: true,
          outputFieldName: "code",
        },
        {
          fieldName: "CLASSIFICATION",
          isRequired: true,
          outputFieldName: "classification",
        },
      ];
      break;

    case 16:
      schemaObject = [
        {
          fieldName: "CODE",
          isRequired: true,
          outputFieldName: "code",
        },
        {
          fieldName: "CLASSIFICATION",
          isRequired: true,
          outputFieldName: "classification",
        },
      ];
      break;

    case 17:
      schemaObject = [
        {
          fieldName: "CODE",
          isRequired: true,
          outputFieldName: "code",
        },
        {
          fieldName: "DESCRIPTION",
          isRequired: true,
          outputFieldName: "description",
        },
        {
          fieldName: "CCS CATEGORY",
          isRequired: false,
          outputFieldName: "ccsCategory",
        },
        {
          fieldName: "CCS CATEGORY DESC",
          isRequired: false,
          outputFieldName: "ccsCategoryDesc",
        },
        
      ];
      break;

    case 18:
      schemaObject = [
        {
          fieldName: "CODE",
          isRequired: true,
          outputFieldName: "code",
        },
        {
          fieldName: "DESCRIPTION",
          isRequired: true,
          outputFieldName: "description",
        },
        {
          fieldName: "CCS CATEGORY",
          isRequired: false,
          outputFieldName: "ccsCategory",
        },
        {
          fieldName: "CCS CATEGORY DESC",
          isRequired: false,
          outputFieldName: "ccsCategoryDesc",
        },
        
      ];
      break;

    case 19:
      schemaObject = [
        {
          fieldName: "CODE",
          isRequired: true,
          outputFieldName: "code",
        },
        {
          fieldName: "CLASSIFICATION",
          isRequired: true,
          outputFieldName: "classification",
        },
      ];
      break;

    default:
      break;
  }
  return schemaObject;
};
