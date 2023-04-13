import { SelectEditor } from "src/app/shared/components/rm-grid/src/custom-editor/select-editor/select-editor.component";
import { ActionRenderer } from "src/app/shared/components/rm-grid/src/custom-renderer/action-renderer/action-renderer.component";

export const facility = [
  {
    headerName: "Facility Id",
    field: "facilityId",
    editable: (params: any) => {
      
      return params.data.facilityId ? false : true;
    },
    cellEditorParams: (params: any) => {
      return {
        isRequired: true,
        placeholder: "Enter Facility Id",
        autoUpdate: true, 
      };
    },
  },
  {
    headerName: "Facility Name",
    field: "name",
    cellEditorParams: (params: any) => {
      return {
        isRequired: true,
        placeholder: "Enter Facility Name",
      };
    },
  },
  {
    headerName: "Display Name",
    field: "displayName",
    cellEditorParams: (params: any) => {
      return {
        isRequired: true,
        placeholder: "Enter Display Name",
      };
    },
  },
  {
    headerName: "Division",
    field: "divisionId",
    filter: "agSetColumnFilter",
    cellEditorFramework: SelectEditor,
    cellEditorParams: (params: any) => {
      return {
        options: params.context.componentParent.scope.divisionData,
        isRequired: true,
        placeholder: "Select Division",
      };
    },
    valueGetter: (params: any) => {
      return params.data.divisionName;
    },
  },
  {
    headerName: "Actions",
    colId: "action",
    field: "facilityId",
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
            tooltip: "Edit Facility",
          },
          {
            icon: "trashCan",
            action: "delete",
            mode: "view",
            tooltip: "Delete Facility",
          },
          {
            icon: "save",
            action: "save",
            mode: "editing",
            tooltip: "Save Facility",
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
