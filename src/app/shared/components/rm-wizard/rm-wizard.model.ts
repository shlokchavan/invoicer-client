import { StepState } from "@angular/cdk/stepper";
import { TemplateRef } from "@angular/core";
import { FormGroup } from "@angular/forms";

export interface IRMWizardConfig {
    steps: IRMWizardStepConfig[];
}

export interface IRMWizardStepConfig {
    stepLabel: string;
    stepTemplate: TemplateRef<any>;
    isError?: boolean;
    isOptional?: boolean;
    formGroup?: FormGroup;
    isValidated?: boolean;
}