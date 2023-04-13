import { Pipe, PipeTransform } from '@angular/core';
/*
 * Not Working, Not in use. Kept for future ref.
*/
@Pipe({name: 'generateConfig'})
export class GenerateWidgetConfigPipe implements PipeTransform {
  transform(config, tempStore, fullscreenView, currentLevel, refreshChart): any {
    const dataConfig = this.accessConfigByIndex(config,currentLevel);
    let newConfig = null;
    if (dataConfig.customChartConfig) {
      newConfig = dataConfig.customChartConfig.rawDataConverter(
        dataConfig.customChartConfig.rawData,
        dataConfig,
        dataConfig.customChartConfig?.filterVal,
        config
      );
    } else {
      newConfig = dataConfig;
    }
    if (tempStore.config != newConfig) {
      if (
        dataConfig.customChartConfig &&
        newConfig.customChartConfig.viewType == "chart"
      ) {
        // setTimeout(() => {
        //   refreshChart()
        // }, 5000);
      }
      //  else if (
      //   dataConfig.customChartConfig &&
      //   newConfig.customChartConfig.viewType == "grid"
      // ) {
      //   this.tempStore.gridDataConfig = newConfig;
      //   if (this.fullscreenView) {
      //     newConfig.gridConfig.gridHeight = newConfig.gridConfig.gridFullHeight;
      //   } else {
      //     newConfig.gridConfig.gridHeight =
      //       newConfig.gridConfig.gridDefaultHeight;
      //   }
      //   
      // }
      tempStore.config = null;
    }
    if(
      dataConfig.customChartConfig &&
      newConfig.customChartConfig.viewType == "grid"
    ) {
      tempStore.gridDataConfig = newConfig;
      if (fullscreenView) {
        newConfig.gridConfig.gridHeight = newConfig.gridConfig.gridFullHeight;
      } else {
        newConfig.gridConfig.gridHeight =
          newConfig.gridConfig.gridDefaultHeight;
      }
    }
    tempStore.config = newConfig;
    
    return newConfig;
  }

  accessConfigByIndex(config, level: number) {
    // let levelConfig = this.config.dataConfig;
    // for (let index = 1; index <= level; index++) {
    //   levelConfig = levelConfig.dataConfig;
    // }
    let levelConfig = null;
    switch (level) {
      case 0:
        levelConfig = config.dataConfig;
        break;
      case 1:
        levelConfig = config.dataConfig.dataConfig;
        break;
      case 2:
        levelConfig = config.dataConfig.dataConfig.dataConfig;
        break;
      case 3:
        levelConfig = config.dataConfig.dataConfig.dataConfig.dataConfig;
        break;
      case 4:
        levelConfig =
          config.dataConfig.dataConfig.dataConfig.dataConfig.dataConfig;
        break;

      default:
        break;
    }
    return levelConfig;
  }
}