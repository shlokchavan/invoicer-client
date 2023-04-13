import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'tooltip-org-card-template',
  templateUrl: './tooltip-org-card-template.component.html',
  styleUrls: ['./tooltip-org-card-template.component.scss']
})
export class TooltipOrgCardTemplateComponent {
    @Input() dataModel!: any;
    @Input() orgType!: "client" | "sr" | "sp";
}