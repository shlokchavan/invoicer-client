import { MediaMatcher } from "@angular/cdk/layout";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ElementRef,
  OnChanges,
} from "@angular/core";
import { RMLeftDrawerActionButtonModel } from "./rm-message-layout.model";
import { ITextConfig } from "../rm-input/rm-input.model";
import { ISelectConfig } from "../rm-select-box/rm-select-box.model";
import * as moment from "moment";
import { currentUser } from "../../utils/current-user";

@Component({
  selector: "rm-message-layout",
  templateUrl: "./rm-message-layout.component.html",
  styleUrls: ["./rm-message-layout.component.scss"],
})
export class RMMessageLayoutComponent implements OnInit, OnDestroy, OnChanges {
  // Parameters
  @Input() allowSearchAndFilter: boolean;
  @Input() tabItems: any[];
  @Input() requiredIndicatorField: string;
  @Input() leftTabTemplate: TemplateRef<any>;
  @Input() selectedTab: number;
  @Input() dateRange: any;

  @Output() onActionClick: EventEmitter<string> = new EventEmitter();
  @Output() onSelectedTabChange: EventEmitter<any> = new EventEmitter();
  @Output() onTabDrop: EventEmitter<any> = new EventEmitter();

  // Variables
  drawerToggle = false;

  // Models
  model = {
    search: "",
    fromDate: "",
    toDate: "",
    dateRange: "",
  };

  typeModel = {
    value: "all-messages",
  };

  // Configs
  searchConfig: ITextConfig = {
    fieldKey: "search",
    attributes: {
      placeholder: "Search Messages/ Names",
      suffixIcon: "search",
      disableNativeAutoComplete: true,
    },
  };

  getActiveTab(brdId: any) {
    setTimeout(() => {
      return brdId == this.selectedTab;
    }, 100);
  }

  dateConfig: ITextConfig = {
    fieldKey: "dateRange",
    attributes: {
      placeholder: "Select date range.",
      type: "datepicker",
      maxDate: new Date()
    },
    pickerConfig: {
      selectMode: "range",
    },
  };

  filterOptions = [
    {
      label: "All Messages",
      value: "all-messages",
    },
    {
      label: "Unread Messages",
      value: "unread-messages",
    },
    {
      label: "Read Messages",
      value: "read-messages",
    },
    {
      label: "High Importance",
      value: "high-importance",
    },
  ];

  typeSelectorConfig: ISelectConfig = {
    fieldKey: "value",
    attributes: {
      class: "header-filter-item",
    },
    dataKey: "label",
    returnKey: "value",
    options: [],
  };

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  filter: boolean = false;
  tempTabs: any[];
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    // Initialize Default Properties
    this.mobileQuery = media.matchMedia("(max-width: 998px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener("change", this._mobileQueryListener);
  }

  ngOnInit() {
    if (!this.selectedTab)
      this.selectedTab =
        this.tabItems[0]?.conversationId || this.tabItems[0]?.brdId;
  }

  ngOnChanges(e) {
    this.typeSelectorConfig.options = [...this.filterOptions];
    if (this.dateRange) {
      this.model.fromDate = this.dateRange.fromDate;
      this.model.toDate = this.dateRange.toDate;
      // 
    }
    if (e.tabItems && this.tabItems.length > 0 && !this.selectedTab) {
      this.selectedTab =
        this.tabItems[0].conversationId || this.tabItems[0].brdId;
    }
    this.tempTabs = this.tabItems;
    // 
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener("change", this._mobileQueryListener);
  }

  drop(event: CdkDragDrop<any[]>) {
    if (this.selectedTab == event.previousIndex)
      this.selectedTab = event.currentIndex;
    else if (this.selectedTab > event.previousIndex)
      this.selectedTab = this.selectedTab - 1;
    else if (this.selectedTab > event.currentIndex)
      this.selectedTab = this.selectedTab + 1;
    moveItemInArray(this.tabItems, event.previousIndex, event.currentIndex);
    this.onTabDrop.emit(this.tabItems);
  }

  clickOnTab(index, data) {
    // 
    this.selectedTab = data.conversationId || data.brdId;
    this.onSelectedTabChange.emit({ index: this.selectedTab, data: data });
  }

  actionClick(actionCase: string) {
    this.onActionClick.emit(actionCase);
  }

  selectionChange(event: any) {
    let filteredResult = [];
    switch (this.typeModel.value) {
      case "unread-messages":
        filteredResult = this.tempTabs.filter(
          (item: any) =>
            item["isRead"] == 0 ||
            (item?.receipientList && item?.receipientList[0]?.isRead) == 0
        );
        break;
      case "read-messages":
        filteredResult = this.tempTabs.filter(
          (item: any) =>
            item["isRead"] == 1 ||
            (item?.receipientList && item?.receipientList[0]?.isRead) == 1
        );
        break;
      case "high-importance":
        filteredResult = this.tempTabs.filter(
          (item: any) => item["importanceType"] == 1
        );
        break;
      default:
        filteredResult = this.tempTabs;
        break;
    }
    // 
    this.tabItems = filteredResult;
  }

  // On Filter Click
  onFilterClick() {
    this.filter = !this.filter;
  }

  dateSelected(event) {
    this.model.fromDate = moment(event[0]).format("YYYY-MM-DD");
    this.model.toDate = moment(event[1]).format("YYYY-MM-DD");
    // 
  }

  isCurrentUserSender(message: any) {
    if (message.senderName != currentUser().userName && message.isRead == 0) {
      return;
    }
    return false;
  }

  get filterApplied() {
    const dateFilter =
      this.model.fromDate ||
      this.model.toDate ||
      this.typeModel.value != "all-messages";
    return dateFilter;
  }

  resetFilter() {
    this.model.dateRange = null;
    this.model.fromDate = null;
    this.model.toDate = null;
    this.model.search = "";
    this.typeSelectorConfig.options = [];
    setTimeout(() => {
      this.typeSelectorConfig.options = [...this.filterOptions];
      this.typeModel.value = "all-messages";
      this.selectionChange({ value: this.typeModel.value });
    }, 100);
  }
}
