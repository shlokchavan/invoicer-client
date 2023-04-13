import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import * as _ from "lodash";
import { interval, Observable } from "rxjs";
import { RMChartComponent } from "../rm-chart/rm-chart.component";
import { RmToastyService } from "../rm-toasty/rm-toasty/rm-toasty.service";
import {
  defaultWidgetActions,
  IRMWidgetAction,
  IRMWidgetConfig,
} from "./rm-widget.model";
import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { DomPortal } from "@angular/cdk/portal";
import { RMGridComponent } from "../rm-grid/src/rm-grid.component";
import { ExcelService } from "../../_global/export.service";

@Component({
  selector: "rm-widget",
  templateUrl: "./rm-widget.component.html",
  styleUrls: ["./rm-widget.component.scss"],
})
export class RmWidgetComponent implements OnInit, OnChanges {
  // View Child
  @ViewChild("widgetChart") widgetChart: RMChartComponent;
  @ViewChild("gridChart") gridChart: RMGridComponent;
  @ViewChild("widgetElementRef") widgetElementRef: ElementRef<HTMLElement>;
  @ContentChild(TemplateRef) filterTemplaterRef: TemplateRef<any>;
  // Input
  @Input() config?: IRMWidgetConfig;
  @Input() loading?: boolean;
  @Input() serviceObject?: Observable<any>;

  // Output Emitter
  @Output() filterChange: EventEmitter<any> = new EventEmitter();
  @Output() onChartClicked: EventEmitter<any> = new EventEmitter();
  fullscreenView: boolean = false;
  // Variables
  downloadActions = [
    { label: "Download Chart as PNG", event: 'download-png' },
    { label: "Download as CSV", event: 'download-csv' }
  ]
  overlayRef: OverlayRef;
  currentLevel = 0;
  configsLoaded = 0;
  gridLoading = false;
  tempStore = {
    config: null,
    gridDataConfig: null,
  };

  constructor(
    private toasty: RmToastyService, 
    private overlay: Overlay,
    private excelService: ExcelService) {}

  ngOnInit(): void {
    if (Array.isArray(this.config.filterOptions)) {
      this.config.selectedOption = this.config.filterOptions[0];
    }
  }

  ngOnChanges(e) {
    // Default Widget Actions
    this.assignActions();
    if (e.serviceObject && this.serviceObject) {
      this.recallAPI();
    }
  }

  get isChartEmpty() {
    return (this.configsLoaded < 5 ? this.chartConfig : this.tempStore.config)['isEmpty']
  }

  // Getter
  get chartConfig() {
    const dataConfig = this.accessConfigByIndex(this.currentLevel);
    let newConfig = null;
    if (dataConfig.customChartConfig) {
      newConfig = dataConfig.customChartConfig.rawDataConverter(
        dataConfig.customChartConfig.rawData,
        dataConfig,
        dataConfig.customChartConfig?.filterVal,
        this.config
      );
    } else {
      newConfig = dataConfig;
    }
    // this.refreshChart();
    if (this.tempStore.config != newConfig ) {
      if (
        dataConfig.customChartConfig &&
        newConfig.customChartConfig.viewType == "chart"
      ) {
        this.refreshChart();
      }
      //  else if (
      //   dataConfig.customChartConfig &&
      //   newConfig.customChartConfig.viewType == "grid"
      // ) {
      //   this.tempStore.gridDataConfig = newConfig;
      //   if (this.fullscreenView) {
      //     newConfig.gridConfig.gridHeight = newConfig.gridConfig.gridFullHeight;
      //   } else {
      //     newConfig.gridConfig.gridHeight =
      //       newConfig.gridConfig.gridDefaultHeight;
      //   }
      //   
      // }
      this.tempStore.config = null;
    }
    if(
      dataConfig.customChartConfig &&
      newConfig.customChartConfig.viewType == "grid"
    ) {
      this.tempStore.gridDataConfig = newConfig;
      if (this.fullscreenView) {
        newConfig.gridConfig.gridHeight = newConfig.gridConfig.gridFullHeight;
      } else {
        newConfig.gridConfig.gridHeight =
          newConfig.gridConfig.gridDefaultHeight;
      }
    }
    this.tempStore.config = newConfig;
    if(this.configsLoaded < 5) {
      this.configsLoaded += 1;
      this.gridLoading = true;
    }
    if(this.configsLoaded == 4) {
      this.gridLoading = false;
      if(this.widgetChart) this.widgetChart.updateChart();
    }
    return newConfig;
  }

