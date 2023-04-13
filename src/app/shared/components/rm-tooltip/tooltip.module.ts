import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './tooltip.directive';
import { TooltipComponent } from './tooltip.component';
import { TooltipOptions } from './tooltip-options.interface';
import { TooltipOptionsService } from './tooltip-options.service';

@NgModule({
    declarations: [
        TooltipDirective,
        TooltipComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        TooltipDirective
    ],
    entryComponents: [
        TooltipComponent
    ]
})
export class RMTooltipModule {

    static forRoot(initOptions: TooltipOptions): ModuleWithProviders<RMTooltipModule> {
        return {
            ngModule: RMTooltipModule,
            providers: [
                {
                    provide: TooltipOptionsService,
                    useValue: initOptions
                }
            ]
        };
    }
}
