export const manageClientMasterBulkUpload = (masterType?: any) => {
  let uploadSchema = [];
  switch (masterType) {
    case "facDiv":
      uploadSchema = [
        {
          fieldName: "Code",
          isRequired: true,
          outputFieldName: "CODE",
        },
        {
          fieldName: "Name",
          isRequired: true,
          outputFieldName: "NAME",
        },
        {
          fieldName: "Display Name",
          isRequired: true,
          outputFieldName: "DISPLAY_NAME",
        },
      ];
      break;
    default:
      break;
  }
  return uploadSchema;
};
