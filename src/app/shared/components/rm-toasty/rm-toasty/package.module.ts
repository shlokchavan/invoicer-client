import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { Toast } from './rm-toasty.component';
import {
  DefaultNoComponentGlobalConfig,
  GlobalConfig,
  TOAST_CONFIG,
} from './rm-toasty-config';
import { RMIconModule } from '../../rm-icon/package.module';

export const DefaultGlobalConfig: GlobalConfig = {
  ...DefaultNoComponentGlobalConfig,
  toastComponent: Toast,
};

@NgModule({
  imports: [CommonModule, RMIconModule],
  declarations: [Toast],
  exports: [Toast],
  entryComponents: [Toast],
})
export class RMToastyModule {
  static forRoot(config: Partial<GlobalConfig> = {}): ModuleWithProviders<RMToastyModule> {
    return {
      ngModule: RMToastyModule,
      providers: [
        {
          provide: TOAST_CONFIG,
          useValue: {
            default: DefaultGlobalConfig,
            config,
          },
        },
      ],
    };
  }
}

@NgModule({
  imports: [CommonModule],
})
export class ToastyComponentlessModule {
  static forRoot(config: Partial<GlobalConfig> = {}): ModuleWithProviders<RMToastyModule> {
    return {
      ngModule: RMToastyModule,
      providers: [
        {
          provide: TOAST_CONFIG,
          useValue: {
            default: DefaultNoComponentGlobalConfig,
            config,
          },
        },
      ],
    };
  }
}
