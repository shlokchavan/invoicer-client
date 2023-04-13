import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MatAccordion } from "@angular/material/expansion";
import { MatListOption, MatSelectionListChange } from "@angular/material/list";
import { ActivatedRoute, Router } from "@angular/router";
import * as _ from "lodash";
import { GlobalConfig } from "src/app/configs/global-config";
import { EncryptedStorage } from "../../utils/encrypted-storage";
import {
  IRMBookMarkConfig,
  IRMNavConfig,
  IRMNavItemConfig,
} from "./rm-nav.model";

@Component({
  selector: "rm-nav",
  templateUrl: "./rm-nav.component.html",
  styleUrls: ["./rm-nav.component.scss"],
})
export class RMNavComponent implements OnInit {
  // Parameters
  @Input() config!: IRMNavConfig;
  @Input() isBookmarkView!: boolean;
  @Input() HeaderLOGO!: string;
  @Output() onClosed: EventEmitter<any> = new EventEmitter();
  @Output() onNavigate: EventEmitter<any> = new EventEmitter();

  // Template Ref
  @ViewChild(MatAccordion) accordian: MatAccordion = new MatAccordion();

  //Variables
  loggedInUserOrgLogo!: string;
  currentNavSelection!: IRMNavItemConfig;
  availableNavigationItems!: any[];
  // availableNavigationItems: IRMNavItemConfig[] = [];
  // currentBookmarkSelection: IRMNavItemConfig[] = [];
  currentBookmarkSelection: IRMBookMarkConfig[] = [];

  constructor(private router: Router, private activateRoute: ActivatedRoute) {
    // Initialize Default Properties
    this.availableNavigationItems = [];
  }

  ngOnInit() {
    this.holdNavigationNavigationConfig();
    this.getProfileOrgLogo();
  }

  isAnySubmoduleActive(nav: IRMNavItemConfig): boolean {
    if(nav && nav.subModuleList) {
      let totalModuleActive = 0;
      nav.subModuleList.forEach(element => {
        if(!element?.isWIP) {
          totalModuleActive += 1;
        }
      });
      return totalModuleActive != 0;
    } return false;
  }

  getProfileOrgLogo() {
    this.loggedInUserOrgLogo = JSON.parse(
      new EncryptedStorage().getItem(new GlobalConfig().userAllDetailsLSName)!
    ).primaryLogo;
  }

  closeAccordian() {
    if (this.accordian) {
      this.accordian.closeAll();
    }
  }

  setIsSelected() {
    this.availableNavigationItems.forEach((nav: any) => {
      nav.subModuleList.forEach((subMod: any) => {
        if (this.currentBookmarkSelection?.length > 0) {
          const selectedItem = this.currentBookmarkSelection.some(
            (bookmark: any) => bookmark.subModuleId == subMod.subModuleId
          );
          subMod.isSelected = selectedItem;
        }
        subMod.moduleId = nav.moduleId;
      });
    });
  }

  // Store Navigation config into temp storage;
  holdNavigationNavigationConfig() {
    this.availableNavigationItems = _.cloneDeep(this.config.NavItems) as any;
    this.currentBookmarkSelection = _.cloneDeep(this.config.BookmarkSelections)!;
    // 
    this.setIsSelected();
  }

  // Store Bookmark Selection into temp storage when user select or unselect module.
  markSelection(event: MatSelectionListChange, navModule?: any) {
    // 

    // markSelection(event: MatSelectionListChange, navModule?: IRMNavItemConfig) {
    const getAlreadyStoredBookmark = this.getAlreadyStoredBookmarkIndex(
      event.option.value
    );
    if (getAlreadyStoredBookmark >= 0) {
      this.currentBookmarkSelection.splice(getAlreadyStoredBookmark, 1);
    } else {
      this.currentBookmarkSelection.push(event.option.value);
    }
    // navModule.children.find((item)=>(item.moduleId == event.option.value.moduleId)).isSelected = event.option.selected
    // navModule.subModuleList.find((item: any) => (item.subModuleId == event.option.value.subModuleId)).isSelected = event.option.selected
    const selectedSubModule = navModule.subModuleList.find(
      (item: any) => item.sysSubModuleId == event.option.value.sysSubModuleId
    );
    // 
    selectedSubModule.isSelected = event.option.selected;
  }

  // Get Index of Bookmarked Module from temp storage
  getAlreadyStoredBookmarkIndex(nav: any): number {
    // getAlreadyStoredBookmarkIndex(nav: IRMNavItemConfig): number {
    // return this.currentBookmarkSelection.findIndex((item) => { return item.moduleId == nav.moduleId });
    return this.currentBookmarkSelection.findIndex((item: any) => {
      return item.subModuleId == nav.subModuleId;
    });
  }

  // To Check if Any Submodule is selected or not.
  getIsSubModuleSelected(module: any): boolean {
    // getIsSubModuleSelected(module: IRMNavItemConfig): boolean {
    // return module.children.some((item)=>(item.isSelected))
    // return module.subModuleList.some((item: any) => (item.isSelected))
    let result: boolean;
    if (this.currentBookmarkSelection?.length > 0) {
      result = module.subModuleList.some((item: any) =>
        this.currentBookmarkSelection.some(
          (book) => book.subModuleId === item.subModuleId
        )
      );
    } else result = false;
    return result;
  }

  // Event: When user navigate using humburger menu
  moduleNavigator(module: IRMNavItemConfig) {
    if (module.route && !this.isBookmarkView) {
      this.currentNavSelection = module;
      this.router.navigate([module.route]);
      this.closeDrawer();
      this.onNavigate.emit(module.route);
    }
  }

  // Close sidenav / Cancel Changes
  closeDrawer() {
    this.onClosed.emit();
  }

  // Submit Temp storage to parent component using event emitter
  applyBookmark() {
    const newBM = this.currentBookmarkSelection.map((res: any, index) => {
      // const newObj = {
        // bookMarkOrder: index + 1,
      //   moduleId: res?.moduleId,
      //   subModuleDescription: res?.subModuleDescription || res.description,
      //   subModuleDisplayName: res?.subModuleDisplayName || res.displayName,
      //   subModuleId: res.subModuleId,
      //   sysSubModuleId: res.sysSubModuleId,
      //   subModuleName: res?.subModuleName || res.name,
      //   userBookMarkId: res?.userBookMarkId || index,
      // };
      const newObj = {
        ...res,
        bookMarkOrder: index + 1,
        subModuleDescription: res?.subModuleDescription || res.description,
        subModuleDisplayName: res?.subModuleDisplayName || res.displayName,
        subModuleName: res?.subModuleName || res.name,
        userBookMarkId: res?.userBookMarkId || index,
      };
      return newObj;
    });

    // const submitNavConfig: IRMNavConfig = {
    const submitNavConfig: any = {
      NavItems: this.availableNavigationItems,
      BookmarkSelections: newBM,
    };

    // Service Call
    // 
    this.onClosed.emit(submitNavConfig);
  }

  // UnSelect All Selected Modules
  resetBookmarks() {
    this.currentBookmarkSelection = [];
    // this.availableNavigationItems.forEach((item)=>{ item.children.forEach((child)=> child.isSelected = false) });
    this.availableNavigationItems.forEach((item: any) => {
      item.subModuleList.forEach((child: any) => (child.isSelected = false));
    });
  }
}
