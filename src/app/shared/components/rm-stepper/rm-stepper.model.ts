import { StepState } from "@angular/cdk/stepper";
import { TemplateRef } from "@angular/core";
import { FormGroup } from "@angular/forms";

export interface IRMStepperConfig {
    steps: IRMStepConfig[];
}

export interface IRMStepConfig {
    stepLabel: string;
    stepId?: any;
    stepTemplate: TemplateRef<any>;
    isOptional?: boolean;
    formGroup?: FormGroup;
    isValidated?: boolean;
    isHidden?: boolean;
    hasError?: boolean;
    errorMsg?: boolean;
}