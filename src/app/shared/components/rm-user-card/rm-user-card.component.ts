import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { DefaultUserImage } from "src/app/core/constants/data-constant";
import { ICheckboxConfig } from "../rm-checkbox/rm-checkbox.model";
import { IChipConfig } from "../rm-chip/rm-chip.model";
import { IToggleConfig } from "../rm-toggle/rm-toggle.model";

@Component({
  selector: "rm-user-card",
  templateUrl: "./rm-user-card.component.html",
  styleUrls: ["./rm-user-card.component.scss"],
})
export class RMUserCardComponent implements OnInit, AfterViewInit {
  // Parameters
  @Input() userDetails!: any;
  @Input() index!: number;
  @Input() actions!: any[];
  @Input() selectable!: boolean;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Output() onCheckboxClick: EventEmitter<any> = new EventEmitter();
  @Output() onToggleClick: EventEmitter<any> = new EventEmitter();
  @Output() onActionClick: EventEmitter<any> = new EventEmitter();
  @Output() onLinkClick: EventEmitter<any> = new EventEmitter();

  //Variables
  // actions: any[] = ["download", "edit", "delete"];
  defaultUserImage = DefaultUserImage;
  isFlipped!: boolean;

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
  deactiveChipConfig: IChipConfig = {
    colorClass: "yellowTheme",
    clickable: false,
    isLargeChip: false,
    removable: false,
    draggable: false,
    isBadge: false,
  };

  constructor() {}

  ngOnInit() {
    this.toggleConfig = {
      isActive: this.userDetails.isActive == 1,
    };
  }

  ngAfterViewInit() {}

  // Events
  checkedHandler(event: any) {
    
    this.userDetails["checkboxConfig"] = event;
    this.onCheckboxClick.emit(event);
  }

  toggleHandler(event: any) {
    this.userDetails.isActive = event.isActive ? 1 : 0;
    
    const payload = {
      data: this.userDetails,
      type: "toggle",
    };
    this.onToggleClick.emit(payload);
  }

  padZero(num: any) {
    return num < 9 ? `0${num}` : `${num}`;
  }

  transformAddress(text: string) {
    return text ? text.replace("\r\n", "</br>") : "-";
  }

  get initials() {
    return `${this.userDetails.firstName.charAt(
      0
    )}${this.userDetails.lastName.charAt(0)}`;
  }

  // Events
  actionEvent(item: any) {
    const event = {
      operation: item,
      data: this.userDetails,
      type: item.action,
    };
    this.onActionClick.emit(event);
  }

  linkClick(event: any, item: any, index: any | number) {
    event["operation"] = item;
    event["data"] = this.userDetails;
    event["field"] = "userId";
    event["rowIndex"] = index - 1;
    this.onLinkClick.emit(event);
  }
}
