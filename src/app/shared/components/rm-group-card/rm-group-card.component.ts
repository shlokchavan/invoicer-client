import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import * as _ from "lodash";
import { DefaultUserImage } from "src/app/core/constants/data-constant";
import { ICheckboxConfig } from "../rm-checkbox/rm-checkbox.model";
import { IChipConfig } from "../rm-chip/rm-chip.model";
import { IToggleConfig } from "../rm-toggle/rm-toggle.model";

@Component({
  selector: "rm-group-card",
  templateUrl: "./rm-group-card.component.html",
  styleUrls: ["./rm-group-card.component.scss"],
})
export class RMGroupCardComponent implements OnInit, AfterViewInit {
  // Parameters
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
  @Input() groupDetails!: any;
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
      isActive: this.groupDetails.isActive == 1,
    };
  }

  ngAfterViewInit() {}

  // Events
  checkedHandler(event: any) {
    
    this.groupDetails["checkboxConfig"] = event;
    this.onCheckboxClick.emit(event);
  }

  toggleHandler(event: any) {
    this.groupDetails.isActive = event.isActive ? 1 : 0;
    
    const payload = {
      data: this.groupDetails,
      type: "toggle",
    };
    this.onToggleClick.emit(payload);
  }

  moreClick(params: any) {
    const event = {
      operation: "more-click",
      data: this.groupDetails,
    };
    this.onActionClick.emit(event);
  }

  get userByRoles() {
    return _(this.groupDetails.users)
      .groupBy((x) => x.roleName)
      .map((value, key) => ({
        name: key,
        noOfUsers: value.length,
      }))
      .value();
  }

  // Events
  actionEvent(item: any) {
    const event = {
      operation: item,
      data: this.groupDetails,
      type: item.action,
    };
    this.onActionClick.emit(event);
  }

  linkClick(event: any, item: any, index: any | number) {
    event["operation"] = item;
    event["data"] = this.groupDetails;
    event["field"] = "users";
    event["rowIndex"] = index - 1;
    this.onLinkClick.emit(event);
  }
}
