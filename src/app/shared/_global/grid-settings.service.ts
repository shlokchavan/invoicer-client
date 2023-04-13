import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RMGridComponent } from '../components/rm-grid/src/rm-grid.component';

@Injectable({
    providedIn: 'root'
})
export class GridSettingService {

    private densityActive = new BehaviorSubject(40);
    currentDensity = this.densityActive;
    baseUrl = environment.apiUrl;
    constructor(private httpClient: HttpClient) { }

    changeDensity(density: any, grid: RMGridComponent) {
        // document: Document, 
        let value: any;
        switch (density) {
            case 'Default':
                value = 40;
                break;
            case 'Comfortable':
                value = 50;
                break;
            case 'Compact':
                value = 35;
                break;
            default:
                break;
        }
        grid.gridOptions['rowHeight'] = value;
        grid.gridApi.resetRowHeights();

        

        document.documentElement.style.setProperty('--global-row-height', value + 'px');
        this.densityActive.next(value)
    }

    getDensity() {
        return this.densityActive.asObservable();
    }

}