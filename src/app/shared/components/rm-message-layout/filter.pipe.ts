import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
})
export class FilterPipe implements PipeTransform {
 searchQueryCondition = (searchText: string | any, item: any, key: string) => {
return String(item[key])
.toLowerCase()
.includes(searchText.toString().toLowerCase())
  };

  transform(
    items: any[],
    searchText: string,
    fromDate: string,
    toDate?: any
  ): any[] {
    // debugger;
    if (!fromDate && !searchText) return items;
    // if (!items) return [];
    // if (!searchText) return items;
    // if (!fromDate) return items;

    if (items && items.length) {
      // When user only search text without from and to dates
      if (searchText && !fromDate) {
        return items.filter((item) => {
          return Object.keys(item).some((key) => {
            return String(item[key])
              .toLowerCase()
              .includes(searchText.toLowerCase());
          });
        });
      } else {
      // When user search with from and to dates and text
      return items.filter((item) => {
        return Object.keys(item).some((key) => {
          return (
            this.searchQueryCondition(searchText, item, key)  &&
            fromDate <= item.createdDate.slice(0, 10) &&
            toDate >= item.createdDate.slice(0, 10)
          );
        });
      });
      }
    } else {
      return items;
    }
    // fromDate == item.createdDate.slice(0, 10)
  }
}