  get dataConfig() {
    return this.accessConfigByIndex(this.currentLevel);
  }

  assignActions() {
    // Setup Maximize/ Minimise
    this.config.actions = defaultWidgetActions.map(
      (action: IRMWidgetAction) => {
        let newAction: IRMWidgetAction = action;
        if (action.event == "maximise" || action.event == "minimize") {
          newAction.event = this.fullscreenView ? "minimize" : "maximise";
          newAction.icon = this.fullscreenView ? "minimize" : "maximise";
          newAction.tooltip = this.fullscreenView ? "Minimize" : "Maximize";
        }
        return {
          ...newAction,
        };
      }
    );
  }

  accessConfigByIndex(level: number) {
    // let levelConfig = this.config.dataConfig;
    // for (let index = 1; index <= level; index++) {
    //   levelConfig = levelConfig.dataConfig;
    // }
    let levelConfig = null;
    switch (level) {
      case 0:
        levelConfig = this.config.dataConfig;
        break;
      case 1:
        levelConfig = this.config.dataConfig.dataConfig;
        break;
      case 2:
        levelConfig = this.config.dataConfig.dataConfig.dataConfig;
        break;
      case 3:
        levelConfig = this.config.dataConfig.dataConfig.dataConfig.dataConfig;
        break;
      case 4:
        levelConfig =
          this.config.dataConfig.dataConfig.dataConfig.dataConfig.dataConfig;
        break;

      default:
        break;
    }
    return levelConfig;
  }

  // Events
  actionClicked(type: string) {
    switch (type) {
      case "refresh":
        this.recallAPI();
        break;
      case "maximise":
      case "minimize":
        this.fullscreenView = !this.fullscreenView;
        this.toggleFullScreen();
        this.assignActions();
        break;
      case "download":
        this.downloadGrid();
      default:
        break;
    }
  }

  toggleFullScreen() {
    if (this.fullscreenView) {
      this.overlayRef = this.overlay.create();
      const userProfilePortal = new DomPortal(this.widgetElementRef);
      this.overlayRef.attach(userProfilePortal);
    } else {
      this.overlayRef.detach();
    }
    setTimeout(() => {
      if(this.gridChart) {
        this.gridChart.fitRows()
      }
    }, 100);
  }

  selectionChange(type: string, event: any) {
    // this.clearChart();
    event["type"] = type;
    switch (type) {
      case "viewBy":
        this.configsLoaded = 0;
        this.config.selectedOption = event;
        this.filterChange.emit(event);
        break;

      default:
        break;
    }
    setTimeout(() => {
      this.refreshChart();
    }, 10);
  }

  // Chart Events
  onChartClick(event: any) {
    if(event) {
      const oldConfig = this.accessConfigByIndex(this.currentLevel);
      if (
        this.currentLevel < this.config.maxLevel &&
        event.index != undefined &&
        event.index != null &&
        event.datasetIndex != undefined &&
        event.datasetIndex != null
      ) {
        const clickedData = {
          data: oldConfig.data.datasets[event.datasetIndex].data[event.index],
          label: null,
          context: this,
        };
        if (oldConfig.data.labels && oldConfig.data.labels.length > 0) {
          clickedData.label = oldConfig.data.labels[event.index];
        }
        if (!clickedData.label) {
          clickedData.label = clickedData.data.label;
        }
        this.config.breadcrumbs[this.currentLevel].isActive = false;
        this.config.breadcrumbs[this.currentLevel]["config"] = _.cloneDeep(
          this.chartConfig
        );
        this.config.breadcrumbs.push({
          title: clickedData.label,
          isActive: true,
          config: null,
        });
        this.currentLevel += 1;
        if (
          this.accessConfigByIndex(this.currentLevel).customChartConfig.rawData
        ) {
          this.accessConfigByIndex(
            this.currentLevel
          ).customChartConfig.filterVal = clickedData.label;
          this.accessConfigByIndex(this.currentLevel).customChartConfig.rawData =
            this.config.dataConfig.customChartConfig.rawData;
        }
        this.onChartClicked.emit(clickedData);
        this.configsLoaded = 0;
      } else {
        // 
        const clickedData = {
          dataLabel: this.widgetChart.config.data.labels[event.index],
          allLabels: this.widgetChart.config.data.labels,
          context: this,
        };
        this.onChartClicked.emit(clickedData);
        this.configsLoaded = 0;
      }
    }
  }

