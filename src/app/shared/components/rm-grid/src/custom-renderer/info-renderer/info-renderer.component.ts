import { Component } from "@angular/core";
@Component({
    selector: 'info-renderer',
    templateUrl: './info-renderer.component.html',
    styleUrls: ['./info-renderer.component.scss']
})
export class InfoRenderer {
    // Config
    params: any;
    title: any;
    agInit(params: any): void {
        // 
        this.params = params;
        this.params.icon = params.icon;
        this.params.columnKey = params.columnKey;
        this.title = params.data[params.columnKey];
    }

}
