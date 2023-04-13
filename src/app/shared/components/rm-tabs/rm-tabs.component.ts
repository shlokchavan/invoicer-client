import { Template } from "@angular/compiler/src/render3/r3_ast";
import {
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { ITabsConfig } from "./rm-tabs.model";

@Component({
  selector: "rm-tabs",
  templateUrl: "./rm-tabs.component.html",
  styleUrls: ["./rm-tabs.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class RMTabsComponent implements OnChanges, AfterViewInit {
  @Input() secondary: boolean;
  @Input() config;
  @Input() customTabTemplate: TemplateRef<any>;
  @Output() configChange: EventEmitter<ITabsConfig> = new EventEmitter();
  @Output() onDropDownItemClicked: EventEmitter<any> = new EventEmitter();

  constructor() {}

  tabChanged(e, index) {
    // alert(JSON.stringify(e));
    this.config.selectedTabIndex = index;
    this.configChange.emit(this.config);
  }

  ngOnChanges() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.setTabWidth();
    }, 300);
  }
  setTabWidth() {
    const el = document.getElementById("customItems");
    const tabEl: HTMLElement = document.querySelector(".mat-tab-header");

    if(el) {
      const customElementWidth = `calc(100vw - ${el.offsetWidth}px)`; // 40px custom element
      el.setAttribute("style", `height: ${tabEl.offsetHeight}px`);
  
      tabEl.setAttribute("style", `width: ${customElementWidth}`);
    }

  }

  onDropDownClicked(event?: any, data?: any) {
    const eventData = {
      event: event,
      data: data
    }
    this.onDropDownItemClicked.emit(eventData);
  }
}
