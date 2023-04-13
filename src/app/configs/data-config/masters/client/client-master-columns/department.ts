import { SelectEditor } from "src/app/shared/components/rm-grid/src/custom-editor/select-editor/select-editor.component";
import { ActionRenderer } from "src/app/shared/components/rm-grid/src/custom-renderer/action-renderer/action-renderer.component";

export const department = [
  {
    headerName: "Department Code",
    field: "deptCode",
    editable: (params: any) => {
      
      return params.data.facilityId && params.data.deptCode && params.data.state != "new"  ? false : true;
    },
    cellEditorParams: (params: any) => {
      return {
        isRequired: true,
        placeholder: "Enter Department Code",
        // autoFocus: true,
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
    headerName: "Facility ID",
    field: "facilityId",
    editable: (params: any) => {
      
      return params.data.facilityId && params.data.deptCode && params.data.state != "new" ? false : true;
    },
    cellEditorFramework: SelectEditor,
    cellEditorParams: (params: any) => {
      return {
        options: params.context.componentParent.scope.divisionData,
        isRequired: true,
        placeholder: "Select Facility ID",
        autoUpdate: true, 
      };
    },
    
    // valueGetter: (params: any) => {
    //   return params.data.value;
    // },
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
            tooltip: "Edit Department",
          },
          {
            icon: "trashCan",
            action: "delete",
            mode: "view",
            tooltip: "Delete Department",
          },
          {
            icon: "save",
            action: "save",
            mode: "editing",
            tooltip: "Save Department",
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
