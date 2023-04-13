import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { IResponseSchema } from "src/app/configs/api-config";
import { manageMasterBulkUpload } from "src/app/configs/data-config/masters/manage-master-bulk-upload.config";
import { manageMasterColumnDefs } from "src/app/configs/data-config/masters/manage-master-column-def.config";
import { manageMasterTypeGridConfig } from "src/app/configs/data-config/masters/manage-master-type-grid.config";
import {
  MasterDescriptionInput,
  MasterNameInput,
} from "src/app/configs/plugin-components/manage-master-type.config";
import { DrawerPanelService } from "src/app/shared/components/rm-drawer-panel/src/rm-drawer.service";
import { RMGridComponent } from "src/app/shared/components/rm-grid/src/rm-grid.component";
import { GenerateDialog } from "src/app/shared/components/rm-notifications/dialog-method.util";
import { NotificationDialogModel } from "src/app/shared/components/rm-notifications/rm-notifications.model";
import { RmToastyService } from "src/app/shared/components/rm-toasty/rm-toasty/rm-toasty.service";
import { RMBulkDataImporterModel } from "src/app/shared/components/rm-uploader/rm-bulk-importer/rm-uploader.model";
import { getActionMapping } from "src/app/shared/utils/get-action-by-key";
import { toggleEdit } from "src/app/shared/utils/readonly-toggle";
import { sortArrayObjectByKey } from "src/app/shared/utils/sort-array-object";
import { ManageMasterService } from "src/app/shared/_http/manage-master.service";
import {
  MANAGE_MASTER_KEYS,
  SYSTEM_MASTER_ACTION_MAPPING,
} from "../extra/system-master-action.mapping";
import { MasterTypeModel } from "../model/manage-master.model";

@Component({
  selector: "manage-master-sp",
  templateUrl: "./manage-master-sp.component.html",
  styleUrls: ["./manage-master-sp.component.scss"],
  providers: [RmToastyService],
})
export class ManageMasterSPComponent implements OnInit {
  @ViewChild("grid") grid!: RMGridComponent;
  // Variables
  importFileName!: string;
  scope = this;
  masterIndex: number;
  allMasterTypes: MasterTypeModel[] = [];
  selectedMasterType!: MasterTypeModel;
  tempSelectedMasterType!: MasterTypeModel; // for storage of editing data;
  selectedMasterTypeValues: any;
  colorCardList!: any[];
  isEditMode: boolean;
  currentConfig: any;
  currentApiCall: any;
  isLoading!: boolean;
  rowData: any;
  excelConvertedFile: any;
  pageComponentVisibility = {
    showGrid: false,
    bulkUploader: false,
  };

  private keyValidationDebounce$: BehaviorSubject<any> = new BehaviorSubject(
    null
  );

  masterKeys = [
    {
      id: 1,
      primaryKey: "orgTypeId",
    },
    {
      id: 2,
      primaryKey: "sysContactTypeId",
    },
    {
      id: 3,
      primaryKey: "sysAddressTypeId",
    },
    {
      id: 4,
      primaryKey: "sysCurrencyId",
    },
    {
      id: 5,
      primaryKey: "sysTimezoneId",
    },
    {
      id: 6,
      primaryKey: "sysColourThemeId",
    },
    {
      id: 7,
      primaryKey: "sysLanguageId",
    },
    {
      id: 8,
      primaryKey: "sysDesignationId",
    },
  ];

  //temp
  dummyNav = [];
  masterUploadScheme!: RMBulkDataImporterModel[];
  @ViewChild("drawerContainerTemp") drawerContainerTemp!: TemplateRef<any>;

