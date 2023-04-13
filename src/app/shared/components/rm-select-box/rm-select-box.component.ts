import { Component, Input, Output, EventEmitter, Self, Optional, OnChanges, ViewChild, AfterViewInit, ElementRef, TemplateRef, DoCheck, ContentChild } from "@angular/core";
import { ISelectConfig } from './rm-select-box.model';
import { NG_VALIDATORS, ControlValueAccessor, NgControl, Validators, FormControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { of } from "rxjs";
import { skipWhile, take } from "rxjs/operators";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { A, ENTER, NINE, SPACE, Z, ZERO } from "@angular/cdk/keycodes";
import { MatOption } from "@angular/material/core";

@Component({
    selector: 'rm-select',
    templateUrl: './rm-select-box.component.html',
    styleUrls: ['./rm-select-box.component.scss']
})

export class RMSelectBoxComponent implements ControlValueAccessor, OnChanges, AfterViewInit, DoCheck {
    @ViewChild('ref') input!: MatSelect
    @Input() config!: ISelectConfig | any;
    @Input() dataModel!: Object | any;
    @Output() onAction: EventEmitter<any> = new EventEmitter();
    @Output() onBlur: EventEmitter<any> = new EventEmitter();
    @Output() onSelectionChange: EventEmitter<any> = new EventEmitter();
    @ViewChild('selectSearchRef') selectSearchRef!: ElementRef<HTMLInputElement>;
    @ViewChild(CdkVirtualScrollViewport, { static: false })
  cdkVirtualScrollViewPort!: CdkVirtualScrollViewport;
    query: any;
    @Input() fControl = new FormControl();
    public data!: string;
    disabled!: boolean;
    selectBox!: NgControl;
    private errorMessages = new Map<string, () => string>();
    randomPanelId = Math.floor(Math.random() * Math.floor(50)) + "_select-dropdown"

    @Input() customLabelTemplate!: TemplateRef<any>
    @ContentChild(TemplateRef) customLabelContent!: TemplateRef<any>;
    
    @Input() customOptionTemplate!: TemplateRef<any>
    @Input() optionActionTemplate!: TemplateRef<any>

    public onChangeFn = (_: any) => { };

    public onTouchedFn = () => { };


    constructor(@Self() @Optional() public control: NgControl) {
        // this.control && (this.control.valueAccessor = this);
        // this.errorMessages.set('required', () => `This Field is required.`);
        // if (this.config.attributes.isMandatory && this.control) {
        //     this.control.control.setValidators(Validators.required)
        // }
    }

    ngAfterViewInit() {
        this.control = this.input.ngControl;
        this.control && (this.control.valueAccessor = this);
        this.errorMessages.set('required', () => `This Field is required.`);
        if (this.config.attributes.isMandatory) {
            this.control?.control?.setValidators(Validators.required)
        }
        setInterval(()=> {
            if(this.selectSearchRef) this.selectSearchRef.nativeElement.focus()
        },500)
    }

    ngOnChanges() {
        if(this.config.attributes.isMandatory && this.control) {
            this.control?.control?.setValidators(Validators.required)
        }
    }

    clearSelection() {
        this.input.value = null;
        this.control?.control?.setValue(null)
    }

    openChange(event: boolean) {
        if (event) {
          this.cdkVirtualScrollViewPort.scrollToIndex(0);
          this.cdkVirtualScrollViewPort.checkViewportSize();
        } else {
        }
    }

    // Set Errors on Validation
    public get invalid(): boolean | any {
        return this.control ? this.control.invalid : false;
    }

    public get showError(): boolean | any{
        if (!this.control) {
            return false;
        }

        const { dirty, touched } = this.control;

        return this.invalid ? (dirty || touched) : false;
    }
    public get errors(): Array<string> {
        if (!this.control) {
            return [];
        }

        // const { errors } = this.control;
        const control: any = this.control;
        return Object.keys(control?.errors).map(key => this.errorMessages.has(key) ? this.errorMessages.get(key)!() : <string>control?.errors[key] || key);
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
        this.dataModel[this.config.fieldKey] = obj;
    }

    public onChange() {
        this.onBlur.emit();
        this.onChangeFn(this.dataModel[this.config.fieldKey]);
    }

    onOptionAction() {
      this.onAction.emit();
    } 

    modelChanged(event: any) {
        if (event.value && event.value.length != 0) {
          event.value.forEach((element: any) => {
            this.input.options.forEach((item: MatOption) => {
              if (item.value == element[this.config.returnKey] || element[this.config.dataKey]) {
                item.select();
              }
            });
          });
        } else {
          this.input.options.forEach((item: MatOption) => {
            item.deselect();
          });
        }
      }

    selectionChangeCall(event: any) {
        this.query = undefined;
        this.onSelectionChange.emit(event);
    }

     /**
   * Handles the key down event with MatSelect.
   * Allows e.g. selecting with enter key, navigation with arrow keys, etc.
   * @param event
   */
  _handleKeydown(event: any) {
    // Prevent propagation for all alphanumeric characters in order to avoid selection issues
    if ((event.key && event.key.length === 1) ||
      (event.keyCode >= A && event.keyCode <= Z) ||
      (event.keyCode >= ZERO && event.keyCode <= NINE) ||
      (event.keyCode === SPACE)
    ) {
      event.stopPropagation();
    }

    // if (this.input.multiple && event.key && event.keyCode === ENTER) {
    //   // Regain focus after multiselect, so we can further type
    // //   setTimeout(() => this._focus());
    // }

    // Special case if click Escape, if input is empty, close the dropdown, if not, empty out the search field
    // if (this.enableClearOnEscapePressed === true && event.keyCode === ESCAPE && this.value) {
    //   this._reset(true);
    //   event.stopPropagation();
    // }
  }

  ngDoCheck() {
    // Set Width of Split DropDown Panel Dynamically Based on Button Size
    const button = document.getElementById(this.randomPanelId);
    let btnWidth;
    if (button) {
      btnWidth = button.offsetWidth
    }
  }
}