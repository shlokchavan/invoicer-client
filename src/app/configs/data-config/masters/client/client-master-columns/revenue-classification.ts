import { ActionRenderer } from "src/app/shared/components/rm-grid/src/custom-renderer/action-renderer/action-renderer.component";

export const revenueClassification = [
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
      field: "classification",
      valueFormatter: (params: any) => params.value ? params.value : "-",
      filter: 'agSetColumnFilter',
      cellEditorParams: (params: any) => {
        return {
          isRequired: true,
          placeholder: "Enter Description",
        };
      },
    },
    // {
    //   headerName: "CSS Category",
    //   field: "ccsCategory",
    //   cellEditorParams: (params: any) => {
    //     return {
    //       isRequired: true,
    //       placeholder: "Enter CSS Category",
    //     };
    //   },
    // },
    // {
    //   headerName: "CSS Category Description",
    //   field: "ccsCategoryDesc",
    //   cellEditorParams: (params: any) => {
    //     return {
    //       isRequired: true,
    //       placeholder: "Enter CSS Category Description",
    //     };
    //   },
    // },
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
              tooltip: "Edit Revenue Classification",
            },
            {
              icon: "trashCan",
              action: "delete",
              mode: "view",
              tooltip: "Delete Revenue Classification",
            },
            {
              icon: "save",
              action: "save",
              mode: "editing",
              tooltip: "Save Revenue Classification",
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