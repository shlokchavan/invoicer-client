import {QueryBase} from './query-base.model';
import {isDefined, transformValue} from '../helpers/general.helpers';
import {ConditionOperator} from '../enums';
import {QueryRule} from './rules';

export class QueryItem extends QueryBase {
  fieldName: string;
  condition: any;
  value: any;
  type: string;
  active = true;
  parameters: any;


  static apply(fieldName: string, operator: ConditionOperator, value: any, parameterList: any[]): QueryItem {
    const newItem = new QueryItem();

    newItem.fieldName = fieldName;
    newItem.condition = operator;
    newItem.value = value;
    newItem.parameters = parameterList;
    return newItem;
  }

  get filterValue(): QueryRule {
    // && isDefined(this.type) && isDefined(this.operator) && this.checkNullCondition()
    if (isDefined(this.fieldName) && isDefined(this.type) && isDefined(this.operator) && this.checkNullCondition()) {
      // const operator = (ConditionOperator as any)[this.condition];
      const transformedValue = transformValue(this.value, this.type);
      return {
        field: this.fieldId || this.fieldName,
        operator: this.operator,
        value: transformedValue,
        type: this.operatorType,
        input: "text"
        // active: this.active,
        // valid: true
      };
    }
    return {
      active: false,
      valid: false
    };
  }

  get operatorType() {
    if(this.condition?.operatorId)
      return this.condition.fieldType
    else return "String";
  }

  get fieldId() {
    if(this.parameters)
    if(typeof this.fieldName == 'string') {
      const param = this.parameters.find(parameter => parameter.paramDisplayName == this.fieldName);
      return param && param.paramId;
    } else {
      const param = this.parameters.find(parameter => parameter.paramId == this.fieldName);
      return param && param.paramDisplayName;
    }
  }

  get operator() {
    if(this.condition?.operatorId)
      return this.condition.operatorId
    else return null
  }

  private checkNullCondition() {
    if (this.operator == null) {
      return true;
    }
    return this.value != null && this.value != undefined;
  }
}
