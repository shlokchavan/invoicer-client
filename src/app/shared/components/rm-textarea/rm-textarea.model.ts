export interface ITextareaAttribute {
  label?: string;
  disable?: boolean;
  isMandatory?: boolean;
  autoResize?: boolean;
  resize?: "auto" | "horizontal" | "vertical" | "none";
  minHeight?: string;
  maxHeight?: string;
  readonly?: boolean;
  class?: string;
  maxlength?: number;
  enableLengthHint?: boolean;
  hint?: string;
  hintPosition?: string;
  placeholder?: string;
  pattern?: RegExp | string;
  customPatternMessage?: string;
  isMessageArea?: boolean;
}

export interface ITextareaConfig {
  fieldKey: string;
  attributes: ITextareaAttribute;
  api?: any;
}
