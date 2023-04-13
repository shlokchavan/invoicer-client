import { ActionRenderer } from "src/app/shared/components/rm-grid/src/custom-renderer/action-renderer/action-renderer.component";

export const hcpcClassification = [
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
      headerName: "Classification",
      field: "classification",
      cellEditorParams: (params: any) => {
        return {
          isRequired: true,
          placeholder: "Enter Classification",
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
              tooltip: "Edit HCPC Classification",
            },
            {
              icon: "trashCan",
              action: "delete",
              mode: "view",
              tooltip: "Delete HCPC Classification",
            },
            {
              icon: "save",
              action: "save",
              mode: "editing",
              tooltip: "Save HCPC Classification",
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