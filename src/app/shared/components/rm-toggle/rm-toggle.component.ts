import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { IToggleConfig } from "./rm-toggle.model";

@Component({
  selector: "rm-toggle",
  templateUrl: "./rm-toggle.component.html",
  styleUrls: ["./rm-toggle.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class RMToggleComponent {
  @Input() config!: IToggleConfig;
  @Input() disabled!: boolean;
  @Input() value: any | boolean | number;
  @Output() valueChange: EventEmitter<any | boolean | number> = new EventEmitter();
  @Output() onChange: EventEmitter<IToggleConfig> = new EventEmitter();

  constructor() {}

  changeToggle(e: boolean) {
    this.config.isActive = e;
    this.onChange.emit(this.config);
    this.valueChange.emit(this.value)
  }
}
