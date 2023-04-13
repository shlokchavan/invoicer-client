import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from "@angular/core";

import { IRadioButtonConfig } from "./rm-radio.model";

@Component({
  selector: "rm-radio",
  templateUrl: "./rm-radio.component.html",
  styleUrls: ["./rm-radio.component.scss"],
})
export class RMRadioComponent implements OnInit {
  @Input() config!: IRadioButtonConfig;
  @Input() dataModel!: any;
  @Input() extraTemplate!: TemplateRef<any>
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  radioChange(event: any) {
    this.onChange.emit(event.value);
  }
}
