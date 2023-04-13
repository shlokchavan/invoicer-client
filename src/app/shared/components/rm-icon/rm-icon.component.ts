import { AfterContentChecked, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { TooltipOptions } from '../rm-tooltip';

@Component({
  selector: 'rm-icon',
  templateUrl: './rm-icon.component.html',
  styleUrls: ['./rm-icon.component.scss']
})
export class RMIconComponent implements OnInit {
    // Parameters
    @Input() icon!: string;
    @Input() disabled: boolean;
    @Input() state: string;
    @Input() color: string;
    @Input() size: string;
    @Input() enableTooltip!: boolean | any;
    @Input() tooltipContent!: string | any;
    @Input() tooltipTitle!: string;
    @Input() contentType: 'string' | 'html' | 'template'
    @Input() templateType!: 'description' | 'error' | 'blank'
    @Input() tooltipOptions!: TooltipOptions;
    @Input() customColor!: string | any;

    @Output() onClick: EventEmitter<any> = new EventEmitter();
  constructor() {
    // Initialize Default Properties
    this.disabled = false;
    this.state = 'solid'; // solid | hover
    this.color = 'gray'; // gray | link | white | theme
    this.size = 'medium'; // small | medium | extra-medium | large | extra-large
    this.customColor = null;
    this.enableTooltip = false; // true | false
    this.contentType = "string";
  }
  
  ngOnInit() {
  
  }
  
  clickIcon(event: any) {
    if(!this.disabled)
      this.onClick.emit(event)
  }
}
