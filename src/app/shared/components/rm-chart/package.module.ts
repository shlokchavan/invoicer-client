import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RMChartComponent } from './rm-chart.component';
// import { ChartsModule } from 'ng2-charts';
import { RMLoaderModule } from '../rm-loader/package.module';
import { NgChartsModule } from '../ng2-charts/src/lib/ng-charts.module';



@NgModule({
  declarations: [
    RMChartComponent
  ],
  exports: [
    RMChartComponent
  ],
  imports: [
    CommonModule,
    RMLoaderModule,
    // Charts
    NgChartsModule
  ]
})
export class RMChartModule { }
