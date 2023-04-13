import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { MatSelectionListChange } from "@angular/material/list";
import { ChartType, CreateRangeChartParams } from "ag-grid-community";
import * as _ from "lodash";
import { AgChartIconsBase64 } from "src/app/core/constants/chart-icons.constant";
import { ExcelService } from "src/app/shared/_global/export.service";
import { GridSettingService } from "src/app/shared/_global/grid-settings.service";
import { ThemeService } from "src/app/shared/_global/theme.service";
import { ITextConfig } from "../../../rm-input/rm-input.model";
import { ISelectConfig } from "../../../rm-select-box/rm-select-box.model";
import { RMToggleComponent } from "../../../rm-toggle/rm-toggle.component";
import { IToggleConfig } from "../../../rm-toggle/rm-toggle.model";

@Component({
  selector: "grid-header",
  templateUrl: "./grid-header.component.html",
  styleUrls: ["./grid-header.component.scss"],
})
export class GridHeaderComponent implements OnChanges, AfterViewInit {
  @Input() readonly isGlobalFilterApplied!: boolean;
  @Input() isColumnPanelActive!: boolean;
  @Input() pivotOption!: boolean;
  @Input() items!: any[];
  @Input() rowData!: any[];
  @Input() totalRows: number | any = 0;
  @Input() columnDefs!: any[];
  @Input() hideActions!: boolean;

  @Input() cardSelectedRows!: any[];
  @Input() gridApi: any;
  @Input() metaTemplate!: TemplateRef<any>;

  // 2 Way Data Binding
  @Input() showSelected!: boolean;
  @Output() showSelectedChange = new EventEmitter();

  // Emitter
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Output() onViewChange: EventEmitter<any> = new EventEmitter();
  @Output() onBtnClick: EventEmitter<any> = new EventEmitter();
  @Output() onShowSelectedChanged: EventEmitter<any> = new EventEmitter();
  @Output() onPinToggleChanged: EventEmitter<any> = new EventEmitter();
  @Output() onSelectionChange: EventEmitter<any> = new EventEmitter();
  @Output() onFullScreenToggleChanged: EventEmitter<any> = new EventEmitter();
  @Output() onGlobalFilterToggle: EventEmitter<void> = new EventEmitter();

  //View Child
  @ViewChild("searchTemplate") searchTemplate!: TemplateRef<any>;
  // @ViewChild("showSelectedToggle") showSelectedToggle: RMToggleComponent;
  @ViewChild("showSelectedToggle") showSelectedToggle!: RMToggleComponent  | undefined;

  //Variablse
  chartIcons = new AgChartIconsBase64();
  downloadCondition!: boolean;
  defaultView: string = "listView";
  tempRows: any[] = [];
  tempPivotState = [];
  searchModel = {
    value: null,
  };
  searchConfig: ITextConfig;
  showSelectedConfig: IToggleConfig;
  enablePivotToggleConfig: IToggleConfig;
  toggleChartListConfig: any[];

  isGridPinned!: boolean;
  isGridFullScreen!: boolean;
  pinBlock!: boolean;
  actionsWidth: string = "100%";
  tempCardSelectedRows!: any[];
  // manageableColumns: any[] = [];
  isSuppressedColumn!: boolean;

