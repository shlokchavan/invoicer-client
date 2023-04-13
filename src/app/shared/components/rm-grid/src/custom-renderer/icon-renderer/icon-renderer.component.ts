import { Component } from "@angular/core";
@Component({
    selector: 'icon-renderer',
    templateUrl: './icon-renderer.component.html'
})
export class IconRenderer {
    // Config
    params: any;
    agInit(params: any): void {
        // 
        this.params = params;
        this.params.icon = params.icon;
    }

}
