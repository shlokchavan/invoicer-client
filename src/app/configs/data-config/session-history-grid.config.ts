import { dateTimeFullFormatter } from "src/app/shared/components/rm-grid/src/grid-utils/date-formatter";

export const sessionHistoryGridConfig = {
    columnDefs: [
        {
            headerName: 'IP Address',
            field: 'ipAddress',
        },
        {
            headerName: 'Login Date',
            field: 'loginDate',
            type: ['dateColumn', 'nonEditableColumn'],
            valueFormatter: dateTimeFullFormatter,
            sortable: true
        },
        {
            headerName: 'Logout Date',
            field: 'logoutDate',
            type: ['dateColumn', 'nonEditableColumn'],
            valueFormatter: dateTimeFullFormatter,
            sortable: true
        },
        {
            headerName: 'Device Type',
            field: 'deviceType',
            sortable: true
        }
    ],
    defaultColDef: {
        // width: 150,
        filter: 'agTextColumnFilter',
        // floatingFilter: true,
        resizable: true,
    },
    events: {
        onGridReady: 'onGridReady',
        onFilterChanged: 'onFilterChange',
        onGridSizeChanged: "onGridSizeChanged"
    },
    gridOptions: {
        suppressPropertyNamesCheck: true,
        headerHeight: 40,
        rowHeight: 40,
        suppressContextMenu: true,
        suppressPaginationPanel: true,
        pagination: true
    },
    rowModelType: 'clientSide',
    tooltipShowDelay: 0,
    gridHeight: 'calc(100vh - 280px)'
};
