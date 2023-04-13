import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared-modules/material.module';
import { RMIconComponent } from './rm-icon.component';
import { CommonModule } from '@angular/common';
import { RMTooltipModule } from '../rm-tooltip';
import { TooltipOrgCardTemplateComponent } from './tooltip-org-card-template/tooltip-org-card-template.component';


@NgModule({
  exports: [RMIconComponent, TooltipOrgCardTemplateComponent],
  declarations: [RMIconComponent, TooltipOrgCardTemplateComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RMTooltipModule
  ]
})
export class RMIconModule { }
