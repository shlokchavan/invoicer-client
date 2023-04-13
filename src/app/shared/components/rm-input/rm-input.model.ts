import { MatFormFieldAppearance } from "@angular/material/form-field";

export interface IRules {
  rule: string;
  message: string;
}

export interface ITextAttribute {
  label?: string;
  type?: string;
  placeholder?: string;
  matlabel?: string;
  disable?: boolean;
  readonly?: boolean;
  inputClass?: string;
  isMandatory?: boolean;
  validateOninit?: boolean;
  appearance?: MatFormFieldAppearance;
  iconSize?: string;
  prefixIcon?: string;
  prefixIconImg?: string;
  suffixIcon?: string;
  togglePassword?: boolean;
  isOptional?: boolean;
  pattern?: RegExp | string;
  minDate?: any;
  maxDate?: any;
  isSmall?: boolean;
  customPatternMessage?: string;
  class?: string;
  hint?: string;
  disableNativeAutoComplete?: boolean;
  isMessageArea?: boolean;

  // Auto Complete Recipient Selector
  prefixText?: string;
  autoCompleteOptions?: any[];
}

export interface ITextConfig {
  fieldKey: string;
  attributes: ITextAttribute;
  pickerConfig?: any;
  api?: any;
  disableBoolKey?: string;
}
