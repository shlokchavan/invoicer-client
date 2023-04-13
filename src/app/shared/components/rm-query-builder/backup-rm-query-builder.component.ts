import { Component, OnInit } from "@angular/core";
import {
  QueryBuilderClassNames,
  QueryBuilderConfig,
} from "../angular2-query-builder/query-builder/query-builder.interfaces";
import { ISelectConfig } from "../rm-select-box/rm-select-box.model";

@Component({
  selector: "rm-query-builder",
  templateUrl: "./rm-query-builder.component.html",
  styleUrls: ["./rm-query-builder.component.scss"],
})
export class RmQueryBuilderComponent implements OnInit {
  classNames: QueryBuilderClassNames = {
    row: "w50 condition-row",
  };
  query = {
    condition: "and",
    rules: [
      { field: "patientType", operator: "=", value: "Outpatient" },
      { field: "diagCode", operator: "in", value: "5589" },
      { field: "predCode", operator: "in", value: "96365" },
    ],
  };

  config: QueryBuilderConfig = {
    fields: {
      patientType: { name: "Patient Type", type: "string" },
      diagCode: {
        name: "Diag Code",
        type: "category",
        options: [
          { name: "5589", value: "5589" },
          { name: "78039", value: "78039" },
          { name: "496", value: "496" },
          { name: "4019", value: "4019" },
        ],
      },
      predCode: {
        name: "Pred Code",
        type: "category",
        options: [
          { name: "96365", value: "96365" },
          { name: "85025", value: "85025" },
          { name: "74177", value: "74177" },
        ],
      },
    },
  };

  constructor() {}

  ngOnInit(): void {}
}
