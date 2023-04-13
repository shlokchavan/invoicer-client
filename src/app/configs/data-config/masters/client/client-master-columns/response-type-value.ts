import { SelectEditor } from "src/app/shared/components/rm-grid/src/custom-editor/select-editor/select-editor.component";
import { ActionRenderer } from "src/app/shared/components/rm-grid/src/custom-renderer/action-renderer/action-renderer.component";

export const responseTypeValues = [
  {
    headerName: "Type",
    field: "type",
    filter: "agSetColumnFilter",
    cellEditorFramework: SelectEditor,
    cellEditorParams: (params: any) => {
      return {
        options: params.context.componentParent.scope.divisionData,
        isRequired: true,
        placeholder: "Select Type",
      };
    },
    // valueGetter: (params: any) => {
    //   return params.data.value;
    // },
  },
  {
    headerName: "Code",
    field: "code",
    editable: (params: any) => {
      
      return params.data.code ? false : true;
    },
    cellEditorParams: (params: any) => {
      return {
        isRequired: true,
        placeholder: "Enter Type",
        autoUpdate: true, 
      };
    },
  },
  {
    headerName: "Description",
    field: "description",
    cellEditorParams: (params: any) => {
      return {
        isRequired: true,
        placeholder: "Enter Description",
      };
    },
  },
  {
    headerName: "Rank Order",
    field: "rankOrder",
    cellEditorParams: (params: any) => {
      return {
        isRequired: true,
        placeholder: "Enter Rank Order",
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
            tooltip: "Edit Response Type Value",
          },
          {
            icon: "trashCan",
            action: "delete",
            mode: "view",
            tooltip: "Delete Response Type Value",
          },
          {
            icon: "save",
            action: "save",
            mode: "editing",
            tooltip: "Save Response Type Value",
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
