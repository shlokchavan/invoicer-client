import { Component, Input } from '@angular/core';
import { ILoadingOverlayAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'loading-overlay',
    templateUrl: './custom-loading-overlay.component.html',
    styleUrls: ['./custom-loading-overlay.component.scss']
})
export class CustomLoadingOverlay implements ILoadingOverlayAngularComp {
    params: any;

    agInit(params: any): void {
        this.params = params;
    }
}