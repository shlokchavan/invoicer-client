/*
 *ngFor="let c of oneDimArray | sortBy:true/false:'asc'"
 *ngFor="let c of arrayOfObjects | sortBy:true/false:'asc':'propertyName'"
*/
import { Pipe, PipeTransform } from '@angular/core';
import { orderBy,sortBy } from 'lodash';

@Pipe({ name: 'sortBy' })
export class SortByPipe implements PipeTransform {

  transform(value: any[],caseInsensitive=false, order = '', column: string = ''): any[] {
    if (!value || order === '' || !order) { return value; } // no array
    if (!column || column === '') { 
      const sorted=this.sortOnCaseSensitivity(value,caseInsensitive);
      if(order==='asc'){return sorted}
      else{return sorted.reverse();}
    } // sort 1d array
    if (value.length <= 1) { return value; } // array with only one item
    else{  
      const converted=this.convertMultiOnCaseSensitivity(value,column,caseInsensitive);
      return orderBy(converted, ['sortCol'], [order as any]).map(v=>{
        delete v['sortCol'];
        return v;
      });
    }
  }
  sortOnCaseSensitivity(value:any[],caseInsensitive:boolean){
    return sortBy(value,(v)=>{
        if(typeof v==='string'&&caseInsensitive){
        return v.toLowerCase()
        }
        return v;
      });
  }
  convertMultiOnCaseSensitivity(value:any[],column: any,caseInsensitive: any){
    let converted=value;
      if(caseInsensitive){
        converted=value.map(v=>{
          if(typeof v[column]==='string'){
          return {...v,sortCol:v[column].toLowerCase()}
        }
        return v;
        })
      }
      return converted;
  }
}