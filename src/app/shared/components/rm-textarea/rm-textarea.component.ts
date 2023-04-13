import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Optional,
  Output,
  Self,
  ViewChild,
  ViewEncapsulation,
  Renderer2,
} from "@angular/core";
import { ControlValueAccessor, NgControl, Validators } from "@angular/forms";

@Component({
  selector: "rm-textarea",
  templateUrl: "./rm-textarea.component.html",
  styleUrls: ["./rm-textarea.component.scss"],
})
export class RMTextareaComponent implements ControlValueAccessor, OnChanges {
  @Input() config: any;
  @Input() dataModel!: Object | any;
  @Output() onBlur: EventEmitter<any> = new EventEmitter();
  @ViewChild("textArea") textArea!: ElementRef;
  @ViewChild("matFormField") matFormField!: ElementRef;
  public data!: string;
  disabled!: boolean;
  private errorMessages = new Map<string, () => string>();

  public onChangeFn = (_: any) => {};

  public onTouchedFn = () => {};

  constructor(
    @Self() @Optional() public control: NgControl,
    private renderer: Renderer2
  ) {
    this.control && (this.control.valueAccessor = this);
    this.errorMessages.set("required", () => `This Field is required.`);
    if (this.control) {
      setInterval(() => {
        this.control?.control?.patchValue(this.dataModel[this.config.fieldKey]);
      }, 100);
    }
  }

  ngOnChanges() {
    if (this.control)
      if (this.config.attributes.isMandatory) {
        this.control?.control?.setValidators(Validators.required);
      }
  }

  // Set Errors on Validation
  public get invalid(): boolean | any {
    return this.control ? this.control.invalid : false;
  }

  public get showError(): boolean | any {
    if (!this.control) {
      return false;
    }

    const { dirty, touched } = this.control;

    return this.invalid ? dirty || touched : false;
  }
  public get errors(): Array<string> {
    if (!this.control) {
      return [];
    }

    // const { errors } = this.control;
    const control: any = this.control;
    
    return Object.keys(control?.errors).map((key) =>
      this.errorMessages.has(key)
        ? this.errorMessages.get(key)!()
        : <string>control?.errors[key] || key
    );
  }

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public writeValue(obj: any): void {
    // 
    // this.dataModel[this.config.fieldKey] = obj;
  }

  public onChange() {
    if (this.config.attributes.isMessageArea) {
      this.renderer.setStyle(this.textArea.nativeElement, "height", "auto");
      this.renderer.setStyle(
        this.textArea.nativeElement,
        "height",
        this.textArea.nativeElement.scrollHeight - 7 + "px"
      );
    }
    this.onBlur.emit();
    this.onChangeFn(this.dataModel[this.config.fieldKey]);
  }
}
