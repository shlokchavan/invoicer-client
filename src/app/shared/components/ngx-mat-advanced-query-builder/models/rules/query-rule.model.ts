import {ConditionOperator} from '../../enums';

export class QueryRule {
  label?: string;
  field?: any;
  operator?: any;
  type?: string;
  value?: any;
  active?: boolean;
  valid?: boolean;
  input?: string;
}
