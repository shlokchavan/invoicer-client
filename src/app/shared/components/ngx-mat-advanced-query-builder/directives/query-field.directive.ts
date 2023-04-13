import { Directive, Input } from "@angular/core";
import { Observable } from "rxjs";
import { ProvidedValue } from "../models";
import { ProvidedOperator } from "../models/provided-operators.model";

@Directive({
  selector: "query-field",
})
export class QueryFieldDirective {
  @Input()
  name: string;

  @Input()
  fieldId: any;

  @Input()
  parameterList: any[]

  @Input()
  type: "boolean" | "date" | "number" | "string" | "array";

  @Input()
  values:
    | any[]
    | Observable<any[]>
    | ProvidedValue[]
    | Observable<ProvidedValue[]>;

  @Input()
  operators:
    | any[]
    | Observable<any[]>
    | ProvidedOperator[]
    | Observable<ProvidedOperator[]>;

  @Input()
  format?: string;

  @Input()
  label?: string;

  @Input()
  tooltip?: string;

  @Input()
  maxLength?: number;
}
