import { ActionRenderer } from "src/app/shared/components/rm-grid/src/custom-renderer/action-renderer/action-renderer.component";

export const procedureCodes = [
    {
      headerName: "Code",
      field: "code",
      editable: (params: any) => {
        
        return params.data.code ? false : true;
      },
      cellEditorParams: (params: any) => {
        return {
          isRequired: true,
          placeholder: "Enter Code",
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
      headerName: "ICD10",
      field: "icd10",
      cellEditorParams: (params: any) => {
        return {
          isRequired: true,
          placeholder: "Enter ICD10",
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
              tooltip: "Edit Procedure Code",
            },
            {
              icon: "trashCan",
              action: "delete",
              mode: "view",
              tooltip: "Delete Procedure Code",
            },
            {
              icon: "save",
              action: "save",
              mode: "editing",
              tooltip: "Save Procedure Code",
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