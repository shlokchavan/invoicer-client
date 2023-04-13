export const manageMasterBulkUpload = (masterType?: any,listObject?: any) => {
  let uploadSchema: any = [];
  switch (masterType) {
    case "orgType":
      uploadSchema = [
        {
          fieldName: "Organization Type",
          isRequired: true,
          outputFieldName: "name",
        },
        {
          fieldName: "Display Name",
          isRequired: true,
          outputFieldName: "displayName",
        },
        {
          fieldName: "Description",
          isRequired: true,
          outputFieldName: "description",
        },
        {
          fieldName: "Parent Org Type",
          isRequired: false,
          outputFieldName: "parentOrgTypeId",
          foreignKey: "orgTypeId",
          dataKey: "name",
          foreignKeyData: listObject["rowData"]
        },
      ];
      break;
    case "contactType":
      uploadSchema = [
        {
          fieldName: "Contact Type",
          isRequired: true,
          outputFieldName: "name",
        },
        {
          fieldName: "Display Name",
          isRequired: true,
          outputFieldName: "displayName",
        },
        {
          fieldName: "Description",
          isRequired: true,
          outputFieldName: "description",
        }
      ];
      break;
    case "addressType":
      uploadSchema = [
        {
          fieldName: "Address Type",
          isRequired: true,
          outputFieldName: "name",
        },
        {
          fieldName: "Display Name",
          isRequired: true,
          outputFieldName: "displayName",
        },
        {
          fieldName: "Description",
          isRequired: true,
          outputFieldName: "description",
        }
      ];
      break;
    case "currencyType":
      uploadSchema = [
        {
          fieldName: "Currency Type",
          isRequired: true,
          outputFieldName: "name",
        },
        {
          fieldName: "Display Name",
          isRequired: true,
          outputFieldName: "displayName",
        },
        {
          fieldName: "Abbreviation",
          isRequired: true,
          outputFieldName: "currencyAbbr",
        },
        {
          fieldName: "Description",
          isRequired: true,
          outputFieldName: "description",
        }
      ];
      break;
    case "timeZoneType":
      uploadSchema = [
        {
          fieldName: "Time Zone",
          isRequired: true,
          outputFieldName: "name",
        },
        {
          fieldName: "Display Name",
          isRequired: true,
          outputFieldName: "displayName",
        },
        {
          fieldName: "Offset",
          isRequired: true,
          outputFieldName: "offset",
        },
        {
          fieldName: "Description",
          isRequired: true,
          outputFieldName: "description",
        }
      ];
      break;
    case "languageType":
      uploadSchema = [
        {
          fieldName: "Language",
          isRequired: true,
          outputFieldName: "name",
        },
        {
          fieldName: "Display Name",
          isRequired: true,
          outputFieldName: "displayName",
        },
        {
          fieldName: "Description",
          isRequired: true,
          outputFieldName: "description",
        }
      ];
      break;
    case "designation":
      uploadSchema = [
        {
          fieldName: "Designation",
          isRequired: true,
          outputFieldName: "name",
        },
        {
          fieldName: "Display Name",
          isRequired: true,
          outputFieldName: "displayName",
        },
        {
          fieldName: "Description",
          isRequired: true,
          outputFieldName: "description",
        }
      ];
      break;
    default:
      break;
  }
  return uploadSchema;
};
