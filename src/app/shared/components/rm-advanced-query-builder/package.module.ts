import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule } from "@angular/forms";
import { RMButtonModule } from "../rm-button/package.module";
import { RMIconModule } from "../rm-icon/package.module";
import { MaterialModule } from "../../shared-modules/material.module";
import { RMSelectBoxModule } from "../rm-select-box/package.module";
import { QueryBuilderModule } from "../angular2-query-builder/angular2-query-builder.module";
import { RmAdvancedQueryBuilderComponent } from "./rm-advanced-query-builder.component";
import { AdvancedQuerySearchModule } from "../ngx-mat-advanced-query-builder/advanced-query-search.module";

@NgModule({
  declarations: [RmAdvancedQueryBuilderComponent],
  exports: [RmAdvancedQueryBuilderComponent],
  imports: [
    CommonModule,
    FormsModule,
    QueryBuilderModule,
    RMButtonModule,
    RMIconModule,
    MaterialModule,
    RMSelectBoxModule,

    // New (Mat)
    AdvancedQuerySearchModule.forRoot({
      loggingCallback: (...args) => {
        //
      },
      debug: true,
      appearance: "outline",
      limitResults: 20,
      transform: (rules) => {
        //
        return rules;
      },
    }),
  ],
})
export class RmAdvancedQueryBuilderModule {}
