import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject,
  OnDestroy,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  ElementRef,
  Renderer2,
  SimpleChange,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
  AfterViewInit,
} from "@angular/core";
import { RMGridService } from "./rm-grid.service";
import {
  IServerSideGetRowsParams,
  IServerSideDatasource,
  AgChartThemeOverrides,
  RowNode,
} from "ag-grid-community";
import { HttpClient } from "@angular/common/http";
import { IAgGridConfig } from "./rm-grid.model";
import { pageConfig } from "src/app/configs/page-config";
import { AgGridAngular } from "ag-grid-angular";
import { moveItemInArray } from "@angular/cdk/drag-drop";
import { GridHeaderComponent } from "./grid-header/grid-header.component";
import { CustomLoadingOverlay } from "./custom-overlay/custom-loading-overlay.component";
import { CustomColumnHeader } from "./custom-component/custom-column-header/custom-column-header.component";
import { MatDrawer } from "@angular/material/sidenav";
import { ThemeService } from "src/app/shared/_global/theme.service";
import { DrawerPanelService } from "../../rm-drawer-panel/src/rm-drawer.service";
import * as moment from "moment";
// changeDetection: ChangeDetectionStrategy.OnPush,
@Component({
  selector: "rm-grid",
  templateUrl: "./rm-grid.component.html",
  styleUrls: ["./rm-grid.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class RMGridComponent
  implements OnInit, OnDestroy, AfterViewInit, OnChanges, OnDestroy
{
  // Variables
  isShowSelected: boolean = false;
  showSelected: boolean = false;
  public isLoading!: boolean;
  gridConfig: any;
  isEditing: boolean = false;
  columnSizing: any;
  showPagination!: boolean;
  public pageSizeOptions = new pageConfig().pageSizeOptions;
  paginationPageSize = new pageConfig().pageSize;
  totalRecords: any;
  totalRecordsSub: any;
  currentPage: number = 1;
  accoridanExpaneded: boolean = true;
  isExternalFilterPresent;
  doesExternalFilterPass;

  // Row Drag:
  rowDragStartIndex!: number;
  rowDragEndIndex!: number;

  // Input/ Output
  @Input("config") config: IAgGridConfig | any;
  @Input("loading") loading!: boolean;
  @Input() metaTemplate!: TemplateRef<any>;
  @Input() gridDrawerTemplate!: TemplateRef<any>;
  @Input() ChartViewTemplate!: TemplateRef<any>;
  @Input("scope") scope: any;
  @Input() rowData!: any[];
  // rowData;
  @Input() apiCall: any;

  //scope:any;
  // Grid Template
  @ViewChild("agGrid") gridComp!: AgGridAngular;
  @ViewChild("gridContainer", { read: ViewContainerRef })
  gridContainerRef!: ViewContainerRef;
  @ViewChild("gridTemplate") gridTemplate!: TemplateRef<any>;
  @ViewChild("gridFilter") gridFilter!: TemplateRef<any>;
  // Grid Header
  @ViewChild("gridHeader") gridHeader!: GridHeaderComponent;
  @ViewChild("drawer") drawer!: MatDrawer;

  //Pagination Template
  @ViewChild("paginationContainer", { read: ViewContainerRef })
  paginationContainer!: ViewContainerRef;
  @ViewChild("paginationTemplate") paginationTemplate!: TemplateRef<any>;
  //@Input() scope: any;

  gridApi: any;
  gridColumnApi: any;
  gridOptions: any;
  totalPagesCount!: number;
  pageNumber!: number;

  showGlobalFilter!: boolean;

  //Subscriptions
  totalPagesSubscription: any;

  //icons
  iconInjectorConfig: any;

  sideBar = {
    toolPanels: [
      {
        id: "columns",
        labelDefault: "Columns",
        labelKey: "columns",
        iconKey: "columns",
        toolPanel: "agColumnsToolPanel",
        toolPanelParams: {
          toolPanelSuppressRowGroups: true,
          toolPanelSuppressValues: true,
          toolPanelSuppressPivots: true,
          toolPanelSuppressPivotMode: true,
        },
      },
    ],
  };
  loadingOverlayComponent: any;
  loadingOverlayComponentParams: any;
  frameworkComponents: any;
  chartThemeOverrides!: AgChartThemeOverrides;
  globalThemes = [];
  public overlayNoRowsTemplate = `
    <div class="emptyChart">
      <img class="noDataImg" src="../../../../../assets/img/Icon_NoData.png" alt="Grid Data Missing" />
      <p>No Records Found!</p>
    </div>
    `;

  get isHeaderPinned() {
    if (this.gridHeader && this.gridHeader.isGridPinned) return true;
    else return false;
  }

  get isGridMaximize() {
    if (this.gridHeader && this.gridHeader.isGridFullScreen) return true;
    else return false;
  }

  get isGlobalFilterApplied() {
    let isApplied = false;
    this.config.columnDefs.forEach((col: any) => {
      if (col.globalFilter && col.globalFilter.filterState) {
        isApplied = true;
      }
    });
    return isApplied;
  }

  // selectedRows: any[] = [];
  @Input() selectedRows: any[] = [];

  constructor(
    private globalThemeService: ThemeService,
    @Inject(ChangeDetectorRef) public cdRef: ChangeDetectorRef,
    private rmgridService: RMGridService,
    private drawerControllerService: DrawerPanelService,
    private http: HttpClient,
    private el: ElementRef,
    private renderer: Renderer2
  ) {    
    // Overlays
    this.loadingOverlayComponent = "customLoadingOverlay";
    // this.loadingOverlayComponentParams = {
    //   loadingMessage: 'One moment please...',
    // };

    this.frameworkComponents = {
      customLoadingOverlay: CustomLoadingOverlay,
      // agColumnHeader: CustomColumnHeader,
    };
    this.globalThemeService.getThemes().subscribe((themes) => {
      this.globalThemes = themes;
    });
    setTimeout(() => {
      this.globalThemeService.currentTheme.subscribe((theme) => {
        const appliedTheme = this.globalThemes.find(
          (item) => item["theme-id"] == theme
        );
        if (appliedTheme) {
          const appliedThemeColor = appliedTheme["theme-base-color"];
          this.chartThemeOverrides = {
            common: {
              navigator: {
                mask: {
                  stroke: appliedThemeColor,
                },
                maxHandle: {
                  fill: appliedThemeColor,
                  stroke: appliedThemeColor,
                },
                minHandle: {
                  fill: appliedThemeColor,
                  stroke: appliedThemeColor,
                },
              },
            },
          };
        }
      });
    }, 200);
    this.isExternalFilterPresent = this.isShowSelectedFilterPresent.bind(this);
    this.doesExternalFilterPass = this.doesShowSelectedFilterPass.bind(this);
  }

  hideOrShowColumn(keys: string[], show?: boolean) {
    this.gridColumnApi.setColumnsVisible([...keys], show);
  }

  setColumnHeader(key: string, value: any) {
    this.gridApi.getColumnDef(key).headerName = value;
    this.gridApi.refreshHeader();
  }

  setPinnedBottomRowData(rows: any[]) {
    this.gridApi.setPinnedBottomRowData(rows);
  }

  setColumnSize(self?: any) {
    const scope = self || this.gridConfig;
    if (scope.config["allowColumnDataFit"] == undefined) {
      // this.gridApi.sizeColumnsToFit();
    } else {
      this.gridColumnApi.autoSizeAllColumns();
    }
  }

  fitRows() {
    if (this.gridApi && !this.gridApi.destroyCalled) {
      this.gridApi.sizeColumnsToFit();
      this.gridApi.forEachDetailGridInfo((detailGridInfo: any) => {
        detailGridInfo.api.sizeColumnsToFit();
      });
    }
  }

  resetRowHeightDefault() {
    if (!this.config.gridOptions["rowHeight"]) {
      this.config.gridOptions["rowHeight"] = 40;
    }
    if (!this.config.gridOptions["headerHeight"]) {
      this.config.gridOptions["headerHeight"] = 40;
    }
  }

  setRowData(newRowData: any[]) {
    setTimeout(() => {
      this.gridApi.setRowData(newRowData);
    }, 0);
  }

  refreshCells(params?: any) {
    this.gridApi.refreshCells({ params });
  }

  onNewColumnsLoaded(event: any) {
    this.gridApi.refreshCells({ columns: ["facilityId"] });
  }

  // setRowData() {
  //   this.rmgridService.setServerSideData(this.apiCall);
  // }

  setColumnDefs(cols: any) {
    setTimeout(() => {
      this.gridApi.setColumnDefs(cols);
    }, 10);
  }

  ngOnInit() {
    // this.rmgridService.setServerSideData(this.apiCall.apiHit, this.apiCall.conditon, this.apiCall.dataProperty);
    this.config.setData = (params: any, data: any) => {
      // 

      if (this.config.rowModelType === "serverSide") {
        this.rmgridService.setDataSource(params, data);
      } else {
        // this.rmgridService.setClientSideData(data);
        this.gridApi.setRowData(data);
      }
      // API CALL
    };

    this.gridOptions = this.config.gridOptions;
    // Set Context
    this.gridOptions["context"] = {
      componentParent: this,
    };

    if (this.gridOptions && this.gridOptions["detailCellRendererParams"]) {
      this.gridOptions["detailCellRendererParams"]["detailGridOptions"][
        "context"
      ] = {
        componentParent: this,
      };
    }

    // this.gridOptions.context = { componentParent: this };
    this.rmgridService.assignGridProperties(this.config);
    // this.gridContainerRef.createEmbeddedView(this.gridTemplate);

    if (
      this.gridOptions &&
      this.gridOptions.pagination &&
      this.gridOptions.suppressPaginationPanel
    ) {
      // this.paginationContainer.createEmbeddedView(this.paginationTemplate);
      this.showPagination = true;
    } else this.showPagination = false;

    // if ((this.config.rowModelType && this.config.rowModelType === 'serverSide') && (this.gridOptions && this.gridOptions.suppressPaginationPanel)) {
    // this.totalPagesSubscription = this.rmgridService.totalPages.subscribe((data: number) => {
    //   this.totalPagesCount = data;
    // });
    // this.totalRecordsSub = this.rmgridService.totalRecords.subscribe((data: number) => {
    //   this.totalRecords = data;
    // });
    this.resetRowHeightDefault();
  }

  ngOnChanges(e: any) {
    // Loading & Row Data
    if (e.loading || e.rowData) {
      console.log(e?.loading?.currentValue)
      setTimeout(() => {
        this.controlOverlay();
      }, 100);
    }

    // set row height
    setTimeout(() => {
      
      
      if (e.config) {
        this.resetRowHeightDefault();
      }
    }, 150);

    // Check rows passed by config
    let checkConfigTimes = 0;
    setTimeout(() => {
      const checkConfig = setInterval(() => {
        // 
        // e.config &&
        //   this.config &&
        //   this.config.rows &&
        //   this.rowData &&
        //   this.rowData != this.config.rows
        if (
          this.config &&
          this.config.rows &&
          this.rowData != this.config.rows
        ) {
          this.rowData = this.config.rows;
          checkConfigTimes += 1;
          if (this.config.rows.length > 0 || checkConfigTimes >= 20) {
            clearInterval(checkConfig);
          } 
        }
      }, 100);
    }, 150);
  }

  get getShowSelectedToggleStatus() {
    return this.gridHeader?.showSelectedConfig?.isActive;
  }

  ngAfterViewInit() {
    if (this.gridComp) {
      // Disabled because user is not able to resize column by dragging it.
      // setInterval(() => {
      //   this.fitRows();
      // }, 50);
      window.addEventListener("resize", () => {
        this.fitRows();
      });
    }
    // this.renderer.setStyle(this.el.nativeElement.querySelector('.aggrid-container'), 'height', this.config.gridHeight ? this.config.gridHeight + 'px' : '150px')
  }

  controlOverlay() {
    if (this.loading == true) {
      if (this.gridApi) {
        this.gridApi.showLoadingOverlay();
      }
    } else {
      if (this.gridApi) {
        this.gridApi.hideOverlay();
        if (this.gridApi.getDisplayedRowCount() == 0) {
          this.gridApi.showNoRowsOverlay();
        }
      }
    }
  }

  onRowDataChanged(params: any) {
    const totalRows = params.api.paginationGetRowCount();
    // const totalRows = params.api.rowModel.rowsToDisplay.length;
    // this.rmgridService.setTotalRecords(totalRows);
    this.totalRecords = totalRows;
    this.updatePageCount(this.paginationPageSize);
    this.fitRows(); // update column size on data update
    // setTimeout(() => {
    //   if (this.gridComp) {
    //     this.gridApi.forEachNodeAfterFilter((node) => {
    //       // select the node
    //       this.cleanSelectedRows();
    //       const nodeFound = this.selectedRows.some(
    //         (row: any) => row == node.data
    //       );
    //       
    //       node.setSelected(nodeFound);
    //     });
    //   }
    // }, 2000);
  }

  updatePageCount(size: any) {
    // Total Number of Pages
    this.totalPagesCount = Math.ceil(this.totalRecords / size);
    // this.rmgridService.updateTotalPagesCount(size);
  }

  paginationUpdate(params: any) {
    const totalRows = params.api.paginationGetRowCount();
    this.totalRecords = totalRows;
    this.updatePageCount(this.paginationPageSize);
  }

  onColumnRowGroupChanged(params: any) {
    this.paginationUpdate(params);
  }

  onToolPanelVisibleChanged(event: any) {
    this.fitRows();
  }

  onColumnsChanged(event: any) {
    let self = this;
    self.config.events.onColumnsChanged &&
      self.scope[self.config.events.onColumnsChanged](event);
    this.fitRows();
  }

  onGridReady(params: any) {
    if (this.selectedRows.length > 0) {
      setTimeout(() => {
        // this.gridComp.rowData = this.rowData;
        // this.gridApi.deselectAll();
        // this.showSelected = false;
        // this.gridApi.onFilterChanged();
        // this.gridApi.refreshCells();
        this.gridApi.forEachNode((node: any, i: any) => {
          if (node?.data?.checkboxConfig?.isChecked) node.setSelected(true);
        });
        this.gridApi.onFilterChanged();
      }, 10);
    }
    // 
    let self = this;
    self.gridApi = params.api;
    self.gridColumnApi = params.columnApi;
    // self.gridApi.sizeColumnsToFit()
    // self.gridColumnApi.autoSizeAllColumns()

    this.setColumnSize(self);
    this.rmgridService.assignGridApis(params);
    // if (this.config.rowModelType === "serverSide") {
    //   this.createDataSource(params);
    // }
    // if (this.config.rowModelType === "clientSide") {
    //   this.setRowData();
    // } else {
    // }

    // If onGridReady Exist
    if (
      self.config.events &&
      self.config.events.onGridReady &&
      self.scope[self.config.events.onGridReady]
    ) {
      self.scope[self.config.events.onGridReady](params);
    }
    this.addCardSelectionConfigToData();

    this.pageNumber = this.gridApi.paginationGetCurrentPage() + 1;
  }

  destroyGrid() {
    this.gridComp.api = null!;
    this.gridComp.columnApi = null!;
  }

  onColumnPivotModeChanged(event: any) {
    
  }

  addCardSelectionConfigToData() {
    if (this.rowData)
      this.rowData = this.rowData.map((row) => {
        if (!row.checkboxConfig)
          row["checkboxConfig"] = {
            isChecked: false,
            attributes: {},
          };
        return row;
      });
    this.gridApi.redrawRows();
  }

  // Pagination Functions
  goToFirstPage() {
    this.gridApi.paginationGoToFirstPage();
  }

  goToLastPage() {
    this.gridApi.paginationGoToLastPage();
  }

  goToNextPage() {
    this.gridApi.paginationGoToNextPage();
  }

  goToPreviousPage() {
    this.gridApi.paginationGoToPreviousPage();
  }
  onPageSizeChanged(event: any) {
    const value = event;
    this.gridApi.paginationSetPageSize(Number(value));
    this.paginationPageSize = value;
    this.updatePageCount(value);
    this.fitRows();
  }

  onCurrentPageChanged(event: any) {
    let pageNo = parseInt(event.target.value);
    if (pageNo > this.totalPagesCount) pageNo = this.totalPagesCount;
    this.gridApi.paginationGoToPage(pageNo - 1); // need to pass index so subtract by 1 to the page.
  }

  onRowExpanded(event: any) {
    this.isEditing = false;
    this.fitRows();
  }

  onRowDataUpdated(event: any) {
    // Added New Row Data
    // 
  }

  createDataSource(event: any) {
    var self = this;

    let dataSource: IServerSideDatasource = {
      getRows: (params: IServerSideGetRowsParams) => {
        self.scope[self.config.events.onGridReady](params, event);
      },
    };
    this.gridApi.setServerSideDatasource(dataSource);
  }

  dragStopped(event: any) {
    let self = this;
    self.config.events.onDragStopped &&
      self.scope[self.config.events.onDragStopped](event);
  }

  onPrevious() {
    this.gridApi.paginationGoToPreviousPage();
  }

  onNext() {
    this.gridApi.paginationGoToNextPage();
  }

  onPaginationChanged(event: any) {
    var self = this;
    if (this.gridOptions && this.gridOptions.suppressPaginationPanel) {
      this.pageNumber = event.api.paginationGetCurrentPage() + 1;
      let list =
        this.el.nativeElement.getElementsByClassName("pagination-icon");
      if (list && list.length > 0) {
        this.renderer.removeClass(list[0], "disabled");
        this.renderer.removeClass(list[1], "disabled");
        this.renderer.removeClass(list[2], "disabled");
        this.renderer.removeClass(list[3], "disabled");
        if (this.pageNumber === 1) {
          this.renderer.addClass(list[0], "disabled");
          this.renderer.addClass(list[1], "disabled");
        }
        if (this.pageNumber === this.totalPagesCount) {
          this.renderer.addClass(list[2], "disabled");
          this.renderer.addClass(list[3], "disabled");
        }
      }
    }

    if (self.config?.events?.onPaginationChanged) {
      self.scope[self.config.events.onPaginationChanged](event);
    }
  }

  onFilterChanged(event: any) {
    if (this.gridApi) {
      this.gridApi.hideOverlay();
      if (this.gridApi.getDisplayedRowCount() == 0) {
        this.gridApi.showNoRowsOverlay();
      }
      this.paginationUpdate(event);
    }
    var self = this;
    if (
      self.config.events.onFilterChanged &&
      self.scope[self.config.events.onFilterChanged]
    ) {
      self.scope[self.config.events.onFilterChanged](event);
    }
  }
  // onFilterChangedOLD(event) {
  //   var self = this;
  //   if (this.gridOptions && this.gridOptions.suppressPaginationPanel) {
  //     this.totalPagesCount = this.gridApi.paginationGetTotalPages();
  //   }
  //   if (this.config.rowModelType === "serverSide") {
  //     let dataSource: IServerSideDatasource = {
  //       getRows: (params: IServerSideGetRowsParams) => {
  //         if (self.config.events.onFilterChanged)
  //           self.scope[self.config.events.onFilterChanged](params, event);
  //       },
  //     };
  //     this.gridApi.setServerSideDatasource(dataSource);
  //   } else {
  //     // if (self.config.events.onFilterChanged) {
  //     //   self.scope[self.config.events.onFilterChanged](event);
  //     // }
  //   }
  // }

  onSort(event: any) {
    var self = this;
    if (this.config.rowModelType === "serverSide") {
      let dataSource: IServerSideDatasource = {
        getRows: (params: IServerSideGetRowsParams) => {
          if (self.config.events.onSort)
            self.scope[self.config.events.onSort](params, event);
        },
      };
      this.gridApi.setServerSideDatasource(dataSource);
    } else {
      if (self.config.events.onSort) {
        self.scope[self.config.events.onSort](event);
      }
    }
  }

  onSelectionChanged(event: any) {
    if (this.gridHeader) this.gridHeader.gridSelectionChanged(event);
    var self = this;
    self.config.events.onSelectionChanged &&
      self.scope[self.config.events.onSelectionChanged](event);
  }

  onRowSelected(event: any) {
    // Send selected to Card
    this.selectedRows = this.gridComp ? this.gridApi.getSelectedRows() : [];

    var self = this;
    self.config.events.onRowSelected &&
      self.scope[self.config.events.onRowSelected](event);
  }

  onGridSizeChanged(event: any) {
    var self = this;
    self.config.events.onGridSizeChanged &&
      self.scope[self.config.events.onGridSizeChanged](event);
  }

  onLinkClicked(event: any) {
    var self = this;
    self.config.events.onLinkClicked &&
      self.scope[self.config.events.onLinkClicked](event);
  }

  onActionClicked(event: any) {
    var self = this;
    // Child Events
    // const childGridConfig = self.config.gridOptions.detailCellRendererParams;
    // if (childGridConfig) {
    //   childGridConfig.events.onActionClicked &&
    //     self.scope[self.config.events.onActionClicked](event);
    // } else {
    self.config.events.onActionClicked &&
      self.scope[self.config.events.onActionClicked](event);
    // }
  }

  onCellValueChanged(event: any) {
    var self = this;
    // Child Events
    self.config.events.onCellValueChanged &&
      self.scope[self.config.events.onCellValueChanged](event);
  }

  onGridHeaderBtnClicked(event: any) {
    var self = this;
    self.config.events.onGridHeaderBtnClicked &&
      self.scope[self.config.events.onGridHeaderBtnClicked](event);
  }

  // Card Action Event
  onCardActionClicked(event: any) {
    var self = this;
    self.config.events.onCardActionClicked &&
      self.scope[self.config.events.onCardActionClicked](event);
  }

  // onRowEditingStarted(event: any) {
  //   var self = this;
  //   self.config.events.onRowEditingStarted && self.scope[self.config.events.onRowEditingStarted](event);
  // }

  // onRowEditingStopped(event: any) {
  //   var self = this;
  //   self.config.events.onRowEditingStopped && self.scope[self.config.events.onRowEditingStopped](event);
  // }

  addNewRecord() {
    // if(!this.isEditing) {

    const filteredFields = this.config["columnDefs"].filter(
      (key: any) => key.field
    );
    let newRow: any = {
      state: "new",
    };
    for (const key of filteredFields) {
      newRow[key.field] = null!;
    }
    newRow["actions"] = [
      {
        icon: "edit",
        action: "edit",
        mode: "view",
      },
      {
        icon: "trashCan",
        action: "delete",
        mode: "view",
      },
      {
        icon: "save",
        action: "save",
        mode: "editing",
      },
      {
        icon: "cross",
        action: "cancel",
        mode: "editing",
      },
    ];

    // 
    this.gridApi.applyTransaction({
      add: [newRow],
      //, addIndex: index || 0
    });
    this.isEditing = true;
    const index = this.gridApi.getDisplayedRowCount() - 1;
    const editColKey = this.config.columnDefs[0].field; // Get 1st Column FieldKey
    this.gridApi.startEditingCell({ rowIndex: index, colKey: editColKey });
    // }
  }
  densityChanged(e: any) {
    console.log(e);
  }

  addChildGridRow(node: any) {
    const api = node.detailNode.detailGridInfo.api;
    const colAPI = node.detailNode.detailGridInfo.columnApi;

    const filteredFields = colAPI
      .getAllColumns()
      .filter((key: any) => key.colDef.field);
    let newRow: any = {
      state: "new",
      parent: node.data,
    };
    for (const key of filteredFields) {
      newRow[key.colDef.field] = null;
    }
    newRow["actions"] = [
      {
        icon: "edit",
        action: "edit",
        mode: "view",
      },
      {
        icon: "trashCan",
        action: "delete",
        mode: "view",
      },
      {
        icon: "save",
        action: "save",
        mode: "editing",
      },
      {
        icon: "cross",
        action: "cancel",
        mode: "editing",
      },
    ];

    this.isEditing = true;
    api.applyTransaction({
      add: [newRow],
      //, addIndex: index || 0
    });

    const index = api.getDisplayedRowCount() - 1;
    const editColKey = colAPI.getAllColumns()[0].colId; // Get 1st Column FieldKey
    api.startEditingCell({ rowIndex: index, colKey: editColKey });
  }

  onRowEditingStarted(event: any) {
    this.isEditing = true;
    document
      .querySelectorAll(
        ".ag-row:not(.ag-row-selected):not(.ag-row-editing):not(.pointer-events-none)"
      )
      .forEach((row) => {
        row.classList.add("pointer-events-none");
      });
    document
      .querySelectorAll(".ag-header:not(.pointer-events-none)")
      .forEach((row) => {
        row.classList.add("pointer-events-none");
      });
  }
  onRowEditingStopped(event: any) {
    this.isEditing = false;
    document.querySelectorAll(".ag-row.pointer-events-none").forEach((row) => {
      row.classList.remove("pointer-events-none");
    });
    document
      .querySelectorAll(".ag-header.pointer-events-none")
      .forEach((row) => {
        row.classList.remove("pointer-events-none");
      });
  }

  onCellEditingStarted(event: any) {
    // 
    // document
    //   .querySelectorAll(
    //     ".ag-cell:not(.ag-cell-inline-editing):not(.pointer-events-none)"
    //   )
    //   .forEach((row) => {
    //     row.classList.add("pointer-events-none");
    //   });
    // document
    //   .querySelectorAll(".ag-header:not(.pointer-events-none)")
    //   .forEach((row) => {
    //     row.classList.add("pointer-events-none");
    //   });
  }

  onCellEditingStopped(event: any) {
    // 
    // document.querySelectorAll(".ag-cell.pointer-events-none").forEach((row) => {
    //   row.classList.remove("pointer-events-none");
    // });
    // document
    //   .querySelectorAll(".ag-header.pointer-events-none")
    //   .forEach((row) => {
    //     row.classList.remove("pointer-events-none");
    //   });
  }

  onRowDragEnter(event: any) {
    this.rowDragStartIndex = event.overIndex;
  }

  onRowDragEnd(event: any) {
    const self = this;
    this.rowDragEndIndex = event.overIndex;
    // Move items in array
    // 
    moveItemInArray(this.rowData, this.rowDragStartIndex, this.rowDragEndIndex);
    self.config.events.onDragReordered &&
      self.scope[self.config.events.onDragReordered](this.rowData);
  }

  onRowDragMove(event: any) {
    // 
  }

  // View Changed
  viewChanged(view: string) {
    // 
    if (view == "cardView") {
      this.config.isGridView = true;
    } else if (view == "listView") {
      // List View
      this.config.isGridView = false;
    } else if (view == "list-view") {
      this.config.isChartView = false;
    } else if (view == "chart-view") {
      this.config.isChartView = view;
    }
  }

  // Make way for Noddy
  cleanSelectedRows() {
    this.selectedRows.forEach((element) => {
      delete element["checkboxConfig"];
    });
  }

  // Find Action Column
  get actions() {
    const actionColumn = this.config.columnDefs.find(
      (col: any) => col.headerName == "Actions"
    );
    let actions = null;
    if (actionColumn) {
      actions =
        actionColumn.cellRendererParams &&
        typeof actionColumn.cellRendererParams != "function";
      if (actions) {
        actions = actionColumn.cellRendererParams.actions
          ? actionColumn.cellRendererParams.actions
          : null;
      } else {
        actions = actionColumn.fallBackActions;
        // actionColumn.cellRendererParams()
      }
    }
    return actions;
  }

  // Check if Card Selectable
  get cardSelectable() {
    return this.config.columnDefs.some((col: any) => col.checkboxSelection);
  }

  getChartToolbarItems() {
    return ["chartSettings", "chartData", "chartFormat", "chartDownload"];
  }

  ngOnDestroy() {
    // this.gridComp.api.destroy();
    this.gridApi = undefined;
    this.gridColumnApi = undefined;
    // this.rmgridService.destroyGridAPIs();
    // this.destroyGrid();
    if (this.totalPagesSubscription) {
      this.totalPagesSubscription.unsubscribe();
    }
    if (this.totalRecordsSub) {
      this.totalRecordsSub.unsubscribe();
    }
  }

  // Show Selected Logic
  isShowSelectedFilterPresent() {
    // return this.isShowSelected;
    return this.showSelected || this.isGlobalFilterApplied;
  }

  doesShowSelectedFilterPass(node: RowNode) {
    if (this.showSelected) return node.isSelected();
    else if (this.isGlobalFilterApplied) {
      let filtersToApply: any[] = [];
      this.config.columnDefs.forEach((col: any) => {
        if (col.globalFilter && col.globalFilter.filterState) {
          const filterToApply = {
            field: col.field,
            globalFilter: col.globalFilter,
          };
          filtersToApply.push(filterToApply);
        }
      });
      return eval(
        this.createConditionalStatementBasedOnFilter(filtersToApply, node)
      );
      // return node.data[filterToApply.field].includes(filterToApply.condition.searchBy)
    } else return true;
  }

  createConditionalStatementBasedOnFilter(
    filtersToApply: any[],
    node: RowNode
  ) {
    let conditionString = "";
    filtersToApply.forEach((filter) => {
      let value = node.data[filter.field];
      switch (filter.globalFilter.filterType) {
        case "text":
          value =
            typeof value == "string"
              ? value.toLowerCase()
              : value == null || undefined
              ? ""
              : value;
          switch (filter.globalFilter.filterState.conditionType) {
            case "contains":
              conditionString += conditionString.length == 0 ? "" : " & ";
              conditionString += `${value.includes(
                filter.globalFilter.filterState.searchBy.toLowerCase()
              )}`;
              break;
            case "does-not-contains":
              conditionString += conditionString.length == 0 ? "" : " & ";
              conditionString += `${!value.includes(
                filter.globalFilter.filterState.searchBy.toLowerCase()
              )}`;
              break;
            case "equals":
              conditionString += conditionString.length == 0 ? "" : " & ";
              conditionString += `${
                value == filter.globalFilter.filterState.searchBy.toLowerCase()
              }`;
              break;
            case "not-equals":
              conditionString += conditionString.length == 0 ? "" : " & ";
              conditionString += `${
                value != filter.globalFilter.filterState.searchBy.toLowerCase()
              }`;
              break;
            case "begins-with":
              break;
            case "ends-with":
              break;

            default:
              break;
          }
          break;
        case "number":
          value =
            typeof value == "number"
              ? value
              : value == null || undefined
              ? 0
              : NaN;
          switch (filter.globalFilter.filterState.conditionType) {
            case "equals":
              conditionString += conditionString.length == 0 ? "" : " & ";
              conditionString += `${
                value == filter.globalFilter.filterState.searchBy
              }`;
              break;
            case "not-equals":
              conditionString += conditionString.length == 0 ? "" : " & ";
              conditionString += `${
                value != filter.globalFilter.filterState.searchBy
              }`;
              break;
            case "more-than":
              conditionString += conditionString.length == 0 ? "" : " & ";
              conditionString += `${
                value > filter.globalFilter.filterState.searchBy
              }`;
              break;
            case "less-than":
              conditionString += conditionString.length == 0 ? "" : " & ";
              conditionString += `${
                value < filter.globalFilter.filterState.searchBy
              }`;
              break;
            case "more-than-equals":
              conditionString += conditionString.length == 0 ? "" : " & ";
              conditionString += `${
                value >= filter.globalFilter.filterState.searchBy
              }`;
              break;
            case "less-than-equals":
              conditionString += conditionString.length == 0 ? "" : " & ";
              conditionString += `${
                value <= filter.globalFilter.filterState.searchBy
              }`;
              break;

            default:
              break;
          }
          break;
        case "select":
          let items = [];
          items = filter.globalFilter.filterState.selectedItems;
          const itemExist =
            items.filter((item: any) => {
              if (item == "Blank") {
                return value == null;
              } else {
                return item == value;
              }
            }).length > 0;
          conditionString += conditionString.length == 0 ? "" : " & ";
          conditionString += `${itemExist}`;
          break;
        case "date":
          if (value != null && value != undefined) {
            const dateData = moment(value);
            const period = filter.globalFilter.filterState.period;
            conditionString += conditionString.length == 0 ? "" : " & ";
            switch (period) {
              case "today":
                conditionString += `${dateData.isBetween(
                  moment().startOf("day"),
                  moment().endOf("day")
                )}`;
                break;
              case "yesterday":
                conditionString += `${dateData.isBetween(
                  moment().subtract(1, "day").startOf("day"),
                  moment().subtract(1, "day").endOf("day")
                )}`;
                break;
              case "tomorrow":
                conditionString += `${dateData.isBetween(
                  moment().add(1, "day").startOf("day"),
                  moment().add(1, "day").endOf("day")
                )}`;
                break;
              case "rolling-x":
                const rollingXDays = parseInt(
                  filter.globalFilter.filterState.rollingXDays
                );
                conditionString += `${dateData.isBetween(
                  moment().startOf("day"),
                  moment().add(rollingXDays, "day").endOf("day")
                )}`;
                break;
              case "next-x":
                const nextXDays = parseInt(
                  filter.globalFilter.filterState.nextXDays
                );
                conditionString += `${dateData.isBetween(
                  moment().startOf("day"),
                  moment().add(nextXDays, "day").endOf("day")
                )}`;
                break;
              case "from-x-to-current":
                const fromXDate = moment(
                  filter.globalFilter.filterState.fromXDate
                );
                conditionString += `${dateData.isBetween(
                  fromXDate.startOf("day"),
                  moment().endOf("day")
                )}`;
                break;

              default:
                break;
            }
          }

          break;

        default:
          break;
      }
    });
    return conditionString;
  }

  onShowSelectedChanged(status: any) {
    // this.isShowSelected = status;
    if (!this.config.isGridView) {
      this.showSelected = status;
      this.gridApi.onFilterChanged();
    }
  }

  pinToggleGrid(event: any) {
    event["operation"] = this.config?.gridId;
    setTimeout(() => {
      if (event.pinned) {
        (
          document.querySelector(
            `#agGrid.${this.config?.gridId}`
          ) as HTMLElement
        ).style.height = this.config.pinnedHeight;
      } else {
        (
          document.querySelector(
            `#agGrid.${this.config?.gridId}`
          ) as HTMLElement
        ).style.height = this.config.gridHeight;
      }
      setTimeout(() => {
        this.fitRows();
      }, 100);
      this.onGridHeaderBtnClicked(event);
    }, 100);
  }

  fullScreenToggleGrid(event: any) {
    if (event) {
      (
        document.querySelector(`#agGrid.${this.config?.gridId}`) as HTMLElement
      ).style.height = "100vh";
      // this.config.isAccordian = false;
    } else {
      (
        document.querySelector(`#agGrid.${this.config?.gridId}`) as HTMLElement
      ).style.height = this.config.gridHeight;
      // if(this.config.pinnedHeight) this.config.isAccordian = true;
    }
    setTimeout(() => {
      this.fitRows();
      // Pass Pin Top Event to disable pin logic at component
      const pinOff = {
        type: "pin-top",
        pinned: false,
        operation: this.config?.gridId,
      };
      this.onGridHeaderBtnClicked(pinOff);
    }, 100);
  }

  openGlobalFilter() {
    this.drawerControllerService.setTitle("Filter");
    this.drawerControllerService.createContainer(this.gridFilter);
    this.drawerControllerService.setEscClose(true);
    this.drawerControllerService.changeDrawerSize("medium");
    this.showGlobalFilter = true;
    this.drawerControllerService.toggleDrawer(true);
  }

  filterActions(event: any) {
    const filterCols = event.data;
    switch (event.type) {
      case "apply":
        this.config.columnDefs.forEach((col: any) => {
          if (col.globalFilter) {
            const filteringCol = filterCols.find(
              (filteredCol: any) => filteredCol.headerName == col.headerName
            );
            if (filteringCol) {
              col.globalFilter.filterState =
                filteringCol.globalFilter.filterState;
            }
          }
        });
        
        this.gridApi.onFilterChanged();
        break;
      case "cancel":
        break;
      case "reset":
        this.config.columnDefs.forEach((col: any) => {
          if (col.globalFilter) {
            const filteringCol = filterCols.find(
              (filteredCol: any) => filteredCol.headerName == col.headerName
            );
            if (filteringCol) {
              col.globalFilter.filterState =
                filteringCol.globalFilter.filterState;
            }
          }
        });
        
        this.gridApi.onFilterChanged();
        break;
      default:
        break;
    }
    this.drawerControllerService.setTitle(null || '');
    this.drawerControllerService.changeDrawerSize("small");
    this.drawerControllerService.toggleDrawer(false);
    this.showGlobalFilter = false;
  }
}
