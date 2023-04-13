import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "rm-report-card",
  templateUrl: "./rm-report-card.component.html",
  styleUrls: ["./rm-report-card.component.scss"],
})
export class RmReportCardComponent implements OnInit {
  @Input() customBgColor?: string; // purple (billed) | green (unbilled) | blue (overall)
  @Input() title?: string; // Period
  @Input() subTitle?: string; // Count
  @Input() amount?: any; // Amount
  @Input() hitCount?: any; //  Hit Count: <strong>86</strong> | Hit Rate: <strong>29%</strong>
  @Input() hitRate?: any; //  Hit Count: <strong>86</strong> | Hit Rate: <strong>29%</strong>
  @Input() completed?: any; //  Client dashboard Completed
  @Input() hits?: any; //  Client dashboard Hits:
  @Input() hitTitle?: any; //  Client dashboard Hits:
  @Input() amountFound?: any; //  Client dashboard Amount Found
  @Input() totalAccount?: any; //  Client dashboard Total Account

  @Input() loading: boolean;
  constructor() {}

  ngOnInit(): void {}
}
