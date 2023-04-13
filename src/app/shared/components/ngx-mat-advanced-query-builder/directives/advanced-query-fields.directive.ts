import { ContentChildren, Directive, QueryList } from "@angular/core";
import { QueryFieldDirective } from "./query-field.directive";
import { QueryField } from "../models";
import { Observable } from "rxjs";
import { shareReplay } from "rxjs/operators";

@Directive({
  selector: "advanced-query-fields",
})
export class AdvancedQueryFieldsDirective {
  @ContentChildren(QueryFieldDirective) fields: QueryList<QueryFieldDirective>;

  getFields(): QueryField[] {
    return this.fields.map((field) => {
      let fieldValues = field.values;
      let fieldOperators = field.operators;

      if (fieldValues instanceof Observable) {
        fieldValues = (fieldValues as Observable<any>).pipe(shareReplay(1));
      }
      if (fieldOperators instanceof Observable) {
        fieldOperators = (fieldOperators as Observable<any>).pipe(
          shareReplay(1)
        );
      }
      // console.log(field)
      return {
        fieldId: field.fieldId,
        name: field.name,
        values: fieldValues,
        operators: fieldOperators,
        type: field.type,
        format: field.format,
        label: field.label,
        tooltip: field.tooltip,
        maxLength: field.maxLength,
        parameterList: field.parameterList
      };
    });
  }
}
