import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../../shared-modules/material.module";
import { RMHeaderComponent } from "./rm-header.component";
import { RMIconModule } from "../rm-icon/package.module";
import { RouterModule } from "@angular/router";

@NgModule({
  exports: [RMHeaderComponent],
  declarations: [RMHeaderComponent],
  imports: [BrowserModule, RouterModule, MaterialModule, RMIconModule],
})
export class RMHeaderModule {}
