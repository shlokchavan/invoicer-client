import { Component, Input } from "@angular/core";

@Component({
  selector: 'rm-info-box',
  templateUrl: './rm-info-box.component.html',
  styleUrls: ['./rm-info-box.component.scss']
})
export class RMInfoBoxComponent {
  @Input() infoText: string;
  @Input() icon?: string;
  @Input() iconColor?: string;
  @Input() backgroundColor?: string;

  // Variables
  show: boolean = true

  constructor() {

  }

  onCancelClick() {
    this.show = false
  }

}
