import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { KeysPipe } from './pipes/keys.pipe';
import { OtpInputConfig } from './rm-otp-input.model';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'rm-otp-input',
  templateUrl: './rm-otp-input.component.html',
  styleUrls: ['./rm-otp-input.component.scss'],
})
export class RMOtpInputComponent implements OnInit, AfterViewInit {
  @Input() config: OtpInputConfig = { length: 4 };
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onInputChange = new EventEmitter<string>();
  otpForm!: FormGroup;
  inputControls: FormControl[] = new Array(this.config.length);
  componentKey =
    Math.random().toString(36).substring(2) + new Date().getTime().toString(36);
  inputType!: string;
  constructor(private keysPipe: KeysPipe) {}

  ngOnInit() {
    this.otpForm = new FormGroup({});
    for (let index = 0; index < this.config.length; index++) {
      this.otpForm.addControl(this.getControlName(index), new FormControl());
    }
    this.inputType = this.getInputType();
  }
  ngAfterViewInit(): void {
    if (!this.config.disableAutoFocus) {
      const containerItem = document.getElementById(`c_${this.componentKey}`);
      if (containerItem) {
        containerItem.addEventListener('paste', (evt) => this.handlePaste(evt));
        const ele: any = containerItem.getElementsByClassName('otp-input')[0];
        if (ele && ele.focus) {
          ele.focus();
        }
      }
    }
  }
  private getControlName(idx: number) {
    return `ctrl_${idx}`;
  }

  otpFormControlItem(item: any) {
    return this.otpForm.controls[item] as FormControl;
  }

  ifLeftArrow(event: any) {
    return this.ifKeyCode(event, 37);
  }

  ifRightArrow(event: any) {
    return this.ifKeyCode(event, 39);
  }

  ifBackspaceOrDelete(event: any) {
    return (
      event.key === 'Backspace' ||
      event.key === 'Delete' ||
      this.ifKeyCode(event, 8) ||
      this.ifKeyCode(event, 46)
    );
  }

  ifKeyCode(event: { keyCode: any; charCode: any }, targetCode: number) {
    const key = event.keyCode || event.charCode;
    // tslint:disable-next-line: triple-equals
    return key == targetCode ? true : false;
  }
  onKeyDown($event: any) {
    var isSpace = this.ifKeyCode($event, 32);
    if (isSpace) {
      // prevent space
      return false;
    }
    return true;
  }

  onKeyUp($event: any, inputIdx: number) {
    const nextInputId = this.appendKey(`otp_${inputIdx + 1}`);
    const prevInputId = this.appendKey(`otp_${inputIdx - 1}`);
    if (this.ifRightArrow($event)) {
      this.setSelected(nextInputId);
      return;
    }
    if (this.ifLeftArrow($event)) {
      this.setSelected(prevInputId);
      return;
    }
    const isBackspace = this.ifBackspaceOrDelete($event);
    if (isBackspace && !$event.target.value) {
      this.setSelected(prevInputId);
      this.rebuildValue();
      return;
    }
    if (!$event.target.value) {
      return;
    }
    if (this.ifValidEntry($event)) {
      this.setSelected(nextInputId);
    }
    this.rebuildValue();
  }

  appendKey(id: string) {
    return `${id}_${this.componentKey}`;
  }

  setSelected(eleId: string) {
    this.focusTo(eleId);
    const ele: any = document.getElementById(eleId);
    if (ele && ele.setSelectionRange) {
      setTimeout(() => {
        ele.setSelectionRange(0, 1);
      }, 0);
    }
  }

  ifValidEntry(event: any) {
    const inp = String.fromCharCode(event.keyCode);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return (
      isMobile ||
      /[a-zA-Z0-9-_]/.test(inp) ||
      (this.config.allowKeyCodes &&
        this.config.allowKeyCodes.includes(event.keyCode)) ||
      (event.keyCode >= 96 && event.keyCode <= 105)
    );
  }

  focusTo(eleId: string) {
    const ele: any = document.getElementById(eleId);
    if (ele) {
      ele.focus();
    }
  }

  // method to set component value
  setValue(value: any) {
    if (this.config.allowNumbersOnly && isNaN(value)) {
      return;
    }
    this.otpForm.reset();
    if (!value) {
      this.rebuildValue();
      return;
    }
    value = value.toString().replace(/\s/g, ''); // remove whitespace
    Array.from(value).forEach((c, idx) => {
      if (this.otpForm.get(this.getControlName(idx))) {
        this.otpForm.get(this.getControlName(idx))!.setValue(c);
      }
    });
    if (!this.config.disableAutoFocus) {
      const containerItem = document.getElementById(`c_${this.componentKey}`);
      var indexOfElementToFocus =
        value.length < this.config.length
          ? value.length
          : this.config.length - 1;
      let ele: any =
        containerItem!.getElementsByClassName('otp-input')[
          indexOfElementToFocus
        ];
      if (ele && ele.focus) {
        ele.focus();
      }
    }
    this.rebuildValue();
  }

  rebuildValue() {
    let val = '';
    this.keysPipe.transform(this.otpForm.controls).forEach((k) => {
      if (this.otpForm.controls[k].value) {
        val += this.otpForm.controls[k].value;
      }
    });
    this.onInputChange.emit(val);
  }
  getInputType(): string {
    return this.config.isPasswordInput
      ? 'password'
      : this.config.allowNumbersOnly
      ? 'tel'
      : 'text';
  }
  handlePaste(e: any) {
    // Get pasted data via clipboard API
    // let clipboardData = e.clipboardData || window['clipboardData'];
    let clipboardData = e.clipboardData || e.originalEvent['clipboardData'];
    if (clipboardData) {
      var pastedData = clipboardData.getData('Text');
    }
    // Stop data actually being pasted into div
    e.stopPropagation();
    e.preventDefault();
    if (!pastedData) {
      return;
    }
    this.setValue(pastedData);
  }
}
