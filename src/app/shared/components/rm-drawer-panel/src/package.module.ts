import { NgModule } from "@angular/core";
import { RMDrawerPanelComponent } from './rm-drawer-panel.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/shared-modules/material.module';

@NgModule({
    imports: [CommonModule, MaterialModule],
    declarations: [RMDrawerPanelComponent],
    exports: [RMDrawerPanelComponent]
})

export class RMDrawerPanelModule {
    constructor() {
    }
}