  // configs
  masterTypeInputConfig = {
    name: MasterNameInput,
    description: MasterDescriptionInput,
  };
  editMasterForm = new FormGroup({
    name: new FormControl(""),
    description: new FormControl(""),
  });
  loading!: boolean;
  warningString!: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toasty: RmToastyService,
    private masterService: ManageMasterService,
    private drawerControllerService: DrawerPanelService
  ) {
    this.masterIndex = 0;
    this.isEditMode = false;
    this.setupValidationDebouncer();
  }

  setupValidationDebouncer() {
    // Subscribe to `searchDecouncer$` values,
    // but pipe through `debounceTime` and `distinctUntilChanged`
    this.keyValidationDebounce$
      .pipe(debounceTime(800))
      .subscribe((params: any) => {
        // Remember value after debouncing
        // this.debouncedInputValue = term;

        // Call Validation After 800ms
        if (params) this.setWarningForRecords(params);
      });
  }

  ngOnInit() {
    // this.getAllMasters();
  }

  // Events
  onActionClicked(event: any) {
    // 
    const payload = event.data;
    // Record Id
    const recordId = this.masterKeys.find(
      (master) => master.id === this.selectedMasterType.sysMasterId
    )!;

    // Parse Null for Empty Parent
    if (recordId.id === 1 && !payload["parentOrgTypeId"])
      payload["parentOrgTypeId"] = null; //Update

    switch (event.type) {
      case "edit":
        // Keep editing
        break;
      case "save":
        this.saveMasterRecord(payload, recordId);

        break;
      case "delete":
        // Delete Record
        this.deleteItemRecordModal(
          `Record Name: ${event.data.name}`,
          payload[recordId.primaryKey]
        );
        break;
      default:
        break;
    }
    // 
  }

  saveMasterRecord(payload: any, recordId: any) {
    this.loading = true;
    this.grid.gridApi.tabToNextCell();
    if (!payload[recordId.primaryKey]) {
      //Create New Record
      payload[recordId.primaryKey] = null;
      payload["displayName"] = payload["name"]; // Display Name

      this.masterService
        .addNewSystemMasterItem(this.selectedMasterType.sysMasterId, payload)
        .subscribe((response) => {
          if (response.error) {
            this.toasty.error(response.message);
          } else {
            this.toasty.success(response.message);
            // Refresh Data
            this.getAllMasters(this.selectedMasterType.sysMasterId);
          }
          this.loading = false;
        });
    } else {
      this.loading = true;
      // Update New value
      this.masterService
        .updateSystemMasterItem(
          this.selectedMasterType.sysMasterId,
          payload[recordId.primaryKey],
          payload
        )
        .subscribe((response) => {
          if (response.error) {
            this.toasty.error(response.message);
          } else {
            this.toasty.success(response.message);
            // Refresh Data
            this.getAllMasters(this.selectedMasterType.sysMasterId);
          }
          this.loading = false;
        });
    }
  }

  download() {
    // Download All Data from Grid
    const params = {
      fileName: `RM_Export_Master__${new Date().getTime()}.csv`,
      columnKeys: this.currentConfig["columnDefs"]
        .filter((key: any) => key.field)
        .map((filtered: any) => `${filtered.field}`),
    };
    this.grid.gridApi.exportDataAsCsv(params);
  }

  bulkUpload() {
    this.excelConvertedFile = undefined;
    this.pageComponentVisibility.bulkUploader = true;
    this.drawerControllerService.createContainer(this.drawerContainerTemp);
    this.drawerControllerService.toggleDrawer(true);
    this.drawerControllerService.setTitle("Upload");
    this.drawerControllerService.setEscClose(true);
    this.drawerControllerService.changeDrawerSize("extra-small");
  }

  addNewRecord() {
    if(!this.grid.isEditing)
    this.grid.addNewRecord();
  }

  addNewOrgType() {}

  refreshAll(masterId?: any) {
    this.loading = true;
    this.masterService.getAllSystemMaster().subscribe((response) => {
      if (response.error) {
        this.toasty.error(response.message);
      } else {
        this.allMasterTypes = sortArrayObjectByKey(response.data, "sequence");
        this.masterTypeModelInit(masterId);
      }
      this.loading = false;
    });
  }

  getAllMasters(masterId?: any) {
    if (masterId) {
      this.refreshAll(masterId);
    } else {
      const allMasterTypes: IResponseSchema =
        this.activatedRoute.snapshot.data["allMasterTypes"];
      this.allMasterTypes = sortArrayObjectByKey(
        allMasterTypes?.data,
        "sequence"
      );
      this.masterTypeModelInit();
    }
  }

  masterTypeModelInit(masterId?: any) {
    const isInitial = masterId ? false : true;
    this.selectedMasterType = { ...this.allMasterTypes[this.masterIndex] };
    this.editMasterModelInit();
    this.pageComponentVisibility.showGrid = true;
    if (isInitial) this.switchConfig(1);
    else this.switchConfig(masterId);
  }

  editMasterModelInit() {
    this.tempSelectedMasterType = { ...this.selectedMasterType };
  }

  editMasterType() {
    // reduce grid height
    this.currentConfig.gridHeight = "calc(100vh - 445px)";
    this.isEditMode = true;
    toggleEdit(this.masterTypeInputConfig, false);
  }

  saveMasterType() {
    this.loading = true;
    this.isEditMode = false;
    // reset grid height
    this.currentConfig.gridHeight = "calc(100vh - 366px)";

    toggleEdit(this.masterTypeInputConfig, true);
    this.masterService
      .updateSystemMasterType(
        this.selectedMasterType.sysMasterId,
        this.selectedMasterType
      )
      .subscribe((response) => {
        if (response.error) {
          this.isEditMode = true;
          toggleEdit(this.masterTypeInputConfig, false);
          this.toasty.error(response.message);
        } else {
          this.toasty.success(response.message);
          // this.tempSelectedMasterType = { ...this.selectedMasterType };
          this.getAllMasters(this.selectedMasterType.sysMasterId);
        }
        this.loading = false;
      });
  }

  cancelMasterType() {
    // reset grid height
    this.currentConfig.gridHeight = "calc(100vh - 366px)";
    this.isEditMode = false;
    toggleEdit(this.masterTypeInputConfig, true);
    this.selectedMasterType = { ...this.tempSelectedMasterType };
  }

  selectMasterType(event: any) {
    this.cancelMasterType();
    this.masterIndex = event.index;
    this.masterTypeModelInit(event.data.sysMasterId);
    // this.switchConfig(this.selectedMasterType.sysMasterId);
  }

  tabOrderChange(event: any) {
    this.allMasterTypes = event;
    this.allMasterTypes = this.allMasterTypes.map((data, index) => {
      return { ...data, sequence: index };
    });
    this.masterService
      .updateSystemMasterSequence(this.allMasterTypes)
      .subscribe((res: IResponseSchema) => {
        if (res.error) {
          this.toasty.error(res.message);
        } else {
          this.toasty.success(res.message);
        }
      });
  }

  switchConfig(sysMasterId: any) {
    // 
    // this.isLoading = true;

    switch (sysMasterId) {
      case 1:
        manageMasterTypeGridConfig.columnDefs =
          manageMasterColumnDefs("orgType");
        // For Upload schema and import filename go to line 378
        break;
      case 2:
        manageMasterTypeGridConfig.columnDefs =
          manageMasterColumnDefs("contactType");
        this.masterUploadScheme = manageMasterBulkUpload("contactType");
        this.importFileName = "Manage-Master__Contact-Type";
        break;
      case 3:
        manageMasterTypeGridConfig.columnDefs =
          manageMasterColumnDefs("addressType");
        this.masterUploadScheme = manageMasterBulkUpload("addressType");
        this.importFileName = "Manage-Master__Address-Type";
        break;
      case 4:
        manageMasterTypeGridConfig.columnDefs =
          manageMasterColumnDefs("currencyType");
        this.masterUploadScheme = manageMasterBulkUpload("currencyType");
        this.importFileName = "Manage-Master__Currency-Type";
        break;
      case 5:
        manageMasterTypeGridConfig.columnDefs =
          manageMasterColumnDefs("timeZoneType");
        this.masterUploadScheme = manageMasterBulkUpload("timeZoneType");
        this.importFileName = "Manage-Master__TimeZone-Type";
        break;
      case 7: //Language Added
        manageMasterTypeGridConfig.columnDefs =
          manageMasterColumnDefs("languageType");
        this.masterUploadScheme = manageMasterBulkUpload("languageType");
        this.importFileName = "Manage-Master__Language-Type";
        break;
      case 8: //Designation Added
        manageMasterTypeGridConfig.columnDefs =
          manageMasterColumnDefs("designation");
        this.masterUploadScheme = manageMasterBulkUpload("designation");
        this.importFileName = "Manage-Master__Designation";
        break;
      case 6:
        this.loading = true;
        this.masterService.getThemeColor().subscribe((res: any) => {
          this.colorCardList = res;
          setTimeout(() => {
            this.loading = false;
          }, 300);
        });
        break;
      default:
        // Default Column
        manageMasterTypeGridConfig.columnDefs = manageMasterColumnDefs();
        break;
    }
    this.currentConfig = manageMasterTypeGridConfig;

    if (this.grid) {
      this.grid.isEditing = false;
      this.grid.gridApi.redrawRows();
    }

    this.getSelectedMasterDetails(sysMasterId).then(() => {
      if (sysMasterId === 1) {
        const rowData = { rowData: this.rowData };
        this.masterUploadScheme = manageMasterBulkUpload("orgType", rowData);
        this.importFileName = "Manage-Master__Organization-Type";
      }
    });

    // if (sysMasterId != 6) {
    //     setTimeout(() => {
    //         this.grid.setRowData();
    //         this.isLoading = false;
    //     }, 100);
    // }
  }

  async getSelectedMasterDetails(sysMasterId: any) {
    return new Promise<void>((resolve, request) => {
      this.loading = true;
      this.rowData = [];
      this.masterService
        .getSystemMasterDetailByMasterId(sysMasterId)
        .subscribe((res: IResponseSchema) => {
          if (res.status === "success") {
            const data = res.data;
            if (data) {
              this.rowData = data;
              // this.isLoading = false;
            }
          }
          this.loading = false;
          resolve();
        });
    });
  }

  // Dialog
  deleteItemRecordModal(record: string, recordId: any) {
    const notificationConfig: NotificationDialogModel = {
      notificationType: "delete",
      title: record,
      disableClose: true,
      message: "Are you sure you want to delete ?",
      actions: [
        { label: "no", actionCase: "close" },
        { label: "yes", actionCase: "yes" },
      ],
    };
    const dialogRef = GenerateDialog(this.dialog, notificationConfig);
    dialogRef.afterClosed().subscribe((result) => {
      switch (result) {
        case "yes":
          //   Yes - Delete Record
          this.loading = true;

          this.masterService
            .deleteSystemMasterItem(
              this.selectedMasterType.sysMasterId,
              recordId
            )
            .subscribe((response) => {
              if (response.error) {
                this.toasty.error(response.message);
              } else {
                this.toasty.success(response.message);
                // Refresh Data
                this.getAllMasters(this.selectedMasterType.sysMasterId);
              }
              this.loading = false;
            });
          break;
        default:
          break;
      }
    });
  }

  // Grid Events
  onGridReady(params: any) {
    this.switchConfig(this.selectedMasterType.sysMasterId);
  }

  onGridHeaderBtnClicked(event: string) {
    switch (event) {
      case "bulkUpload":
        this.bulkUpload();
        break;
      case "addNewRecord":
        this.addNewRecord();
        break;
      default:
        break;
    }
  }

  // Bulk Uploader Event

  getExcelConvertedData(event: any) {
    this.excelConvertedFile = event;
  }

  addPrimaryKeyToExtractedData(): any[] {
    const record: any = this.masterKeys.find(
      (master) => master.id === this.selectedMasterType.sysMasterId
    );

    return this.excelConvertedFile.extractedData.map((row: any) => {
      return {
        ...row,
        [record.primaryKey]: null,
      };
    });
  }

  submitBulkData() {
    this.pageComponentVisibility.bulkUploader = false;
    this.drawerControllerService.toggleDrawer(false);
    // this.toasty.warning("API Not Found");
    this.masterService
      .bulkUploadSystemMaster(
        this.selectedMasterType.sysMasterId,
        this.addPrimaryKeyToExtractedData()
      )
      .subscribe((response: IResponseSchema | any) => {
        if (response.error) {
          this.toasty.error(response.message);
        } else {
          this.toasty.success(response.message);
          // Refresh Data
          this.refreshAll(this.selectedMasterType.sysMasterId);
        }
      });
  }

  closeBulkDrawer() {
    this.pageComponentVisibility.bulkUploader = false;
    this.drawerControllerService.toggleDrawer(false);
  }

  setWarningForRecords(params: any) {
    this.masterService
      .getSystemMasterItemByName(
        this.selectedMasterType.sysMasterId,
        params.data["name"]
      )
      .subscribe((response: IResponseSchema) => {
        if (response.error) {
          this.toasty.error(response.message);
        } else {
          if (response.data && response.data["name"]) {
            this.warningString =
              "Record Name: " +
              response.data["name"] +
              " already exists. Please create new record.";
            this.warningForAlreadyExistRecord();
          }
        }
      });
  }

  warningForAlreadyExistRecord() {
    
    const notificationConfig: NotificationDialogModel = {
      notificationType: "warning",
      disableClose: true,
      // message:
      //   "Combination of Department Code: " +
      //   deptCode +
      //   " and Facility Id: " +
      //   facilityId +
      //   " already exists. Please select a new combination or create new.",
      message: this.warningString,
      actions: [{ label: "ok", actionCase: "close" }],
    };
    const dialogRef = GenerateDialog(this.dialog, notificationConfig);
  }

  onCellValueChanged(params: any) {
    if (params.data.state == "new") {
      if (params.data) {
        // _.debounce(() => {this.setWarningForRecords(params),1000})
        // this.setWarningForRecords(params);
        this.keyValidationDebounce$.next(params);
      }
    }
  }
}
