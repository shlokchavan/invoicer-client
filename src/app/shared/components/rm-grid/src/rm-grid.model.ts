import { GridOptions, ColDef, ColGroupDef } from "ag-grid-community";

export interface IAgGridConfig {
    rowModelType?: string;
    columnDefs: (ColDef | ColGroupDef)[];
    defaultColDef?: ColDef;
    rowData?: any[];
    gridOptions?: GridOptions;
    events: IEvents;
    setData:any;
    gridHeight?:number;
    pinnedHeight?: number;
    isAccordian?: boolean;
    headerHeight?:number;
    gridId?: string;
}

export interface IEvents {
    onGridReady: string,
    onPaginationChanged?: string,
    onFilterChanged?: string,
    onSort?: string,
    onSelectionChanged?:string,
    onDragStopped?:string,
    onGridSizeChanged?:string
    onLinkClicked?: string,
    onActionClicked?: string,
    onRowEditingStarted?: string,
    onRowEditingStopped?: string,
}