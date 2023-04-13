import { SelectEditor } from "src/app/shared/components/rm-grid/src/custom-editor/select-editor/select-editor.component";
import { ActionRenderer } from "src/app/shared/components/rm-grid/src/custom-renderer/action-renderer/action-renderer.component";
import { getAllOrgType } from "src/app/shared/utils/local-functions";
export const getParentOrgType = (params: any) => {
  const rowData: any[] = params.context.componentParent.rowData;
  const formattedData = rowData.map((row) => ({
    name: row.name,
    value: row.orgTypeId,
  }));
  return formattedData;
  // 
};
export const manageMasterColumnDefs = (masterType?: any) => {
  let columnDefs = [];
  switch (masterType) {
    case "orgType":
      columnDefs = [
        {
          headerName: "Organization Type",
          field: "name",
          width: 40,
          minWidth: 160,
          cellEditorParams: (params: any) => {
            return {
              isRequired: true,
              placeholder: "Organization Type",
              autoFocus: true, 
            };
          },
          // valueGetter: (params) => {
          //   const allOrgs: any[] = getAllOrgType();
          //   return (
          //     allOrgs.find((org) => org.orgTypeId == params.data.orgTypeId)[
          //       "name"
          //     ] || "-"
          //   );
          // },
          filter: "agSetColumnFilter",
        },
        {
          headerName: "Parent Type",
          field: "parentOrgTypeId",
          exportFormatter: (value: any, data: any) => {
            return value == null ? "N.A." : data.parentOrgTypeName;
          },
          width: 40,
          minWidth: 160,
          filter: "agSetColumnFilter",
          valueFormatter: (params: any) => {
            return params.data.parentOrgTypeName || "N.A";
          },
          filterParams: {
            valueFormatter: (params: any) => {
              // Extract Name from Id
              return (
                params.context.componentParent.rowData.find(
                  (row: any) => row.parentOrgTypeId == params.value
                )["parentOrgTypeName"] || "N.A"
              );
            },
          },
          cellEditorFramework: SelectEditor,
          cellEditorParams: (params: any) => {
            return {
              options: getParentOrgType(params), //
              isRequired: false,
              placeholder: "Select Parent Type",
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
              lastTabColIndex: 2
            };
          },
        },
        {
          headerName: "Actions",
          colId: "action",
          minWidth: 120,
          maxWidth: 120,
          suppressMenu: true,
          cellRenderer: ActionRenderer,
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
                  tooltip: "Edit Org Type",
                },
                {
                  icon: "trashCan",
                  action: "delete",
                  mode: "view",
                  tooltip: "Delete Org Type",
                },
                {
                  icon: "save",
                  action: "save",
                  mode: "editing",
                  tooltip: "Save Org Type",
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
    case "contactType":
      columnDefs = [
        {
          headerName: "Contact Type",
          field: "name",
          cellEditorParams: (params: any) => {
            return {
              isRequired: true,
              placeholder: "Contact Type..",
              autoFocus: true,
            };
          },
        },
        {
          headerName: "Description",
          field: "description",
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
          width: 40,
          minWidth: 120,
          maxWidth: 120,
          suppressMenu: true,
          cellRenderer: ActionRenderer,
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
                  tooltip: "Edit Contact Type",
                },
                {
                  icon: "trashCan",
                  action: "delete",
                  mode: "view",
                  tooltip: "Delete Contact Type",
                },
                {
                  icon: "save",
                  action: "save",
                  mode: "editing",
                  tooltip: "Save Contact Type",
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
    case "addressType":
      columnDefs = [
        {
          headerName: "Address Type",
          field: "name",
          cellEditorParams: (params: any) => {
            return {
              isRequired: true,
              placeholder: "Address Type..",
              autoFocus: true,
            };
          },
        },
        {
          headerName: "Description",
          field: "description",
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
          width: 40,
          minWidth: 120,
          maxWidth: 120,
          suppressMenu: true,
          cellRenderer: ActionRenderer,
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
                  tooltip: "Edit Address Type",
                },
                {
                  icon: "trashCan",
                  action: "delete",
                  mode: "view",
                  tooltip: "Delete Address Type",
                },
                {
                  icon: "save",
                  action: "save",
                  mode: "editing",
                  tooltip: "Save Address Type",
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
    case "currencyType":
      columnDefs = [
        {
          headerName: "Currency Name",
          field: "name",
          cellEditorParams: (params: any) => {
            return {
              isRequired: true,
              placeholder: "Currency Name",
              autoFocus: true,
            };
          },
        },
        {
          headerName: "Abbreviation",
          field: "currencyAbbr",
          cellEditorParams: (params: any) => {
            return {
              isRequired: true,
              placeholder: "Currency Abbreviation",
            };
          },
        },
        {
          headerName: "Description",
          field: "description",
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
          width: 40,
          minWidth: 120,
          maxWidth: 120,
          suppressMenu: true,
          cellRenderer: ActionRenderer,
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
                  tooltip: "Edit Currency Type",
                },
                {
                  icon: "trashCan",
                  action: "delete",
                  mode: "view",
                  tooltip: "Delete Currency Type",
                },
                {
                  icon: "save",
                  action: "save",
                  mode: "editing",
                  tooltip: "Save Currency Type",
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
    case "timeZoneType":
      columnDefs = [
        {
          headerName: "Time Zone",
          field: "name",
          cellEditorParams: (params: any) => {
            return {
              isRequired: true,
              placeholder: "Time Zone",
              autoFocus: true,
            };
          },
        },
        {
          headerName: "Offset",
          field: "offset",
          cellEditorParams: (params: any) => {
            return {
              isRequired: true,
              placeholder: "Offset",
            };
          },
        },
        {
          headerName: "Description",
          field: "description",
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
          width: 40,
          minWidth: 120,
          maxWidth: 120,
          suppressMenu: true,
          cellRenderer: ActionRenderer,
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
                  tooltip: "Edit Timezone",
                },
                {
                  icon: "trashCan",
                  action: "delete",
                  mode: "view",
                  tooltip: "Delete Timezone",
                },
                {
                  icon: "save",
                  action: "save",
                  mode: "editing",
                  tooltip: "Save Timezone",
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
    case "languageType":
      columnDefs = [
        {
          headerName: "Language",
          field: "name",
          cellEditorParams: (params: any) => {
            return {
              isRequired: true,
              placeholder: "Type Language",
              autoFocus: true,
            };
          },
        },
        {
          headerName: "Description",
          field: "description",
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
          width: 40,
          minWidth: 120,
          maxWidth: 120,
          suppressMenu: true,
          cellRenderer: ActionRenderer,
          cellRendererParams: function (params: any) {
            const grid = params.context.componentParent;
            return {
              isEditing: grid.isEditing,
              actions: [
                {
                  icon: "edit",
                  action: "edit",
                  mode: "view",
                  tooltip: "Edit Language",
                },
                {
                  icon: "trashCan",
                  action: "delete",
                  mode: "view",
                  tooltip: "Delete Language",
                },
                {
                  icon: "save",
                  action: "save",
                  mode: "editing",
                  tooltip: "Save Language",
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
    case "designation":
      columnDefs = [
        {
          headerName: "Designation",
          field: "name",
          width: 40,
          minWidth: 160,
          cellEditorParams: (params: any) => {
            return {
              isRequired: true,
              placeholder: "Designation",
              autoFocus: true,
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
          cellRenderer: ActionRenderer,
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
                  tooltip: "Edit Designation",
                },
                {
                  icon: "trashCan",
                  action: "delete",
                  mode: "view",
                  tooltip: "Delete Designation",
                },
                {
                  icon: "save",
                  action: "save",
                  mode: "editing",
                  tooltip: "Save Designation",
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
              autoFocus: true,
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
          cellRenderer: ActionRenderer,
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
