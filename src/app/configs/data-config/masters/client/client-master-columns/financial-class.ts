import { ActionRenderer } from "src/app/shared/components/rm-grid/src/custom-renderer/action-renderer/action-renderer.component";

export const financialClass = [
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
              tooltip: "Edit Financial Class",
            },
            {
              icon: "trashCan",
              action: "delete",
              mode: "view",
              tooltip: "Delete Financial Class",
            },
            {
              icon: "save",
              action: "save",
              mode: "editing",
              tooltip: "Save Financial Class",
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