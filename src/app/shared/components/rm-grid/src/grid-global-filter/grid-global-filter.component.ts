import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { RMSelectBoxComponent } from '../../../rm-select-box/rm-select-box.component';
import { _GlobalFilterItemsConfig } from './grid-global-filter-items.config';

@Component({
  selector: 'grid-global-filter',
  templateUrl: './grid-global-filter.component.html',
  styleUrls: ['./grid-global-filter.component.scss']
})
export class GridGlobalFilterComponent implements OnInit {

  // View Child
  @ViewChild('textConditionSelectRef') textConditionSelectRef!: RMSelectBoxComponent;
  @ViewChild('numberConditionSelectRef') numberConditionSelectRef!: RMSelectBoxComponent;

  // Params
  @Input() gridConfig: any;
  @Input() gridAPI: any;
  @Input() data!: any[];
  @Output() onFilterActions: EventEmitter<any> = new EventEmitter();

  // Configs
  filterElementsConfig = new _GlobalFilterItemsConfig()

  // variables
  selectedTab: any;
  tabs: any[] = [];
  loading = false;

  get currentFilterItem() {
    const activeTab = this.tabs.find(tab => tab.title == this.selectedTab);
    return activeTab ? activeTab.colConfig : null;
  }

  get currentFilterModel() {
    const activeTab = this.tabs.find(tab => tab.title == this.selectedTab);
    return activeTab ? activeTab.filterModel : null;
  }

  get listItems() {
    if(this.currentFilterItem.globalFilter.selectorValues) { 
      return this.currentFilterItem.globalFilter.selectorValues.data;
    } else {
      const options: Set<string> = new Set();
      let returnValues: any[] = [];
      this.data.map(value => {
        value = value[this.currentFilterItem.field];
        if(value == null || value == undefined) value = "Blank"
        options.add(value);
      }); 
      options.forEach(option => {
        returnValues.push(option);
      });
      // 
      return returnValues;
    }
  }

  get selectionListConfig() {
    if(this.currentFilterItem.globalFilter.selectorValues) {
      return { 
        labelKey: this.currentFilterItem.globalFilter.selectorValues.label, 
        returnKey: this.currentFilterItem.globalFilter.selectorValues.value 
      }
    } else {
      return null
    }
  }

  set currentFilterModel(value: any) {
    // Doesn't work as of now
    // const activeTabIndex = this.tabs.findIndex(tab => tab.title == this.selectedTab);
    // if(activeTabIndex != -1) {
    //   this.tabs[activeTabIndex].filterModel = value;
    //   this.tabs[activeTabIndex].colConfig.globalFilter.filterState = value;
    // }
    // 
  }

  constructor() { }

  ngOnInit(): void {
    const cols: any[] = _.cloneDeep(this.gridConfig.columnDefs);
    cols.forEach(col => {
      if(col.globalFilter) {
        this.tabs.push({
          title: col.headerName,
          isActive: false,
          colConfig: col,
          filterModel: col.globalFilter.filterState ? col.globalFilter.filterState : col.globalFilter.filterBaseModel
        });
      }
    });
    const activeTab = this.tabs[0];
    activeTab ? this.selectedTab = activeTab?.title : '';
  }

  // Event

  switchFilterTab(item: any) {
    this.selectedTab = item.title;
    setTimeout(() => {
      // Reapply dropdown values
      if(this.currentFilterItem.globalFilter.filterType == "text") {
        this.textConditionSelectRef.input.value = _.clone(this.currentFilterModel.conditionType)
      } else if(this.currentFilterItem.globalFilter.filterType == "number") {
        this.numberConditionSelectRef.input.value = _.clone(this.currentFilterModel.conditionType)
      }
    }, 100);
  }

  conditionTypeChange(event: any, currentFilterModel: any) {
    const activeTabIndex = this.tabs.findIndex(tab => tab.title == this.selectedTab);
    if(activeTabIndex != -1) {
      this.tabs[activeTabIndex].filterModel = currentFilterModel;
      if(this.tabs[activeTabIndex].colConfig.globalFilter.filterState)
      this.tabs[activeTabIndex].colConfig.globalFilter.filterState = currentFilterModel;
    }
  }

