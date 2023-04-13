import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IHeaderConfig, ISubHeaderConfig } from 'src/app/shared/components/rm-header/rm-header.model';
import { IRMBookMarkConfig, IRMNavItemConfig } from 'src/app/shared/components/rm-nav/rm-nav.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AppHeaderComponent implements OnChanges {
    //Parameters
    @Input() SubHeader!: ISubHeaderConfig;
    // @Input() bookmarkObjects: IRMNavItemConfig[];
    @Input() bookmarkObjects!: IRMBookMarkConfig[];
    @Output() onEventTrigger: EventEmitter<any> = new EventEmitter();

    //Config Variables
    headerConfig:IHeaderConfig; 
  constructor() {
      //Setup Component Config
      this.headerConfig = {
        // logoURL: "../../../../../assets/img/rm_logo.png",
        logoURL: "../../../../../assets/img/dummyLogo_White.png",
        humbergerIcon: "humburger",
        subHeaderConfig: null || undefined,
        actions: [
          {
            icon: 'search',
            label: 'test',
            action: 'test'
          },
          {
            icon: 'help',
            label: 'test',
            action: 'test'
          },
          {
            icon: 'notification',
            label: 'test',
            action: 'test'
          }
        ]
      }
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    this.headerConfig.subHeaderConfig = this.SubHeader;
  }
  
  eventTrigger(type: string | any, response: null | any) {
    const event = {
      type: type,
      response: response
    }
    this.onEventTrigger.emit(event)
  }
}