  // TempVariables
  holdGroupedColumns = []; // Used for groupby dropdown
  constructor(
    private gridSettingService: GridSettingService,
    private excelService: ExcelService,
    private cdRef: ChangeDetectorRef
  ) {
    this.searchConfig = {
      fieldKey: "value",
      attributes: {
        isSmall: true,
        placeholder: "Search",
        prefixIcon: "search2",
      },
    };
    // Toggle Config (Show Selected)
    this.showSelectedConfig = {
      isActive: false,
      attributes: {
        disable: false,
        label: `Show Selected`,
      },
    };
    // Toggle Config (Pivot Mode)
    this.enablePivotToggleConfig = {
      isActive: this.isColumnPanelActive,
      // isActive: false,
      attributes: {
        disable: false,
        label: `Columns Panel`,
      },
    };
    // Toggle List - Chart View Buttons Config
    this.toggleChartListConfig = [
      {
        label: "List View",
        value: "list-view",
        checked: true,
      },
      {
        label: "Chart View",
        value: "chart-view",
        checked: false,
      },
    ];
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const el: any = document.getElementById("grid_actions");
      this.actionsWidth = `calc(100% - ${el.offsetWidth}px)`;
    }, 200);
    this.cdRef.detectChanges();
  }

  get isVisualizationDisabled() {
    if (this.gridApi) {
      const ranges: any[] = this.gridApi.getCellRanges();
      if (ranges.length == 0) return true;
      else {
        return (
          (ranges[0]?.endRow?.rowIndex == ranges[0]?.startRow?.rowIndex &&
            ranges[0]?.columns?.length == 1) ||
          ranges[0].columns.every(
            (column: any) => column?.colDef?.enableValue || column?.colDef?.aggFunc
          ) ||
          ranges[0].columns.every(
            (column: any) => !column?.colDef?.enableValue && !column?.colDef?.aggFunc
          )
        );
      }
    }
    return true;
  }

  selectedDensity = {
    name: "Default",
    icon: "RCom_Default",
    value: 40,
  };
  displayDensityConfig = [
    {
      name: "Default",
      icon: "RCom_Default",
      value: 40,
    },
    {
      name: "Comfortable",
      icon: "RCom_Comfortable",
      value: 56,
    },
    {
      name: "Compact",
      icon: "RCom_compact",
      value: 35,
    },
  ];

  // Grid Actions
  displayDensityChanged(density: any) {
    this.selectedDensity = this.displayDensityConfig.find(
      (item) => item.value == density
    )!;
    setTimeout(() => {
      this.setDisplayDensity();
    }, 100);
  }

  setDisplayDensity() {
    if (this.items.find((item) => item.type == "display-density")) {
      this.gridApi.forEachNode((node: any) => {
        node.setRowHeight(this.selectedDensity.value);
      });
      this.gridApi.onRowHeightChanged();
    }
  }

  dropdownBtnClicked(operation: any) {
    
    switch (operation) {
      default:
        this.onBtnClick.emit(operation);
        break;
    }
  }

  btnClicked(item: any) {
    //
    // Callback Here
    if (item.operationType == "callback") this.onBtnClick.emit(item.operation);
    // Index of item in array
    const itemIndex = this.items.findIndex((row: any) => row.text == item.text);
    // Grid Level Here
    switch (item.operation) {
      case "downloadCSV":
        this.download(item.download);
        break;
      case "cardView":
        // 
        // Change View
        this.defaultView = "cardView";
        this.onViewChange.emit("cardView");
        // Change Button Action
        this.items[itemIndex] = {
          type: "button",
          role: "tertiary",
          text: "List View",
          icon: "listView",
          operation: "listView",
        };
        break;
      case "listView":
        // 
        // Change Button Action
        this.defaultView = "listView";
        this.onViewChange.emit("listView");
        this.items[itemIndex] = {
          type: "button",
          role: "tertiary",
          text: "Grid View",
          icon: "cardView",
          operation: "cardView",
        };
        if (this.searchModel.value != null && this.searchModel.value != "") {
          setTimeout(() => {
            this.searchInTable(this.searchModel.value);
          }, 100);
        }
        break;
      case "list-view":
        this.defaultView = "list-view";
        this.onViewChange.emit("list-view");
        if (this.searchModel.value != null && this.searchModel.value != "") {
          setTimeout(() => {
            this.searchInTable(this.searchModel.value);
          }, 100);
        }
        break;
      case "chart-view":
        this.defaultView = "chart-view";
        this.onViewChange.emit("chart-view");
        break;
      default:
        break;
    }
  }

  toggleBtnClicked(event: any) {
    this.onBtnClick.emit(event.value);
  }

  toggleRowDNDChanged(event: any) {
    // OLD LOGIC

    // // Store
    // const columnDefs = this.gridApi.columnController.columnDefs;
    // // Update using Logic
    // this.gridApi.columnController.columnDefs.forEach((col) => {
    //   if (col.rowDrag != undefined) {
    //     col.rowDrag = event.config.isActive;
    //   }
    // });
    // // Update Columns
    // //
    // this.gridApi.setColumnDefs(columnDefs);
    // this.gridApi.refreshCells({ force: true });
    this.onBtnClick.emit(event);
  }

  toggleShowSelected(event: any) {
    // 
    // this.onShowSelectedChanged.emit(event.isActive);
    this.showSelected = event.isActive;
    this.showSelectedChange.emit(this.showSelected);
  }

  groupBySelectorModel = {
    value: "",
  };

  selectGroupBy(event: any) {
    this.gridApi?.columnModel?.columnApi?.applyColumnState({
      defaultState: { rowGroup: false },
      state: this.holdGroupedColumns.map((data) => {
        return {
          colId: data,
          hide: false,
        };
      }),
    });
    if (event.value != "") {
      this.gridApi?.columnModel?.columnApi?.applyColumnState({
        state: [{ colId: event.value, rowGroup: true, hide: true }],
      });
    } else {
      this.holdGroupedColumns = [];
    }
    // Move checkbox to first
    // this.gridApi?.columnController?.columnApi?.moveColumn("checkbox", 0);
    // Fit Rows Logic
    if (this.gridApi && !this.gridApi.destroyCalled) {
      this.gridApi.sizeColumnsToFit();
      this.gridApi.forEachDetailGridInfo((detailGridInfo: any) => {
        detailGridInfo.api.sizeColumnsToFit();
      });
    }
    // Store Grouped Columns temp.
    this.holdGroupedColumns = this.gridApi?.columnModel?.columnApi
      ?.getAllColumns()
      .filter((data: any) => data.rowGroupActive)
      .map((data: any) => data.colId);
  }

  toggleShowAllChanged(event: any) {
    // Show List View Data
    if (this.defaultView != "cardView") {
      if (event.isActive) {
        // Show Selected
        // Store RowData in Temp
        this.gridApi.forEachNode((node: any) => this.tempRows.push(node.data));
        // Set Selected Rows
        this.gridApi.setRowData(this.gridApi.getSelectedRows());
        setTimeout(() => {
          // Checkbox Set Selected Rows
          this.gridApi.getModel().forEachNode((node: any, index: any) => {
            node.setSelected(true);
          });
        }, 10);
      } else {
        // Show All
        // Store Selected Rows in Temp
        const newTempRows = this.gridApi.getSelectedRows();
        // Set Row Data (All)
        this.gridApi.setRowData(this.tempRows);
        setTimeout(() => {
          this.gridApi.getModel().forEachNode((node: any, index: any) => {
            // If Selected Rows Exist in RowData
            if (newTempRows.some((tempRow: any) => tempRow == node.data)) {
              // Set Selected True
              node.setSelected(true);
            }
          });
        }, 10);
        // Clear Temp
        this.tempRows = [];
      }
    } else {
      // Card View Data
      if (this.cardSelectedRows) {
        if (event.isActive) {
          // Show Selected (Cards)
          // 
        }
      }
    }
  }

  download({ fileName }: any) {
    // Download All Data from Grid
    const params = {
      // Selected Rows Only
      onlySelected: this.hasSelectedNodes,
      columnWidth: 100,
      //
      // fileName: `${fileName}__${new Date().getTime()}.csv`,
      fileName: `${fileName}__${new Date().getTime()}`,
      sheetName: fileName,
      // columnKeys: this.columnDefs
      //   .filter((key: any) => key.field && key.headerName)
      //   .map((filtered: any) => `${filtered.field}`),
      // processCellCallback: function (cell) {
      //   // Manipulate the value however you need.
      //   if (cell.column.colDef.exportFormatter)
      //     return cell.column.colDef.exportFormatter(cell.value, cell.node.data);
      //   return cell.value;
      // },
    };
    if (this.defaultView == "listView") {
      // this.gridApi.exportDataAsCsv(params);
      // this.gridApi.exportDataAsExcel(params);

      if (this.gridApi.columnModel.pivotMode) {
        const selectedColumn = this.gridApi.columnModel.columnApi
          .getColumnState()
          .filter(
            (item: any) =>
              item.rowGroup || item.aggFunc || (!item.hide && item.pivot)
          )
          .map((filtered: any) => `${filtered.colId}`);

        const headerNames = this.columnDefs
          .filter((key: any) => selectedColumn.includes(key.field))
          .map((filtered: any) => `${filtered.headerName}`);
        const columnKeys = this.columnDefs
          .filter((key: any) => selectedColumn.includes(key.field))
          .map((filtered: any) => `${filtered.field}`);

        this.excelService.exportAsExcelFile(
          this.hasSelectedNodes ? this.cardSelectedRows : this.rowData,
          columnKeys,
          headerNames,
          params
        );
      } else {
        const isGroupedColumns = this.columnDefs.filter(
          (row: any) => row.rowGroup
        );
        if (isGroupedColumns) {
          const selectedColumn = this.gridApi.columnModel.columnApi
            .getColumnState()
            .filter((item: any) => item.rowGroup || item.aggFunc || !item.hide)
            .map((filtered: any) => `${filtered.colId}`);

          const headerNames = this.columnDefs
            .filter((key: any) => selectedColumn.includes(key.field))
            .map((filtered: any) => `${filtered.headerName}`);
          const columnKeys = this.columnDefs
            .filter((key: any) => selectedColumn.includes(key.field))
            .map((filtered: any) => `${filtered.field}`);
          this.excelService.exportAsExcelFile(
            this.hasSelectedNodes ? this.cardSelectedRows : this.rowData,
            columnKeys,
            headerNames,
            params
          );
        } else {
          this.gridApi.exportDataAsExcel(params);
        }
      }
    } else {
      const headerNames = this.columnDefs
        .filter((key: any) => key.field && key.headerName)
        .map((filtered: any) => `${filtered.headerName}`);
      const columnKeys = this.columnDefs
        .filter((key: any) => key?.field && key?.field?.length > 0)
        .map((filtered: any) => `${filtered.field}`);
      this.excelService.exportAsExcelFile(
        this.hasSelectedNodes ? this.cardSelectedRows : this.rowData,
        columnKeys,
        headerNames,
        params
      );
    }
    // 
  }

  searchInTable(value: any) {
    if (this.defaultView == "listView") {
      this.gridApi.setQuickFilter(value);
    } else {
    }
  }

  gridSelectionChanged(event: any) {
    const selectedRows = event.api.getSelectedRows();
    const disable = selectedRows.length == 0;
    if (this.showSelectedToggle) this.toggleSelectAll(disable);
  }

  toggleSelectAll(disable: boolean) {
    // if(this.showSelectedToggle) {
      // this.showSelectedToggle['config']['attributes']['disable'] = disable || undefined;
      // this.showSelectedToggle.config.attributes.disable = disable
    // }
    
  }

  ngOnChanges(e: any) {
    // List Selection
    if (e.gridApi && this.showSelectedToggle && e.isColumnPanelActive) {
      const disable = this.gridApi.getSelectedRows().length == 0;
      this.toggleSelectAll(disable);
    }

    // Card Selection
    if (
      e.cardSelectedRows &&
      this.defaultView == "cardView" &&
      this.showSelectedToggle
    ) {
      // Store in Temp
      // 
      const disable = this.cardSelectedRows.length == 0;
      this.toggleSelectAll(disable);
    }

    // Set Column Panel (Active State)
    this.enablePivotToggleConfig = {
      isActive: this.isColumnPanelActive,
      // isActive: false,
      attributes: {
        disable: false,
        label: `Columns Panel`,
      },
    };
  }

  // Detect Length of Selected Nodes
  get hasSelectedNodes(): boolean {
    let data: any;
    if (this.defaultView == "listView") {
      data = this.gridApi.getSelectedRows();
    } else {
      data = this.cardSelectedRows;
    }
    return data.length > 0; // True if selected Nodes >> else False
  }

  columns: any[] = [];

  loadColumns() {
    this.isSuppressedColumn = false;
    // const manageableColumns = this.gridApi?.columnController?.columnApi?.getAllGridColumns()

    // Remove Empty Column (Checkbox/ Caret)
    const manageableColumns = this.gridApi?.columnModel?.columnApi
      ?.getAllGridColumns()
      .filter((col: any) => {
        if (col.colDef.headerName != "" && col.colDef.headerName != undefined) {
          return true;
        } else {
          this.isSuppressedColumn = true;
          return false;
        }
      });
    if (manageableColumns) {
      this.columns = manageableColumns;
    }
  }

  onDrop(event: CdkDragDrop<string[]>) {
    

    const columnItem: any = this.columns[event.previousIndex];
    this.gridApi?.columnModel?.columnApi?.moveColumn(
      columnItem.colId,
      // If first column is checkbox of group icon move index
      this.isSuppressedColumn ? event.currentIndex + 1 : event.currentIndex
    );
    this.loadColumns();
    // moveItemInArray(this.columns,event.previousIndex,event.currentIndex);
  }

  toggleColumnVisible(event: MatSelectionListChange) {
    if (event.option) {
      this.gridApi?.columnModel?.columnApi?.applyColumnState({
        state: [{ colId: event.option.value, hide: !event.option.selected }],
      });
    }
    this.gridApi.sizeColumnsToFit();
  }

  applyColumns() {
    this.gridApi.setColumnDefs(this.columnDefs);
    this.loadColumns();
  }

  resetColumns() {
    this.gridApi?.columnModel?.columnApi?.resetColumnState();
    this.loadColumns();
  }

  pinGridToggle(item: any) {
    this.isGridPinned = !this.isGridPinned;
    item["pinned"] = this.isGridPinned;
    this.onPinToggleChanged.emit(item);
  }

  fullScreenToggle() {
    this.isGridFullScreen = !this.isGridFullScreen;
    if (this.isGridFullScreen) {
      this.isGridPinned = false;
      this.pinBlock = true;
    } else {
      this.pinBlock = false;
    }
    this.onFullScreenToggleChanged.emit(this.isGridFullScreen);
  }

  togglePivotMode(event: any) {
    if (event.isActive) {
      this.gridApi.openToolPanel("columns");
      // if(this.tempPivotState.length > 0) {
      //   this.gridApi.columnController.columnApi.setColumnState(this.tempPivotState);
      // }
    } else {
      // this.tempPivotState = this.gridApi.columnController.columnApi.getColumnState()
      this.gridApi.closeToolPanel();
      // this.gridApi.columnController.columnApi.resetColumnState();
    }
  }

  createChart(chartType = "groupedColumn") {
    if (this.gridApi) {
      const range = this.gridApi.getCellRanges()[0];
      const chartParams: CreateRangeChartParams = {
        chartType: chartType as ChartType,
        cellRange: {
          rowStartIndex: range.startRow.rowIndex,
          rowEndIndex: range.endRow.rowIndex,
          columnStart: range.startColumn,
          columns: range.columns,
        },
      };
      this.gridApi.createRangeChart(chartParams);
    }
  }

  toggleChartListViewChange(event: any) {
    const item = {
      operation: event.value,
    };
    this.btnClicked(item);
  }

  openGlobalFilter() {
    this.onGlobalFilterToggle.emit();
  }
}
