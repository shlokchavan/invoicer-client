import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { IChipConfig } from "../rm-chip/rm-chip.model";
import {
  IRMButtonActionItemConfig,
  ISplitButtonConfig,
} from "./rm-button.model";

@Component({
  selector: "rm-button",
  templateUrl: "./rm-button.component.html",
  styleUrls: ["./rm-button.component.scss"],
})
export class RMButtonComponent implements OnInit, DoCheck {
  // Parameters
  @Input() disabled: boolean;
  @Input() onlyIconButton: boolean;
  @Input() type: string; // reset, submit, button
  @Input() role: string; // primary, secondary, tertiary.
  @Input() size: string; // default, small.
  @Input() icon!: string;
  @Input() iconSize!: string; // Default, small
  @Input() loading!: boolean;
  @Input() noTextInMobileView: boolean;
  @Input() noTextInTabletView!: boolean;
  @Input() customColor!: string;
  @Input() SplitConfig!: ISplitButtonConfig;
  @Input() DropDownConfigs!: IRMButtonActionItemConfig[];
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Output() onActionClick: EventEmitter<any> = new EventEmitter();

  //Variables
  randomBtnId = Math.floor(Math.random() * Math.floor(50)) + "split-btn";

  //Temp

  constructor() {
    // Initialize Default Properties
    this.onlyIconButton = false;
    this.size = "default";
    this.type = "button"; // reset, submit, button
    this.role = "primary"; //primary, secondary, tertiary, custom
    this.disabled = false;
    // this.icon = null;
    this.icon = '';
    this.noTextInMobileView = false;
    // this.iconSize = "small";
    this.SplitConfig == null;
    // customColor Pass Color Code when type is custom;
  }

  clickBtn(button: any) {
    this.onClick.emit(button);
  }

  actionClick(button: any) {
    this.onActionClick.emit(button);
  }
  test() {
    // 
  }

  ngOnInit() {}

  ngDoCheck() {
    // Set Width of Split DropDown Panel Dynamically Based on Button Size
    const button = document.getElementById(this.randomBtnId);
    let btnWidth;
    if (button) {
      btnWidth = button.offsetWidth;
    }
    var elems = document.getElementsByClassName(
      "mat-menu-panel " + this.randomBtnId
    );
    if (elems.length != 0) {
      for (var i = 0; i < elems.length; i++) {
        const element: any = elems[i];
        element.style.width = btnWidth + "px";
      }
    }
  }
}