  gotoView(level: number) {
    this.currentLevel = level;
    switch (level) {
      case 0:
        this.config.dataConfig = this.config.breadcrumbs[level].config;
        break;
      case 1:
        this.config.dataConfig.dataConfig =
          this.config.breadcrumbs[level].config;
        break;
      case 2:
        this.config.dataConfig.dataConfig.dataConfig =
          this.config.breadcrumbs[level].config;
        break;
      case 3:
        this.config.dataConfig.dataConfig.dataConfig.dataConfig =
          this.config.breadcrumbs[level].config;
        break;
      case 4:
        this.config.dataConfig.dataConfig.dataConfig.dataConfig.dataConfig =
          this.config.breadcrumbs[level].config;
        break;

      default:
        break;
    }
    this.config.breadcrumbs[level].isActive = true;
    this.config.breadcrumbs.splice(level + 1);
    this.configsLoaded = 0
  }

  refreshChart() {
    if (this.widgetChart) {
      setTimeout(() => {
        this.widgetChart.updateChart();
        this.configsLoaded = 0
      }, 100);
    }
  }

  downloadGrid() {
    this.gridChart.gridHeader.download({ fileName: this.config.exportTitle || this.config.title || "Title" });
  }
  
  downloadChart(event) {
    let extraInfoForFile = "";
    if(this.config?.filterType == "viewBy") {
      const selectedOptionView = this.config?.selectedOption?.label;
      if(selectedOptionView) {
        extraInfoForFile = selectedOptionView;
      }
    }
    console.log(extraInfoForFile)
    switch (event) {
      case 'download-png':
        if(this.widgetChart)
        this.widgetChart.downloadCanvas(this.config.exportTitle + `${extraInfoForFile != "" ? "_"+extraInfoForFile : ""}` 
        || this.config.title + `${extraInfoForFile != "" ? "_"+extraInfoForFile : ""}`
        || "Title");
        break;
      case 'download-csv':
        const data = this.chartConfig.customChartConfig.rawData;
        if(Array.isArray(data)) {
          if(data.length > 0)
          this.excelService.exportJSONExcelFile(data, 
            this.config.exportTitle + `${extraInfoForFile != "" ? "_"+extraInfoForFile : ""}` 
            || 
            this.config.title  + `${extraInfoForFile != "" ? "_"+extraInfoForFile : ""}` 
            || 
            "Title", 
            this.config.exportTitle || this.config.title || "Title")
        } else {

        }
        break;
    
      default:
        break;
    }
  }

  // APICall
  recallAPI() {
    if (this.serviceObject) {
      this.loading = true;
      this.serviceObject.subscribe((res) => {
        if (res.error) {
          this.toasty.error(res.message);
        } else {
          this.configsLoaded = 0;
          if (this.config.breadcrumbs) {
            if(this.currentLevel != 0) {
              this.gotoView(0);
            }
          } else {
            this.currentLevel = 0;
          }
          this.config.dataConfig.customChartConfig.rawData = res.data;
          setTimeout(() => {
            this.refreshChart();
          }, 10);
        }
        this.loading = false;
      });
    }
  }
}
