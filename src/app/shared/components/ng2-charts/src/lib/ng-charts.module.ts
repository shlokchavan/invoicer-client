import { Injectable, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { BaseChartDirective } from './base-chart.directive';
import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  Chart,
  ChartComponentLike,
  ChartConfiguration,
  defaults,
  DoughnutController,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  ScatterController,
  TimeSeriesScale,
  Title,
  Tooltip
} from 'chart.js';
import { builtInDefaults } from "./get-colors";
import * as _ from 'lodash';

Chart.register(
  Title, Tooltip, Filler, Legend,
  LineController, LineElement, PointElement, LinearScale, CategoryScale,
  BarController, BarElement,
  DoughnutController, ArcElement,
  RadarController, RadialLinearScale,
  PieController,
  PolarAreaController,
  BubbleController,
  ScatterController,
  TimeSeriesScale);

@NgModule({
  imports: [],
  declarations: [ BaseChartDirective ],
  exports: [ BaseChartDirective ]
})
export class NgChartsModule {

  constructor(@Optional() config?: NgChartsConfiguration, @Optional() @SkipSelf() parentModule?: NgChartsModule) {
    // if (parentModule) {
    //   throw new Error(
    //     'NgChartsModule is already loaded. Use .forRoot() in the AppModule only');
    // }

    if (config?.plugins)
      Chart.register(config?.plugins);

    const ngChartsDefaults = _.merge(builtInDefaults, config?.defaults || {});

    defaults.set(ngChartsDefaults);
  }

  public static forRoot(config?: Pick<ChartConfiguration, 'plugins'> & { defaults: any }): ModuleWithProviders<NgChartsModule> {
    return {
      ngModule: NgChartsModule,
      providers: [
        { provide: NgChartsConfiguration, useValue: config }
      ]
    };
  }
}

@Injectable({ providedIn: NgChartsModule })
export class NgChartsConfiguration {
  public plugins?: ChartComponentLike;
  public defaults?: any;
}
