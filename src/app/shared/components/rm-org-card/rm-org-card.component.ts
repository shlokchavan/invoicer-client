import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { imgDummyOrgLogo } from "src/app/core/constants/data-constant";
import { padZeroSerial } from "../../utils/pad-zero-serial";
import { ICheckboxConfig } from "../rm-checkbox/rm-checkbox.model";
import { IChipConfig } from "../rm-chip/rm-chip.model";
import { IToggleConfig } from "../rm-toggle/rm-toggle.model";

@Component({
  selector: "rm-org-card",
  templateUrl: "./rm-org-card.component.html",
  styleUrls: ["./rm-org-card.component.scss"],
})
export class RMOrgCardComponent implements OnInit, AfterViewInit {
  // Parameters
  @Input() actions!: any[];
  @Input() selectable!: boolean;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Output() onCheckboxClick: EventEmitter<any> = new EventEmitter();
  @Output() onToggleClick: EventEmitter<any> = new EventEmitter();
  @Output() onActionClick: EventEmitter<any> = new EventEmitter();
  @Output() onLogoClick: EventEmitter<any> = new EventEmitter();

  //Variables
  // actions: any[] = ["download", "edit", "delete"];
  isFlipped!: boolean;
  dummyOrgLogo = imgDummyOrgLogo;
  @Input() orgDetails: any;
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

  constructor() {}

  ngOnInit() {
    this.toggleConfig = {
      isActive: this.orgDetails.isActive,
    };
  }

  ngAfterViewInit() {}

  // Events
  checkedHandler(event: any) {
    
    this.orgDetails["checkboxConfig"] = event;
    this.onCheckboxClick.emit(event);
  }

  toggleHandler(obj: any) {
    
    this.orgDetails.isActive = (obj.isActive ? 1 : 0);
    const event = {
      colDef: {
        field: "isActive",
      },
      data: this.orgDetails,
    };
    this.onToggleClick.emit(event);
  }

  padZero(num: any) {
    return num < 9 ? `0${num}` : `${num}`;
  }

  transformAddress(text: string) {
   text = text?.replace("\r\n", "-")
   // Empty Data with Only /r/n show -
   if(text.includes("-") && text.split("-")[0] == "") return "<i>Address Not Available</i>"
   return text ? text.replace("-", "</br>") : "Address Not Available";
  }

  // Events
  actionEvent(item: any) {
    // 
    const event = {
      operation: item,
      type: item.action,
      data: this.orgDetails,
    };
    this.onActionClick.emit(event);
  }

  logoClick() {
    const event = {
      colDef: {
        field: "name",
      },
      data: this.orgDetails,
    };
    this.onLogoClick.emit(event);
  }
}
