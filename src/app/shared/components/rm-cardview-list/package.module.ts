import { NgModule } from "@angular/core";
import { MaterialModule } from "../../shared-modules/material.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RMCardViewListComponent } from "./rm-cardview-list.component";
import { RMOrgCardModule } from "../rm-org-card/package.module";
import { CardViewFilterPipe } from "./pipe/rm-carview-list-filter.pipe";
import { RMUserCardModule } from "../rm-user-card/package.module";
import { RMGroupCardModule } from "../rm-group-card/package.module";
import { RMAccountCardModule } from "../rm-account-card/package.module";

@NgModule({
  exports: [RMCardViewListComponent],
  declarations: [RMCardViewListComponent, CardViewFilterPipe],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RMOrgCardModule,
    RMUserCardModule,
    RMGroupCardModule,
    RMAccountCardModule,
  ],
})
export class RMCardViewListModule {}
