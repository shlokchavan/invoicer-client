import { InputEditor } from "src/app/shared/components/rm-grid/src/custom-editor/input-editor/input-editor.component";

export const manageClientMasterTypeGridConfig = {
  columnDefs: [],
  defaultColDef: {
    // width: 150,
    editable: true,
    filter: "agTextColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
    },
    // floatingFilter: true,
    resizable: true,
    sortable: true,
    flex: 1,
    cellEditorFramework: InputEditor,
  },
  events: {
    onGridReady: "onGridReady",
    onFilterChanged: "onFilterChange",
    onGridSizeChanged: "onGridSizeChanged",
    onActionClicked: "onActionClicked",
    onGridHeaderBtnClicked: "onGridHeaderBtnClicked",
    onCellValueChanged: "onCellValueChanged",
  },
  gridOptions: {
    applyColumnDefOrder: true,
    suppressPropertyNamesCheck: true,
    suppressContextMenu: true,
    pagination: true,
    suppressPaginationPanel: true,
    popupParent: document.querySelector("body"),
  },
  rowModelType: "clientSide",
  editType: "fullRow",
  tooltipShowDelay: 0,
  gridHeight: "calc(100vh - 366px)",
  gridHeader: [
    {
      type: "search",
    },
    {
      type: "button",
      role: "tertiary",
      text: "Download",
      icon: "download",
      operation: "downloadCSV",
      download: {
        fileName: "RM_Export_Master",
      },
    },
    {
      type: "button",
      role: "tertiary",
      text: "Bulk Upload",
      icon: "upload",
      operation: "bulkUpload",
      operationType: "callback",
    },
    {
      type: "button",
      role: "tertiary",
      text: "Create New",
      icon: "add",
      operation: "addNewRecord",
      operationType: "callback",
    },
    { type: "manage-column" },
    // {
    //     type: 'button',
    //     role: 'tertiary',
    //     icon: 'kebab',
    //     operation: ""
    // }
  ],
};
