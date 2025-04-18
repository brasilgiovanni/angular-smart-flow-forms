import { signal } from "@angular/core";
import { StepperConfigModel } from "../../shared/stepper/stepper-config-model";
import { StepAComponent } from "../steps/step-a/step-a.component";
import { StepBComponent } from "../steps/step-b/step-b.component";
import { StepCComponent } from "../steps/step-c/step-c.component";
import { StateFormService } from "./state-form.service";
import { StepDComponent } from "../steps/step-d/step-d.component";
import { StepEComponent } from "../steps/step-e/step-e.component";

export const getStep = {
  a: (deps: { stateForm: StateFormService }) => createStepA(deps.stateForm),
  b: (deps: { stateForm: StateFormService }) => createStepB(deps.stateForm),
  c: (deps: { goToFn: (title: string) => void }) => createStepC(deps.goToFn),
  d: (deps: { stateForm: StateFormService }) => createStepD(deps.stateForm),
  e: () => createStepE(),
};

export function createStepA(stateForm: StateFormService): StepperConfigModel {
  return {
    title: 'Dados Pessoais',
    component: StepAComponent,
    isValid: stateForm.personalValid
  };
}

export function createStepB(stateForm: StateFormService): StepperConfigModel {
  return {
    title: 'Contato Profissional',
    component: StepBComponent,
    isValid: stateForm.contactValid
  };
}

export function createStepC(goToFn: (stepTitle: string) => void): StepperConfigModel {
  return {
    title: 'Confirmação',
    component: StepCComponent,
    isValid: signal(true),
    outputs: {
      goToTitle: goToFn
    }
  };
}

export function createStepD(stateForm: StateFormService): StepperConfigModel {
  return {
    title: 'Opção',
    component: StepDComponent,
    isValid: stateForm.optionValid
  };
}

export function createStepE(): StepperConfigModel {
  return {
    title: 'Step E',
    component: StepEComponent,
    isValid: signal(true),
  };
}