import { Pipe, PipeTransform } from "@angular/core";
/**
 * Author: Shlok Chavan
 * Component: Filter Card View Data
 *
 * @param {Object} [all] // Array of Object/ Data
 * @param {Object} key // Key of Object for Condition Matching
 * @param {boolean} condition // Condition (true/ false)
 * @return {Array} filteredRecords
 */

@Pipe({ name: "CardFilter" })
export class CardViewFilterPipe implements PipeTransform {
  // Take Array of Data

  // condition: boolean
  transform(all: any[], key: any, condition: boolean, childKey?: any) {
    //  If Condition is Set/ True
    if (condition) {
      return all.filter((each) => {
        return each[key][childKey] == condition;
      });
    }
    // Else Return All
    return all;
  }
}
