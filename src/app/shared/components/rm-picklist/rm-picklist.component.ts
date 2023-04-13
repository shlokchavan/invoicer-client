import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { IRMPickListConfig } from "./rm-picklist.model";

@Component({
  selector: "rm-picklist",
  templateUrl: "./rm-picklist.component.html",
  styleUrls: ["./rm-picklist.component.scss"],
})
export class RmPicklistComponent implements OnInit {
  // Input
  @Input() items: any[] = [];
  @Input() selected: any[] = [];
  @Input() disabled: boolean = false;
  @Input() config: IRMPickListConfig;

  // Output
  @Output() onSelectionChanged: EventEmitter<any> = new EventEmitter();
  @Output() onSettingClicked: EventEmitter<any> = new EventEmitter();
  @Output() onListUpdate: EventEmitter<any> = new EventEmitter();

  // Variables
  availableSearch: string = "";
  selectedSearch: string = "";
  constructor() {
    this.items = this.items.map((item: any) => {
      return {
        ...item,
        _isSelected: false,
      };
    });
    this.selected = this.selected.map((item: any) => {
      return {
        ...item,
        _isSelected: false,
      };
    });
  }

  get isMoreThanMaxItemsSelected() {
    if(this.config.maxSelectionCount) {
      const maxCount = this.config.maxSelectionCount;
      return (this.selected.length + this.items.filter(item => item['_isSelected']).length) > maxCount
    }
    return false
  }

  get isMaxItemsSelected() {
    if(this.config.maxSelectionCount) {
      const maxCount = this.config.maxSelectionCount;
      return (this.selected.length + this.items.filter(item => item['_isSelected']).length) >= maxCount
    }
    return false
  }

  onSelectionChange(type, event: any) {
    // 
    switch (type) {
      case "available":
        this.markSelectedItemInArray(this.items, event);
        this.onSelectionChanged.emit({
          type: type,
          updatedItems: this.items,
        });
        break;

      case "selected":
        this.markSelectedItemInArray(this.selected, event);
        this.onSelectionChanged.emit({
          type: type,
          updatedItems: this.selected,
        });
        break;

      default:
        break;
    }
  }

  markSelectedItemInArray(arr: any[], event: any) {
    arr.forEach((item) => {
      const selectedKey =
        item[this.config?.returnKey || this.config?.dataKey] || item;
      if (selectedKey == event.option._value) {
        // 
        item["_isSelected"] = event.option._selected;
      }
    });
  }

  moveSelected(from: any[], to: any[]) {
    const selectedItemsInAvailable: any[] = from.filter(
      (item: any) => item["_isSelected"]
    );

    // #1. Move Filtered to Selected
    selectedItemsInAvailable.forEach((element: any) => {
      to.push(element);
    });

    // #2. Remove Selected Item from Available
    from = from.filter((item) => !selectedItemsInAvailable.includes(item));
    const data = {
      available: from,
      selected: to
    }
    return [from, to];
  }

  onDrop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  // Getters
  get isAvailableListEmpty() {
    return this.items && this.items.length == 0;
  }

  get isAvailableListItemSelected() {
    return !this.items.some((item: any) => item["_isSelected"]);
  }

  get isSelectedListItemSelected() {
    return !this.selected.some((item: any) => item["_isSelected"]);
  }

  get isSelectedListEmpty() {
    return this.selected && this.selected.length == 0;
  }

  // Reset after move
  resetSelectionAfterMove() {
    this.items.forEach((item: any) => (item["_isSelected"] = false));
    this.selected.forEach((item: any) => (item["_isSelected"] = false));
  }

  transfer(
    type: "all-right" | "selected-right" | "selected-left" | "all-left"
  ) {
    switch (type) {
      // Move All to Selected
      case "all-right":
        this.items.forEach((element: any, index: number) => {
          // #1. Move Item to Selected
          this.selected.push(element);
        });
        // #2. Remove All Available
        this.items = [];
        break;
      // Move All to Available
      case "all-left":
        this.selected.forEach((element: any, index: number) => {
          // #1. Move Item to Available
          this.items.push(element);
        });
        // #2. Remove All Selected
        this.selected = [];
        break;
      case "selected-right":
        [this.items, this.selected] = this.moveSelected(
          this.items,
          this.selected
        );
        break;
      case "selected-left":
        [this.selected, this.items] = this.moveSelected(
          this.selected,
          this.items
        );
        break;

      default:
        break;
    }
    this.onListUpdate.emit(this.selected)
    
    
    setTimeout(() => {
      this.resetSelectionAfterMove();
    }, 10);
  }

  ngOnInit(): void {}

  // On Setting Icon Click In Selected list
  onSettingClick(event) {
    this.onSettingClicked.emit(event)
  }
}
