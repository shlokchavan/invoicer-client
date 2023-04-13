import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { IRMWizardStepConfig, IRMWizardConfig } from './rm-wizard.model';

@Component({
  selector: 'rm-wizard',
  templateUrl: './rm-wizard.component.html',
  styleUrls: ['./rm-wizard.component.scss']
})
export class RMWizardComponent implements OnInit {
  // Parameters
  @Input() config: IRMWizardConfig;
  @Input() stepsConfig: IRMWizardStepConfig[];
  @Input() stepIndex: number;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Output() stepIndexChange: EventEmitter<number> = new EventEmitter();

  @ViewChild('stepper') stepper: MatHorizontalStepper;

  constructor() {
    // Initialize Default Properties
    this.stepIndex = 0;
  }

  ngOnInit() {

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
    this.stepper.steps.forEach((step,index) => {
      step.interacted = false;
      if(step.stepControl)
        this.config.steps[index].isValidated = step.stepControl.valid;
    });
    // setTimeout(() => {
      this.stepIndex = event.selectedIndex;
      this.stepIndexChange.emit(this.stepIndex);
    // }, 200);
    // this.stepper._steps.toArray()[event.previouslySelectedIndex].interacted = false;
  }

}
