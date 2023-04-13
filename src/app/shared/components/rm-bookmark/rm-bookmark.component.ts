import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { IChipConfig } from '../rm-chip/rm-chip.model';
import { IRMBookMarkConfig, IRMNavItemConfig } from '../rm-nav/rm-nav.model';

@Component({
  selector: 'rm-bookmark',
  templateUrl: './rm-bookmark.component.html',
  styleUrls: ['./rm-bookmark.component.scss']
})
export class RMBookmarkComponent implements OnInit {
  // Parameters
  // @Input() bookmarkChips: IRMNavItemConfig[] = []
  @Input() bookmarkChips: IRMBookMarkConfig[] | any[] = []
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Output() onSettingsTrigger: EventEmitter<any> = new EventEmitter();
  @Output() onDragDrop: EventEmitter<any> = new EventEmitter();

  //Variables
  dragChipConfig: IChipConfig;


  constructor() {
    // Initialize Default Properties
    this.dragChipConfig = {
      icon: 'drag',
      iconColor: '#e0e0e0',
      isLargeChip: false,
      removable: false,
      draggable: true,
      clickable: true,
      isBadge: false,
    }
  }

  clickOnBookmark(bookmark: any) {
    this.onClick.emit(bookmark)
  }

  drop(event: CdkDragDrop<string[]> | any) {
    moveItemInArray(this.bookmarkChips, event.previousIndex, event.currentIndex);
    // Update Display Order
    this.bookmarkChips.map((chip, index) => chip.bookMarkOrder = index + 1)
    this.onDragDrop.emit(this.bookmarkChips);
  }

  ngOnInit() {

  }


  // this method is called only for tablet view
  openSettings() {
    this.onSettingsTrigger.emit();
  }

}
