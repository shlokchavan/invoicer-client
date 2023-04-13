import { ActionRenderer } from "src/app/shared/components/rm-grid/src/custom-renderer/action-renderer/action-renderer.component";

export const responseType = [
    {
      headerName: "Type",
      field: "type",
      editable: (params: any) => {
        
        return params.data.type ? false : true;
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
              tooltip: "Edit Response Type",
            },
            {
              icon: "trashCan",
              action: "delete",
              mode: "view",
              tooltip: "Delete Response Type",
            },
            {
              icon: "save",
              action: "save",
              mode: "editing",
              tooltip: "Save Response Type",
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