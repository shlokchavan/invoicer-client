import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { IRMStepConfig, IRMStepperConfig } from './rm-stepper.model';

@Component({
  selector: 'rm-stepper',
  templateUrl: './rm-stepper.component.html',
  styleUrls: ['./rm-stepper.component.scss']
})
export class RMStepperComponent implements OnInit, OnChanges{
  // Parameters
  @Input() isBigStepper: boolean;
  @Input() isLinear: boolean;
  @Input() config: IRMStepperConfig;
  @Input() stepsConfig: IRMStepConfig[];
  @Input() stepIndex: number;
  @Input() validateALLStep: boolean;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Output() stepIndexChange: EventEmitter<number> = new EventEmitter();

  @ViewChild('stepper') stepper: MatHorizontalStepper;

  constructor() {
    // Initialize Default Properties
    this.stepIndex = 0;
    // this.isBigStepper = false;
    // this.isBigStepper = true; // Temp
  }

  ngOnInit() {

  }

  ngOnChanges() {
    if(this.validateALLStep) {
      setInterval(() => {
        if(this.isBigStepper) {
          this.stepper.steps.forEach((step,index) => {
            if(!this.isBigStepper)
              step.interacted = false;
            if(step.stepControl) {
              this.config.steps[index].isValidated = step.stepControl.valid;
              this.config.steps[index].hasError = step.stepControl.invalid;
            }
          });
        }
      }, 10);
    }
  }

  public nextStep() {
    this.stepper.next();
    this.stepIndex = this.stepper.selectedIndex;
    this.stepIndexChange.emit(this.stepIndex)
  }
  public prevStep() {
    this.stepper.previous();
    this.stepIndex = this.stepper.selectedIndex;
    this.stepIndexChange.emit(this.stepIndex)
  }

  public changeStep(event) {
    this.stepper._steps.toArray()[event.previouslySelectedIndex].completed = false;
    if(this.stepper._steps.toArray()[event.previouslySelectedIndex].stepControl)
    this.config.steps[event.previouslySelectedIndex].isValidated = 
    this.stepper._steps.toArray()[event.previouslySelectedIndex].stepControl.valid
    // this.stepper.steps.forEach((step,index) => {
    //   if(!this.isBigStepper)
    //     step.interacted = false;
    //   if(step.stepControl)
    //     this.config.steps[index].isValidated = step.stepControl.valid;
    // });
    if(this.stepper._steps.toArray()[event.previouslySelectedIndex]?.stepControl?.invalid) {
      this.stepper._steps.toArray()[event.previouslySelectedIndex].hasError = true
    } else {
      this.stepper._steps.toArray()[event.previouslySelectedIndex].hasError = false
    }
    // setTimeout(() => {
      // this.stepIndex = event.selectedIndex;
      this.stepIndexChange.emit(event.selectedIndex);
    // }, 200);
    // this.stepper._steps.toArray()[event.previouslySelectedIndex].interacted = false;
  }

  getClassForLine() {
    let className = "";
    this.config.steps.forEach((step,index)=> {
      if(step.isValidated || index == this.stepIndex) className = "step-valid-" + index;
    });
    return className;
  }

}
