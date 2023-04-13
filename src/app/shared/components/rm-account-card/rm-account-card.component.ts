import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { padZeroSerial } from "../../utils/pad-zero-serial";
import { ICheckboxConfig } from "../rm-checkbox/rm-checkbox.model";
import { IChipConfig } from "../rm-chip/rm-chip.model";
import { IToggleConfig } from "../rm-toggle/rm-toggle.model";

@Component({
  selector: "rm-account-card",
  templateUrl: "./rm-account-card.component.html",
  styleUrls: ["./rm-account-card.component.scss"],
})
export class RMAccountCardComponent implements OnInit, AfterViewInit {
  // Parameters
  @Input() actions!: any[];
  @Input() selectable!: boolean;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Output() onCheckboxClick: EventEmitter<any> = new EventEmitter();
  @Output() onToggleClick: EventEmitter<any> = new EventEmitter();
  @Output() onActionClick: EventEmitter<any> = new EventEmitter();
  @Output() onLinkClick: EventEmitter<any> = new EventEmitter();

  //Variables
  // actions: any[] = ["download", "edit", "delete"];
  isFlipped!: boolean;
  @Input() accountDetails: any;
  @Input() elementIndex!: number;
  // Config
  @Input() checkboxConfig: ICheckboxConfig = {
    isChecked: false,
    attributes: {},
  };
  toggleConfig!: IToggleConfig;
  chipConfig: IChipConfig = {
    colorClass: "defaultTheme",
    clickable: false,
    isLargeChip: false,
    removable: false,
    draggable: false,
    isBadge: false,
  };
  activeChipConfig: IChipConfig = {
    colorClass: "greenTheme",
    clickable: false,
    isLargeChip: false,
    removable: false,
    draggable: false,
    isBadge: false,
  };
  inactiveChipConfig: IChipConfig = {
    colorClass: "yellowTheme",
    clickable: false,
    isLargeChip: false,
    removable: false,
    draggable: false,
    isBadge: false,
  };
  myArr: any;

  constructor() {}

  ngOnInit() {
    this.toggleConfig = {
      isActive: false || 0,
    };
    this.myArr = this.accountDetails.predCode.split(",");
    
  }

  ngAfterViewInit() {}

  // Events
  checkedHandler(event: any) {
    this.accountDetails["checkboxConfig"] = event;
    this.onCheckboxClick.emit(event);
  }

  toggleHandler(obj: any) {
    // 
    this.accountDetails.isActive = (obj.isActive ? 1 : 0);
    const event = {
      colDef: {
        field: "isActive",
      },
      data: this.accountDetails,
    };
    this.onToggleClick.emit(event);
  }

  padZero(num: any) {
    return num < 9 ? `0${num}` : `${num}`;
  }

  getNumberValue(value: any) {
    return Number(value) || 0;
  }

  // Events
  actionEvent(item: any) {
    // 
    const event = {
      operation: item,
      type: item.action,
      data: this.accountDetails,
    };
    this.onActionClick.emit(event);
  }

  logoClick() {
    const event = {
      rowIndex: this.elementIndex,
      data: this.accountDetails,
    };
    this.onLinkClick.emit(event);
  }
}
