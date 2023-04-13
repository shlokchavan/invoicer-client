import { AfterContentChecked, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { GlobalConfig } from 'src/app/configs/global-config';
import { EncryptedStorage } from '../../utils/encrypted-storage';
import { ThemeService } from '../../_global/theme.service';

@Component({
  selector: 'rm-theme-selector',
  templateUrl: './rm-theme-selector.component.html',
  styleUrls: ['./rm-theme-selector.component.scss']
})
export class RMThemeSelectorComponent implements OnInit {
    // Parameters
    themeCollection!: any[];
    @Input() theme: any;
    @Output() themeChange: EventEmitter<any> = new EventEmitter();

    // Template Ref

    //Variables
    myOrgThemes = []

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private themeService: ThemeService
  ) {
    // Initialize Default Properties

  }


  
  ngOnInit() {
    this.loadAvailableThemes();
  }

  loadAvailableThemes() {
    this.themeService.getThemes().subscribe(
      response => {
        this.themeCollection = response;
        this.themeCollection.map(item => {
          const foundTheme = this.loadMyThemes().find(myTheme => `${myTheme?.sysColourThemeId}` == `${item["theme-id"]}`);
          if(foundTheme && foundTheme?.isActive) {
            
            item['disabled'] = false
          }
          return item;
        })
      }
    );
  }

  loadMyThemes(): any[]{
    const themes = JSON.parse(new EncryptedStorage().getItem(new GlobalConfig().availableThemesLSName)!);
    return themes ? themes : []
  }

  changeTheme(theme: any, loadedTheme: any) {
    if(!loadedTheme?.disabled) {
      this.theme = theme;
      this.themeService.changeTheme(theme, document, loadedTheme)
      this.themeChange.emit(this.theme);
    }
    // 
  }

}
