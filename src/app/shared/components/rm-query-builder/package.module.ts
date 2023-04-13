import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RmQueryBuilderComponent } from "./rm-query-builder.component";

import { FormsModule } from "@angular/forms";
import { RMButtonModule } from "../rm-button/package.module";
import { RMIconModule } from "../rm-icon/package.module";
import { MaterialModule } from "../../shared-modules/material.module";
import { RMSelectBoxModule } from "../rm-select-box/package.module";
import { QueryBuilderModule } from "../angular2-query-builder/angular2-query-builder.module";
import { QuerySearchModule } from "../ngx-mat-query-builder/query-search.module";

@NgModule({
  declarations: [RmQueryBuilderComponent],
  exports: [RmQueryBuilderComponent],
  imports: [
    CommonModule,
    FormsModule,
    QueryBuilderModule,
    RMButtonModule,
    RMIconModule,
    MaterialModule,
    RMSelectBoxModule,

    // New (Mat)
    QuerySearchModule.forRoot({
      loggingCallback: (...args) => {
        // 
      },
      debug: true,
      appearance: 'outline',
      limitResults: 20,
      transform: rules => {
        // 
        return rules;
      }
    }),
  ],
})
export class RmQueryBuilderModule {}
