import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { IServerSideGetRowsParams } from "ag-grid-community";

@Injectable()
export class RMGridService {
    private gridConfig: any;
    private gridOptions: any;
    private gridApi: any;
    private gridColumnApi: any;
    totalPages: Subject<any> = new Subject();
    totalRecords: Subject<any> = new Subject();
    lengthOfData: any;
    constructor(private http: HttpClient) { }

    updateTotalPagesCount(newPageSize: any) {
        const totalPagesCount = Math.ceil(this.lengthOfData / Number(newPageSize));
        this.totalPages.next(totalPagesCount);
    }

    setTotalRecords(count: any) {
        this.totalRecords.next(count);
        this.lengthOfData = count;
    }

    assignGridProperties(config: any) {
        this.gridConfig = config;
        this.gridOptions = config.gridOptions;
    }

    assignGridApis(params: any) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    destroyGridAPIs() {
        this.gridApi = null;
        this.gridColumnApi = null;
    }

    // To set client side row data
    setClientSideData(data: any) {
        // 
        // Assign Total Records
        this.gridApi.setRowData(data);
    }
    // To set server side row data
    setServerSideData(apiCall: any) {
        (apiCall).subscribe(
            (res: any) => {
                if (res.status === 'success') {
                    if (res['data']) this.gridApi.setRowData(res['data']);
                    this.gridApi.sizeColumnsToFit();
                }
            }
        );
    }

    // to set server side datasource
    setDataSource(params: IServerSideGetRowsParams, data: ServerResponse) {
        let lastRow;
        if (data.success) {
            lastRow = data.totalRows > 99 ? -1 : data.totalRows;
            params.successCallback(data.rows, lastRow);

            if ((this.gridConfig.rowModelType && this.gridConfig.rowModelType === 'serverSide') && (this.gridOptions && this.gridOptions.suppressPaginationPanel)) {
                let totalPagesCount = Math.ceil(data.totalRows / this.gridOptions.paginationPageSize);
                this.totalPages.next(totalPagesCount);
            }

        } else {
            params.failCallback();
        }
    }

}

export interface ServerResponse {
    success: boolean,
    rows: any[],
    totalRows: number
}