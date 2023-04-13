import { Component, Input } from "@angular/core";

@Component({
  selector: 'rm-loader',
  templateUrl: './rm-loader.component.html',
  styleUrls: ['./rm-loader.component.scss']
})
export class RMLoaderComponent {
  @Input() loadingText!: string;
  constructor() {

  }

}
