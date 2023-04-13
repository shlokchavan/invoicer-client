import { Component, Input, Output, EventEmitter, TemplateRef } from "@angular/core";

@Component({
    selector: 'rm-drawer-panel',
    templateUrl: './rm-drawer-panel.component.html',
    styleUrls: ['./rm-drawer-panel.component.scss']
})

export class RMDrawerPanelComponent {

    @Input() hasBackdrop: boolean;
    @Input() drawerMode: "side" | "over" | "push";
    @Input() drawerSize: "extra-extra-small" | "extra-small" | "small" | "medium" | "large" | "extra-large";
    @Input() escClose: boolean;
    @Input() isRightSide: boolean;
    @Input() isActive: boolean;
    @Input() drawerTitle!: string;
    @Input() showCloseButton: boolean;
    @Input() drawerContainer!: TemplateRef<any>
    @Input() footerTemplate!: TemplateRef<any>
    @Input() useCustomTemplate!: boolean;
    @Output() isActiveChange: EventEmitter<any> = new EventEmitter();

    constructor(){
        // Initialize Default
        this.isRightSide = true;
        this.hasBackdrop = true;
        this.escClose = false;
        this.drawerMode = "over";
        this.isActive = false;
        this.drawerSize = "small";
        this.showCloseButton = false;
    }

    ngOnInit(){
     }
    
    onDrawerToggle(isActive: any) {
        // this.isActive = isActive;
        // this.isActiveChange.emit(isActive)
    }
}
