import { Component } from "@angular/core";
@Component({
    selector: 'color-box-renderer',
    templateUrl: './color-box-renderer.component.html',
    styleUrls: ['./color-box-renderer.component.scss']
})
export class ColorBoxRenderer {
    params: any;
    colorCode!: string;
    agInit(params: any): void {
        this.params = params;
        this.colorCode = params.color;
    }

}