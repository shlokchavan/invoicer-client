import { ActionRenderer } from "src/app/shared/components/rm-grid/src/custom-renderer/action-renderer/action-renderer.component";

export const division = [
  {
    headerName: "Code",
    field: "code",
    width: 40,
    maxWidth: 150,
    cellEditorParams: (params: any) => {
      return {
        isRequired: true,
        placeholder: "Code",
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
    headerName: "Name",
    field: "name",
    width: 40,
    minWidth: 160,
    cellEditorParams: (params: any) => {
      return {
        isRequired: true,
        placeholder: "Name",
      };
    },
    filter: "agSetColumnFilter",
  },
  {
    headerName: "Display Name",
    field: "displayName",
    width: 100,
    minWidth: 160,
    cellEditorParams: (params: any) => {
      return {
        isRequired: true,
        placeholder: "Display Name",
      };
    },
  },
  {
    headerName: "Actions",
    colId: "action",
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
            tooltip: "Edit Division",
          },
          {
            icon: "trashCan",
            action: "delete",
            mode: "view",
            tooltip: "Delete Division",
          },
          {
            icon: "save",
            action: "save",
            mode: "editing",
            tooltip: "Save Division",
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
