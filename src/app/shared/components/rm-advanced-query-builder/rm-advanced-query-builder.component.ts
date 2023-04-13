import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { generate, Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

import { MatTabGroup } from "@angular/material/tabs";
import { Clipboard } from "@angular/cdk/clipboard";
import { ConditionOperator } from "../ngx-mat-query-builder/enums";

import { Demo } from "./model/demo.model";
import { AdvancedQuerySearchComponent } from "../ngx-mat-advanced-query-builder/advanced-query-search.component";
import { QueryRuleGroup } from "../ngx-mat-advanced-query-builder/models/rules";
import {
  ProvidedValue,
  SavedFilter,
} from "../ngx-mat-advanced-query-builder/models";
import { QuerySearchService } from "../ngx-mat-advanced-query-builder/query-search.service";

@Component({
  selector: "rm-advanced-query-builder",
  templateUrl: "./rm-advanced-query-builder.component.html",
  styleUrls: ["./rm-advanced-query-builder.component.scss"],
})
export class RmAdvancedQueryBuilderComponent implements OnInit {
  @Input() query: any;
  @Input() parameterList: any;
  @Input() updateParameterList: any;
  @Input() operatorList: any;
  @Input() updateOperatorList: any;
  @Input() updateOperationList: any;
  @Input() parameterListValues: any;
  @Input() updateParameterListValues: any;
  @Input() readonly: boolean;
  @Input() disableField?: "parameter-disabled" | "value-disabled" | undefined;

  @Input() config: any = [];
  @Input() updateConfig: any = [];
  // NEW FIELD
  @Input() consolidatedTableList: any = [];
  @Output() onQueryChange: EventEmitter<any> = new EventEmitter();
  @Output() onUpdateQueryChange: EventEmitter<any> = new EventEmitter();
  @Output() onFilterChanged: EventEmitter<void> = new EventEmitter();

  @ViewChild(MatTabGroup) matTabGroup: MatTabGroup;
  @ViewChild("customQueryBuilder")
  customQueryBuilder: AdvancedQuerySearchComponent;
  @ViewChild("updateCustomQueryBuilder")
  updateCustomQueryBuilder: AdvancedQuerySearchComponent;
  // @ViewChild(ExportedQuerySearchComponent)
  // querySearchComponent: ExportedQuerySearchComponent;

  queryObject: QueryRuleGroup[] | null = null;
  updateQueryObject: QueryRuleGroup[] | null = null;

  currentFilter?: SavedFilter | null = null;
  isCurrentFilterChanged: boolean;
  observableValues: Observable<ProvidedValue[]>;

  ruleId = null;

  constructor(
    private querySearchService: QuerySearchService,
    private clipboard: Clipboard
  ) {
    this.querySearchService.queryUpdated.subscribe((newQueryObject) => {
      this.queryObject = newQueryObject.rules;
      if (
        this.customQueryBuilder.queryBuilderId == newQueryObject.queryBuilderId
      )
        this.onQueryChange.emit(this.queryObject);
    });

    this.querySearchService.queryUpdated.subscribe((newQueryObject) => {
      this.updateQueryObject = newQueryObject.rules;
      if (
        this.updateCustomQueryBuilder.queryBuilderId ==
        newQueryObject.queryBuilderId
      )
        this.onUpdateQueryChange.emit(this.updateQueryObject);
    });

    const alphabet = "abcdefghijklmnopqrstuvwxyz123456789";
    const values = alphabet.split("").map((letter) => ({
      displayValue: `Value ${letter.toUpperCase()}`,
      value: letter.toUpperCase(),
      description: `This is value ${letter.toUpperCase()}`,
    }));

    this.observableValues = of(values).pipe(delay(2000));
  }

  saveFilter() {
    // This is where you would do your saving logic, saving the filter from the generation method
    // const newFilter = this.querySearchComponent.generateSavedFilter(
    //   generate().spaced + " Filter"
    // );
    // if (!!newFilter) {
    //   this.querySearchComponent.filterSaved(newFilter);
    // }
  }

  get hasFilter() {
    return !!this.currentFilter;
  }

  provideParsedFilter(filter: SavedFilter) {
    // this.matTabGroup.focusTab(0);
    filter.ruleGroup = this.convertOperatorIdToObject(filter.ruleGroup);
    filter.ruleGroup = this.convertFieldIdToFieldName(filter.ruleGroup);
    filter.ruleGroup = this.convertStringListToArrayValues(filter.ruleGroup);
    filter.ruleGroup = this.loadParameters(filter.ruleGroup);
    if (filter.type == "match") {
      this.customQueryBuilder.loadSavedFilter(filter);
    } else {
      this.updateCustomQueryBuilder.loadSavedFilter(filter);
    }
  }

  convertOperatorIdToObject(rule: QueryRuleGroup): QueryRuleGroup {
    let obj = rule;
    obj.rules = obj.rules.map((ruleItem: any) => {
      if (ruleItem.condition) this.convertOperatorIdToObject(ruleItem);
      else
        ruleItem["operator"] = this.operatorList.find(
          (operator) => operator.operatorId == ruleItem["operator"]
        );
      return ruleItem;
    });
    return obj;
  }

  convertFieldIdToFieldName(rule: QueryRuleGroup): QueryRuleGroup {
    let obj = rule;
    obj.rules = obj.rules.map((ruleItem: any) => {
      if (ruleItem.condition) this.convertFieldIdToFieldName(ruleItem);
      else {
        if (typeof ruleItem["field"] == "number") {
          const param = this.parameterList.find(
            (parameter) => parameter.paramId == ruleItem["field"]
          );
          const field = param?.paramDisplayName || "unknown";
          ruleItem["field"] = field;
        }
      }
      return ruleItem;
    });
    return obj;
  }

  convertStringListToArrayValues(rule: QueryRuleGroup): QueryRuleGroup {
    let obj = rule;
    obj.rules = obj.rules.map((ruleItem: any) => {
      if (ruleItem.condition) this.convertFieldIdToFieldName(ruleItem);
      else {
        if (typeof ruleItem["value"] == "string")
          ruleItem["value"] = ruleItem["value"].includes(",")
            ? ruleItem["value"].split(",")
            : ruleItem["value"];
      }
      return ruleItem;
    });
    return obj;
  }

  loadParameters(rule: QueryRuleGroup): QueryRuleGroup {
    let obj = rule;
    // console.log(this.parameterList);

    obj.rules = obj.rules.map((ruleItem: any) => {
      if (ruleItem.condition) this.loadParameters(ruleItem);
      else ruleItem["parameters"] = this.parameterList;
      return ruleItem;
    });
    return obj;
  }

  copyFilterOutput() {
    if (!!this.currentFilter) {
      this.clipboard.copy(JSON.stringify(this.currentFilter));
    }
  }

  copyQueryOutput() {
    if (!!this.queryObject) {
      this.clipboard.copy(JSON.stringify(this.queryObject));
    }
  }

  generate() {
    this.customQueryBuilder.generate();
    this.updateCustomQueryBuilder.generate();
  }

  queryPreloaded(event) {
    // this.isCurrentFilterChanged = false;
    //
  }

  isFilterValid(event) {
    //
  }

  filterChanged(type?: string | any) {
    switch (type) {
      case "updateClause":
        // Update Section Changed
        break;
    }
    this.onFilterChanged.emit();
    this.isCurrentFilterChanged = true;
  }

  ngOnInit() {
    if (this.parameterList) {
      let tempConfig: any[] = this.parameterList.map((parameter: any) => {
        return {
          fieldId: parameter.paramId,
          name: parameter.paramDisplayName,
          fieldName: parameter.paramDbFieldName,
          tableName: parameter.tableName,
          type: parameter.fieldType,
          values: [],
        };
      });
      // tempConfig = tempConfig.map((temp: any) => {
      //   const filteredValues = this.parameterListValues.find(
      //     (value: any) =>
      //       value.fieldName == temp.fieldName &&
      //       value.tableName == temp.tableName
      //   );
      //   return {
      //     ...temp,
      //     values:
      //       filteredValues && filteredValues.fieldValues
      //         ? String(filteredValues.fieldValues).split(",")
      //         : [],
      //   };
      // });

      this.config = tempConfig;
    }

    // Update Config
    if (this.updateParameterList) {
      let tempConfig: any[] = this.updateParameterList.map((parameter: any) => {
        return {
          fieldId: parameter.paramId,
          name: parameter.paramDisplayName,
          fieldName: parameter.paramDbFieldName,
          tableName: parameter.tableName,
          type: parameter.fieldType,
          values: [],
        };
      });
      // tempConfig = tempConfig.map((temp: any) => {
      //   const filteredValues = this.updateParameterListValues.find(
      //     (value: any) =>
      //       value.fieldName == temp.fieldName &&
      //       value.tableName == temp.tableName
      //   );
      //   return {
      //     ...temp,
      //     values:
      //       filteredValues && filteredValues.fieldValues
      //         ? String(filteredValues.fieldValues).split(",")
      //         : [],
      //   };
      // });

      this.updateConfig = tempConfig;
    }
  }

  ngOnChanges() {}
}