  datePeriodChange(event: any,currentFilterModel: any) {
    currentFilterModel['period'] = event;
    const activeTabIndex = this.tabs.findIndex(tab => tab.title == this.selectedTab);
    if(activeTabIndex != -1) {
      this.tabs[activeTabIndex].filterModel = currentFilterModel;
      this.tabs[activeTabIndex].colConfig.globalFilter.filterState = currentFilterModel;
    }
  }

  inputChange(event: any, currentFilterModel: any) {
    const activeTabIndex = this.tabs.findIndex(tab => tab.title == this.selectedTab);
    if(activeTabIndex != -1) {
      this.tabs[activeTabIndex].filterModel = currentFilterModel;
      this.tabs[activeTabIndex].colConfig.globalFilter.filterState = currentFilterModel;
    }
  }

  selectionChange(event: any, currentFilterModel: any) {
    const activeTabIndex = this.tabs.findIndex(tab => tab.title == this.selectedTab);
    if(activeTabIndex != -1) {
      this.tabs[activeTabIndex].filterModel = currentFilterModel;
      this.tabs[activeTabIndex].colConfig.globalFilter.filterState = currentFilterModel;
      if(event.length == 0) {
        this.tabs[activeTabIndex].colConfig.globalFilter.filterState = null;
      }
    }
  }

  filterActions(type: string) {
    const event: any = {
      type,
      data: null
    }
    switch (type) {
      case "apply":
        // Validations
        this.tabs.forEach(tab => {
          if(tab.colConfig.globalFilter && tab.colConfig.globalFilter.filterState) {
            switch (tab.colConfig.globalFilter.filterType) {
              case "text":
                if(
                  (tab.colConfig.globalFilter.filterState.searchBy != null && 
                  tab.colConfig.globalFilter.filterState.conditionType == null) ||
                  (tab.colConfig.globalFilter.filterState.searchBy == null && 
                  tab.colConfig.globalFilter.filterState.conditionType != null)
                  ) {
                    tab.colConfig.globalFilter.filterState = null;
                  }
                break;
              case "number":
                if(
                  (tab.colConfig.globalFilter.filterState.searchBy != null && 
                  tab.colConfig.globalFilter.filterState.conditionType == null) ||
                  (tab.colConfig.globalFilter.filterState.searchBy == null && 
                  tab.colConfig.globalFilter.filterState.conditionType != null)
                  ) {
                    tab.colConfig.globalFilter.filterState = null;
                  }
                break;
              case "date":
                if(tab.colConfig.globalFilter.filterState.period == "rolling-x") {
                  if(!tab.colConfig.globalFilter.filterState.rollingXDays) {
                    tab.colConfig.globalFilter.filterState = null;
                  }
                } else if(tab.colConfig.globalFilter.filterState.period == "next-x") {
                  if(!tab.colConfig.globalFilter.filterState.nextXDays) {
                    tab.colConfig.globalFilter.filterState = null;
                  }
                } else if(tab.colConfig.globalFilter.filterState.period == "from-x-to-current") {
                  if(!tab.colConfig.globalFilter.filterState.fromXDate) {
                    tab.colConfig.globalFilter.filterState = null;
                  }
                } else if(!tab.colConfig.globalFilter.filterState.period) {
                  tab.colConfig.globalFilter.filterState = null;
                }
                break;
            
              default:
                break;
            }
          }
        })
        event.data = this.tabs.map(tab => tab.colConfig)
        break;
      case "cancel":
        
        break;

      case "reset":
        this.tabs.forEach(item => {
          item.colConfig.globalFilter.filterState = null;
        });
        event.data = this.tabs.map(tab => tab.colConfig)
        
        break;
    
      default:
        break;
    }
    this.onFilterActions.emit(event)
  }

}
