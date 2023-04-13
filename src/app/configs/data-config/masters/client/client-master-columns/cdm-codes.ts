import { ActionRenderer } from "src/app/shared/components/rm-grid/src/custom-renderer/action-renderer/action-renderer.component";

export const cdmCodes = [
    {
      headerName: "Charge Code",
      field: "chgCode",
      cellEditorParams: (params: any) => {
        return {
          isRequired: true,
          placeholder: "Enter Charge Code",
        };
      },
    },
    {
      headerName: "Charge Description",
      field: "chgDescription",
      cellEditorParams: (params: any) => {
        return {
          isRequired: true,
          placeholder: "Enter Charge Description",
        };
      },
    },
    {
      headerName: "Facility ID",
      field: "facilityId",
      cellEditorParams: (params: any) => {
        return {
          isRequired: true,
          placeholder: "Select Facility",
        };
      },
      
    },
    {
      headerName: "Department",
      field: "deptCode",
      cellEditorParams: (params: any) => {
        return {
          isRequired: true,
          placeholder: "Select Department",
        };
      },
    },
    {
      headerName: "HCPC",
      field: "hcpc",
      cellEditorParams: (params: any) => {
        return {
          isRequired: true,
          placeholder: "Select HCPC",
        };
      },
    },
    {
      headerName: "Modifier",
      field: "modifier",
      cellEditorParams: (params: any) => {
        return {
          isRequired: true,
          placeholder: "Select Modifier",
        };
      },
      valueFormatter: (params) => (params.value ? params.value : "-"),
    },
    {
      headerName: "Revenue Code",
      field: "revCode",
      cellEditorParams: (params: any) => {
        return {
          isRequired: true,
          placeholder: "Select Revenue Code",
        };
      },
      
    },
    {
      headerName: "Price ($)",
      field: "price",
      cellEditorParams: (params: any) => {
        return {
          isRequired: true,
          placeholder: "Enter Price",
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
              tooltip: "Edit CDM Code",
            },
            {
              icon: "trashCan",
              action: "delete",
              mode: "view",
              tooltip: "Delete CDM Code",
            },
            {
              icon: "save",
              action: "save",
              mode: "editing",
              tooltip: "Save CDM Code",
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