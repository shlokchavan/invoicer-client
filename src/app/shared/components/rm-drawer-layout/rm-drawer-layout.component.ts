import { MediaMatcher } from '@angular/cdk/layout';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ElementRef } from '@angular/core';
import { RMLeftDrawerActionButtonModel } from './rm-drawer-layout.model';

@Component({
  selector: 'rm-drawer-layout',
  templateUrl: './rm-drawer-layout.component.html',
  styleUrls: ['./rm-drawer-layout.component.scss']
})
export class RMDrawerLayoutComponent implements OnInit, OnDestroy {
    // Parameters
    @Input() actionButton!: RMLeftDrawerActionButtonModel | any
    @Input() tabItems!: any[];
    @Input() requiredIndicatorField!: string;
    @Input() leftTabTemplate!: TemplateRef<any>;
    @Input() selectedTab!: number;

    @Output() onActionClick: EventEmitter<string> = new EventEmitter();
    @Output() onSelectedTabChange: EventEmitter<any> = new EventEmitter();
    @Output() onTabDrop: EventEmitter<any> = new EventEmitter();

    // Variables
    drawerToggle = false;

    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    // Initialize Default Properties
    this.mobileQuery = media.matchMedia('(max-width: 998px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener("change", this._mobileQueryListener);
  }
  
  ngOnInit() {
    this.selectedTab = 0;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener("change", this._mobileQueryListener);
  }
  

  drop(event: CdkDragDrop<any[]>) {
    if(this.selectedTab == event.previousIndex)
      this.selectedTab = event.currentIndex;
    else if(this.selectedTab > event.previousIndex)
      this.selectedTab = this.selectedTab - 1;
    else if(this.selectedTab > event.currentIndex)
      this.selectedTab = this.selectedTab + 1;
    moveItemInArray(this.tabItems, event.previousIndex, event.currentIndex);
    this.onTabDrop.emit(this.tabItems);
  }

  clickOnTab(index: any, data: any) {
    this.selectedTab = index
    this.onSelectedTabChange.emit({index: this.selectedTab, data: data});
  }
  
  actionClick(actionCase: string) {
    this.onActionClick.emit(actionCase)
  }

}
