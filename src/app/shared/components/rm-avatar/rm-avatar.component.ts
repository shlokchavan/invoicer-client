import { AfterViewInit, Component, Input } from "@angular/core";

@Component({
  selector: "rm-avatar",
  templateUrl: "./rm-avatar.component.html",
  styleUrls: ["./rm-avatar.component.scss"],
})
export class RMAvatarComponent implements AfterViewInit {
  //Params
  @Input() firstName!: string;
  @Input() lastName!: string;
  @Input() img: string | any;
  @Input() customText?: string;
  @Input() colorClass?: string;
  randomValue!: number;
  fullName: string | any;

  constructor() {}

  // Util
  getInitials() {
    // string = 'Clark Hogan'
    const string = `${this.firstName} ${this.lastName}`;
    let names = string.split(" "),
      initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  }

  ngAfterViewInit() {
    this.randomValue = Math.ceil(Math.random() * 6);
    this.fullName =
      this.firstName != undefined || "" || this.lastName != undefined || ""
        ? ""
        : `${this.firstName} ${this.lastName}`;
  }
}
